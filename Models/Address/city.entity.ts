import BaseEntity from "../base.entity";
import Address from "./address.entity";

export default class City extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  state: string | undefined;

  addressList: Address[] = [];
}