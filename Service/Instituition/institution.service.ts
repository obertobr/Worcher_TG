import axios from "axios";
import Institution from "../../Models/Instituition/institution.entity";
import AbstractFormDataCrud from "../abstractFormDataCrud.service";
import Member from "../../Models/User/member.entity";
import requestEntryInterface from "./membershipRequest.crud.service.interface"

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

  async getInstitutionsByUserId(idUser: number | undefined | null): Promise<Institution[]> {
    try {
      const response = await axios.get(`${this.urlApi}listByUser/${idUser}`);
      const data = response.data.data;
      
      return data.map((item: any) => this.convertToEntity(item));

    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async getInstitutionByCode(code: number): Promise<number> {
    try {
      const response = await axios.get(`${this.urlApi}getInstitutionByCode/${code}`);
      const data = response.data.data;
      return data;
    } catch (error: any) {
      return error.response?.data?.errors;
    }
  }
  
  async requestEntry(data: requestEntryInterface): Promise<any> {
    try {
      const response = await axios.post(`${this.urlApi}requestEntry`, data);
      const request = response.data.data;
      return request; 
    } catch (error: any) {
      return error.response?.data?.errors
    }
  }
  
}