import { IonButton } from "@ionic/react";

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

const SingUpPage: React.FC<{}> = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModalDate, setShowModalDate] = useState(false);

  // VALUES of Singup

  const [date, setDate] = useState<Date>();

  const handleInputChange = (event: string) => {
        
  };

  const cpfInputChange = (event: string) => {
    
  }

 

  const dateValueChangePopup = (e: Date) => {
    setDate(e)
  }

  return(
    <>
      
      <PopupComponent isOpen={showModalDate}
      onDidDismiss={() => { setShowModalDate(false); } }
      content={<DateComponent type="date" valueChange={() => {}}></DateComponent>}
      titleText={"Selecione uma data"} 
      valueChangePopup={(e) => dateValueChangePopup(e)}
      validateValue={() => {console.log("validate")}}      
      ></PopupComponent>

      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={["Senha não informada", "Email invalido"]} 
        titleText={"Não foi possível realizar o cadastro"}      
      />

      <div className="contentSingUp">
        <main>
          <h1 className="titleText">Cadastro</h1>

          <div className="inputsSection">
            <TextInputComponent
              textLabel="Nome Completo"
              placeHolder="Nome Completo"
              onInputChange={handleInputChange} 
            />

            <InputCpfComponent textLabel="CPF"
                              placeHolder="CPF"
                              onInputChange={cpfInputChange}
                              ></InputCpfComponent>

            {/* */}

            <TextInputComponent
              isReadOnly={true}
              onClick={() => setShowModalDate(true)}
              textLabel="Data de Nascimento"
              placeHolder="Clique aqui para selecionar a data"
              value={DateUtil.formatToDDMMYYYYAndDay(date)}
              onInputChange={handleInputChange} 
            />

            <TextInputComponent 
              textLabel="E-mail"
              placeHolder="email@dominio.com.br"
              onInputChange={handleInputChange}
            />

            <TextInputComponent 
              textLabel="Senha"
              typeInput="password"
              placeHolder="Digite sua senha..."
              maxlength={26}
              onInputChange={handleInputChange}
            />

            <TextInputComponent 
              textLabel="Confirme sua Senha"
              typeInput="password"
              placeHolder="Confirme sua senha..."
              maxlength={26}
              onInputChange={handleInputChange}
            />
          </div>

          <div className="buttonActions">
            <ButtonComponent width="168px" text="Cancelar" isCancel={true} onClick={() => {} }/>
            <ButtonComponent width="168px" text="Criar" onClick={() => {} }/>
          </div>
          
        </main>

        {/* <footer>
          <div className="squareBackground" />
        </footer> */}
      </div>
    </>
  )
}

export default SingUpPage;