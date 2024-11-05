import axios from 'axios';
import BaseEntity from '../Models/base.entity';
import AbstractCrudService from './abstractCrud.service'

export default class AbstractFormDataCrud<T extends BaseEntity> extends AbstractCrudService<T> {
    async save(item: T, file?: File): Promise<T | null> {
        try {
            const formData = new FormData();
            formData.append("content", JSON.stringify(item));
            if(file){
                formData.append("image", file);
            }

            return this.convertToEntity((await axios.post(this.urlApi, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })).data.data);
        } catch (error: any) {
            return error.response.data.errors;
        }
    }

    async update(item: T, file?: File): Promise<T | null> {
        try {
            const formData = new FormData();
            formData.append("content", JSON.stringify(item));
            if(file){
                formData.append("image", file);
            }

            return this.convertToEntity((await axios.put(this.urlApi, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })).data.data);
        } catch (error: any) {
            return error.response.data.errors;
        }
    }
}