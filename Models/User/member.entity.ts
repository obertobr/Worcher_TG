import BaseEntity from "../base.entity";
import Role from "../Instituition/role.entity";
import User from "./user.entity";

export default class Member extends BaseEntity {
  id: number | undefined;
  user: User | undefined;
  role: Role | undefined;

  createdEventList: Event[] | undefined;
  particepatedEventList: Event[] | undefined;
}