import AuthComponent from "../../basicComponents/authInput-component/auth.component";
import ButtonComponent from "../../basicComponents/button-component/button.components";

import './authPageContainer.css';
import './authPageContent.css';
import './authPageMain.css';


const AuthPage: React.FC<{}> = () => {

  return(
    <>
    <div className="contentAuth">

      <header>
        {/* componente para o header padrão das páginas */}
      </header>
      
      <main>
        <div className="authContainer">

          <h3>Informe o código de autenticação:</h3>
          
          <AuthComponent />
          
          <ButtonComponent width="80dvw" text="Confirmar" onClick={() => {} }/>
        </div>
      </main>

      <footer>
        {/* componente para o footer padrão das páginas */}
      </footer>
    </div>
    </>
  )
}

export default AuthPage;