import BaseEntity from "../base.entity";
import selectInputItens from "../Interfaces/selectInput";
import City from "./city.entity";

export default class State extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;
  uf: string | undefined;

  citiesList: City[] = [];

  public getDisplayName() {
    return this.name;
  }
}