import BaseEntity from "../base.entity";
import User from "./user.entity";

export default class Config extends BaseEntity {
  id: number | undefined;
  recieveEmails: boolean | undefined;
  recieveNotifications: boolean | undefined;

  user: User | undefined;
}