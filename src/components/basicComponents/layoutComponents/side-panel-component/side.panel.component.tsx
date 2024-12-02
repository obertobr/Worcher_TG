import React, { useState } from "react";
import "./sidePanel.css";
import LocalStorageLoginUtils from "../../../../../Utils/LocalStorage/local.storage.login.utils";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import { IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";
import ImageUtils from "../../../../../Utils/image/image.utils";
import LocalStorageInstitutionUtils from "../../../../../Utils/LocalStorage/local.storage.institution.utils";

interface SidePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const SidePanelComponent: React.FC<SidePanelProps> = ({ isVisible, onClose }) => {

  const localStorageLogin = new LocalStorageLoginUtils()
  const history = useHistory()

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const logOut = () => {
    localStorageLogin.setIdUser(undefined)
    const localStorageInstituionUtils = new LocalStorageInstitutionUtils()
    localStorageInstituionUtils.setId(null)
    RouterUtil.goToPage(history,"login")
  }

  return (
    <>
      {isVisible && (
        <div className="side-panel-overlay" onClick={handleClose}>
          <div
            className={`side-panel ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="side-panel-header">
              <div className="avatar">
              {
                    localStorageLogin.getAccount()?.user?.image ? 
                        (
                                <img className={"circleImageWith "} 
                                    src={ImageUtils.getImageByUrl(localStorageLogin.getAccount()?.user?.image?.url)}
                               ></img>
                        ) : 

                        (
                          <div className={"circleImage"}>
                              <IonIcon className="userUndefinedIcon" icon={person} ></IonIcon>
                         </div>
                        ) 
                }  
              </div>

              <div className="accountSideBarContent">
                <h3 className="nameSideBar">{localStorageLogin.getAccount()?.user?.name}</h3>
                <p>{localStorageLogin.getAccount()?.email}</p>
              </div>
            </div>

            <div className="side-panel-options">
              <p onClick={() => RouterUtil.goToPage(history,"profile")}>Perfil</p>
              <p onClick={() => RouterUtil.goToPage(history,"config")}>Configuração</p>
              <p onClick={() => logOut()}>Logout</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidePanelComponent;
