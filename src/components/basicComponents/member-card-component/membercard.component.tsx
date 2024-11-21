import { IonLabel } from "@ionic/react";
import memberImg from '../../../assets/word-logo-8.png';
import selectMember from "./selectMember.module.css"

import './memberCard.css';
import SelectInputComponent from "../select-input-component/select.input.component";
import Role from "../../../../Models/Instituition/role.entity";
import Member from "../../../../Models/User/member.entity";
import MembershipRequest from "../../../../Models/Instituition/membershipRequest.entity";
import MemberService from '../../../../Service/User/member.service';
import InstitutionService from "../../../../Service/Instituition/institution.service";

interface MemberCardInterface {
  member: Member | MembershipRequest;
  roleList?: Role[];
  role?: Role;
  requestType?: boolean
  excludeAdmOption?: boolean
  refresh: () => void
}

const MemberCard: React.FC<MemberCardInterface> = ({
  member,
  roleList,
  role,
  requestType,
  excludeAdmOption,
  refresh
}) => {

  const memberService = new MemberService()
  const institutionService = new InstitutionService()

  const convertToRoleList = (list: any[] | undefined): Role[] => {
    if (!list) return [];

    const typedList: Role[] = list.map((item: any) => {
      return convertToRole(item)
    });
    return typedList
  }

  const convertToRole = (object: any): Role => {
    const role = new Role();
    return Object.assign(role, object);
  }

  const alterRole = async (role: Role) => {
    if(member.id){
      await memberService.alterRole(member.id,role);
      refresh();
    }
  }

  const allowRequest = async () => {
    if(member.id){
      await institutionService.acceptEntry(member.id);
      refresh();
    }
  }

  const denyRequest = async () => {
    if(member.id){
      await institutionService.deleteMembershipRequest(member.id);
      refresh();
    }
  }

  const removeMember = async () => {
    if(member.id){
      await memberService.delete(member.id);
      refresh();
    }
  }

  return (
    <>
      <div className="memberCard">
        <img className="memberPic" src={memberImg} alt="Foto do Membro da Instituição" />

        <div className="memberCardInfo">
          <IonLabel className="memberName">{member.user?.name || ""}</IonLabel>
          {!requestType &&
            <SelectInputComponent
              style={selectMember}
              itens={convertToRoleList(roleList)}
              onInputChange={alterRole}
              value={role?.id}
            ></SelectInputComponent>
          }
        </div>
        {requestType ?
          <>
            <button className="allowButton" onClick={allowRequest}>✔</button>
            <button className="denyButton" onClick={denyRequest}>X</button>
          </>
          :
          (role?.name != "Administrador" || excludeAdmOption) &&
          <button className="denyButton" onClick={removeMember}>X</button>
        }
      </div>
    </>
  )
}

export default MemberCard;