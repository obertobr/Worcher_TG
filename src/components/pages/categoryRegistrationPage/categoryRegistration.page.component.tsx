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
import { useState } from "react";
import Institution from "../../../../Models/Instituition/institution.entity";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import AlertComponent from "../../basicComponents/alert-component/alert.component";

interface categoryRegistrationInterface {
  title?: string,
  text?: string
}

const CategoryRegistrationPage: React.FC<categoryRegistrationInterface> = ({
  title = 'Cadastro de Categoria',
  text = 'Explore e crie categorias para os eventos da sua igreja! Personalize cada uma com um nome e cor exclusivos para distinguir e organizar seus eventos de forma clara e atraente!'
}) => {

  const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [name,setName] = useState<string>("");
  const [color,setColor] = useState<string>("");


  const createNewEventCategory = () => {
    const service = new EventCategoryService()
    const localStorageInstituionUtils = new LocalStorageInstituionUtils()
    const validate = new EventCategoryValidation()

    const eventCategory = new EventCategory()
    eventCategory.name = name
    eventCategory.color = color
    eventCategory.institution = new Institution()
    eventCategory.institution.id = localStorageInstituionUtils.getId()

    validate.validate(eventCategory)
      
    if(validate.hasErrors()){
      setMessagesErrorModal(validate.errors)
      setShowModal(true)
    }else{
      const response = service.save(eventCategory)

      if(Array.isArray(response)){
        setMessagesErrorModal(response)
        setShowModal(true)
      }else{
          alert("Categoria criada com sucesso!")
      }
    }

    

    
  }

  return(
    <>
      <AlertComponent
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                messages={messagesErrorModal}
                titleText={"Não foi possível realizar o cadastro da categoria"}
            />

      <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

      <div className="categoryRegContent">

        <main>
          <div className="categoryRegContainer">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>

          <div className="categoryRegInputContainer">
            <TextInputComponent textLabel="Nome da Categoria" onInputChange={(e) => setName(e) } placeHolder="Digite aqui..." />
            
            {/* <ColorPicker onChange={(e) => setColor(e)} /> */}

            <ButtonComponent width="300px" text="Criar" onClick={createNewEventCategory}/>
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