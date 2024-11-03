import CustomFunction from "./custom.function";
import LocalStorageThemeUtils from "../../../Utils/LocalStorage/local.storage.theme.utils"
import DateUtil from "../../../Utils/DateUtil";
import { ThemeManager } from "../../components/themeManager/theme.manager";

const localStorageThemeUtils: LocalStorageThemeUtils = new LocalStorageThemeUtils();

const functions: CustomFunction[] = [
    // Exemplo para usar, passar uma função e dentro do vetor os parametros
    new CustomFunction((e: string) => {console.warn(e)}, ["-- Aplication init: " + DateUtil.formatFullDateTime(new Date())]), 
    new CustomFunction(localStorageThemeUtils.setThemeLightIfNotExistisValueInLocalStorage, []),
    new CustomFunction(ThemeManager.setThemeDeafultInLocalStorage, [])
    
]

export default functions