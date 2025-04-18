import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import MemberCard from '../../basicComponents/member-card-component/membercard.component';
import TextInputComponent from '../../basicComponents/text-input-component/text.input.component';
import './memberManegerPageContainer.css';
import './memberManegerPageContent.css';
import Institution from '../../../../Models/Instituition/institution.entity';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import Member from '../../../../Models/User/member.entity';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';

const MemberViewPage: React.FC<{}> = () => {

  const [search, setSearch] = useState<string>("")

  const [institution, setInstitution] = useState<Institution>()
  const [memberList, setMemberList] = useState<Member[]>()
  const [excludeAdmOption, setExcludeAdmOption] = useState<boolean>(true)

  const institutionLocalStorage = new LocalStorageInstituionUtils()
  const institutionService = new InstitutionService()

  const loadInstitution = async () => {
    const intitutionID = institutionLocalStorage.getId()
    if (intitutionID) {
      const institution = await institutionService.getById(intitutionID)
      setInstitution(institution)
    }
  }

  const loadMembers = async () => {
    const intitutionID = institutionLocalStorage.getId()
    if (intitutionID) {
      const members = await institutionService.getMembers(intitutionID, search)
      if(members && members.filter(member => member.role?.permission?.some(permission => permission.id === 2)).length < 2){
        setExcludeAdmOption(false)
      } else {
        setExcludeAdmOption(true)
      }

      setMemberList(members)
    }
  }

  const refresh = async () => {
    loadInstitution()
    loadMembers()
  }

  useEffect(() => {
    loadInstitution()
  }, []);

  useEffect(() => {
    loadMembers()
  }, [search]);

  return (
    <>
       <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Membros</h2>
            <div className='memberSearch'>
              <TextInputComponent onInputChange={setSearch} placeHolder='Pesquisar Membro' typeInput='text' />
              <span>{institution?.memberList?.length} Membros</span>
            </div>
          </div>

          <div className="containerMember">
            {institution?.membershipRequest && institution.membershipRequest.length>0 &&
              <>
                <h4>Solicitações</h4>
                <hr></hr>
              </>
            }
            {institution && institution.membershipRequest?.map((member,index) => {
              return (
                <MemberCard key={index} member={member} roleList={institution.roleList} requestType={true} refresh={refresh} />
              )
            })}
            <h4>Membros</h4>
            <hr></hr>
            {institution && memberList?.map((member,index) => {
              return (
                <MemberCard key={index} member={member} roleList={institution.roleList} role={member.role} refresh={refresh} excludeAdmOption={excludeAdmOption} />
              )
            })}
          </div>

        </div>
      </main>
    </>
  )
}

export default MemberViewPage;