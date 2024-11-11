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
    route: string

    constructor(sequencial: number, name: string, icon: string, active: boolean, visible: boolean,route: string){
        this.sequencial = sequencial
        this.name = name
        this.icon = icon
        this.active = active
        this.visible = visible
        this.route = route
    }
}

interface FooterComponentPropsInterface{

}

const FooterComponent: React.FC<FooterComponentPropsInterface> = ({

  }) => {

    const history = useHistory()
    const localStorage = new LocalStorageUtils<NavFooter[]>("NAV_FOOTER");

    useEffect(() => {
        const navItensLocalStorage = localStorage.getItem()
        
        if(navItensLocalStorage && navItensLocalStorage.length > 0){
            setNavItens(navItensLocalStorage)
        }
    }, [])

    const [navItens, setNavItens] = useState<NavFooter[]>([
        new NavFooter(1,"Feed",documentTextOutline,true, true,"home"),
        new NavFooter(2,"Eventos",calendarNumberOutline,false, true,"home"),
        new NavFooter(3,"Agenda",calendarOutline,false, true,"home"),       
        new NavFooter(4,"Instituições",calendarNumberOutline,false, true,"home")
    ])
    
    const onClickNavItem = (sequencial: number, route: string) => {
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

       RouterUtil.goToPage(history,route)
    }

    return(
        <>
           <footer className="footer-content">

            {
                navItens.map( (item,index) => {
                    return (
                    <div key={index} 
                         className={"nav-footer" + ( item.active? " styleOn" : " styleOff" )}
                         onClick={() => onClickNavItem(item.sequencial, item.route)}
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