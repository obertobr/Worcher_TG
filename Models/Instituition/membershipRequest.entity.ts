import BaseEntity from "../base.entity";
import User from "../User/user.entity";
import Institution from "./institution.entity";

export default class MembershipRequest extends BaseEntity {
  id: number | undefined;

  user: User | undefined;
  institution: Institution | undefined;
}