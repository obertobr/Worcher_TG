import LocalStorageUtils from "./local.storage.utils";
import { ThemeEnum } from "./theme.enum";

export default class LocalStorageThemeUtils extends LocalStorageUtils<ThemeEnum> {

    constructor(){
        super("THEME_VARIABLE")
    }

    public changeTheme(){
        if(this.getTheme() == ThemeEnum.DARK){
            this.setItem(ThemeEnum.LIGHT)
        }else{
            this.setItem(ThemeEnum.DARK)
        }
    }

    public getTheme(): ThemeEnum | null{
       return this.getItem();
    }

    public setThemeLightIfNotExistisValueInLocalStorage = () => {
        if(!this.getItem()){
            this.setItem(ThemeEnum.LIGHT)
        }
    }
}