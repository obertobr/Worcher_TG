import User from "./user.entity";

export default class Config {
  id: number;
  recieveEmails: boolean;
  recieveNotifications: boolean;

  user: User;
}