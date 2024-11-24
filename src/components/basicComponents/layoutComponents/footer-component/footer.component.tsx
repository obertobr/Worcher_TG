import { useEffect, useState } from "react";
import "./footerComponent.css"

import { useHistory } from "react-router";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { IonIcon } from "@ionic/react";
import  { calendarOutline, documentTextOutline, calendarNumberOutline, businessOutline}  from "ionicons/icons";
import LocalStorageUtils from "../../../../../Utils/LocalStorage/local.storage.utils";
import LocalStorageInstituionUtils from "../../../../../Utils/LocalStorage/local.storage.institution.utils";

export class NavFooter {
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
    isWithinTheInstitution?: boolean
}

const FooterComponent: React.FC<FooterComponentPropsInterface> = ({
    isWithinTheInstitution = false
  }) => {

    const history = useHistory()
    
    const localStorage = new LocalStorageUtils<NavFooter[]>("NAV_FOOTER");
    const localStorageTypeFooter = new LocalStorageUtils<boolean>("NAV_FOOTER_TYPE");



    const [navItens, setNavItens] = useState<NavFooter[]>([])

    const navItensInstitution = [
        new NavFooter(1,"Feed",documentTextOutline,true, true,"feed"),
        new NavFooter(2,"Agenda",calendarOutline,false, true,"schedule"),       
        new NavFooter(3,"Instituição",businessOutline,false, true, `inst-page`)
    ]
    
    const navItensBackInstitution = [
        new NavFooter(1,"Instituições",businessOutline,true, true,"my-institution"),
        new NavFooter(2,"Eventos",calendarNumberOutline,false, true,"myeventspage"),
    ]

    useEffect(() => {
        const isWithinTheInstitutionLocalStorage = localStorageTypeFooter.getItem();
    
        if (isWithinTheInstitutionLocalStorage !== isWithinTheInstitution) {
            localStorage.setItem([]);
        }
    
        localStorageTypeFooter.setItem(isWithinTheInstitution);
    
        const navItensLocalStorage = localStorage.getItem();
    
        if (!navItensLocalStorage || navItensLocalStorage.length === 0) {
            const navItensInstitutionCopy = [...navItensInstitution];
            const navItensBackInstitutionCopy = [...navItensBackInstitution];
    
            setNavItens(isWithinTheInstitution ? navItensInstitutionCopy : navItensBackInstitutionCopy);
        } else {
            setNavItens(navItensLocalStorage);
            navItensLocalStorage.forEach((i) => {
                if (i.active) {
                    RouterUtil.goToPage(history, i.route);
                }
            });
        }
    
        // Cleanup para evitar duplicações
        return () => setNavItens([]);
    }, [isWithinTheInstitution]);

    
    
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