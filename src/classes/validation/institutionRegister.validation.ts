import City from "../../../Models/Address/city.entity";
import State from "../../../Models/Address/state.entity";
import AbstractValidation from "./abstract.validation";

export default class InstitutionRegisterValidation extends AbstractValidation {

    validate(name: string, state: State | undefined, city: City | undefined, neighborhood: string, street: string, number: string, cep: string){

        this.addErrorMessage(this.validateName(name))
        this.addErrorMessage(this.validateState(state))
        this.addErrorMessage(this.validateCity(city))
        this.addErrorMessage(this.validateNeighborhood(neighborhood))
        this.addErrorMessage(this.validateStreet(street))
        this.addErrorMessage(this.validateNumber(number))
        this.addErrorMessage(this.validateCEP(cep))
    }

    validateName(name: string | undefined): string | null{
        if(!name) return "O Nome da instituição deve ser prenchido!"
        
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

    validateCEP(cep: string | undefined): string | null {
        if(!cep) return "O CEP deve ser prenchido!";

        if(cep.length != 9) return "Prencha todo os numeros do CEP!";

        return null
    }

    

}