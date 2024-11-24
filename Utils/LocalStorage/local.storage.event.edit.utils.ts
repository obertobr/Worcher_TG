import LocalStorageUtils from "./local.storage.utils";

export default class LocalStorageEventEditUtils extends LocalStorageUtils<number | null> {

    constructor(){
        super("EVENT_EDIT_ID")
    }
    
    public getId(): number | null | undefined{
       return this.getItem();
    }

    public setId(id: number | null){
        this.setItem(id)
    }
}