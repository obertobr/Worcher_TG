import BaseEntity from "../base.entity";
import City from "./city.entity";

export default class Address extends BaseEntity {
  id: number | undefined;
  neighborhood: string | undefined;
  street: string | undefined;
  number: number | undefined;
  cep: string | undefined;
  
  city: City;
}