import { useEffect, useState } from 'react';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import './rolesManegerPageContainer.css';
import './rolesManegerPageContent.css';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import Role from '../../../../Models/Instituition/role.entity';
import RoleService from '../../../../Service/Instituition/role.service';
import AlertComponent from '../../basicComponents/alert-component/alert.component';
import LocalStorageRoleEditUtils from '../../../../Utils/LocalStorage/local.storage.role.edit.utils';
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import { useHistory } from 'react-router';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';
import ButtonComponent from '../../basicComponents/button-component/button.components';

const RolesManagerPage: React.FC<{}> = () => {
  const history = useHistory()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [roleList, setRoleList] = useState<Role[]>([])

  const localStorageRoleEditUtils = new LocalStorageRoleEditUtils()
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

  const editRole = (id: number | undefined) => {
    if (id) {
      localStorageRoleEditUtils.setId(id)
      RouterUtil.goToPage(history, "position-registration")
    }
  }

  const CreateRole = () => {
    RouterUtil.goToPage(history, "position-registration")
  }

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível excluir cargo"}
      />

      <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Cargos</h2>
          </div>

          <div className="containerRole">
            {roleList && roleList.map((role, index) => {
              return <div className="roleCard" key={index}>
                <p>{role.name}</p>
                {index != 0 &&
                  <div>
                    <button className="editButton" onClick={() => { editRole(role.id) }}>✏️</button>
                    <button className="denyButton" onClick={() => { excludeRole(role) }} >X</button>
                  </div>
                }
              </div>
            })}

            <ButtonComponent text="Criar cargo" width='90%' onClick={CreateRole}></ButtonComponent>
          </div>

        </div>
      </main>
    </>
  )
}

export default RolesManagerPage;