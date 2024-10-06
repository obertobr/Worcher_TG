import axios from 'axios';
import BaseEntity from '../Models/base.entity';

export default class AbstractCrudService<T extends BaseEntity> {

    private urlApi = "http://localhost:3000/"
    
    constructor(pathController: string){
        this.urlApi += pathController + "/"
    }

    async count(): Promise<number> {
        try{
            return (await axios.get(`${this.urlApi}count`)).data.data
        } catch (error: any){
            throw new Error(error);
        }
    }

  async list(): Promise<T[]> {
    try {
      return (await axios.get(`${this.urlApi}list`)).data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: number): Promise<T> {
    try {
      return (await axios.get(`${this.urlApi}id/${id}`)).data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async save(item: T): Promise<T> {
    try {
      return (await axios.post(`${this.urlApi}`, item)).data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async saveAll(items: T[]): Promise<T[]> {
    try {
      return (await axios.post(`${this.urlApi}all`, items)).data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(item: T): Promise<T> {
    try {
      return (await axios.put(`${this.urlApi}`, item)).data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.urlApi}${id}`);
    } catch (error: any) {
      throw new Error(error);
    }
  }

}