import { IonLabel } from '@ionic/react';
import minhaImagem from '../../../assets/prá-trás-para-trás.png';
import ButtonComponent from '../button-component/button.components';

// Style
import './institutionCard.css';
import { useHistory } from 'react-router';
import MemberService from '../../../../Service/User/member.service';
import LocalStorageLoginUtils from '../../../../Utils/LocalStorage/local.storage.login.utils';
import LocalStorageMemberUtils from '../../../../Utils/LocalStorage/local.storage.member.utils';
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import ImageUtils from '../../../../Utils/image/image.utils';

interface InstitutionCardInterface {
  title: string;
  idInstitution: number | undefined;
  imageUrl: string | undefined
}

const InstitutionCard: React.FC<InstitutionCardInterface> = ({
  title,
  idInstitution,
  imageUrl,
}) => {

  const history = useHistory()
  const memberService = new MemberService()
  const localStorageLogin = new LocalStorageLoginUtils()

  const goToFeedInstitution = async () => {
    const idUser = localStorageLogin.getIdUser()

    if(idInstitution && idUser){
      const response = await memberService.getMemberIdByInstitutionAndUser(idInstitution,idUser)
      const localStorageMemberUtils = new LocalStorageMemberUtils()
      const localStorageInstitution = new LocalStorageInstituionUtils()
      localStorageInstitution.setId(idInstitution)
      localStorageMemberUtils.setItem(response)
      RouterUtil.goToPage(history,"feed")
    }


  }

  return(
    <>
      <div className="institutionCard">
        <div className='contentCardInstitution' onClick={() => goToFeedInstitution()}>
          <img className='institutionLogo' src={ImageUtils.getImageByUrl(imageUrl)} alt="imagem" />

          <div className="institutionCardInfo">
            <IonLabel className='title'>{title}</IonLabel>
          </div>
        </div>

      </div>
    </>
  );
}

export default InstitutionCard;