import { IonLabel } from '@ionic/react';
import minhaImagem from '../../../assets/prá-trás-para-trás.png';
import ButtonComponent from '../button-component/button.components';

// Style
import './institutionCard.css';

interface InstitutionCardInterface {
  title: string;
  memberCount?: number;
}

const InstitutionCard: React.FC<InstitutionCardInterface> = ({
  title,
  memberCount
}) => {
  return(
    <>
      <div className="institutionCard">
        <img className='institutionLogo' src={minhaImagem} alt="imagem" />

        <div className="institutionCardInfo">
          <IonLabel className='title'>{title}</IonLabel>
          <IonLabel className='memberCount'>{memberCount} Membros</IonLabel>
        </div>
          <ButtonComponent text='Sair' width='30%' onClick={() => {} } />
      </div>
    </>
  );
}

export default InstitutionCard;