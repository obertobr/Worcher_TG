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
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import InstitutionRegisterValidation from "../../../classes/validation/institutionRegister.validation";
import AlertComponent from "../../basicComponents/alert-component/alert.component";


const InstitutionRegister: React.FC<{}> = () => {

    const stateService = new StateService()
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])

    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    // Value

    const [nameOfInstitition, setNameOfInstitition] = useState<string>("")
    const [state, setState] = useState<State>()
    const [city, setCity] = useState<City>()
    const [neighborhood, setNeighborhood] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const loadStates = async () => {

        setStates(await stateService.list())
    }

    useEffect(() => {
        loadStates()
    }, []);

    const stateChange = async (event: any) => {
        setState(event)
        const state: State | null = await stateService.getById(event.id)
        setCities(createListOfCity(state?.citiesList))
    };

    const handleInputChange = () => {

    }

    const createListOfCity = (list: City[] | undefined): City[] => {
        if (!list) return [];

        return list.map(item => {
            const city = new City()
            city.id = item.id
            city.name = item.name
            return city
        })
    }

    const applyRegisterValidation = () => {
        const registerValidation = new InstitutionRegisterValidation()
        registerValidation.validate(nameOfInstitition,
            state,
            city,
            neighborhood,
            street,
            number)

        if (registerValidation.hasErrors()) {
            setMessagesErrorModal(registerValidation.errors)
            setShowModal(true)

            return false
        }

        return true
    }

    const register = async () => {
        if (applyRegisterValidation()) {
            // const userService = new UserService()
            // const response = await userService.login(email,password)

            // if(Array.isArray(response)){
            //     setMessagesErrorModal(response)
            //     setShowModal(true)
            // }else{
            //     executeAfterLogin()
            // }
        }
    }

    return (
        <>
            <AlertComponent
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                messages={messagesErrorModal}
                titleText={"Não foi possível realizar o registro da instituição"}
            />

            <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

            <div className="contentInstitutionRegister">
                <main>
                    <h1 className="mainTitle">Cadastro de Instituição</h1>


                    <div className="inputsSection" >
                        <TextInputComponent
                            textLabel="Nome da Instituição"
                            placeHolder="Nome da Instituição"
                            onInputChange={(e) => setNameOfInstitition(e)}
                        />

                        <SelectInputComponent
                            textLabel='Estado'
                            placeHolder='Estado'
                            itens={states}
                            onInputChange={stateChange}
                        ></SelectInputComponent>

                        <SelectInputComponent
                            disabled={state == undefined}
                            textLabel='Cidade'
                            placeHolder='Cidade'
                            itens={cities}
                            onInputChange={handleInputChange}
                        ></SelectInputComponent>

                        <TextInputComponent
                            textLabel='Bairro'
                            placeHolder='Bairro'
                            onInputChange={(e) => setNeighborhood(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Rua'
                            placeHolder='Rua'
                            onInputChange={(e) => setStreet(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Número'
                            placeHolder='Número'
                            onInputChange={(e) => setNumber(e)}
                        ></TextInputComponent>

                        <TextAreaInputComponent
                            textLabel='Descrição'
                            placeHolder='Descrição'
                            onInputChange={(e) => setDescription(e)}
                        ></TextAreaInputComponent>

                        <UploadImageComponent
                            text="Imagem da Instituição"
                            onInputChange={handleInputChange}
                        ></UploadImageComponent>
                    </div>

                    <div className="buttonActions">
                        <ButtonComponent width="230px" text="Criar" onClick={register} />
                    </div>

                </main>


            </div>
        </>
    )
}

export default InstitutionRegister;