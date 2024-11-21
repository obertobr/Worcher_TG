import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import InstitutionCard from "../../basicComponents/institution-card-component/institutionCard.component";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import './myInstitutionPageContainer.css';
import './myInstitutionPageContent.css';
import InstitutionService from "../../../../Service/Instituition/institution.service";
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";
import Institution from "../../../../Models/Instituition/institution.entity";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const MyInstitutionPage: React.FC<{}> = () => {
  const localStorageLogin = new LocalStorageLoginUtils()
  const serviceInstitution = new InstitutionService()
  const history = useHistory()

  const [institutions, setInstitutions] = useState<Institution[]>() 

  useEffect( () => {
    
    loadInstitutions()
      
  }, [])

  const loadInstitutions = async () => {
    setInstitutions(await serviceInstitution.getInstitutionsByUserId(localStorageLogin.getIdUser()))
  }


  return(
    <>
    <HeaderComponent type='simple' showCircleImage={true}></HeaderComponent>

      <main>
        <div className="contentInst">

          <h2>Minhas Instituições</h2>

          <div className="containerInst">

            {
              institutions && institutions.length > 0 ? institutions.map( (e,i) => {
                return (
                  <InstitutionCard key={i} idInstitution={e.id} title={e.name || ""} />
                )
              }) : 
              
              (<p className="textWarn">Você não está participando como membro de nenhuma instituição no momento!</p>)
            }

          </div>

          <hr className="line" />

          <h3> Mais opções </h3>

          <ButtonComponent text='Entrar em uma instituição' width='360px' onClick={() => RouterUtil.goToPage(history,"join-institution-auth-page") } />

          <p>OU</p>

          <ButtonComponent text='Criar nova instituição' width='360px' onClick={() => RouterUtil.goToPage(history, "institution-register") } />
        </div>
      </main>
    
    <FooterComponent></FooterComponent>
    </>
  )
}

export default MyInstitutionPage;