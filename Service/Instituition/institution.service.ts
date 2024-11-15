import axios from "axios";
import Institution from "../../Models/Instituition/institution.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";
import Member from "../../Models/User/member.entity";

export default class InstitutionService extends AbstractFormDataCrud<Institution> {

  constructor() {
    super("institution", Institution)
  }

  async getMembers(id: number, search?: string): Promise<Member[] | undefined> {
    try {
      const item = (await axios.get(`${this.urlApi}getMembers/${id}${search && "?search=" + search}`)).data.data;
      return item;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async acceptEntry(id: number): Promise<void> {
    try {
      const item = (await axios.get(`${this.urlApi}acceptEntry/${id}`)).data.data;
      return item;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async deleteMembershipRequest(id: number): Promise<void> {
    try {
      await axios.delete(`${this.urlApi}deleteMembershipRequest/${id}`);
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

}