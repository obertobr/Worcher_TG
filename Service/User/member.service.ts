import axios from "axios";
import Role from "../../Models/Instituition/role.entity";
import Member from "../../Models/User/member.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class MemberService extends AbstractCrudService<Member> {

  constructor() {
    super("member",Member)
  }

  async alterRole(id: number, role: Role): Promise<Role | undefined> {
    try {
      return (await axios.put(`${this.urlApi}alterRole/${id}`, role)).data.data;
    } catch (error: any) {
      return error.response.data.errors;
    }
  }
}