import AbstractValidation from "./abstract.validation";

export default class LoginValidation extends AbstractValidation {

    validate(email: string, password: string){

        this.addErrorMessage(this.validateEmail(email))
        this.addErrorMessage(this.validatePassword(password))
    }

    validateEmail(email: string | undefined): string | null{
        if(!email) return "O Email deve ser prenchido!"
        
        return null;
    }

    validatePassword(password: string | undefined): string | null {
        if (!password) return "A senha deve ser preenchida!";

        return null;
    }

    

}