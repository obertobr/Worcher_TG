export default class ImageUtils {

    static getImageByUrl(url: string | undefined): string {
        return url ? `http://localhost:3000/uploads/${url}` : ""
    }

}