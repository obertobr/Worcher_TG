import { IonLabel } from "@ionic/react";
import memberImg from '../../../assets/word-logo-8.png';
import selectMember from "./selectMember.module.css"

import './memberCard.css';
import SelectInputComponent from "../select-input-component/select.input.component";
import Role from "../../../../Models/Instituition/role.entity";

interface MemberCardInterface {
  memberName: string;
  roleList?: Role[];
  role?: Role;
  requestType?: boolean
}

const MemberCard: React.FC<MemberCardInterface> = ({
  memberName,
  roleList,
  role,
  requestType
}) => {

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

  return (
    <>
      <div className="memberCard">
        <img className="memberPic" src={memberImg} alt="Foto do Membro da Instituição" />

        <div className="memberCardInfo">
          <IonLabel className="memberName">{memberName}</IonLabel>
          {!requestType &&
            <SelectInputComponent
              style={selectMember}
              itens={convertToRoleList(roleList)}
              onInputChange={(event) => { console.log(event) }}
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