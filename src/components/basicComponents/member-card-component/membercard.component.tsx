import { IonLabel } from "@ionic/react";
import memberImg from '../../../assets/word-logo-8.png';
import selectMember from "./selectMember.module.css"

import './memberCard.css';
import SelectInputComponent from "../select-input-component/select.input.component";
import { useEffect, useState } from "react";
import Role from "../../../../Models/Instituition/role.entity";
import InstitutionService from "../../../../Service/Instituition/institution.service";
import Institution from "../../../../Models/Instituition/institution.entity";

interface MemberCardInterface {
  memberName: string;
  institution: Institution;
  role?: Role;
}

const MemberCard: React.FC<MemberCardInterface> = ({
  memberName,
  institution,
  role
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
          {/* <IonLabel className="memberPosition">{memberPosition}</IonLabel> */}
          <SelectInputComponent
            style={selectMember}
            itens={convertToRoleList(institution.roleList)}
            onInputChange={(event) => {console.log(event)}}
            value={role?.id}
          ></SelectInputComponent>
        </div>
        <button className="editButton">X</button>
      </div>
    </>
  )
}

export default MemberCard;