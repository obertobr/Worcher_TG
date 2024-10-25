import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import RouterUtil from '../../../../Utils/Components/RouterUtil'
import "./testPage.css"
import { text } from "ionicons/icons";

const buttons = [
    {path: 'home', text: 'HOME'},
    {path: 'login', text: 'LOGIN'},
    {path: 'singup', text: "SINGUP"},
    {path: 'auth-page', text: 'AUTENTICATION'}
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
