import Address from "../../Models/Address/address.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class AddressService extends AbstractCrudService<Address> {
  constructor() {
    super("address");
  }
}