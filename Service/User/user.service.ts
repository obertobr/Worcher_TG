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
            return this.convertToEntity(response.data.data);
        } catch (error: any) {
            return error.response.data.errors;
        }
    }

}