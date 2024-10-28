import { IonLabel } from "@ionic/react";
import memberImg from '../../../assets/word-logo-8.png';

import './memberCard.css';

interface MemberCardInterface {
  memberName: string;
  memberPosition: string;
}

const MemberCard: React.FC<MemberCardInterface> = ({
  memberName,
  memberPosition
}) => {
  
  return(
    <>
    <div className="memberCard">
      <img className="memberPic" src={memberImg} alt="Foto do Membro da Instituição" />

      <div className="memberCardInfo">
        <IonLabel className="memberName">{memberName}</IonLabel>
        <IonLabel className="memberPosition">{memberPosition}</IonLabel>
      </div>
      <button className="editButton">X</button>
    </div>
    </>
  )
}

export default MemberCard;