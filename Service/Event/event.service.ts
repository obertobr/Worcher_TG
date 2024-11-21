import axios from "axios";
import Event from "../../Models/Event/event.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";

export default class EventService extends AbstractFormDataCrud<Event> {
  constructor() {
    super("event",Event)
  }

  async getEventsByInstitutionId(idInstitution: number, idEventCategory: number | null): Promise<Event[] | any> {
    try {
      const response = await axios.get(`${this.urlApi}getEventByInstitutionAndCategory/${idInstitution}/${idEventCategory}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }
}