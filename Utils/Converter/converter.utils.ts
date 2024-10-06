export default class ConverterUtils {

    static parseToString(element: any): string{
        return JSON.stringify(element)
    }

    static convertStringToBase64(elementString: string){
        return btoa(elementString)
    }

    static convertBase64ToString(base64String: string): string {
        return atob(base64String);
    }
}