import ConverterUtils from "../Converter/converter.utils";

export default class LocalStorageUtils<T> {

    private key: string;

    constructor(key: string){
        this.key = ConverterUtils.convertStringToBase64(key)
    }

    getItem(): T | null{
        const itemNotSerialized = localStorage.getItem(this.key)

        if(itemNotSerialized != null){
            try {
                const itemDecoded = ConverterUtils.convertBase64ToString(itemNotSerialized)
                return JSON.parse(itemDecoded) as T
            } catch(error){
                console.log("Erro ao converter item: ",error)
                return null
            }
        }

        return null
    }

    setItem(item: T): void {
        try {
            const itemSerialized = ConverterUtils.parseToString(item)
            const itemBase64 = ConverterUtils.convertStringToBase64(itemSerialized)
            localStorage.setItem(this.key, itemBase64)
        } catch (error) {
            console.error('Erro ao serializar e armazenar o item no localStorage:', error)
        }
    }
    

}