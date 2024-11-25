import { IonButton,IonIcon,IonImg,IonLabel } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Camera, CameraResultType } from '@capacitor/camera';
import style from '../../styleComponents/input.module.css';
import ButtonComponent from "../button-component/button.components";

import { cloudDownloadOutline } from 'ionicons/icons';

import "./uploadImageInputComponent.css"

interface TextInputComponentProps {
    text: string;
    value?: string;
    onInputChange: (value: File) => void;
}

const UploadImageComponent: React.FC<TextInputComponentProps> = ({
    text,
    value,
    onInputChange
}) => {
    useEffect(() => {
        if(value){
            setImage(value)
            loadImage(value)
        }
    },[value])

    const loadImage = async (value: string) => {
        const response = await fetch(value);
        const blob = await response.blob();
        
        const fileName = "image"
        const file = new File([blob], fileName, { type: blob.type });
        onInputChange(file);
    }

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
      
        if(imageUrl){
            setImage(imageUrl)

            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            const fileName = "image"
            const file = new File([blob], fileName, { type: blob.type });
            onInputChange(file);
        }
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
