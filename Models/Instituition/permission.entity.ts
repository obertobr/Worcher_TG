import BaseEntity from "../base.entity";
import selectInputItens from "../Interfaces/selectInput";
import Role from "./role.entity";

export default class Permission extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;

  roleList: Role[] | undefined;

  getDisplayName(): string | undefined {
    return this.name
  }
}