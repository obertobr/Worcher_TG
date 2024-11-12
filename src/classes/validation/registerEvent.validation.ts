import City from "../../../Models/Address/city.entity";
import State from "../../../Models/Address/state.entity";
import EventCategory from "../../../Models/Event/event.category.entity";
import AbstractValidation from "./abstract.validation";

export default class RegisterEventValidation extends AbstractValidation {

    validate(name: string, date: Date | undefined, time: Date | undefined, state: State | undefined, city: City | undefined, neighborhood: string, street: string, number: string, cep: string, description: string, image: File | undefined, category: EventCategory | undefined){

        this.addErrorMessage(this.validateName(name))
        this.addErrorMessage(this.validateDate(date))
        this.addErrorMessage(this.validateTime(time))
        this.addErrorMessage(this.validateState(state))
        this.addErrorMessage(this.validateCity(city))
        this.addErrorMessage(this.validateNeighborhood(neighborhood))
        this.addErrorMessage(this.validateStreet(street))
        this.addErrorMessage(this.validateNumber(number))
        this.addErrorMessage(this.validateDescription(description))
        this.addErrorMessage(this.validateImage(image))
        this.addErrorMessage(this.validateCEP(cep))
        this.addErrorMessage(this.validateCategory(category))
    }

    validateName(name: string | undefined): string | null{
        if(!name) return "O Nome do evento deve ser prenchido!"
        
        return null;
    }

    validateDate(date: Date | undefined): string | null{
        if(!date) return "A data do evento deve ser prenchida!"
        
        return null;
    }
    validateTime(time: Date | undefined): string | null{
        if(!time) return "O horário do evento deve ser prenchida!"
        
        return null;
    }

    validateState(state: State | undefined): string | null{
        if(!state) return "Selecione um estado!"
        
        return null;
    }

    validateCity(city: City | undefined): string | null{
        if(!city) return "Selecione uma cidade!"
        
        return null;
    }

    validateNeighborhood(neighborhood: string | undefined): string | null{
        if(!neighborhood) return "O bairro deve ser prenchido!"
        
        return null;
    }

    validateStreet(street: string | undefined): string | null{
        if(!street) return "A rua deve ser prenchido!"
        
        return null;
    }

    validateNumber(number: string | undefined): string | null{
        if(!number) return "O Número deve ser prenchido!"
        
        return null;
    }

    validateDescription(description: string | undefined): string | null{
        if(!description) return "A descrição deve ser prenchido!"
        
        return null;
    }

    validateImage(image: File | undefined): string | null{
        if(!image) return "O evento deve ter uma imagem!"
        
        return null;
    }

    validateCEP(cep: string | undefined): string | null {
        if(!cep) return "O CEP deve ser prenchido!";

        if(cep.length != 9) return "Prencha todo os numeros do CEP!";

        return null
    }

    validateCategory(category: EventCategory | undefined): string | null {
        if(!category) return "A categoria do evento deve ser prenchida!";

        return null
    }

    
    

}