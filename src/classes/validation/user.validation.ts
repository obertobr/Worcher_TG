import AbstractValidation from "./abstract.validation";
import User from "../../../Models/User/user.entity"

export default class UserValidation extends AbstractValidation {

    validate(user: User, confirmPassword? : string){

        this.addErrorMessage(this.validateName(user.name))
        this.addErrorMessage(this.validateCpf(user.cpf))
        this.addErrorMessage(this.validateDateOfBirth(user.dateOfBirth))
        this.addErrorMessage(this.validateEmail(user.account?.email))
        this.addErrorMessage(this.validatePassword(user.account?.password))

        let confirmPasswordMessageError : string | null = null;

        confirmPasswordMessageError = this.validateConfirmPassword(confirmPassword)
        this.addErrorMessage(confirmPasswordMessageError)
        

        if(confirmPasswordMessageError){
            this.addErrorMessage(this.validateEqualsPassword(user.account?.password,confirmPassword))
        }
        
    }

    validateName(name: string | undefined): string | null{
        if(!name) return "O nome deve ser prenchido!"

        if(name.length < 5) return "O nome deve ser maior que 5 caracteres"
        
        return null;
    }

    validateCpf(cpf: string | undefined): string | null {
        if (!cpf) return "O CPF deve ser preenchido!";

        if(cpf.length != 14) return "O cpf deve possuir 11 caracteres!"
        return null;
    }

    validateDateOfBirth(dateOfBirth: Date | undefined): string | null {
        if (!dateOfBirth) return "A data de nascimento deve ser preenchida!";
        return null;
    }

    validateEmail(email: string | undefined): string | null {
        if (!email) return "O e-mail deve ser preenchido!";

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)) return "Email inválido!"

        return null;
    }

    validatePassword(password: string | undefined): string | null {
        if (!password) return "A senha deve ser preenchida!";

        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!regex.test(password)) 
            return "A senha deve possuir pelo menos 8 caracteres, letras maisculas e minusculas e um caracter númerico!"

        return null;
    }

    validateConfirmPassword(confirmPassword: string | undefined): string | null {
        if (!confirmPassword) return "A senha de confirmação deve ser preenchida!";
         
        return null;
    }

    validateEqualsPassword(password: string | undefined, passwordConfirm: string | undefined): string | null{
        if(password === passwordConfirm) return null;

        return "As senhas preenchidas devem ser iguais!";
    }
    

}