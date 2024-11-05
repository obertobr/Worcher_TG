import BaseEntity from "../base.entity";
import City from "./city.entity";

export default class Address extends BaseEntity {
  id: number | undefined;
  neighborhood: string | undefined;
  street: string | undefined;
  number: string | undefined;
  cep: string | undefined;
  
  city: City | undefined;

  constructor(neighborhood: string | undefined,
              street: string | undefined,
              number: string | undefined, 
              cep: string | undefined, 
              city: City | undefined
            ){
              
    super();

    this.neighborhood = neighborhood
    this.street = street
    this.number = number
    this.cep = cep
    this.city = city
  }
}