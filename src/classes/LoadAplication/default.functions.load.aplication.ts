import CustomFunction from "./custom.function";
import LocalStorageThemeUtils from "../../../Utils/LocalStorage/local.storage.theme.utils"
import DateUtil from "../../../Utils/DateUtil";

const localStorageThemeUtils: LocalStorageThemeUtils = new LocalStorageThemeUtils();

const functions: CustomFunction[] = [
    // Exemplo para usar, passar uma função e dentro do vetor os parametros
    new CustomFunction((e: string) => {console.log(e)}, ["-- Load aplication init: " + DateUtil.formatFullDateTime(new Date())]), 
    new CustomFunction(localStorageThemeUtils.setThemeLightIfNotExistisValueInLocalStorage, []),
    
]

export default functions