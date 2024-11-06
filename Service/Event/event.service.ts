import Event from "../../Models/Event/event.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";

export default class EventService extends AbstractFormDataCrud<Event> {
  constructor() {
    super("event",Event)
  }
}