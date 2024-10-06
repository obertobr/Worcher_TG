import BaseEntity from "../base.entity";
import Member from "../User/member.entity";

export default class Event extends BaseEntity{
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  creationDateTime: Date | undefined;
  dateTimeOfExecution: Date | undefined;

  member: Member | undefined;
  registeredMemberList: Member[] | undefined;
}