import BaseEntity from "../base.entity";
import selectInputItens from "../Interfaces/selectInput";
import Member from "../User/member.entity";

export default class Role extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;
  memberList: Member[] | undefined;

  getDisplayName(): string | undefined {
    return this.name
  }
}