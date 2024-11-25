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
import InputCepComponent from "../../basicComponents/input-cep-component/input.cep.component";
import EventCategory from "../../../../Models/Event/event.category.entity";
import InstitutionService from "../../../../Service/Instituition/institution.service";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import LocalStorageMemberUtils from "../../../../Utils/LocalStorage/local.storage.member.utils";
import LocalStorageEventEditUtils from "../../../../Utils/LocalStorage/local.storage.event.edit.utils"
import ImageUtils from "../../../../Utils/image/image.utils";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const EventRegisterPage: React.FC<{}> = () => {

    const service = new EventService()
    const history = useHistory()

    const [showModalDate, setShowModalDate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

    const stateService = new StateService()
    const [categorys, setCategorys] = useState<EventCategory[]>([])
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<Date>();

    // Value

    const [name, setName] = useState<string>("")
    const [dateTime, setDateTime] = useState<Date>();
    const [state, setState] = useState<State>()
    const [category, setCategory] = useState<EventCategory>()
    const [city, setCity] = useState<City>()
    const [neighborhood, setNeighborhood] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [cep,setCep] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<File>()
    const [urlImagem, setUrlImage] = useState<string>()

    const [idEvent,setIdEvent] = useState<number>()
    const [idAddress,setIdAddress] = useState<number | undefined>()

    const [isEditMode,setIsEditMode] = useState<boolean>(false)

    const localStorageEventEditUtils = new LocalStorageEventEditUtils()

    const loadStates = async () => {
        setStates(await stateService.list())
    }

    const loadEventCategoryList = async () => {
        const institutionService = new InstitutionService()
        const localStorageInstituionUtils = new LocalStorageInstituionUtils()
        const idInstituition = localStorageInstituionUtils.getId()
        let institution = new Institution()

        if(idInstituition){
            institution = await institutionService.getById(idInstituition) || new Institution()
        }

        institution.eventCategoryList = institution.eventCategoryList.map( e => {
            const eventCategory = new EventCategory()
            eventCategory.id = e.id
            eventCategory.name = e.name
            eventCategory.institution = e.institution

            return eventCategory
        } )

        setCategorys(institution.eventCategoryList)
    }

    useEffect(() => {
        loadStates()
        loadEventCategoryList()
        loadEventIfIsEditMode()
    }, []);

    useEffect(() => {
        fillDateTime()
    }, [date, time]);

    const loadEventIfIsEditMode = () => {
        const idEventEditMode = localStorageEventEditUtils.getId()

        if(idEventEditMode){
            setIsEditMode(true)
            loadEvent(idEventEditMode)
        }
    }

    const loadEvent = async (idEvent: number) => {
       const event = await service.getById(idEvent)

       if(event){
            setName(event.name ? event.name : "")
            setDate(event.dateTimeOfExecution)

            if (!(event.dateTimeOfExecution instanceof Date)) {
                const dateString = event.dateTimeOfExecution + ""
                event.dateTimeOfExecution = new Date(dateString);
            }

            setIdEvent(event.id)
            setIdAddress(event.address?.id)
            setDateTime(event.dateTimeOfExecution);
            setTime(event.dateTimeOfExecution)
            setState(event.address?.city?.state)
            stateChange(event.address?.city?.state)
            setCategory(event.eventCategory)
            setCity(event.address?.city)
            setNeighborhood(event.address?.neighborhood ? event.address?.neighborhood : "")
            setStreet(event.address?.street ? event.address?.street : "")
            setNumber(event.address?.number ? event.address?.number : "")
            setCep(event.address?.cep ? event.address?.cep : "")
            setDescription(event.description ? event.description : "")
            setUrlImage(ImageUtils.getImageByUrl(event.image?.url))
       }
    }

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

            const dateFormated = new Date(date)

            setDateTime(new Date(
                dateFormated.getFullYear(),
                dateFormated.getMonth(),
                dateFormated.getDate(),
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
            cep,
            description,
            image,
            category
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
        const localStorageMember = new LocalStorageMemberUtils()

        const event = new Event();
        event.name = name;
        event.description = description;
        event.dateTimeOfExecution = dateTime
        event.address = new Address(neighborhood, street, number, cep, city)
        event.eventCategory = category

        const idInstituition = localStorageInstitution.getId()

        if(idInstituition){
            event.institution = new Institution(idInstituition)
        }
        
        const idMember = localStorageMember.getItem()

        if(idMember){
            event.member = new Member(idMember)
        }

        return event
    }

    const register = async () => {
        if (applyRegisterValidation()) {
            const event = createNewEvent()

            const response = await service.save(event, image)
            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
            }else{
                RouterUtil.goToPage(history,"inst-page")
            }
        }
    }

    const updateEvent = async () => {
        if (applyRegisterValidation()) {
            const event = createNewEvent()
            event.id = idEvent

            if(event.address){
                event.address.id = idAddress
            }

            const response = await service.update(event, image)

            if(Array.isArray(response)){
                setMessagesErrorModal(response)
                setShowModal(true)
            }else{
                localStorageEventEditUtils.setId(null)
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
            
            <HeaderComponent executeBeforeArrowclicked={() => {localStorageEventEditUtils.setId(null)}} type='simple' showCircleImage={false}></HeaderComponent>

            <div className="contentInstitutionRegister">
                <main>
                    <h1 className="mainTitle">{isEditMode ? "Editar Evento" : "Cadastro de Evento"}</h1>


                    <div className="inputsSection" >
                        <TextInputComponent
                            value={name}
                            textLabel="Nome do evento"
                            placeHolder="Nome do evento"
                            onInputChange={(e) => setName(e)}
                        />

                        <TextAreaInputComponent
                            value={description}
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
                            hour={time?.getHours ? time.getHours() +"" : "00"}
                            minute={time?.getMinutes ? time.getMinutes() +"" : "00"}
                            onTimeChangeString={(hour, minute) => { }}
                            onTimeChange={(e) => setTime(e)}
                        />

                        <SelectInputComponent
                            value={category?.id}
                            textLabel='Categoria'
                            placeHolder='Categoria'
                            itens={categorys}
                            onInputChange={(e) => setCategory(e)}
                        ></SelectInputComponent>

                        <SelectInputComponent
                            textLabel='Estado'
                            placeHolder='Estado'
                            value={state?.id}
                            itens={states}
                            onInputChange={stateChange}
                        ></SelectInputComponent>

                        <SelectInputComponent
                            disabled={state == undefined}
                            textLabel='Cidade'
                            placeHolder='Cidade'
                            value={city?.id}
                            itens={cities}
                            onInputChange={setCity}
                        ></SelectInputComponent>

                        <TextInputComponent
                            value={neighborhood}
                            textLabel='Bairro'
                            placeHolder='Bairro'
                            onInputChange={(e) => setNeighborhood(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            value={street}
                            textLabel='Rua'
                            placeHolder='Rua'
                            onInputChange={(e) => setStreet(e)}
                        ></TextInputComponent>

                        <TextInputComponent
                            value={number}
                            textLabel='Número'
                            placeHolder='Número'
                            onInputChange={(e) => setNumber(e)}
                        ></TextInputComponent>

                        <InputCepComponent textLabel="CEP"
                              value={cep}
                              placeHolder="CEP"
                              onInputChange={(e) => setCep(e)}
                        ></InputCepComponent>

                        <UploadImageComponent
                            value={urlImagem}
                            text="Imagem do evento"
                            onInputChange={setImage}
                        ></UploadImageComponent>
                    </div>

                    <div className="buttonActions">
                        {isEditMode ? (
                             <ButtonComponent width="230px" text="Salvar alterações" onClick={() => {updateEvent()}} />
                        ) : (
                            <ButtonComponent width="230px" text="Criar" onClick={() => {register()}} />
                        )}
                    </div>
                </main>

            </div>

            <PopupComponent isOpen={showModalDate}
                onDidDismiss={() => { setShowModalDate(false); }}
                content={<DateComponent type="date" value={date} valueChange={() => { }}></DateComponent>}
                titleText={"Selecione uma data"}
                valueChangePopup={(e) => setDate(e)}
                validateValue={() => { console.log("validate") }}
            ></PopupComponent>
        </>
    )
}

export default EventRegisterPage;