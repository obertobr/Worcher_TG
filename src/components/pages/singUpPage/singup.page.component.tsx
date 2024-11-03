import ButtonComponent from "../../basicComponents/button-component/button.components";
import DateComponent from "../../basicComponents/date-component/date.component";
import InputCpfComponent from "../../basicComponents/input-cpf-component/input.cpf.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";

import "./singupPageFooter.css";
import "./singupPageMain.css";
import { useState } from "react";
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

const SingUpPage: React.FC<{}> = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const [showModalDate, setShowModalDate] = useState(false);

  // VALUES of Singup

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
    user.account = new Account(email ? email : "",senha ? senha : "");

    user.config = new Config()
    user.config.recieveEmails = false
    user.config.recieveNotifications = false

    const userValidation = new UserValidation();
    userValidation.validate(user,senhaConfirm)

    if(userValidation.errors != null && userValidation.errors.length > 0){
      setMessagesErrorModal(userValidation.errors)
      setShowModal(true)
    }else{
      saveUser(user)
    }  
  }

  const saveUser = async (user: User) => {
    const service = new UserService()
    const response = await service.save(user)
    
    if(Array.isArray(response)){
      setMessagesErrorModal(response)
      setShowModal(true)
    }else{
      alert("Cadastro feito com sucesso!")
      RouterUtil.goToPage(history, "login")
    }
  }

  return(
    <>
      
      <PopupComponent isOpen={showModalDate}
      onDidDismiss={() => { setShowModalDate(false); } }
      content={<DateComponent type="date" valueChange={() => {}}></DateComponent>}
      titleText={"Selecione uma data"} 
      valueChangePopup={(e) => setDate(e)}
      validateValue={() => {console.log("validate")}}      
      ></PopupComponent>

      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal} 
        titleText={"Não foi possível realizar o cadastro"}      
      />
      <HeaderComponent showCircleImage={false}></HeaderComponent>

      <div className="contentSingUp">
        <main>
          <h1 className="titleText">Cadastro</h1>

          <div className="inputsSection">
            <TextInputComponent
              textLabel="Nome Completo"
              placeHolder="Nome Completo"
              onInputChange={(e) => setName(e)} 
            />

            <InputCpfComponent textLabel="CPF"
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
              textLabel="E-mail"
              placeHolder="email@dominio.com.br"
              onInputChange={(e) => setEmail(e)}
            />

            <TextInputComponent 
              textLabel="Senha"
              typeInput="password"
              placeHolder="Digite sua senha..."
              maxlength={26}
              onInputChange={(e) => setSenha(e)}
            />

            <TextInputComponent 
              textLabel="Confirme sua Senha"
              typeInput="password"
              placeHolder="Confirme sua senha..."
              maxlength={26}
              onInputChange={(e) => setSenhaConfirm(e)}
            />
          </div>

          <div className="buttonActions">
            <ButtonComponent width="300px" text="Criar" onClick={createNewUser}/>
          </div>
          
        </main>
      </div>
    </>
  )
}

export default SingUpPage;