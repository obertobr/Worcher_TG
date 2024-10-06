import BaseEntity from "../base.entity";
import City from "./city.entity";

export default class State extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  uf: string | undefined;

  citiesList: City[];
}