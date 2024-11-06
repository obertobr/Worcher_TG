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


const EventRegisterPage: React.FC<{}> = () => {

    const [showModalDate, setShowModalDate] = useState(false);
    const [showModalDateTime, setShowModalDateTime] = useState(false);

    const stateService = new StateService()
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<Date>();

    // Value

    const [name,setName] = useState<string>("")
    const [dateTime, setDateTime] = useState<Date>();
    const [state,setState] = useState<State>()
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
        const state: State | null = await stateService.getById(event.id)
        setCities(createListOfCity(state?.citiesList))
    };

    const handleInputChange = () => {

    }

    const createListOfCity = (list: City[] | undefined) : City[] => {
        if(!list) return [];

        return list.map( item => {
            const city =  new City()
            city.id = item.id
            city.name = item.name
            return city
        } )
    }

    const fillDateTime = () => {
        if(date && time){
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

    return (
        <>
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
                                onTimeChangeString={(hour, minute) => {}} 
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

                        

                        <UploadImageComponent
                            text="Imagem do evento"
                            onInputChange={setImage}
                        ></UploadImageComponent>
                    </div>

                    <div className="buttonActions">
                        <ButtonComponent width="230px" text="Criar" onClick={() => { }} />
                    </div>

                </main>


            </div>

            <PopupComponent isOpen={showModalDate}
                onDidDismiss={() => { setShowModalDate(false); } }
                content={ <DateComponent type="date" valueChange={() => {}}></DateComponent>}
                titleText={"Selecione uma data"} 
                valueChangePopup={(e) => setDate(e)}
                validateValue={() => {console.log("validate")}}      
            ></PopupComponent>
        </>
    )
}

export default EventRegisterPage;