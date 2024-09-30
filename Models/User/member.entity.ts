import Role from "../Instituition/role.entity";
import User from "./user.entity";

export default class Member {
  id: number;
  user: User;
  role: Role;

  createdEventList: Event[];
  particepatedEventList: Event[];
}