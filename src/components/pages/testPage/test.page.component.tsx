import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import "./testPage.css";

const buttons = [
    {path: 'home', text: 'HOME'},
    {path: 'login', text: 'LOGIN'},
    {path: 'singup', text: "SINGUP"},
    {path: 'institution-register', text: "INSTITUTION-REGISTER"},
    {path: 'auth-page', text: 'AUTENTICATION'},
    {path: 'inst-page', text: 'INSTITUTION VIEW PAGE'},
    {path: 'category-registration', text: 'CATEGORY REGISTRATION'},
    {path: 'position-registration', text: 'POSITION REGISTRATION'},
    {path: 'my-institution', text: 'MY INSTITUTION'}
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
