import LocalStorageUtils from "./local.storage.utils"

export default class LocalStorageMemberUtils extends LocalStorageUtils<number | undefined> {

    constructor(){
        super("MEMBER_ID")
    }
}