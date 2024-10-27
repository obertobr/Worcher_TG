import React, { useEffect, useState } from 'react';
import style from './popupComponent.module.css';
import ButtonComponent from '../button-component/button.components';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';

interface PopupComponentProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  content: React.ReactNode;
  titleText: string;
  closeButtonText?: string;
  confirmButtonText?: string;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  isOpen,
  onDidDismiss,
  content,
  titleText,
  closeButtonText = "Fechar",
  confirmButtonText = "Confirmar",
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
              <h1 className={style.titleText}>{titleText}</h1>
            </div>
            <div className={style.content}>
              {content}
            </div>
            <div className={style.footer}>
              <ButtonComponent
                isCancel={true}
                text={closeButtonText}
                width={'100%'}
                onClick={handleClose}
              />

              <ButtonComponent
                text={confirmButtonText}
                width={'100%'}
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupComponent;
