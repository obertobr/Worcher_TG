import Config from "../../Models/User/config.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class ConfigService extends AbstractCrudService<Config> {

  constructor() {
    super("config", Config)
  }

}