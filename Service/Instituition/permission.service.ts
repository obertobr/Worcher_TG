import Permission from "../../Models/Instituition/permission.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class PermissionService extends AbstractCrudService<Permission> {
  constructor() {
    super("permission",Permission);
  }
}