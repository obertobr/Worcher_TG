import { useState } from "react";
import AuthComponent from "../../basicComponents/authInput-component/auth.component";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";

import './authPageContainer.css';
import './authPageContent.css';
import './authPageMain.css';
import AlertComponent from "../../basicComponents/alert-component/alert.component";



interface props {
  p?: string;
  onClick: Function
}

const AuthPage: React.FC<props> = (
  {p = 'Informe o código de autenticação:', 
    onClick

  }) => {

    

    const [codeComplete, setCodeComplete] = useState<string>("") 

    const confirmButtonClick = (codeComplete: string) => {
      onClick(codeComplete)
    }

  return(
    <>

    <div className="contentAuth">

      <HeaderComponent showCircleImage={false}></HeaderComponent>
      
      <main>
        <div className="authContainer">

          <h3>{p}</h3>
          
          <AuthComponent onCodeComplete={(e) => setCodeComplete(e)} />

          <ButtonComponent disabled={!codeComplete || codeComplete.length != 6} width="80dvw" text="Confirmar" onClick={() => confirmButtonClick(codeComplete)}/>
        </div>
      </main>
    </div>
    </>
  )
}

export default AuthPage;