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

  const [search, setSearch] = useState<string>("")

  const [institution, setInstitution] = useState<Institution>()
  const [memberList, setMemberList] = useState<Member[]>()

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
            {institution && institution.membershipRequest?.map((member) => {
              return (
                <MemberCard member={member} roleList={institution.roleList} requestType={true} refresh={refresh} />
              )
            })}
            <h4>Membros</h4>
            <hr></hr>
            {institution && memberList?.map((member) => {
              return (
                <MemberCard member={member} roleList={institution.roleList} role={member.role} refresh={refresh} />
              )
            })}
          </div>

        </div>
      </main>
    </>
  )
}

export default MemberViewPage;