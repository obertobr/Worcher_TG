import React, { useState } from "react";
import "./sidePanel.css";
import LocalStorageLoginUtils from "../../../../../Utils/LocalStorage/local.storage.login.utils";
import RouterUtil from "../../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

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
                {/* Colocar imagem aqui do perfil do parceiro */}
                </div>

              <div className="accountSideBarContent">
                <h3 className="nameSideBar">{localStorageLogin.getAccount()?.user?.name}</h3>
                <p>{localStorageLogin.getAccount()?.email}</p>
              </div>
            </div>

            <div className="side-panel-options">
              <p onClick={() => RouterUtil.goToPage(history,"profile")}>Perfil</p>
              <p onClick={() => RouterUtil.goToPage(history,"config")}>Configuração</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidePanelComponent;
