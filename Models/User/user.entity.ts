import Account from "./account.entity";
import Config from "./config.entity";
import Member from "./member.entity";

export default class User {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: Date;

  config: Config;
  account: Account;
  memberList: Member[];
}