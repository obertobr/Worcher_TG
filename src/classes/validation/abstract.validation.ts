export default abstract class AbstractValidation {

    private _errors: string[] = [];

    addErrorMessage(error: string | string[] | null | undefined){
        if(!error) return

        if(!Array.isArray(error)){
            this._errors.push(error)
        }else{
            error.forEach(error => {
                this._errors.push(error)
            })
        }
    }

    clearErrors(){
        this._errors = []
    }

    get errors(){
        return this._errors
    }

    hasErrors(): boolean{
        return this._errors && this._errors.length > 0;
    }
}