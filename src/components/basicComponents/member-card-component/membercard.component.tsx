import { IonLabel } from "@ionic/react";
import memberImg from '../../../assets/word-logo-8.png';
import selectMember from "./selectMember.module.css"

import './memberCard.css';
import SelectInputComponent from "../select-input-component/select.input.component";
import Role from "../../../../Models/Instituition/role.entity";
import Member from "../../../../Models/User/member.entity";
import MembershipRequest from "../../../../Models/Instituition/membershipRequest.entity"
import MemberService from '../../../../Service/User/member.service';;

interface MemberCardInterface {
  member: Member | MembershipRequest;
  roleList?: Role[];
  role?: Role;
  requestType?: boolean
}

const MemberCard: React.FC<MemberCardInterface> = ({
  member,
  roleList,
  role,
  requestType
}) => {

  const memberService = new MemberService()

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

  const alterRole = (role: Role) => {
    if(member.id){
      memberService.alterRole(member.id,role);
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
            <button className="confirmButton">✔</button>
            <button className="denyButton">X</button>
          </>
          :
          <button className="denyButton">X</button>
        }
      </div>
    </>
  )
}

export default MemberCard;