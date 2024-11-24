import { useEffect, useState } from "react"
import ButtonComponent from "../../basicComponents/button-component/button.components"
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component"
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component"
import "./profilePage.css"
import User from "../../../../Models/User/user.entity"
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils"
import UserService from "../../../../Service/User/user.service"

interface ProfilePageInterface {
  name: string,
  email: string,
  password: string
  profilePicture: string
}

const ProfilePage: React.FC<ProfilePageInterface> = ({
  password = "********",
}) => {

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

  return(
    <>
    <HeaderComponent showButtonChangeImage={true} type="complex"/>
    <main className="mainProfilePage">
      <div className="profileDataContent">
        <div >
          <h1>Nome</h1>
          <label>{user?.name}</label>

          <h1>E-mail</h1>
          <label>{user?.account?.email}</label>

          <h1>Senha</h1>
          <label>{password}</label>
        </div>

      </div>

        <ButtonComponent width="240px" text="Excluir Conta" onClick={() => {} } isCancel />
    </main>
    <FooterComponent />
    </>
  )
}

export default ProfilePage