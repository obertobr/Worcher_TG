import Account from "../../Models/User/account.entity"
import LocalStorageUtils from "./local.storage.utils"

export default class LocalStorageLoginUtils {

    private localStorageUtilsRemberData = new LocalStorageUtils<boolean>("REMEMBER_DATA")
    private localStorageUtilsData = new LocalStorageUtils<Account | null>("REMEMBER_EMAIL_PASSWORD")
    private localStorageUtilsIdUser = new LocalStorageUtils<number | null>("USER_ID")

    getRememberData = (): boolean => {
        return this.localStorageUtilsRemberData.getItem() || false
    }

    setRememberData = (remember: boolean) => {
        this.localStorageUtilsRemberData.setItem(remember)
    }

    getAccount = (): Account | null => {
        return this.localStorageUtilsData.getItem() 
    }

    setAccount = (account: Account) => {
        this.localStorageUtilsData.setItem(account)
    }

    getIdUser = (): number | null => {
        return this.localStorageUtilsIdUser.getItem() 
    }

    setIdUser = (idUser: number | null) => {
        this.localStorageUtilsIdUser.setItem(idUser)
    }

}