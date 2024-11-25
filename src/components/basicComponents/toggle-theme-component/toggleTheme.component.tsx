import { useState } from "react";
import LocalStorageThemeUtils from "../../../../Utils/LocalStorage/local.storage.theme.utils";
import { ThemeEnum } from "../../../../Utils/LocalStorage/theme.enum";

import { ThemeManager } from "../../themeManager/theme.manager";
import './toggleThemeComponent.css';

const ToggleThemeComponent: React.FC<{}> = () => {
  const localStorageThemeUtils = new LocalStorageThemeUtils();
  const [currentTheme, setCurrentTheme] = useState(localStorageThemeUtils.getItem());
    
  const toggleTheme = () => {
    
    if(localStorageThemeUtils.getTheme() == ThemeEnum.LIGHT){
      ThemeManager.setDark()
    }else{
      ThemeManager.setLight()
    }

    localStorageThemeUtils.changeTheme()
    setCurrentTheme(currentTheme == ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK)
  }
    
  return (
    <>
    <div className="theme-switch">
      <h2>Mude o Tema do aplicativo</h2>
      <button onClick={toggleTheme} className="theme-button">
        { currentTheme == ThemeEnum.DARK ? (
          <span role="img" aria-label="lua" className="icon">
            🌙
          </span>
        ) : (
          <span role="img" aria-label="sol" className="icon">
            ☀️
          </span>
        )}
      </button>
      <p className="textTogleTheme">O tema atual está {currentTheme == ThemeEnum.DARK ? "escuro" : "claro"}</p>
    </div>
    </>
  )
}

export default ToggleThemeComponent;