import { ReactNode } from "react";
import "./headerComponent.css"
import { IonIcon } from "@ionic/react";
import { arrowBack, homeSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { NavFooter } from "../footer-component/footer.component";
import LocalStorageUtils from "../../../../../Utils/LocalStorage/local.storage.utils";

type TextFieldTypes = 'simple' | 'complex';

interface HeaderComponentPropsInterface{
    type?: TextFieldTypes;
    backgroungImage?: string;
    circleImage?: string;
    height?: number;
    showCircleImage?: boolean;
    showArrowBack?: boolean;
    showHome?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentPropsInterface> = ({
    type = 'simple',
    backgroungImage,
    circleImage,
    showCircleImage = true,
    height = type == 'simple' ? 70 : 140,
    showArrowBack = true,
    showHome = false,
  }) => {

    const history = useHistory()

    const arrowBackClicked = () => {
        RouterUtil.returnOfLastPage(history)
    }

    const homeClicked = () => {
        const localStorage = new LocalStorageUtils<NavFooter[]>("NAV_FOOTER");
        localStorage.setItem([])
        
        RouterUtil.goToPage(history,"my-institution")
    }

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
                    showCircleImage ? 
                    (<img className={"circleImage" + (type == 'simple' ? " circleSimple" : " circleComplex")} src={circleImage}/>) : (<></>)
                }

                
            </header>
        </>
    )
}

export default HeaderComponent