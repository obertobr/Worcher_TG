import CustomFunction from "./custom.function";
import functions from "./default.functions.load.aplication";

export default class LoadAplicationManager {

    private functionsCalledAtTheStartApplication: CustomFunction[] = [];

    // Função que é chama no inicio de carregamento do sistema
    init(){
        if(this.functionsCalledAtTheStartApplication.length < 1){
            this.setDefaultFunctions()
        }

        this.functionsCalledAtTheStartApplication.forEach( customFunction => {
            customFunction.execute()
        })
    }

    // Função que carrega as funções default de init
    setDefaultFunctions(){
        this.setFunctions(functions)
    }

    // Caso queira customizar o comportamento deafult, chamar essa função
    setFunctions(functions: CustomFunction[]){
        this.functionsCalledAtTheStartApplication = functions;
    }

}