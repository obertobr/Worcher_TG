import ButtonComponent from "../../basicComponents/button-component/button.components"
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component"
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component"
import "./profilePage.css"

interface ProfilePageInterface {
  name: string,
  email: string,
  password: string
  profilePicture: string
}

const ProfilePage: React.FC<ProfilePageInterface> = ({
  name = "Helen Giovana de Faria Marques",
  email = "esseemailmesmo@email.com",
  password = "********",
  profilePicture = "Imagem de perfil"
}) => {
  return(
    <>
    <HeaderComponent type="complex" circleImage={profilePicture}/>
    <main>
      <div className="profileDataContent">
        <div >
          <h1>Nome</h1>
          <label>{name}</label>

          <h1>E-mail</h1>
          <label>{email}</label>

          <h1>Senha</h1>
          <label>{password}</label>
        </div>

        <ButtonComponent width="240px" text="Excluir Conta" onClick={() => {} } isCancel />
      </div>
    </main>
    <FooterComponent />
    </>
  )
}

export default ProfilePage