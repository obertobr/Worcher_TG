import { IonLabel } from '@ionic/react';
import minhaImagem from '../../../assets/prá-trás-para-trás.png';
import ButtonComponent from '../button-component/button.components';

// Style
import './institutionCard.css';

interface InstitutionCardInterface {
  title: string;
}

const InstitutionCard: React.FC<InstitutionCardInterface> = ({
  title,
}) => {
  return(
    <>
      <div className="institutionCard">
        <img className='institutionLogo' src={minhaImagem} alt="imagem" />

        <div className="institutionCardInfo">
          <IonLabel className='title'>{title}</IonLabel>
        </div>
          <ButtonComponent isCancel={true} text='Sair' width='100px' onClick={() => {} } />
      </div>
    </>
  );
}

export default InstitutionCard;