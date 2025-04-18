import BaseEntity from "../base.entity";
import selectInputItens from "../Interfaces/selectInput";
import Member from "../User/member.entity";
import Institution from "./institution.entity";
import Permission from "./permission.entity"

export default class Role extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;
  memberList: Member[] | undefined;
  permission: Permission[] | undefined

  institution: Institution | undefined

  getDisplayName(): string | undefined {
    return this.name
  }
}