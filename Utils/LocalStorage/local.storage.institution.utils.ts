import LocalStorageUtils from "./local.storage.utils";

export default class LocalStorageInstitutionUtils extends LocalStorageUtils<number | null> {

    constructor(){
        super("INSTITUION_ID")
    }
    
    public getId(): number | null | undefined{
       return this.getItem();
    }

    public setId(id: number | null){
        this.setItem(id)
    }
}