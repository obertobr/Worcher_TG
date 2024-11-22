import Account from "../../Models/User/account.entity"
import LocalStorageUtils from "./local.storage.utils"

export default class LocalStorageLoginUtils {

    private localStorageUtilsRemberData = new LocalStorageUtils<boolean>("REMEMBER_DATA")
    private localStorageUtilsData = new LocalStorageUtils<Account | undefined>("REMEMBER_EMAIL_PASSWORD")
    private localStorageUtilsIdUser = new LocalStorageUtils<number | undefined>("USER_ID")
    private localStorageUrl = new LocalStorageUtils<string | undefined>("IMAGE_URL_USER")

    getRememberData = (): boolean => {
        return this.localStorageUtilsRemberData.getItem() || false
    }

    setRememberData = (remember: boolean) => {
        this.localStorageUtilsRemberData.setItem(remember)
    }

    getAccount = (): Account | undefined | null => {
        return this.localStorageUtilsData.getItem() 
    }

    setAccount = (account: Account) => {
        this.localStorageUtilsData.setItem(account)
    }

    getIdUser = (): number | undefined | null => {
        return this.localStorageUtilsIdUser.getItem() 
    }

    setIdUser = (idUser: number | undefined) => {
        this.localStorageUtilsIdUser.setItem(idUser)
    }

    getUrlImage = () : string | undefined | null => {
        return this.localStorageUrl.getItem()
    }

    setUrlImage = (urlImage: string | undefined | null) => {
        return this.localStorageUrl.setItem(urlImage)
    }

}