import { ReactNode, useEffect, useState } from "react";
import "./headerComponent.css"
import { IonIcon } from "@ionic/react";
import { arrowBack, homeSharp, person, camera } from "ionicons/icons";
import { useHistory } from "react-router";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { NavFooter } from "../footer-component/footer.component";
import LocalStorageUtils from "../../../../../Utils/LocalStorage/local.storage.utils";
import LocalStorageMemberUtils from "../../../../../Utils/LocalStorage/local.storage.member.utils";
import LocalStorageInstituionUtils from "../../../../../Utils/LocalStorage/local.storage.institution.utils";
import SidePanelComponent from "../side-panel-component/side.panel.component";
import LocalStorageLoginUtils from "../../../../../Utils/LocalStorage/local.storage.login.utils";
import ImageUtils from "../../../../../Utils/image/image.utils";
import { Camera, CameraResultType } from "@capacitor/camera";
import UserService from "../../../../../Service/User/user.service";
import User from "../../../../../Models/User/user.entity";


type TextFieldTypes = 'simple' | 'complex';

interface HeaderComponentPropsInterface{
    type?: TextFieldTypes;
    backgroungImage?: string;
    circleImage?: string;
    height?: number;
    showCircleImage?: boolean;
    showArrowBack?: boolean;
    showHome?: boolean;
    showButtonChangeImage?: boolean;
    showCircleImageIfExistsCircleImage?: boolean;
    showCircleImageJustImageExists?: boolean;
    executeBeforeArrowclicked?: Function
}

const HeaderComponent: React.FC<HeaderComponentPropsInterface> = ({
    type = 'simple',
    backgroungImage,
    circleImage,
    showCircleImage = true,
    height = type == 'simple' ? 70 : 140,
    showArrowBack = true,
    showHome = false,
    showButtonChangeImage = false,
    showCircleImageIfExistsCircleImage = false,
    showCircleImageJustImageExists = true,
    executeBeforeArrowclicked = () => {}
  }) => {

    const history = useHistory()
    const [isSidePanelVisible, setSidePanelVisible] = useState<boolean>(false);
    const localStorageLogin = new LocalStorageLoginUtils()
    const userService = new UserService()

    const arrowBackClicked = () => {
        executeBeforeArrowclicked()
        RouterUtil.returnOfLastPage(history)
    }

    const homeClicked = () => {
        const localStorage = new LocalStorageUtils<NavFooter[]>("NAV_FOOTER");
        localStorage.setItem([])

        const localStorageMemberUtils = new LocalStorageMemberUtils()
        const localStorageInstitution = new LocalStorageInstituionUtils()

        localStorageInstitution.setId(null)
        localStorageMemberUtils.setItem(null)
        
        RouterUtil.goToPage(history,"my-institution")
    }

    const [image, setImage] = useState<string | undefined>(undefined);


    useEffect(() => {
        setImage(localStorageLogin.getAccount()?.user?.image?.url)
    }, [])

    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          resultType: CameraResultType.Uri,
          promptLabelHeader: "Imagem do Usuário",
          promptLabelPhoto: "Usar camera",
          promptLabelPicture: "Usar imagem da galeria"
        });
      
        var imageUrl = image.webPath;
      
        if(imageUrl){

            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            const fileName = "image"
            const file = new File([blob], fileName, { type: blob.type });

            const userIdLocalStorage = localStorageLogin.getAccount()?.user?.id

            if(userIdLocalStorage){
               const response = await userService.setPhoto({userID: userIdLocalStorage}, file)

               const account = localStorageLogin.getAccount()

               if(response && account){
                   account.user = response
                   localStorageLogin.setAccount(account)
                   setImage(response.image?.url)
               }
            }
        }
      };

    return(
        <>
            <header className="header" style={{ height: `${height}px`}}>

                {
                    backgroungImage ? (<div className="imageBackground">
                        <img src={backgroungImage} alt="background" />
                    </div>) : (<></>)
                }

                {
                    showArrowBack ? (<IonIcon icon={arrowBack} className="back-arrow-icon" onClick={arrowBackClicked} />) : (<></>)
                }

                {
                    showHome ? (<IonIcon icon={homeSharp} className="home-icon" onClick={homeClicked} />) : (<></>)
                }


                {
                  showCircleImageJustImageExists &&
                  ((showCircleImageIfExistsCircleImage && circleImage) || showCircleImage && image) ? 
                        (
                            <div className={"conteCircleImage " + (type == 'simple' ? " circleSimple" : " circleComplex") }>
                                <img className={"circleImageWith " + (type == 'simple' ? " circleSimple" : " circleComplex")} 
                                    src={ circleImage ? ImageUtils.getImageByUrl(circleImage) : ImageUtils.getImageByUrl(image)}
                                    onClick={() => type == 'simple' ? setSidePanelVisible(true) : ""}
                               ></img>

                                {
                                    showButtonChangeImage ? (<>
                                        <IonIcon onClick={() => {takePicture()}} className="cameraIcon" icon={camera} ></IonIcon>
                                    </>) : (<></>)
                                }
                            </div>
                           
                        ) : 

                        (
                            <></>
                        ) 
                }

                {
                    showCircleImageJustImageExists &&
                   ((showCircleImageIfExistsCircleImage && !circleImage) || showCircleImage && !image) ? 
                    (
                        <div className={"circleImage userUndefined" + (type == 'simple' ? " circleSimple" : " circleComplex")}
                             onClick={() => type == 'simple' ? setSidePanelVisible(true) : ""}
                        >
                            <IonIcon className="userUndefinedIcon" icon={person} ></IonIcon>

                                {
                                    showButtonChangeImage ? (<>
                                        <IonIcon onClick={() => {takePicture()}} className="cameraIcon" icon={camera} ></IonIcon>
                                    </>) : (<></>)
                                }
                        </div>
                    ) :

                    (
                        <></>
                    )
                }
                
            </header>

            <SidePanelComponent
                isVisible={isSidePanelVisible}
                onClose={() => setSidePanelVisible(false)}
            />
        </>
    )
}

export default HeaderComponent