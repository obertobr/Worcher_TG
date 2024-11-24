import { useEffect, useState } from "react";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import Event from "../../../../Models/Event/event.entity";
import FilterCategory from "../../basicComponents/filter-event-category/filter.event.category.component";
import EventCard from "../../basicComponents/event-card-component/event.card.component";
import LocalStorageEventViewUtils from "../../../../Utils/LocalStorage/local.storage.event.view.utils"
import EventService from "../../../../Service/Event/event.service";
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";

const MyEventsPage: React.FC<{}> = () => {

  const history = useHistory()
  const serviceEvent = new EventService()

  const [eventList, setEventList] = useState<Event[]>([])

  useEffect(() => {
    loadEventList()
  }, [])

  const loadEventList = async () => {
    const localStorageLogin = new LocalStorageLoginUtils()
    const idUserLocalStorage = localStorageLogin.getIdUser()

    if(idUserLocalStorage){
        setEventList(await serviceEvent.getEventsByUserId(idUserLocalStorage))
    }
  }

  const viewEventPage = (idEvent: number | undefined) => {
    const localStorageEventViewUtils = new LocalStorageEventViewUtils()

    if(idEvent){
      localStorageEventViewUtils.setId(idEvent)
      RouterUtil.goToPage(history,"vieweventpage")
    }
  }

  return(
    <>
    <HeaderComponent showArrowBack={true} type='simple' showCircleImage={true}></HeaderComponent>

      <main className="mainFeed">

        <div className="contentEventFeed">
          {
            eventList.map( (event,index) => {
              return (
                  <EventCard key={index}
                             id={event.id}
                             name={event.name} 
                             creationDateTime={event.creationDateTime} 
                             dateTimeOfExecution={event.dateTimeOfExecution} 
                             category={event.eventCategory}
                             userId={event.member?.user?.id}
                             memberId={event.member?.id}
                             memberList={event.registeredMemberList}
                             urlImage={event.image?.url}
                            changeParticipate={() => loadEventList()}
                            viewEventClicked={(e: number | undefined) => viewEventPage(e)}
                  ></EventCard>
                  
              )
            })
          }
        </div>
      </main>
    
    <FooterComponent isWithinTheInstitution={false}></FooterComponent>
    </>
  )
}

export default MyEventsPage;