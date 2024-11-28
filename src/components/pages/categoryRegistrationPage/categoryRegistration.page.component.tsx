import EventCategoryValidation from "../../../classes/validation/event.category.validation";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import ColorPicker from "../../basicComponents/colorpick-component/colorpick.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";
import EventCategoryService from "../../../../Service/Event/event.category.service"

import './categoryRegistrationPageContainer.css';
import './categoryRegistrationPageContent.css';
import './categoryRegistrationPageMain.css';
import EventCategory from "../../../../Models/Event/event.category.entity";
import { useEffect, useState } from "react";
import Institution from "../../../../Models/Instituition/institution.entity";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import LocalStorageCategoryEditUtils from "../../../../Utils/LocalStorage/local.storage.category.edit.utils"
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

interface categoryRegistrationInterface {
  title?: string,
  text?: string
}

const CategoryRegistrationPage: React.FC<categoryRegistrationInterface> = ({
  title = 'Cadastro de Categoria',
  text = 'Explore e crie categorias para os eventos da sua igreja! Personalize cada uma com um nome e cor exclusivos para distinguir e organizar seus eventos de forma clara e atraente!'
}) => {

  const history = useHistory()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [IsEditMode, setIsEditMode] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const localStorageCategoryEditUtils = new LocalStorageCategoryEditUtils()

  useEffect(() => {
    loadCategoryIfIsEditMode()
  }, []);

  const loadCategoryIfIsEditMode = () => {
    const idEventEditMode = localStorageCategoryEditUtils.getId()

    if (idEventEditMode) {
      setIsEditMode(true)
      loadCategory(idEventEditMode)
    }
  }

  const loadCategory = async (idCategory: number) => {
    const service = new EventCategoryService()
    const category = await service.getById(idCategory)

    if (category) {
      setName(category.name ? category.name : "")
    }
  }

  const applyCategoryValidation = (eventCategory: EventCategory): boolean => {
    const validate = new EventCategoryValidation()
    validate.validate(eventCategory)

    if (validate.hasErrors()) {
      setMessagesErrorModal(validate.errors)
      setShowModal(true)

      return false
    }

    return true
  }

  const createNewEventCategory = () => {
    const service = new EventCategoryService()
    const localStorageInstituionUtils = new LocalStorageInstituionUtils()


    const eventCategory = new EventCategory()
    eventCategory.name = name
    // eventCategory.color = color
    eventCategory.institution = new Institution()
    eventCategory.institution.id = localStorageInstituionUtils.getId()



    if (applyCategoryValidation(eventCategory)) {
      const response = service.save(eventCategory)

      if (Array.isArray(response)) {
        setMessagesErrorModal(response)
        setShowModal(true)
      } else {
        RouterUtil.returnOfLastPage(history)
      }
    }
  }

  const updateCategory = async () => {
    const idEventEditMode = localStorageCategoryEditUtils.getId()
    if (idEventEditMode) {
      const service = new EventCategoryService()
      const category = await service.getById(idEventEditMode)

      if (category) category.name = name

      if (category && applyCategoryValidation(category)) {

        const response = await service.update(category)

        if (Array.isArray(response)) {
          setMessagesErrorModal(response)
          setShowModal(true)
        } else {
          localStorageCategoryEditUtils.setId(null)
          RouterUtil.returnOfLastPage(history)
        }

      }
    }
  }

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível realizar o cadastro da categoria"}
      />

      <HeaderComponent executeBeforeArrowclicked={() => { localStorageCategoryEditUtils.setId(null) }} type='simple' showCircleImage={false}></HeaderComponent>

      <div className="categoryRegContent">

        <main>
          <div className="categoryRegContainer">
            <h1>{IsEditMode ? "Editar categoria" : title}</h1>
            <p>{text}</p>
          </div>

          <div className="categoryRegInputContainer">
            <TextInputComponent textLabel="Nome da Categoria" value={name} onInputChange={(e) => setName(e)} placeHolder="Digite aqui..." />

            {/* <ColorPicker onChange={(e) => setColor(e)} /> */}

            {IsEditMode ?
              <ButtonComponent width="300px" text="Salvar alterações" onClick={updateCategory} />
              :
              <ButtonComponent width="300px" text="Criar" onClick={createNewEventCategory} />
            }

          </div>



        </main>

        <footer>
          {/* componente para o footer padrão das páginas */}
        </footer>

      </div>
    </>
  )
};

export default CategoryRegistrationPage;