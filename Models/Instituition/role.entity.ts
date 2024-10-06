import BaseEntity from "../base.entity";
import Member from "../User/member.entity";

export default class Role extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  memberList: Member[] | undefined;
}