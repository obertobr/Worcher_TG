import BaseEntity from "../base.entity";
import Institution from "../Instituition/institution.entity";
import selectInputItens from "../Interfaces/selectInput";

export default class EventCategory extends BaseEntity implements selectInputItens {
  id: number | undefined;
  name: string | undefined;
  color: string | undefined;

  institution: Institution | undefined;

  eventList: Event[] | undefined;

  getDisplayName(): string | undefined {
    return this.name;
  }
}