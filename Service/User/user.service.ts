import User from "../../Models/User/user.entity";
import AbstractService from "../abstract.service";

export default class UserService extends AbstractService<User>{

    constructor(){
        super("user")
    }

}