import axios from 'axios';
import BaseEntity from '../Models/base.entity';

export default class AbstractCrudService<T extends BaseEntity> {

  private urlApi = "http://localhost:3000/"

  constructor(pathController: string) {
    this.urlApi += pathController + "/"
  }

  convertToEntity<T extends object>(object: any, entityClass: { new(): T }): T | null {
    if (!object) return null;

    const entity = new entityClass();
    return Object.assign(entity, object);
  }

  async count(): Promise<number> {
    try {
      return (await axios.get(`${this.urlApi}count`)).data.data
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async list(): Promise<T[]> {
    try {
      const list = (await axios.get(`${this.urlApi}list`)).data.data

      const typedList: T[] = list.map((item: any) => {
        return this.convertToEntity<T>(item, T);
      });
      return typedList;
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async getById(id: number): Promise<T> {
    try {
      return (await axios.get(`${this.urlApi}id/${id}`)).data.data;
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async save(item: T): Promise<T> {
    try {
      return (await axios.post(`${this.urlApi}`, item)).data.data;
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async saveAll(items: T[]): Promise<T[]> {
    try {
      return (await axios.post(`${this.urlApi}all`, items)).data.data;
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async update(item: T): Promise<T> {
    try {
      return (await axios.put(`${this.urlApi}`, item)).data.data;
    } catch (error: any) {
      return error.response.data.errors
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.urlApi}${id}`);
    } catch (error: any) {
      return error.response.data.errors
    }
  }

}