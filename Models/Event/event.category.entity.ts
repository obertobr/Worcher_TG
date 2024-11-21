import BaseEntity from "../base.entity";
import Institution from "../Instituition/institution.entity";
import selectInputItens from "../Interfaces/selectInput";
import Event from "./event.entity";

export default class EventCategory extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;

  institution: Institution | undefined;

  eventList: Event[] | undefined;

  getDisplayName(): string | undefined {
    return this.name;
  }
}