import { useState } from "react"
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import "./rememberPasswordPage.css"
import ButtonComponent from "../../basicComponents/button-component/button.components"
import UserService from "../../../../Service/User/user.service"
import AlertComponent from "../../basicComponents/alert-component/alert.component"

const RememberPasswordPageComponent: React.FC<{}> = () => {

    const userService = new UserService()
    const [email, setEmail] = useState<string>()
    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    const applyLoginValidation = async (email: string) => {
        const response = await userService.recoveryPassword(email)

        if(Array.isArray(response)){
            setMessagesErrorModal(response)
            setShowModal(true)

            return false
        }

        return response
    }

    const recoveryPassword = async () => {
        const response = await applyLoginValidation(email ? email : "")

        if(response != false){
            console.log(response)
        }
        
    }

    return (
        <>
            <AlertComponent
                    isOpen={showModal}
                    onDidDismiss={() => setShowModal(false)}
                    messages={messagesErrorModal} 
                    titleText={"Não foi possível recuperar"}      
                />

            <div className="content">
                <h2 className="title" >Insira o email cadastrado para recuperação</h2>

                <TextInputComponent
                                value={email}
                                textLabel=''
                                placeHolder=''
                                onInputChange={(e) => setEmail(e)}
                        ></TextInputComponent>

                <ButtonComponent disabled={!email} width="230px" text="Recuperar" onClick={recoveryPassword} />
            </div>
        </>
    )
}

export default RememberPasswordPageComponent