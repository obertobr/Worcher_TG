export default class CustomFunction {

    private _func: Function;

    private _params: any[];

    get func(){
        return this._func
    }

    set func(func: Function){
        this._func = func
    }

    get params(){
        return this._params
    }

    set params(params: any[]){
        this._params = params
    }


    constructor( func: Function, params: any[]){
        this._func = func
        this._params = params
    }


    execute(){
        if(this.func){
            this.func(...this.params)
        }
    }
}