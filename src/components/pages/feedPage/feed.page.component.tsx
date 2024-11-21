import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import InstitutionCard from "../../basicComponents/institution-card-component/institutionCard.component";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import EventManager from "./event.manger";
import Event from "../../../../Models/Event/event.entity";
import FilterCategory from "../../basicComponents/filter-event-category/filter.event.category.component";
import "./feedPage.css"
import EventCard from "../../basicComponents/event-card-component/event.card.component";
import EventCategory from "../../../../Models/Event/event.category.entity";
import LocalStorageEventViewUtils from "../../../../Utils/LocalStorage/local.storage.event.view.utils"

const FeedPage: React.FC<{}> = () => {

  const history = useHistory()
  const eventManager: EventManager = new EventManager();

  const [idCategoryFilter,setIdCategoryFilter] = useState<number | undefined>() 
  const [eventList, setEventList] = useState<Event[]>([])

  useEffect( () => {
    loadEventList()
  }, [idCategoryFilter])

  const loadEventList = async () => {
    setEventList(await eventManager.listEventByCategory(idCategoryFilter ? idCategoryFilter : null))
  }

  const changeCategory = (eventCategoryId: number | undefined) => {
    setIdCategoryFilter(eventCategoryId)
  }

  const viewEventPage = (idEvent: number | undefined) => {
    const localStorageEventViewUtils = new LocalStorageEventViewUtils()

    if(idEvent){
      localStorageEventViewUtils.setId(idEvent)
      // Ir para página de vizualizar eventos e puxar os dados a partir do idEvent no localStorage
    }
  }

  return(
    <>
    <HeaderComponent showHome={true} showArrowBack={false} type='simple' showCircleImage={true}></HeaderComponent>

      <main className="mainFeed">
        <FilterCategory onChange={(e: number | undefined) =>  changeCategory(e)}></FilterCategory>

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
                             memberId={event.member?.id}
                             memberList={event.registeredMemberList}
                            changeParticipate={() => loadEventList()}
                            viewEventClicked={(e: number | undefined) => viewEventPage(e)}
                  ></EventCard>
                  
              )
            })
          }
        </div>
      </main>
    
    <FooterComponent isWithinTheInstitution={true}></FooterComponent>
    </>
  )
}

export default FeedPage;