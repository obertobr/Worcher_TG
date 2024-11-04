import { IonButton,IonIcon,IonImg,IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { Camera, CameraResultType } from '@capacitor/camera';
import style from '../../styleComponents/input.module.css';
import ButtonComponent from "../button-component/button.components";

import { cloudDownloadOutline } from 'ionicons/icons';

import "./uploadImageInputComponent.css"

interface TextInputComponentProps {
    text: string;
    onInputChange: (value: string) => void;
}

const UploadImageComponent: React.FC<TextInputComponentProps> = ({
    text,
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
        <div onClick={takePicture} className="containerImg">
            <IonIcon icon={cloudDownloadOutline} className="icon"></IonIcon>

            <ButtonComponent text={text} 
                             width={"100%"} 
                             onClick={() => {}}
            ></ButtonComponent>
            {image && <IonImg className="image" src={image} />}
        </div>
    );
};

export default UploadImageComponent;
