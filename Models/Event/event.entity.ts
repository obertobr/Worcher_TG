import Member from "../User/member.entity";

export default class Event {
  id: number;
  name: string;
  description: string;
  creationDateTime: Date;
  dateTimeOfExecution: Date;

  member: Member;
  registeredMemberList: Member[];
}