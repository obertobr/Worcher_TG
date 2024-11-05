import Institution from "../../Models/Instituition/institution.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";

export default class InstitutionService extends AbstractFormDataCrud<Institution>{

    constructor(){
        super("institution",Institution)
    }

}