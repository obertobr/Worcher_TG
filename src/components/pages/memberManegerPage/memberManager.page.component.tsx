import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import MemberCard from '../../basicComponents/member-card-component/membercard.component';
import TextInputComponent from '../../basicComponents/text-input-component/text.input.component';
import './memberManegerPageContainer.css';
import './memberManegerPageContent.css';
import Institution from '../../../../Models/Instituition/institution.entity';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import Member from '../../../../Models/User/member.entity';

const MemberViewPage: React.FC<{}> = () => {

  const [institution, setInstitution] = useState<Institution>()
  const [memberList, setMemberList] = useState<Member[]>()

  const institutionService = new InstitutionService()
  
  const loadInstitution = async () => {
    const institutionLocalStorage = new LocalStorageInstituionUtils()
    const intitutionID = institutionLocalStorage.getId()
    if(intitutionID){
      const institution = await institutionService.getById(intitutionID)
      setInstitution(institution)
      setMemberList(institution?.memberList)
    }
    console.log(institution)
  }

  useEffect(() => {
    loadInstitution()
  }, []);
  
  return(
    <>
      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Membros</h2>
            <TextInputComponent onInputChange={() => {} } placeHolder='Pesquisar Membro' typeInput='text' textLabel='Pesquisar Membro' />
          </div>

          <div className="containerMember">
            {institution && memberList?.map( (member) => {return (
              <MemberCard memberName={member.user?.name || ""} institution={institution} role={member.role}/>
            )})}
          </div>
          
        </div>
      </main>
    </>
  )
}

export default MemberViewPage;