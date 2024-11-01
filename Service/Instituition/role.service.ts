import Role from "../../Models/Instituition/role.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class RoleService extends AbstractCrudService<Role> {
  constructor() {
    super("role",Role);
  }
}