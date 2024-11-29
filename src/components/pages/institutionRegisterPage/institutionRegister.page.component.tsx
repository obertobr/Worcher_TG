import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components"
import SelectInputComponent from "../../basicComponents/select-input-component/select.input.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import TextAreaInputComponent from "../../basicComponents/textarea-input-component/textarea.input.component";
import UploadImageComponent from "../../basicComponents/upload-image-component/uploadImage.input.component";
import State from "../../../../Models/Address/state.entity"
import City from "../../../../Models/Address/city.entity"
import StateService from "../../../../Service/Address/state.service"
import InstitutionService from "../../../../Service/Instituition/institution.service"
import "./intitutionRegisterContent.css"
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import InstitutionRegisterValidation from "../../../classes/validation/institutionRegister.validation";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import Institution from "../../../../Models/Instituition/institution.entity";
import Address from "../../../../Models/Address/address.entity";
import LocalStorageInstitutionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils"
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";
import InputCepComponent from "../../basicComponents/input-cep-component/input.cep.component";
import LocalStorageInstitutionEditUtils from '../../../../Utils/LocalStorage/local.storage.institution.edit.utils';
import ImageUtils from "../../../../Utils/image/image.utils";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";


const InstitutionRegister: React.FC<{}> = () => {
    const history = useHistory()

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
    const [cep, setCep] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<File>()
    const [urlImagem, setUrlImage] = useState<string>()

    const [idEvent,setIdEvent] = useState<number>()
    const [idAddress,setIdAddress] = useState<number | undefined>()

    const [IsEditMode, setIsEditMode] = useState<boolean>(false);
    const localStorageInstitutionEditUtils = new LocalStorageInstitutionEditUtils()

    const loadStates = async () => {

        setStates(await stateService.list())
    }

    useEffect(() => {
        loadStates()
        loadInstitutionIfIsEditMode()
    }, []);

    const stateChange = async (event: any) => {
        setState(event)
        const state: State | undefined = await stateService.getById(event.id)
        setCities(createListOfCity(state?.citiesList))
    };

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
            number,
            cep,
            image
        )

        if (registerValidation.hasErrors()) {
            setMessagesErrorModal(registerValidation.errors)
            setShowModal(true)

            return false
        }

        return true
    }

    const createNewInstitution = (): Institution => {
        const institution = new Institution();
        institution.name = nameOfInstitition;
        institution.description = description;
        institution.address = new Address(neighborhood, street, number, cep, city);

        return institution
    }

    const register = async () => {
        if (applyRegisterValidation()) {
            const localStorageLoginUtils = new LocalStorageLoginUtils()
            const userId = await localStorageLoginUtils.getIdUser()
            const institution = createNewInstitution()

            const service = new InstitutionService()
            const response = await service.save({ institution: institution, user: { id: userId } }, image)
            if (Array.isArray(response)) {
                setMessagesErrorModal(response)
                setShowModal(true)
            } else {
                const localStorageInstitutionUtils = new LocalStorageInstitutionUtils()

                if (response?.id) {
                    localStorageInstitutionUtils.setId(response.id)
                }
                RouterUtil.returnOfLastPage(history)
            }
        }
    }

    const loadInstitutionIfIsEditMode = () => {
        const idRoleEditMode = localStorageInstitutionEditUtils.getId()

        if (idRoleEditMode) {
            setIsEditMode(true)
            loadInstitution(idRoleEditMode)
        }
    }

    const loadInstitution = async (idInstitution: number) => {
        const service = new InstitutionService()
        const institution = await service.getById(idInstitution)
        if (institution) {
            setIdEvent(institution.id)
            setIdAddress(institution.address?.id)

            setNameOfInstitition(institution.name || "")
            setState(institution.address?.city?.state)
            stateChange(institution.address?.city?.state)
            setCity(institution.address?.city)
            setNeighborhood(institution.address?.neighborhood || "")
            setStreet(institution.address?.street || "")
            setNumber(institution.address?.number || "")
            setCep(institution.address?.cep || "")
            setDescription(institution.description || "")
            setUrlImage(ImageUtils.getImageByUrl(institution.image?.url))
        }
    }

    const updateEvent = async () => {
        if (applyRegisterValidation()) {
            const institution = createNewInstitution()
            institution.id = idEvent

            if(institution.address){
                institution.address.id = idAddress
            }

            const service = new InstitutionService()
            const response = await service.update(institution, image)

            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
            }else{
                localStorageInstitutionEditUtils.setId(null)
                RouterUtil.returnOfLastPage(history)
            }

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

            <HeaderComponent executeBeforeArrowclicked={() => { localStorageInstitutionEditUtils.setId(null) }} type='simple' showCircleImage={false}></HeaderComponent>

            <div className="contentInstitutionRegister">
                <main>
                    <h1 className="mainTitle">{IsEditMode ? "Editar Instituição" : "Cadastro de Instituição"}</h1>


                    <div className="inputsSection" >
                        <TextInputComponent
                            textLabel="Nome da Instituição"
                            placeHolder="Nome da Instituição"
                            value={nameOfInstitition}
                            onInputChange={(e) => setNameOfInstitition(e)}
                        />

                        <SelectInputComponent
                            textLabel='Estado'
                            placeHolder='Estado'
                            itens={states}
                            value={state?.id}
                            onInputChange={stateChange}
                        ></SelectInputComponent>

                        <SelectInputComponent
                            disabled={state == undefined}
                            textLabel='Cidade'
                            placeHolder='Cidade'
                            itens={cities}
                            value={city?.id}
                            onInputChange={setCity}
                        ></SelectInputComponent>

                        <TextInputComponent
                            textLabel='Bairro'
                            placeHolder='Bairro'
                            value={neighborhood}
                            onInputChange={(e) => setNeighborhood(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Rua'
                            placeHolder='Rua'
                            value={street}
                            onInputChange={(e) => setStreet(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            textLabel='Número'
                            placeHolder='Número'
                            value={number}
                            onInputChange={(e) => setNumber(e)}
                        ></TextInputComponent>

                        <InputCepComponent textLabel="CEP"
                            placeHolder="CEP"
                            value={cep}
                            onInputChange={(e) => setCep(e)}
                        ></InputCepComponent>

                        <TextAreaInputComponent
                            textLabel='Descrição'
                            placeHolder='Descrição'
                            value={description}
                            onInputChange={(e) => setDescription(e)}
                        ></TextAreaInputComponent>

                        <UploadImageComponent
                            text="Imagem da Instituição"
                            value={urlImagem}
                            onInputChange={setImage}
                        ></UploadImageComponent>
                    </div>

                    <div className="buttonActions">
                        {IsEditMode ?
                            <ButtonComponent width="230px" text="Salvar alterações" onClick={updateEvent} />
                            :
                            <ButtonComponent width="230px" text="Criar" onClick={register} />
                        }
                    </div>

                </main>


            </div>
        </>
    )
}

export default InstitutionRegister;