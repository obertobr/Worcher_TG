import Account from "../../Models/User/account.entity"
import LocalStorageUtils from "./local.storage.utils"

export default class LocalStorageLoginUtils {

    private localStorageUtilsRemberData = new LocalStorageUtils<boolean>("REMEMBER_DATA")
    private localStorageUtilsData = new LocalStorageUtils<Account>("REMEMBER_EMAIL_PASSWORD")

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

}