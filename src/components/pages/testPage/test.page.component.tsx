import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import "./testPage.css";

const buttons = [
    {path: 'home', text: 'HOME'},
    {path: 'login', text: 'LOGIN'},
    {path: 'singup', text: "CADASTRO DE USUARIO "},
    {path: 'institution-register', text: "CADASTRO DE INSTITUIÇÃO"},
    {path: 'auth-page', text: 'AUTENTICAÇÃO'},
    {path: 'inst-page', text: 'VIEW INSTITUIÇÃO'},
    {path: 'category-registration', text: 'CADASTRO DE CATEGORIA'},
    {path: 'position-registration', text: 'CADASTRO DE CARGO'},
    {path: 'member-view', text: 'GERENCIAR MEMBROS'},
    {path: 'event-register', text: 'CRIAR EVENTOS'},
    {path: 'profile', text: 'TELA DE PERFIL'},
    {path: 'config', text: 'TELA DE CONFIGURAÇÃO'}
]

const TestPage: React.FC<{}> = () => {

  const history = useHistory();

  const handleButtonClick = ( path: string) => {
    RouterUtil.goToPage(history,path)
  };

  return (
    <div className="buttonList">
      {buttons.map((button, index) => (
        <IonButton key={index} onClick={() => handleButtonClick(button.path)}>
          {button.text}
        </IonButton>
      ))}
    </div>
  );
};

export default TestPage;
