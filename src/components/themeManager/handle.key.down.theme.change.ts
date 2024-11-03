import LocalStorageThemeUtils from "../../../Utils/LocalStorage/local.storage.theme.utils";
import { ThemeEnum } from "../../../Utils/LocalStorage/theme.enum";
import { ThemeManager } from "./theme.manager";

const handleKeyDown: any = (event: KeyboardEvent) => {

    if ((event.ctrlKey || event.metaKey) && event.key === '1') {
      event.preventDefault(); 
      
      const localStorageThemeUtils = new LocalStorageThemeUtils();

      if(localStorageThemeUtils.getTheme() == ThemeEnum.LIGHT){
        ThemeManager.setDark()
      }else{
        ThemeManager.setLight()
      }
      
      localStorageThemeUtils.changeTheme();
    }
  }


export default handleKeyDown;