import BaseEntity from "../base.entity";

export default class EventCategory extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  color: string | undefined;
}