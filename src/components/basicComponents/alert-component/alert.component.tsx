import React, { useEffect, useState } from 'react';
import style from './alertComponent.module.css';
import ButtonComponent from '../button-component/button.components';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';

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
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onDidDismiss, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <>
      {isOpen && (
        <div className={`${style.overlay} ${visible ? style.fadeIn : style.fadeOut}`}
             onClick={handleOverlayClick}
        >
          <div className={style.modal}>
            <div className={style.header}>
            <IonIcon icon={closeCircleOutline} className={style.errorIcon} />
              <h1 className={style.titleText}>{titleText}</h1>
            </div>
            <div className={style.content}>
              {messages.map((msg, index) => (
                <div className={style.message} key={index}>{ ++index + " - " + msg}</div>
              ))}
            </div>
            <div className={style.footer}>
              <ButtonComponent isCancel={true} text={closeButtonText} width={'100%'} onClick={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertComponent;
