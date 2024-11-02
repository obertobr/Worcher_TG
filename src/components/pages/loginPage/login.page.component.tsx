import { useState } from "react"
import UserService from "../../../../Service/User/user.service"
import ButtonComponent from "../../basicComponents/button-component/button.components"
import CheckBoxComponent from "../../basicComponents/check-box-component/check.box.component"
import LinkTextComponent from "../../basicComponents/link-text-component/link.text.component"
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import "./loginPageContent.css"
import "./loginPageHeader.css"
import "./loginPageMain.css"
import AlertComponent from "../../basicComponents/alert-component/alert.component"
import LoginValidation from "../../../classes/validation/login.validation"
import logo from "../../../assets/logo.jpg"

const LoginPage: React.FC<{}> = () => {

    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    // VALUES
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        const loginValidation = new LoginValidation()
        loginValidation.validate(email,password)

        if(loginValidation.hasErrors()){
            setMessagesErrorModal(loginValidation.errors)
            setShowModal(true)
        }else{
            const userService = new UserService()
            const response = await userService.login(email,password)

            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
            }else{
                alert("login feito com sucesso!")
            }
        }
    }
    
    return (
        <>
            <AlertComponent
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                messages={messagesErrorModal} 
                titleText={"Não foi possível realizar o cadastro"}      
            />

            <div className="contentLogin">
                <header>
                    <div className="squareBackground">
                        
                    </div>

                    <div className="logo">
                        <img className="logoImage" src={logo} alt="logo" />
                    </div>
                </header>

                <main>
                    <h1>
                        Login
                    </h1>


                <div className="inputsSection" >
                    <TextInputComponent 
                              textLabel='Email'
                              placeHolder='Digite seu email...'
                              onInputChange={(e) => setEmail(e)}
                    ></TextInputComponent>

                    <TextInputComponent 
                              textLabel='Senha'
                              typeInput='password'
                              placeHolder='Digite sua senha...'
                              onInputChange={(e) => setPassword(e)}
                    ></TextInputComponent>
                </div>

                    <div className="actionsSenha">
                        <CheckBoxComponent textCheckBox="Lembrar dados" />

                        <LinkTextComponent text="Esqueceu a senha?" onClick={() => {} } />
                    </div>

                <div className="buttonActions">
                    <ButtonComponent width="230px" text="Entrar" onClick={login} />
                    <LinkTextComponent text="Novo Cadastro? Crie sua conta aqui." onClick={() => {} } />
                </div>

                </main>


            </div>
        </>
    )
}

export default LoginPage;