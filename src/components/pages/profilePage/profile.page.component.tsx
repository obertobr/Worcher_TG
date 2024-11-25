import { useEffect, useState } from "react"
import ButtonComponent from "../../basicComponents/button-component/button.components"
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component"
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component"
import "./profilePage.css"
import User from "../../../../Models/User/user.entity"
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils"
import UserService from "../../../../Service/User/user.service"
import LocalStorageUserEditUtils from "../../../../Utils/LocalStorage/local.storage.user.edit.utils"
import RouterUtil from "../../../../Utils/Components/RouterUtil"
import { useHistory } from "react-router"

interface ProfilePageInterface {
}

const ProfilePage: React.FC<ProfilePageInterface> = ({
}) => {

  const history = useHistory()

  const [user,setUser] = useState<User | undefined>()

  useEffect(() => {
    loadUser()
  },[])

  const loadUser = async () =>{
    const localStorageLogin = new LocalStorageLoginUtils()
    const userService = new UserService()

    const idUser = localStorageLogin.getIdUser()

    if(idUser){
      setUser(await userService.getById(idUser))
    }
  }

  const editarDadosCadastraisClicked = () => {
    const localStorageUserEditUtils = new LocalStorageUserEditUtils()

    if(user && user.id){
      localStorageUserEditUtils.setId(user?.id)
    }

    RouterUtil.goToPage(history,"singup")
  }

  return(
    <>
    <HeaderComponent showArrowBack={true} showButtonChangeImage={true} type="complex"/>
    <main className="mainProfilePage">
      <div className="profileDataContent">
        <div >
          <h1>Nome</h1>
          <label>{user?.name}</label>

          <h1>E-mail</h1>
          <label>{user?.account?.email}</label>

        </div>

      </div>

        <ButtonComponent width="250px" text="Editar dados cadastrais" onClick={() => editarDadosCadastraisClicked() }/>
        <ButtonComponent width="250px" text="Excluir Conta" onClick={() => {} } isCancel />
    </main>
    </>
  )
}

export default ProfilePage