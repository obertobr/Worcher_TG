import BaseEntity from "../base.entity";
import Institution from "../Instituition/institution.entity";

export default class EventCategory extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  color: string | undefined;

  institution: Institution | undefined;
}