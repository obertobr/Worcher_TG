import ButtonComponent from "../../basicComponents/button-component/button.components";
import DateComponent from "../../basicComponents/date-component/date.component";
import InputCpfComponent from "../../basicComponents/input-cpf-component/input.cpf.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";

import "./singupPageFooter.css";
import "./singupPageMain.css";
import { useEffect, useState } from "react";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import PopupComponent from "../../basicComponents/popup-component/popup.component";
import DateUtil from "../../../../Utils/DateUtil";
import User from "../../../../Models/User/user.entity";
import Account from "../../../../Models/User/account.entity";
import UserValidation from "../../../classes/validation/user.validation";
import UserService from "../../../../Service/User/user.service"
import Config from "../../../../Models/User/config.entity";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import LocalStorageUserEditUtils from "../../../../Utils/LocalStorage/local.storage.user.edit.utils";

const SingUpPage: React.FC<{}> = () => {
  const history = useHistory();
  const service = new UserService()
  const localStorageUserEditUtils = new LocalStorageUserEditUtils()
  
  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])
  
  const [showModalDate, setShowModalDate] = useState(false);
  const [isEditMode,setIsEditMode]= useState<boolean>(false);
  const [idEdit,setIdEdit] = useState<number | undefined>()
  const [idAccoutEdit, setIdAccoutEdit] = useState<number | undefined>()

  // VALUES of Singup

  useEffect(() => {
    loadUserEditIfExistsInLocalStorage()
  }, [])

  const loadUserEditIfExistsInLocalStorage = async () => {
    const idUserEdit = localStorageUserEditUtils.getId()

    if(idUserEdit){
      setIsEditMode(true)
      const user = await service.getById(idUserEdit)
      setIdEdit(user?.id)
      setIdAccoutEdit(user?.account?.id)
      setName(user?.name)
      setCpf(user?.cpf)
      setDate(user?.dateOfBirth)
      setEmail(user?.account?.email)
    }
  }

  const [name, setName] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [senhaConfirm, setSenhaConfirm] = useState<string>();


  const createNewUser = () => {
    const user = new User();
    user.name = name;
    user.dateOfBirth = date;
    user.cpf = cpf;
    const account = new Account()
    account.email = email
    account.password = senha

    user.account = account

    if(!isEditMode){
      user.config = new Config()
      user.config.recieveEmails = false
      user.config.recieveNotifications = false
    }

    const userValidation = new UserValidation();
    userValidation.validate(user,senhaConfirm)

    if(userValidation.errors != null && userValidation.errors.length > 0){
      setMessagesErrorModal(userValidation.errors)
      setShowModal(true)
    }else{
      isEditMode ? updateUser(user) : saveUser(user)
    }  
  }

  const saveUser = async (user: User) => {
    const response = await service.save(user)
    
    if(Array.isArray(response)){
      setMessagesErrorModal(response)
      setShowModal(true)
    }else{
      RouterUtil.goToPage(history, "login")
    }
  }

  const updateUser = async (user: User) => {
    if(user.account){
      user.account.id = idAccoutEdit
    }

    user.id = idEdit
    const response = await service.update(user)
    
    if(Array.isArray(response)){
      setMessagesErrorModal(response)
      setShowModal(true)
    }else{
      localStorageUserEditUtils.setId(null)
      RouterUtil.returnOfLastPage(history)
    }
  }

  return(
    <>
      
      <PopupComponent isOpen={showModalDate}
        onDidDismiss={() => { setShowModalDate(false); } }
        content={<DateComponent type="date" value={date} valueChange={() => {}}></DateComponent>}
        titleText={"Selecione uma data"} 
        valueChangePopup={(e) => setDate(e)}
        validateValue={() => {console.log("validate")}}      
      ></PopupComponent>

      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal} 
        titleText={ isEditMode ? "Não foi possível atualizar os dados" : "Não foi possível realizar o cadastro"}      
      />
      <HeaderComponent showCircleImage={false}></HeaderComponent>

      <div className="contentSingUp">
        <main>
          <h1 className="titleText">{ isEditMode? "Editar dados" : "Cadastro"}</h1>

          <div className="inputsSection">
            <TextInputComponent
              value={name}
              textLabel="Nome Completo"
              placeHolder="Nome Completo"
              onInputChange={(e) => setName(e)} 
            />

            <InputCpfComponent textLabel="CPF"
                              value={cpf}
                              placeHolder="CPF"
                              onInputChange={(e) => setCpf(e)}
                              ></InputCpfComponent>

            <TextInputComponent
              isReadOnly={true}
              onClick={() => setShowModalDate(true)}
              textLabel="Data de Nascimento"
              placeHolder="Clique aqui para selecionar a data"
              value={DateUtil.formatToDDMMYYYYAndDay(date)}
              onInputChange={(e) => setDate(date)} 
            />

            <TextInputComponent
              value={email}
              textLabel="E-mail"
              placeHolder="email@dominio.com.br"
              onInputChange={(e) => setEmail(e)}
            />

            <TextInputComponent 
              textLabel="Senha"
              typeInput="password"
              placeHolder={isEditMode ? "Digite sua nova senha..." : "Digite sua senha..."}
              maxlength={26}
              onInputChange={(e) => setSenha(e)}
            />

            <TextInputComponent 
              textLabel="Confirme sua Senha"
              typeInput="password"
              placeHolder={isEditMode ? "Confirme sua nova senha..." : "Confirme sua senha..."}
              maxlength={26}
              onInputChange={(e) => setSenhaConfirm(e)}
            />
          </div>

          <div className="buttonActions">
            {isEditMode ? 
              (
                <ButtonComponent width="300px" text="Salvar" onClick={createNewUser}/>
              ) 
              : 
              (
                <ButtonComponent width="300px" text="Criar" onClick={createNewUser}/>

              )
            }

          </div>
          
        </main>
      </div>
    </>
  )
}

export default SingUpPage;