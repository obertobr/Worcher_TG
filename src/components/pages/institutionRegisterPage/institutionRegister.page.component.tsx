import ButtonComponent from "../../basicComponents/button-component/button.components"
import SelectInputComponent, { selectInputItens } from "../../basicComponents/select-input-component/select.input.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import TextAreaInputComponent from "../../basicComponents/textarea-input-component/textarea.input.component";
import "./intitutionRegisterContent.css"


const InstitutionRegister: React.FC<{}> = () => {

    const handleInputChange = (event: string) => {
    };

    const itens: selectInputItens[] = [
        {
            id: 1,
            name: 'cidade',
        },
        {
            id: 2,
            name: 'cidade 2',
        }
    ];

    return (
        <>
            <div className="contentInstitutionRegister">
                <main>
                    <h1>Cadastro de Instituição</h1>


                    <div className="inputsSection" >
                        <TextInputComponent
                            textLabel="Nome da Instituição"
                            placeHolder="Nome da Instituição"
                            onInputChange={handleInputChange}
                        />

                        <SelectInputComponent
                            textLabel='Estado'
                            placeHolder='Estado'
                            itens={itens}
                            onInputChange={handleInputChange}
                        ></SelectInputComponent>

                        <SelectInputComponent
                            textLabel='Cidade'
                            placeHolder='Cidade'
                            itens={itens}
                            onInputChange={handleInputChange}
                        ></SelectInputComponent>

                        <TextInputComponent
                            textLabel='Bairro'
                            placeHolder='Bairro'
                            onInputChange={handleInputChange}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Rua'
                            placeHolder='Rua'
                            onInputChange={handleInputChange}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Numero'
                            placeHolder='Numero'
                            onInputChange={handleInputChange}
                        ></TextInputComponent>

                        <TextAreaInputComponent
                            textLabel='Descrição'
                            placeHolder='Descrição'
                            onInputChange={handleInputChange}
                        ></TextAreaInputComponent>

                        <TextInputComponent
                            textLabel='Imagem da Instituição'
                            placeHolder='Imagem da Instituição'
                            onInputChange={handleInputChange}
                        ></TextInputComponent>
                    </div>

                    <div className="buttonActions">
                        <ButtonComponent width="230px" text="Cancelar" onClick={() => { }} />
                        <ButtonComponent width="230px" text="Criar" onClick={() => { }} />
                    </div>

                </main>


            </div>
        </>
    )
}

export default InstitutionRegister;