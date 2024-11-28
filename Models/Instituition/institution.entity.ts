import BaseEntity from "../base.entity";
import Member from "../User/member.entity";
import Role from "./role.entity";
import MembershipRequest from "./membershipRequest.entity";
import Event from "../Event/event.entity";
import EventCategory from "../Event/event.category.entity";
import Address from "../Address/address.entity"
import DigitalFile from "../DigitalFile/digitalFile.entity"

export default class Institution extends BaseEntity {
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  description: string | undefined;

  roleList: Role[] | undefined;
  memberList: Member[] | undefined;
  eventList: Event[] | undefined;
  eventCategoryList: EventCategory[] | undefined;
  address: Address | undefined;
  image: DigitalFile | undefined;
  membershipRequest: MembershipRequest[] | undefined;

  constructor(id?: number, name?: string, description?: string){
    super()

    this.id = id;
    this.name = name;
    this.description = description;
  }

}