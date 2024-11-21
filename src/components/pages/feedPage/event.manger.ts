import Event from "../../../../Models/Event/event.entity";
import EventService from "../../../../Service/Event/event.service";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";

export default class EventManager {

    private service: EventService = new EventService()
    private localStorageInstituionUtils: LocalStorageInstituionUtils = new LocalStorageInstituionUtils()


   async listEventByCategory(idCategory: number | null = null ): Promise<Event[]>{
        const id = this.localStorageInstituionUtils.getId()

        if(id){ 
           return await this.service.getEventsByInstitutionId(id,idCategory)
        }

        return [];
    }

}