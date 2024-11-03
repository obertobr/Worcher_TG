import variablesLight from './variables.theme.light'
import variablesDark from './variables.theme.dark'
import LocalStorageThemeUtils from '../../../Utils/LocalStorage/local.storage.theme.utils';
import { ThemeEnum } from '../../../Utils/LocalStorage/theme.enum';

export class ThemeManager {

    static setLight(){
        this.changeTheme(variablesLight);
    }

    static setDark(){
        this.changeTheme(variablesDark);
    }

    public static setThemeDeafultInLocalStorage = () => {
        const localStorageThemeUtils = new LocalStorageThemeUtils()

        if(localStorageThemeUtils.getTheme() == ThemeEnum.DARK){
            this.setDark()
        }else{
            this.setLight()
        }
    }

    private static changeTheme(variables: any){
       const attributes = Object.keys(variables)

        attributes.forEach( attribute => {
            document.documentElement.style.setProperty(`--${attribute}`,variables[attribute])
        } )

    }

}