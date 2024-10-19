import ButtonComponent from "../../basicComponents/button-component/button.components"
import CheckBoxComponent from "../../basicComponents/check-box-component/check.box.component"
import LinkTextComponent from "../../basicComponents/link-text-component/link.text.component"
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import "./loginPageContent.css"
import "./loginPageHeader.css"
import "./loginPageMain.css"


const LoginPage: React.FC<{}> = () => {

    const handleInputChange = (event: string) => {
        
    };
    
    return (
        <>
            <div className="contentLogin">
                <header>
                    <div className="squareBackground">
                        
                    </div>

                    <div className="logo">
                        Logo
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
                              onInputChange={handleInputChange}
                    ></TextInputComponent>

                    <TextInputComponent 
                              textLabel='Senha'
                              typeInput='password'
                              placeHolder='Digite sua senha...'
                              onInputChange={handleInputChange}
                    ></TextInputComponent>
                </div>

                    <div className="actionsSenha">
                        <CheckBoxComponent textCheckBox="Lembrar dados" />

                        <LinkTextComponent text="Esqueceu a senha?" onClick={() => {} } />
                    </div>

                <div className="buttonActions">
                    <ButtonComponent width="230px" text="Entrar" onClick={() => {} } />
                    <LinkTextComponent text="Novo Cadastro? Crie sua conta aqui." onClick={() => {} } />
                </div>

                </main>


            </div>
        </>
    )
}

export default LoginPage;