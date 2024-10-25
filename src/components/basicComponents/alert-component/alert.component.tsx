import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton } from '@ionic/react';
import style from './alertComponent.module.css'
import ButtonComponent from '../button-component/button.components';


interface AlertComponentProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  messages: string[];
  titleText: string;
  closeButtonText?: string;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  isOpen,
  onDidDismiss,
  messages,
  titleText,
  closeButtonText = "Fechar",
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss} className={style.modalAlert} >
      <IonHeader className={style.titleText}>
       <h1>Erro ao criar o cadastro</h1>
      </IonHeader>

      <div className={style.content}>
        
          {messages.map((msg, index) => (
            <div className={style.message} key={index}>{msg}</div>
          ))}
       
       </div>

      <IonFooter className={style.footer}>
       <ButtonComponent text={'Ok'} width={'100%'} onClick={onDidDismiss}></ButtonComponent>
      </IonFooter>
    </IonModal>
  );
};

export default AlertComponent;
