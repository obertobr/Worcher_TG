import { useEffect, useState } from "react";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import "./scheduleContent.css";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import EventService from "../../../../Service/Event/event.service";
import Event from "../../../../Models/Event/event.entity";
import LocalStorageEventViewUtils from "../../../../Utils/LocalStorage/local.storage.event.view.utils";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const localStorageInstituionUtils: LocalStorageInstituionUtils = new LocalStorageInstituionUtils()
const eventService: EventService = new EventService()

interface eventInterface {
  title: string | undefined
  date: Date | undefined
  color: string | undefined
  extendedProps?: Event | undefined
}

const SchedulePage: React.FC<{}> = () => {

  const history = useHistory()

  const [eventList, setEventList] = useState<eventInterface[]>([])

  useEffect( () => {
    loadEvents()
  }, [])

  const fetchEvents = async ():Promise<eventInterface[]>  => {
    const id = localStorageInstituionUtils.getId()

    if(id){ 
       const events: Event[] = await eventService.getEventsByInstitutionId(id, null)

       const eventList = events.map(event => {return {title: event.name, date: event.dateTimeOfExecution, color: '#4fc3f7', extendedProps: event}})

       return eventList || []
    }
    return []
  }

  const loadEvents = async () => {
    setEventList(await fetchEvents())
  }

  const viewEventPage = (idEvent: number | undefined) => {
    const localStorageEventViewUtils = new LocalStorageEventViewUtils()

    if(idEvent){
      localStorageEventViewUtils.setId(idEvent)
      RouterUtil.goToPage(history,"vieweventpage")
    }
  }

  const handleEventClick = (clickInfo: any) => {
    const { title, start, extendedProps } = clickInfo.event;

    viewEventPage(extendedProps.id)
  };

  return (
    <>
      <HeaderComponent showHome={true} showArrowBack={false} type='simple' showCircleImage={true}></HeaderComponent>

      <main>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth',
          }}
          events={eventList}
          displayEventTime={false}
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista',
          }}
          eventDisplay="block"
          dayMaxEvents={3} 
          moreLinkText={(num) => `+${num} mais`}
          eventClick={handleEventClick}
        />
      </main>

      <FooterComponent isWithinTheInstitution={true}></FooterComponent>
    </>
  )
}

export default SchedulePage;