import BaseEntity from "../base.entity";
import Institution from "../Instituition/institution.entity"
import Event from "../Event/event.entity"

export default class DigitalFile extends BaseEntity {
  id: number | undefined;
  url: string | undefined;

  institution: Institution;
  event: Event;

  constructor(url: string) {
    super()

    this.url = url
  }
}