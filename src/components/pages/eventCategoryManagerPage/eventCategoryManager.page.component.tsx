import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import './eventCategoryManegerPageContainer.css';
import './eventCategoryManegerPageContent.css';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import AlertComponent from '../../basicComponents/alert-component/alert.component';
import EventCategory from '../../../../Models/Event/event.category.entity';
import EventCategoryService from '../../../../Service/Event/event.category.service';
import LocalStorageCategoryEditUtils from "../../../../Utils/LocalStorage/local.storage.category.edit.utils"
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import { useHistory } from 'react-router';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';
import ButtonComponent from '../../basicComponents/button-component/button.components';

const EventCaegoryManagerPage: React.FC<{}> = () => {

  const history = useHistory()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [eventCategoryList, setEventCategoryList] = useState<EventCategory[]>([])

  const institutionLocalStorage = new LocalStorageInstituionUtils()
  const institutionService = new InstitutionService()
  const eventCategoryService = new EventCategoryService()
  const localStorageCategoryEditUtils = new LocalStorageCategoryEditUtils()

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

  const editCategory = (id: number | undefined) => {
    if (id) {
      localStorageCategoryEditUtils.setId(id)
      RouterUtil.goToPage(history, "category-registration")
    }
  }

  const createCategory = () => {
    RouterUtil.goToPage(history, "category-registration")
  }

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível excluir categoria de evento"}
      />

      <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Categorias de evento</h2>
          </div>

          <div className="containerEventCategory">
            {eventCategoryList && eventCategoryList.map((eventCategory, index) => {
              return <div key={index} className="eventCategoryCard">
                <p>{eventCategory.name}</p>
                <div>
                  <button className="editButton" onClick={() => { editCategory(eventCategory.id) }}>✏️</button>
                  <button className="denyButton" onClick={() => { excludeEventCategory(eventCategory) }} >X</button>
                </div>
              </div>
            })}

            <ButtonComponent text="Criar categoria de evento" width='90%' onClick={createCategory}></ButtonComponent>
          </div>

        </div>
      </main>
    </>
  )
}

export default EventCaegoryManagerPage;