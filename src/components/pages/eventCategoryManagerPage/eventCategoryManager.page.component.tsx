import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import './eventCategoryManegerPageContainer.css';
import './eventCategoryManegerPageContent.css';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import AlertComponent from '../../basicComponents/alert-component/alert.component';
import EventCategory from '../../../../Models/Event/event.category.entity';
import EventCategoryService from '../../../../Service/Event/event.category.service';

const EventCaegoryManagerPage: React.FC<{}> = () => {

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [eventCategoryList, setEventCategoryList] = useState<EventCategory[]>([])

  const institutionLocalStorage = new LocalStorageInstituionUtils()
  const institutionService = new InstitutionService()
  const eventCategoryService = new EventCategoryService()

  const loadEventCategoryList = async () => {
    const intitutionID = institutionLocalStorage.getId()
    if (intitutionID) {
      const institution = await institutionService.getById(intitutionID)
      setEventCategoryList(institution?.eventCategoryList || [])
    }
  }

  const excludeEventCategory = async (eventCategory: EventCategory) => {
    if (eventCategory.id) {
      const response = await eventCategoryService.delete(eventCategory.id)
      if (Array.isArray(response)) {
        setMessagesErrorModal(response)
        setShowModal(true)
      }

      loadEventCategoryList()
    }
  }

  useEffect(() => {
    loadEventCategoryList()
  }, []);

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível excluir categoria de evento"}
      />

      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Categorias de evento</h2>
          </div>

          <div className="containerEventCategory">
            {eventCategoryList && eventCategoryList.map((eventCategory, index) => {
              return <div className="eventCategoryCard">
                <p>{eventCategory.name}</p>
                <div>
                  <button className="editButton">✏️</button>
                  <button className="denyButton" onClick={() => { excludeEventCategory(eventCategory) }} >X</button>
                </div>
              </div>
            })}
          </div>

        </div>
      </main>
    </>
  )
}

export default EventCaegoryManagerPage;