import { useState } from "react";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import AuthPage from "../authPage/auth.page.component";
import LocalStorageUtils from "../../../../Utils/LocalStorage/local.storage.utils";
import UserService from "../../../../Service/User/user.service";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const RecoveryAuthPage: React.FC = () => {

  const localStorage = new LocalStorageUtils<number>("ID_ACCOUNT_RECOVERY")

  const history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const confirmClick = async (e: string) => {
    const codeCompleteParsedNumeric = parseInt(e)
    const idAccount = localStorage.getItem()

    const service = new UserService()

    if(idAccount){
      const response = await service.recoveryCheck(idAccount,codeCompleteParsedNumeric)

      if(Array.isArray(response)){
        setMessagesErrorModal(response)
        setShowModal(true)

        return false
     }else{
      RouterUtil.goToPage(history,"change-password")
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

      <AuthPage onClick={(e: string) => confirmClick(e)}></AuthPage>

    </>
  )
}

export default RecoveryAuthPage;