import ButtonComponent from '../../basicComponents/button-component/button.components';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';
import './institutionViewPageConteiner.css';
import './institutionViewPageContent.css';
import './institutionViewPageMain.css';


import logo from "../../../assets/rafael.png"
import FooterComponent from '../../basicComponents/layoutComponents/footer-component/footer.component';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Institution from '../../../../Models/Instituition/institution.entity';
import LocalStorageLoginUtils from '../../../../Utils/LocalStorage/local.storage.login.utils';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import requestEntryInterface from '../../../../Service/Instituition/membershipRequest.crud.service.interface';
import AlertComponent from '../../basicComponents/alert-component/alert.component';
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import LocalStorageMemberUtils from '../../../../Utils/LocalStorage/local.storage.member.utils';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';

interface instituitionViewInterface {
}

const InstituitionViewPage: React.FC<instituitionViewInterface> = ({
}) => {
  
  const history = useHistory()
  const service = new InstitutionService()

  const localStorageInstitution = new LocalStorageInstituionUtils()
  const id = localStorageInstitution.getId()



  const idParsed = id
  const [instituition, setInstitution] = useState<Institution>()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])
  
  const localStorageMember = new LocalStorageMemberUtils()
  const [isMemberLocalStorage, setIsMemberLocalStorage] = useState<boolean>(!!localStorageMember.getItem());

  useEffect(() => {
    loadDataInstitution()
  }, [])


  const loadDataInstitution = async () => {
    if(idParsed){
      const response = await service.getById(idParsed)
      setInstitution(response)
    }
  }

  const requestEntry = async () => {
    if(id){
      const localStorageLogin = new LocalStorageLoginUtils()
      
      const dataRequest = new requestEntryInterface()
      dataRequest.idInstitution = idParsed
      dataRequest.userId = localStorageLogin.getIdUser()
      
      const response = await service.requestEntry(dataRequest)

      if(Array.isArray(response)){
        setMessagesErrorModal(response)
        setShowModal(true)
     }else{
        RouterUtil.goToPage(history,`my-institution`)
     }
    }
  }

  return(
    <>

      <AlertComponent
                    isOpen={showModal}
                    onDidDismiss={() => setShowModal(false)}
                    messages={messagesErrorModal} 
                    titleText={"Não foi possível fazer a solicitação de entrada"}      
                />


    <HeaderComponent showHome={isMemberLocalStorage} showArrowBack={!isMemberLocalStorage} type='complex' circleImage={logo}></HeaderComponent>
      <div className="contentIntView">
      
        <main>
          <div className="intViewContainer">
            <h2 className='title center'>{instituition?.name}</h2>
            <p className='center'>{instituition?.description}</p>
          </div>

          <div className="intViewAddressContainer">
            <h2 className='titleSecond'>ENDEREÇO</h2>
            <p>{"Cidade: " + instituition?.address?.city?.name + ", Bairro: " + instituition?.address?.neighborhood +
                ", Rua: " + instituition?.address?.street + ", N°: " + instituition?.address?.number + ", CEP: " +
                instituition?.address?.cep
              }</p>
          </div>

          <ButtonComponent width='80%' text='Solicitar Entrada' onClick={() => requestEntry() } />
        </main>


      </div>
        <FooterComponent isWithinTheInstitution={isMemberLocalStorage}></FooterComponent>
    </>
  );
}

export default InstituitionViewPage;