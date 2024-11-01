import Event from "../../Models/Event/event.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class EventService extends AbstractCrudService<Event> {
  constructor() {
    super("event",Event)
  }
}