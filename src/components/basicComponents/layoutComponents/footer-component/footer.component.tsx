import { useEffect, useState } from "react";
import "./footerComponent.css"

import { useHistory } from "react-router";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { IonIcon } from "@ionic/react";
import  { calendarOutline, documentTextOutline, calendarNumberOutline}  from "ionicons/icons";
import LocalStorageUtils from "../../../../../Utils/LocalStorage/local.storage.utils";

class NavFooter {
    sequencial: number
    name: string
    icon: string
    active: boolean
    visible: boolean

    constructor(sequencial: number, name: string, icon: string, active: boolean, visible: boolean){
        this.sequencial = sequencial
        this.name = name
        this.icon = icon
        this.active = active
        this.visible = visible
    }
}

interface FooterComponentPropsInterface{

}

const FooterComponent: React.FC<FooterComponentPropsInterface> = ({

  }) => {

    const history = useHistory()
    const localStorage = new LocalStorageUtils<NavFooter[]>("");

    useEffect(() => {
        const navItensLocalStorage = localStorage.getItem()
        
        if(navItensLocalStorage && navItensLocalStorage.length > 0){
            setNavItens(navItensLocalStorage)
        }
    }, [])

    const [navItens, setNavItens] = useState<NavFooter[]>([
       new NavFooter(1,"Agenda",calendarOutline,false, true),
       new NavFooter(2,"Feed",documentTextOutline,true, true),
       new NavFooter(3,"Meus Eventos",calendarNumberOutline,false, true)
    ])
    
    const onClickNavItem = (sequencial: number) => {
       const index = navItens.findIndex( (i) => i.sequencial == sequencial)
       const navItensCopy = [...navItens]

       for (let index = 0; index < navItensCopy.length; index++) {
            navItensCopy[index].active = false
       }

       if(index != -1){
            navItensCopy[index].active = true
       }

       localStorage.setItem(navItensCopy)
       setNavItens(navItensCopy)
    }

    return(
        <>
           <footer className="footer-content">

            {
                navItens.map( (item,index) => {
                    return (
                    <div key={index} 
                         className={"nav-footer" + ( item.active? " styleOn" : " styleOff" )}
                         onClick={() => onClickNavItem(item.sequencial)}
                    >
                        <IonIcon className="icon-footer" icon={item.icon}></IonIcon>
                        <p>{item.name}</p>
                    </div>
                    )
                } )
            }        
           </footer>
        </>
    )
}

export default FooterComponent