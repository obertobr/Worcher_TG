import Member from "../../Models/User/member.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class MemberService extends AbstractCrudService<Member> {

  constructor() {
    super("member")
  }

}