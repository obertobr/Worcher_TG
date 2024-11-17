import { useState } from "react";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import AuthPage from "../authPage/auth.page.component";
import LocalStorageUtils from "../../../../Utils/LocalStorage/local.storage.utils";
import UserService from "../../../../Service/User/user.service";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import InstitutionService from "../../../../Service/Instituition/institution.service";
import requestEntryInterface from "../../../../Service/Instituition/membershipRequest.crud.service.interface";
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";

const JoinInstitutionAuthPage: React.FC = () => {

  const history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const confirmClick = async (e: string) => {
    const codeCompleteParsedNumeric = parseInt(e)
    const localStorageLogin = new LocalStorageLoginUtils()

    const service = new InstitutionService()
  
      const dataRequest = new requestEntryInterface()
      dataRequest.codeInstitution = codeCompleteParsedNumeric
      dataRequest.userId = localStorageLogin.getIdUser()

      const response = await service.requestEntry(dataRequest)

      if(Array.isArray(response)){
        setMessagesErrorModal(response)
        setShowModal(true)

        return false
     }else{
      RouterUtil.goToPage(history,"my-institution")
     }

  }

  return(
    <>
      <AlertComponent
                    isOpen={showModal}
                    onDidDismiss={() => setShowModal(false)}
                    messages={messagesErrorModal} 
                    titleText={"Não foi possível fazer a solicitação de entrada"}      
                />

      <AuthPage onClick={(e: string) => confirmClick(e)}></AuthPage>

    </>
  )
}

export default JoinInstitutionAuthPage;