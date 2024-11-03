import { ReactNode } from "react";
import "./headerComponent.css"
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";

type TextFieldTypes = 'simple' | 'complex';

interface HeaderComponentPropsInterface{
    type?: TextFieldTypes;
    backgroungImage?: string;
    circleImage?: string;
    height?: number;
    showCircleImage?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentPropsInterface> = ({
    type = 'simple',
    backgroungImage,
    circleImage,
    showCircleImage = true,
    height = type == 'simple' ? 70 : 140,
  }) => {

    const history = useHistory()

    const arrowBackClicked = () => {
        RouterUtil.returnOfLastPage(history)
    }

    return(
        <>
            <header className="header" style={{ height: `${height}px`}}>

                {
                    backgroungImage ? (<div className="imageBackground">
                        <img src={backgroungImage} alt="background" />
                    </div>) : (<></>)
                }

                

                <IonIcon icon={arrowBack} className="back-arrow-icon" onClick={arrowBackClicked} />

                {
                    showCircleImage ? 
                    (<img className={"circleImage" + (type == 'simple' ? " circleSimple" : " circleComplex")} src={circleImage}/>) : (<></>)
                }

                
            </header>
        </>
    )
}

export default HeaderComponent