import BaseEntity from "../base.entity";
import selectInputItens from "../Interfaces/selectInput";
import Address from "./address.entity";

export default class City extends BaseEntity implements selectInputItens {
  
  id: number | undefined;
  name: string | undefined;
  state: string | undefined;

  addressList: Address[] = [];

  getDisplayName = (): string | undefined => {
    return this.name
  }
}