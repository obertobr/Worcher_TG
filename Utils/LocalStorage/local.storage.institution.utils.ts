import LocalStorageUtils from "./local.storage.utils";

export default class LocalStorageInstituionUtils extends LocalStorageUtils<number | undefined> {

    constructor(){
        super("INSTITUION_ID")
    }
    
    public getId(): number | undefined{
       return this.getItem();
    }

    public setId(id: number | undefined){
        this.setItem(id)
    }
}