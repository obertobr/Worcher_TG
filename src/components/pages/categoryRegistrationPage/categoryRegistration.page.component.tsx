import ButtonComponent from "../../basicComponents/button-component/button.components";
import ColorPicker from "../../basicComponents/colorpick-component/colorpick.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";

import './categoryRegistrationPageContainer.css';
import './categoryRegistrationPageContent.css';
import './categoryRegistrationPageMain.css';

interface categoryRegistrationInterface {
  title?: string,
  text?: string
}

const CategoryRegistrationPage: React.FC<categoryRegistrationInterface> = ({
  title = 'Cadastro de Categoria',
  text = 'Explore e crie categorias para os eventos da sua igreja! Personalize cada uma com um nome e cor exclusivos para distinguir e organizar seus eventos de forma clara e atraente!'
}) => {

  return(
    <>
      <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

      <div className="categoryRegContent">

        <main>
          <div className="categoryRegContainer">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>

          <div className="categoryRegInputContainer">
            <TextInputComponent textLabel="Nome da Categoria" onInputChange={() => {} } placeHolder="Digite aqui..." />
            
            <ColorPicker />

            <ButtonComponent width="60%" text="Criar" onClick={() => {} }/>
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