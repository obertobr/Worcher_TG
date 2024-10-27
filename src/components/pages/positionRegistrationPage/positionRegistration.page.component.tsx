import ButtonComponent from "../../basicComponents/button-component/button.components";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";

import './positionRegistrationPageContainer.css';
import './positionRegistrationPageContent.css';
import './positionRegistrationPageMain.css';

interface positionRegistrationInterface {
  title?: string,
  text?: string
}

const PositionRegistrationPage: React.FC<positionRegistrationInterface> = ({
  title = 'Cadastro do Cargo',
  text = 'Crie cargos para a melhor organização de membros da sua igreja! Personalize cada cargo com um nome e atribua as permissões adequadas com o cargo, assim você pode criar uma estrutura organizacional clara e eficiente para a sua instituição.'
}) => {

  return(
    <>
      <div className="positionRegContent">
        <header>
          {/* componente para o header padrão das páginas */}
        </header>

        <main>
          <div className="positionRegContainer">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>

          <div className="positionRegInputContainer">
            <TextInputComponent textLabel="Nome do Cargo" onInputChange={() => {} } placeHolder="Nome da Cargo" />
            <TextInputComponent textLabel="Permissões" onInputChange={() => {} } placeHolder="Permissões" />
            
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

export default PositionRegistrationPage;