import AuthComponent from "../../basicComponents/authInput-component/auth.component";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";

import './authPageContainer.css';
import './authPageContent.css';
import './authPageMain.css';

import logo from "../../../assets/rafael.png"


interface propos {
  p: string;
}

const AuthPage: React.FC<propos> = ({p = 'Informe o código de autenticação:'}) => {

  return(
    <>
    <div className="contentAuth">

      <HeaderComponent showCircleImage={false}></HeaderComponent>
      
      <main>
        <div className="authContainer">

          <h3>{p}</h3>
          
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