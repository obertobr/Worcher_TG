import User from "../../Models/User/user.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class UserService extends AbstractCrudService<User>{

    constructor(){
        super("user")
    }

}