import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components"
import SelectInputComponent from "../../basicComponents/select-input-component/select.input.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import TextAreaInputComponent from "../../basicComponents/textarea-input-component/textarea.input.component";
import UploadImageComponent from "../../basicComponents/upload-image-component/uploadImage.input.component";
import State from "../../../../Models/Address/state.entity"
import City from "../../../../Models/Address/city.entity"
import StateService from "../../../../Service/Address/state.service"
import "./intitutionRegisterContent.css"
import selectInputItens from "../../../../Models/Interfaces/selectInput";


const InstitutionRegister: React.FC<{}> = () => {
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>()

    const loadStates = async () => {
        const stateService = new StateService()
        setStates(await stateService.list())
    }

    useEffect(() => {
        loadStates()
    }, []);

    const handleInputChange = (event: string) => {
    };

    const itens: selectInputItens[] = [
        {
            id: 1,
            getDisplayName: () => {
                return "Cidade 1"
            }
        },
        {
            id: 2,
            getDisplayName: () => {
                return "Cidade 2"
            }
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
                            itens={states}
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

                        <UploadImageComponent
                            textLabel='Imagem da Instituição'
                            text="Imagem da Instituição"
                            onInputChange={handleInputChange}
                        ></UploadImageComponent>
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