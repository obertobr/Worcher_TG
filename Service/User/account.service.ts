import Account from "../../Models/User/account.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class AccountService extends AbstractCrudService<Account> {

  constructor() {
    super("account", Account)
  }

}