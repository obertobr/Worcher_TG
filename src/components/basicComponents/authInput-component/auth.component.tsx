import { IonInput } from "@ionic/react";
import './authComponent.css';

const AuthComponent: React.FC<{}> = () => {
  return (
    <>
      <div className="authCodeContainer">
        <IonInput 
          className="auth_code"
          maxlength={1}
        />
        <IonInput 
          className="auth_code"
          maxlength={1}
        />
        <IonInput 
          className="auth_code"
          maxlength={1}
        />
        <IonInput 
          className="auth_code"
          maxlength={1}
        />
        <IonInput 
          className="auth_code"
          maxlength={1}
        />
      </div>
    </>
  )
}

export default AuthComponent;