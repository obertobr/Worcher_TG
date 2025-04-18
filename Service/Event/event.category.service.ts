import EventCategory from "../../Models/Event/event.category.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class EventCategoryService extends AbstractCrudService<EventCategory> {
  constructor() {
    super("event-category",EventCategory)
  }
}