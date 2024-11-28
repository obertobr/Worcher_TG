import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import SelectInputComponent from "../../basicComponents/select-input-component/select.input.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";
import Permission from "../../../../Models/Instituition/permission.entity";
import PermissionService from "../../../../Service/Instituition/permission.service"

import './positionRegistrationPageContainer.css';
import './positionRegistrationPageContent.css';
import './positionRegistrationPageMain.css';
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import PositionRegistrarionValidation from "../../../classes/validation/positionRegistration.validation";
import Role from "../../../../Models/Instituition/role.entity";
import RoleService from "../../../../Service/Instituition/role.service"
import Institution from "../../../../Models/Instituition/institution.entity";
import LocalStorageInstitutionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import LocalStorageRoleEditUtils from "../../../../Utils/LocalStorage/local.storage.role.edit.utils"
import RoleCategoryService from "../../../../Service/Instituition/role.service"
import { useHistory } from 'react-router';
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";

interface positionRegistrationInterface {
  title?: string,
  text?: string
}

const PositionRegistrationPage: React.FC<positionRegistrationInterface> = ({
  title = 'Cadastro do Cargo',
  text = 'Crie cargos para a melhor organização de membros da sua igreja! Personalize cada cargo com um nome e atribua as permissões adequadas com o cargo, assim você pode criar uma estrutura organizacional clara e eficiente para a sua instituição.'
}) => {
  const history = useHistory()

  const servicePermission = new PermissionService()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [IsEditMode, setIsEditMode] = useState<boolean>(false);

  const [permissions, setPermissions] = useState<Permission[]>([])

  const [name, setName] = useState<string>()
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])

  const localStorageRoleEditUtils = new LocalStorageRoleEditUtils()

  useEffect(() => {

    loadPermissions()
    loadRoleIfIsEditMode()

  }, [])

  const loadPermissions = async () => {
    setPermissions(await servicePermission.list())
  }

  const applyRegisterValidation = () => {
    const registerValidation = new PositionRegistrarionValidation()
    registerValidation.validate(name)

    if (registerValidation.hasErrors()) {
      setMessagesErrorModal(registerValidation.errors)
      setShowModal(true)

      return false
    }

    return true
  }

  const createNewRole = (): Role => {
    const role = new Role();
    role.name = name;
    role.permission = selectedPermissions

    return role
  }

  const register = async () => {
    if (applyRegisterValidation()) {
      const localStorageInstituionUtils = new LocalStorageInstitutionUtils()
      const institutionId = await localStorageInstituionUtils.getId()
      const role = createNewRole()

      role.institution = { id: institutionId } as Institution

      const service = new RoleService()
      const response = await service.save(role)
      if (Array.isArray(response)) {
        setMessagesErrorModal(response)
        setShowModal(true)
      } else {
        RouterUtil.returnOfLastPage(history)
      }
    }
  }

  const updateRole = async () => {
    const idRoleEditMode = localStorageRoleEditUtils.getId()
    if (idRoleEditMode) {
      if (applyRegisterValidation()) {
        const service = new RoleService()
        const role = await service.getById(idRoleEditMode)

        if (role) {
          role.name = name;
          role.permission = selectedPermissions;

          const response = await service.save(role)
          if (Array.isArray(response)) {
            setMessagesErrorModal(response)
            setShowModal(true)
          } else {
            localStorageRoleEditUtils.setId(null)
            RouterUtil.returnOfLastPage(history)
          }
        }
      }
    }
  }

  const loadRoleIfIsEditMode = () => {
    const idRoleEditMode = localStorageRoleEditUtils.getId()

    if (idRoleEditMode) {
      setIsEditMode(true)
      loadRole(idRoleEditMode)
    }
  }

  const loadRole = async (idRole: number) => {
    const service = new RoleCategoryService()
    const role = await service.getById(idRole)
    if (role) {
      setName(role.name ? role.name : "")
      setSelectedPermissions(role.permission ? role.permission : [])
    }
  }

  return (
    <>
      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível criar o cargo"}
      />

      <HeaderComponent executeBeforeArrowclicked={() => { localStorageRoleEditUtils.setId(null) }} type='simple' showCircleImage={false}></HeaderComponent>

      <div className="positionRegContent">
        <header>
          {/* componente para o header padrão das páginas */}
        </header>

        <main>
          <div className="positionRegContainer">
            <h1>{IsEditMode ? "Edição do Cargo" : title}</h1>
            <p>{text}</p>
          </div>

          <div className="positionRegInputContainer">
            <TextInputComponent textLabel="Nome do Cargo" value={name} onInputChange={setName} placeHolder="Nome da Cargo" />
            <SelectInputComponent itens={permissions} value={selectedPermissions.map(p => p.id!)} onInputChange={setSelectedPermissions} multiple={true} placeHolder="Selecionar permissões"></SelectInputComponent>


            {
              IsEditMode ?
                <ButtonComponent width="60%" text="Salvar alterações" onClick={() => { updateRole() }} />
                :
                <ButtonComponent width="60%" text="Criar" onClick={() => { register() }} />
            }
          </div>



        </main>

        <footer>
          {/* componente para o footer padrão das páginas */}
        </footer>

      </div>
    </>
  )
};

export default PositionRegistrationPage;