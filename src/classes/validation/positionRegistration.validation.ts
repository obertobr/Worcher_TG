import AbstractValidation from "./abstract.validation";

export default class PositionRegistrarionValidation extends AbstractValidation {

    validate(name: string | undefined){

        this.addErrorMessage(this.validateName(name))
        // this.addErrorMessage(this.validateColor(eventCategory.color))
    }

    validateName(name: string | undefined): string | null{
        if(!name) return "O nome deve ser prenchido!"
        
        return null;
    }

}