import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import './rolesManegerPageContainer.css';
import './rolesManegerPageContent.css';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import Role from '../../../../Models/Instituition/role.entity';
import RoleService from '../../../../Service/Instituition/role.service';
import AlertComponent from '../../basicComponents/alert-component/alert.component';

const RolesManagerPage: React.FC<{}> = () => {

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [roleList, setRoleList] = useState<Role[]>([])

  const institutionLocalStorage = new LocalStorageInstituionUtils()
  const institutionService = new InstitutionService()
  const roleService = new RoleService()

  const loadRoleList = async () => {
    const intitutionID = institutionLocalStorage.getId()
    if (intitutionID) {
      const institution = await institutionService.getById(intitutionID)
      setRoleList(institution?.roleList || [])
    }
  }

  const excludeRole = async (role: Role) => {
    if (role.id) {
      const response = await roleService.delete(role.id)
      if (Array.isArray(response)) {
        setMessagesErrorModal(response)
        setShowModal(true)
      }

      loadRoleList()
    }
  }

  useEffect(() => {
    loadRoleList()
  }, []);

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível excluir cargo"}
      />

      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Cargos</h2>
          </div>

          <div className="containerRole">
            {roleList && roleList.map((role, index) => {
              return <div className="roleCard">
                <p>{role.name}</p>
                {index != 0 &&
                  <div>
                    <button className="editButton">✏️</button>
                    <button className="denyButton" onClick={() => { excludeRole(role) }} >X</button>
                  </div>
                }
              </div>
            })}
          </div>

        </div>
      </main>
    </>
  )
}

export default RolesManagerPage;