import ConverterUtils from "../Converter/converter.utils";

export default class LocalStorageUtils<T> {

    private key: string;

    constructor(key: string){
        this.key = ConverterUtils.convertStringToBase64(key)
    }

    getItem(): T | null | undefined{
        const itemNotSerialized = localStorage.getItem(this.key)

        if(itemNotSerialized != undefined){
            try {
                const itemDecoded = ConverterUtils.convertBase64ToString(itemNotSerialized)
                return JSON.parse(itemDecoded) as T
            } catch(error){
                console.log("Erro ao converter item: ",error)
                return undefined
            }
        }

        return undefined
    }

    setItem(item: T | null): void {
        try {
            const itemSerialized = ConverterUtils.parseToString(item)
            const itemBase64 = ConverterUtils.convertStringToBase64(itemSerialized)
            localStorage.setItem(this.key, itemBase64)
        } catch (error) {
            console.error('Erro ao serializar e armazenar o item no localStorage:', error)
        }
    }
}