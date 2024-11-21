import LocalStorageUtils from "./local.storage.utils";

export default class LocalStorageEventViewUtils extends LocalStorageUtils<number | null> {

    constructor(){
        super("EVENT_VIEW_ID")
    }
    
    public getId(): number | null | undefined{
       return this.getItem();
    }

    public setId(id: number | null){
        this.setItem(id)
    }
}