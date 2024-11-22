import BaseEntity from "../base.entity";
import DigitalFile from "../DigitalFile/digitalFile.entity";
import Account from "./account.entity";
import Config from "./config.entity";
import Member from "./member.entity";

export default class User extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  cpf: string | undefined;
  dateOfBirth: Date | undefined;

  config: Config | undefined;
  account: Account | undefined;
  memberList: Member[] | undefined;
  image: DigitalFile | undefined;
}