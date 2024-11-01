import City from "../../Models/Address/city.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class CityService extends AbstractCrudService<City>{
  constructor() {
    super("city",City);
  }
}