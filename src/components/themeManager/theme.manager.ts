import variablesLight from './variables.theme.light'
import variablesDark from './variables.theme.dark'

export class ThemeManager {

    static setLight(){
        this.changeTheme(variablesLight);
    }

    static setDark(){
        this.changeTheme(variablesDark);
    }

    private static changeTheme(variables: any){
       const attributes = Object.keys(variables)

        attributes.forEach( attribute => {
            document.documentElement.style.setProperty(`--${attribute}`,variables[attribute])
        } )

    }

}