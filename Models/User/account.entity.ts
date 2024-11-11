import BaseEntity from "../base.entity";
import User from "./user.entity";

export default class Account extends BaseEntity {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;

  user: User | undefined;
}