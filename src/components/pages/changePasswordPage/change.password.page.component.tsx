import { useState } from "react";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import AuthPage from "../authPage/auth.page.component";
import LocalStorageUtils from "../../../../Utils/LocalStorage/local.storage.utils";
import AccountService from "../../../../Service/User/account.service";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import Account from "../../../../Models/User/account.entity";

const ChangePasswordPage: React.FC = () => {

  const localStorage = new LocalStorageUtils<number>("ID_ACCOUNT_RECOVERY")

  const history = useHistory()
  const [senha, setSenha] = useState<string>();
  const [senhaConfirm, setSenhaConfirm] = useState<string>();

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const confirmClick = async () => {
    const idAccount = localStorage.getItem()

  const service = new AccountService()

  if(idAccount){
      const account: Account = await service.getById(idAccount) || new Account()

      account.password = senha
      

      const response = await service.update(account)

      if(Array.isArray(response)){
        setMessagesErrorModal(response)
        setShowModal(true)

        return false
     }else{
        RouterUtil.goToPage(history,"login")
     }

  }

  }

  return(
    <>
        <AlertComponent
                    isOpen={showModal}
                    onDidDismiss={() => setShowModal(false)}
                    messages={messagesErrorModal} 
                    titleText={"Não foi possível recuperar"}      
                />

            <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

            <div className="content">
                <h2 className="title">Insira sua nova senha</h2>

                <TextInputComponent 
              textLabel="Senha"
              typeInput="password"
              placeHolder="Digite sua senha..."
              maxlength={26}
              onInputChange={(e) => setSenha(e)}
            />

          <br />

            <TextInputComponent 
              textLabel="Confirme sua Senha"
              typeInput="password"
              placeHolder="Confirme sua senha..."
              maxlength={26}
              onInputChange={(e) => setSenhaConfirm(e)}
            />

                <ButtonComponent disabled={!senha || !senhaConfirm} width="230px" text="Confirmar" onClick={confirmClick} />
            </div>

    </>
  )
}

export default ChangePasswordPage;