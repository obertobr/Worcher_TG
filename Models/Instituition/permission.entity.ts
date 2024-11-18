import BaseEntity from "../base.entity";
import Role from "./role.entity";

export default class Permission extends BaseEntity {
  id: number | undefined;
  name: string | undefined;

  roleList: Role[] = [];
}