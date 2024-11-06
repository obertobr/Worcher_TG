import LocalStorageUtils from "./local.storage.utils";

export default class LocalStorageInstituionUtils extends LocalStorageUtils<number | null> {

    constructor(){
        super("INSTITUION_ID")
    }
    
    public getId(): number | null{
       return this.getItem();
    }

    public setId(id: number | null){
        this.setItem(id)
    }
}