import Member from "../User/member.entity";

export default class Role {
  id: number;
  name: string;
  memberList: Member[];
}