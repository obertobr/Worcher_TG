import { IonButton,IonImg,IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { Camera, CameraResultType } from '@capacitor/camera';
import style from '../../styleComponents/input.module.css';

type TextFieldTypes = 'text' | 'password';

interface TextInputComponentProps {
    text: string;
    textLabel?: string;
    onInputChange: (value: string) => void;
}

const UploadImageComponent: React.FC<TextInputComponentProps> = ({
    text,
    textLabel,
}) => {
    const [image, setImage] = useState<string | undefined>(undefined);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          resultType: CameraResultType.Uri,
          promptLabelHeader: text,
          promptLabelPhoto: "Usar camera",
          promptLabelPicture: "Usar imagem da galeria"
        });
      
        var imageUrl = image.webPath;
      
        setImage(imageUrl)
      };

    return (
        <div onClick={takePicture} className={style.centerInput}>
            <IonLabel className={style.labelInput}>{textLabel}</IonLabel>
            <IonButton>
                {text}
            </IonButton>
            {image && <IonImg src={image} />}
        </div>
    );
};

export default UploadImageComponent;
