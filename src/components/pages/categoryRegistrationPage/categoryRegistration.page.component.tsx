import ButtonComponent from "../../basicComponents/button-component/button.components";
import ColorPicker from "../../basicComponents/colorpick-component/colorpick.component";
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
      <div className="categoryRegContent">
        <header>
          {/* componente para o header padrão das páginas */}
        </header>

        <main>
          <div className="categoryRegContainer">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>

          <div className="categoryRegInputContainer">
            <TextInputComponent textLabel="Nome da Categoria" onInputChange={() => {} } placeHolder="Nome da Categoria" />
            
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