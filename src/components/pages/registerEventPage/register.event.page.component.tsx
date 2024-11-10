import { useEffect, useState } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components"
import SelectInputComponent from "../../basicComponents/select-input-component/select.input.component";
import TextInputComponent from "../../basicComponents/text-input-component/text.input.component"
import TextAreaInputComponent from "../../basicComponents/textarea-input-component/textarea.input.component";
import UploadImageComponent from "../../basicComponents/upload-image-component/uploadImage.input.component";
import State from "../../../../Models/Address/state.entity"
import City from "../../../../Models/Address/city.entity"
import StateService from "../../../../Service/Address/state.service"
import "./registerEventContent.css"
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import DateUtil from "../../../../Utils/DateUtil";
import PopupComponent from "../../basicComponents/popup-component/popup.component";
import DateComponent from "../../basicComponents/date-component/date.component";
import HourMinuteSelectorComponent from "../../basicComponents/time-component/time.component";
import RegisterEventValidation from "../../../classes/validation/registerEvent.validation";
import AlertComponent from "../../basicComponents/alert-component/alert.component";
import Event from "../../../../Models/Event/event.entity";
import Address from "../../../../Models/Address/address.entity";
import EventService from "../../../../Service/Event/event.service"
import Institution from "../../../../Models/Instituition/institution.entity";
import Member from "../../../../Models/User/member.entity";
import localStorageInstitutionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";


const EventRegisterPage: React.FC<{}> = () => {

    const [showModalDate, setShowModalDate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    const stateService = new StateService()
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<Date>();

    // Value

    const [name, setName] = useState<string>("")
    const [dateTime, setDateTime] = useState<Date>();
    const [state, setState] = useState<State>()
    const [city, setCity] = useState<City>()
    const [neighborhood, setNeighborhood] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<File>()

    const loadStates = async () => {

        setStates(await stateService.list())
    }

    useEffect(() => {
        loadStates()
    }, []);

    useEffect(() => {
        fillDateTime()
    }, [date, time]);

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

    const fillDateTime = () => {
        if (date && time) {
            setDateTime(new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds()
            ))
        }
    }

    const applyRegisterValidation = () => {
        const registerValidation = new RegisterEventValidation()
        registerValidation.validate(
            name,
            date,
            time,
            state,
            city,
            neighborhood,
            street,
            number,
            description,
            image
        )

        if (registerValidation.hasErrors()) {
            setMessagesErrorModal(registerValidation.errors)
            setShowModal(true)

            return false
        }

        return true
    }
    
    const createNewEvent = (): Event => {
        const localStorageInstitution = new localStorageInstitutionUtils()
        const LocalStorageLogin = new LocalStorageLoginUtils()

        const event = new Event();
        event.name = name;
        event.description = description;
        event.dateTimeOfExecution = dateTime
        event.address = new Address(neighborhood, street, number, "", city)

        event.institution = new Institution(localStorageInstitution.getId())
        event.member = new Member(LocalStorageLogin.getIdUser())

        return event
    }

    const register = async () => {
        if (applyRegisterValidation()) {
            const event = createNewEvent()

            const service = new EventService()
            const response = await service.save(event, image)
            console.log(response)
            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
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
            
            <HeaderComponent type='simple' showCircleImage={false}></HeaderComponent>

            <div className="contentInstitutionRegister">
                <main>
                    <h1 className="mainTitle">Cadastro de Evento</h1>


                    <div className="inputsSection" >
                        <TextInputComponent
                            textLabel="Nome do evento"
                            placeHolder="Nome do evento"
                            onInputChange={(e) => setName(e)}
                        />

                        <TextAreaInputComponent
                            textLabel='Descrição'
                            placeHolder='Descreva seu evento em detalhes aqui...'
                            onInputChange={(e) => setDescription(e)}
                        ></TextAreaInputComponent>

                        <TextInputComponent
                            isReadOnly={true}
                            onClick={() => setShowModalDate(true)}
                            textLabel="Data do evento"
                            placeHolder="Clique aqui para selecionar a data"
                            value={DateUtil.formatToDDMMYYYYAndDay(date)}
                        />

                        <HourMinuteSelectorComponent
                            label="Selecione a hora"
                            onTimeChangeString={(hour, minute) => { }}
                            onTimeChange={(e) => setTime(e)}
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
                            onInputChange={setCity}
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



                        <UploadImageComponent
                            text="Imagem do evento"
                            onInputChange={setImage}
                        ></UploadImageComponent>
                    </div>

                    <div className="buttonActions">
                        <ButtonComponent width="230px" text="Criar" onClick={() => {register()}} />
                    </div>

                </main>


            </div>

            <PopupComponent isOpen={showModalDate}
                onDidDismiss={() => { setShowModalDate(false); }}
                content={<DateComponent type="date" valueChange={() => { }}></DateComponent>}
                titleText={"Selecione uma data"}
                valueChangePopup={(e) => setDate(e)}
                validateValue={() => { console.log("validate") }}
            ></PopupComponent>
        </>
    )
}

export default EventRegisterPage;