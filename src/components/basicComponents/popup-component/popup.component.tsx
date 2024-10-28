import React, { ReactElement, useEffect, useState } from 'react';
import style from './popupComponent.module.css';
import ButtonComponent from '../button-component/button.components';

interface PopupComponentProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  content: ReactElement<ContentProps>;
  titleText: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  valueChangePopup: (e: any) => any;
  validateValue?: Function
}

interface ContentProps {
   valueChange: (e: any) => any;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  isOpen,
  onDidDismiss,
  content,
  titleText,
  closeButtonText = "Fechar",
  confirmButtonText = "Confirmar",
  valueChangePopup,
  validateValue,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [value, setValue] = useState();

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onDidDismiss, 300);
  };

  const handleConfirm = () => {
    //console.log(validateValue) Aqui temos uma função que pode ser passada como prop para validação do valor antes de confirmar

    valueChangePopup(value)
    handleClose()
  }

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

            {React.cloneElement(content, {
              valueChange: (e: any) => {
                setValue(e)
              }
            })}

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
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupComponent;
