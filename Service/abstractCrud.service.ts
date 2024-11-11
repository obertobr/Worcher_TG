import axios from 'axios';
import BaseEntity from '../Models/base.entity';

export default class AbstractCrudService<T extends BaseEntity> {

  urlApi = "http://localhost:3000/";
  private entityClass: { new(): T };

  constructor(pathController: string, entityClass: { new(): T }) {
    this.urlApi += pathController + "/";
    this.entityClass = entityClass;
  }

  convertToEntity(object: any): T | undefined {
    if (!object) return undefined;

    const entity = new this.entityClass();
    return Object.assign(entity, object);
  }

  async count(): Promise<number> {
    try {
      return (await axios.get(`${this.urlApi}count`)).data.data;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async list(): Promise<T[]> {
    try {
      const list = (await axios.get(`${this.urlApi}list`)).data.data;

      const typedList: T[] = list.map((item: any) => {
        return this.convertToEntity(item);
      });
      return typedList;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async getById(id: number): Promise<T | undefined> {
    try {
      const item = (await axios.get(`${this.urlApi}id/${id}`)).data.data;
      return this.convertToEntity(item);
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async save(item: T): Promise<T | undefined> {
    try {
      return this.convertToEntity((await axios.post(`${this.urlApi}`, item)).data.data);
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async saveAll(items: T[]): Promise<T[]> {
    try {

      const list = (await axios.post(`${this.urlApi}all`, items)).data.data;

      const typedList: T[] = list.map((item: any) => {
        return this.convertToEntity(item);
      });

      return typedList;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async update(item: T): Promise<T | undefined> {
    try {
      return  this.convertToEntity((await axios.put(`${this.urlApi}`, item)).data.data);
    } catch (error: any) {
      return error.response.data.errors;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.urlApi}${id}`);
    } catch (error: any) {
      return error.response.data.errors;
    }
  }
}
