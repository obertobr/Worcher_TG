import ButtonComponent from "../../basicComponents/button-component/button.components";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component";

import "./singupPageFooter.css";
import "./singupPageMain.css";

const SingUpPage: React.FC<{}> = () => {

  const handleInputChange = (event: string) => {
        
  };

  return(
    <>
      <div className="contentSingUp">
        <main>
          <h1>Cadastro</h1>

          <div className="inputsSection">
            <TextInputComponent
              textLabel="Nome Completo"
              placeHolder="Nome Completo"
              onInputChange={handleInputChange} 
            />

            <TextInputComponent
              textLabel="CPF"
              placeHolder="CPF"
              onInputChange={handleInputChange} 
            />

            <TextInputComponent
              textLabel="Data de Nascimento"
              placeHolder="__ /__ /____"
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
              onInputChange={handleInputChange}
            />

            <TextInputComponent 
              textLabel="Confirme sua Senha"
              typeInput="password"
              placeHolder="Confirme sua senha..."
              onInputChange={handleInputChange}
            />
          </div>

          <div className="buttonActions">
            <ButtonComponent width="168px" text="Cancelar" onClick={() => {} }/>
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