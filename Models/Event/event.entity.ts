import Address from "../Address/address.entity";
import BaseEntity from "../base.entity";
import DigitalFile from "../DigitalFile/digitalFile.entity";
import Institution from "../Instituition/institution.entity";
import Member from "../User/member.entity";
import EventCategory from "./event.category.entity";

export default class Event extends BaseEntity {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  creationDateTime: Date | undefined;
  dateTimeOfExecution: Date | undefined;
  
  address: Address | undefined;
  member: Member | undefined;
  institution: Institution | undefined;
  registeredMemberList: Member[] | undefined;
  image: DigitalFile | undefined;
  eventCategory: EventCategory | undefined;
}