import axios from "axios";
import Event from "../../Models/Event/event.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";

export default class EventService extends AbstractFormDataCrud<Event> {
  constructor() {
    super("event",Event)
  }

  async getEventsByInstitutionId(idInstitution: number, idEventCategory: number | null, removeEventsWithDateBeforeDateNow: boolean = true): Promise<Event[] | any> {
    try {
      const response = await axios.get(`${this.urlApi}getEventByInstitutionAndCategory/${idInstitution}/${idEventCategory}/${removeEventsWithDateBeforeDateNow}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }

  async addMemberToEvent(eventId: number, memberId: number): Promise<void> {
    try {
      const response = await axios.get(`${this.urlApi}addMemberToEvent/${eventId}/${memberId}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }

  async removeMemberFromEvent(eventId: number, memberId: number): Promise<void> {
    try {
      const response = await axios.get(`${this.urlApi}removeMemberFromEvent/${eventId}/${memberId}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }

  async removeMemberFromEventByUserId(eventId: number, userId: number): Promise<void> {
    try {
      const response = await axios.get(`${this.urlApi}removeMemberFromEvent/${eventId}/${userId}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }

  async getEventsByUserId(userId: number): Promise<Event[] | any> {
    try {
      const response = await axios.get(`${this.urlApi}eventsByIdUser/${userId}`);
      return response.data.data;
    } catch (error: any) {
      return error.response?.data?.errors || error.message;
    }
  }
  
}