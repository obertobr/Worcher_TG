import AbstractValidation from "./abstract.validation";
import EventCategory from  "../../../Models/Event/event.category.entity"

export default class EventCategoryValidation extends AbstractValidation {

    validate(eventCategory: EventCategory){

        this.addErrorMessage(this.validateName(eventCategory.name))
        this.addErrorMessage(this.validateColor(eventCategory.color))
    }

    validateName(name: string | undefined): string | null{
        if(!name) return "O nome deve ser prenchido!"
        
        return null;
    }

    validateColor(color: string | undefined): string | null {
        if (!color) return "A cor deve ser preenchida!";

        return null;
    }

    

}