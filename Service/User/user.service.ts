import axios from "axios";
import User from "../../Models/User/user.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class UserService extends AbstractCrudService<User>{

    constructor(){
        super("user",User)
    }

    async login(email: string, password: string): Promise<User | null> {
        try {
            const response = await axios.post(`${this.urlApi}login`, { email, password });
            return this.convertToEntity(response.data.data) || null;
        } catch (error: any) {
            return error.response.data.errors;
        }
    }

    async recoveryPassword(email: string): Promise<{accountId: number }> {
        try {
            const response = await axios.post(`${this.urlApi}recovery_password`, { email });
            return response.data.data;
        } catch (error: any) {
            return error.response.data.errors;
        }
    }
    

    async recoveryCheck(id: number, code: number): Promise<void> {
        try {
            await axios.post(`${this.urlApi}recovery_check`, { id, code });
        } catch (error: any) {
            return error.response.data.errors;
        }
      }

      async setPhoto(data: { userID: number }, file?: File): Promise<User | undefined> {
        try {
            const formData = new FormData();
            formData.append("content", JSON.stringify(data));
            if (file) {
                formData.append("image", file);
            }
    
            const response = await axios.post(`${this.urlApi}setPhoto`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            return this.convertToEntity(response.data.data);
        } catch (error: any) {
            console.error("Error in setPhoto:", error.response?.data?.errors || error.message);
            return error.response?.data?.errors;
        }
    }  

}