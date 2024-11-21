import { useEffect, useState } from "react"
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
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils"
import Account from "../../../../Models/User/account.entity"
import RouterUtil from "../../../../Utils/Components/RouterUtil"
import { useHistory } from "react-router"
import User from "../../../../Models/User/user.entity"

const LoginPage: React.FC<{}> = () => {

    const history = useHistory();
    const localStorageLoginUtils = new LocalStorageLoginUtils();

    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    // VALUES
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberData,setRememberData] = useState<boolean>(localStorageLoginUtils.getRememberData())

    useEffect(() => {
        if(rememberData){
           const account = localStorageLoginUtils.getAccount()

           if(account){
                setEmail(account.email ? account.email : "")
                setPassword(account.password ? account.password : "")
           }
        }
    },[])

    const applyLoginValidation = () => {
        const loginValidation = new LoginValidation()
        loginValidation.validate(email,password)

        if(loginValidation.hasErrors()){
            setMessagesErrorModal(loginValidation.errors)
            setShowModal(true)

            return false
        }

        return true
    }

    const login = async () => {
        if(applyLoginValidation()){
            const userService = new UserService()
            const response = await userService.login(email,password)

            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
            }else{
                executeAfterLogin(response)
            }
        }
    }

    const executeAfterLogin = (user: User | null) => {
        localStorageLoginUtils.setRememberData(rememberData)

        if(rememberData){
            const account = new Account()
            account.email = email
            account.password = password

            localStorageLoginUtils.setAccount(account)
        }

        localStorageLoginUtils.setIdUser(user?.id ? user.id : undefined)
        
        RouterUtil.goToPage(history,"my-institution")
    }
    
    return (
        <>
            <AlertComponent
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                messages={messagesErrorModal} 
                titleText={"Não foi possível realizar o login"}      
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
                              value={email}
                              textLabel='Email'
                              placeHolder='Digite seu email...'
                              onInputChange={(e) => setEmail(e)}
                    ></TextInputComponent>

                    <TextInputComponent 
                            value={password}
                              textLabel='Senha'
                              typeInput='password'
                              placeHolder='Digite sua senha...'
                              onInputChange={(e) => setPassword(e)}
                    ></TextInputComponent>
                </div>

                    <div className="actionsSenha">
                        <CheckBoxComponent value={rememberData} textCheckBox="Lembrar dados" changeValue={(e: boolean) => {setRememberData(e)}}  />

                        <LinkTextComponent text="Esqueceu a senha?" onClick={() => {RouterUtil.goToPage(history, "rememberPassword")} } />
                    </div>

                <div className="buttonActions">
                    <ButtonComponent width="230px" text="Entrar" onClick={login} />
                    <LinkTextComponent text="Novo Cadastro? Crie sua conta aqui." onClick={() => {RouterUtil.goToPage(history, "singup")} } />
                </div>

                </main>


            </div>
        </>
    )
}

export default LoginPage;