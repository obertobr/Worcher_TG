import { useEffect, useState } from "react";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import { useHistory } from "react-router";
import LocalStorageEventViewUtils from "../../../../Utils/LocalStorage/local.storage.event.view.utils";
import EventService from "../../../../Service/Event/event.service";
import Event from "../../../../Models/Event/event.entity";
import ImageUtils from "../../../../Utils/image/image.utils";
import "./viewEvent.css"
import DateUtil from "../../../../Utils/DateUtil";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import LocalStorageMemberUtils from "../../../../Utils/LocalStorage/local.storage.member.utils";
import UserService from "../../../../Service/User/user.service";
import User from "../../../../Models/User/user.entity";
import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import FullScreenLoader from "../../basicComponents/layoutComponents/full-screen-loader/full.screen.loader.component";
import LocalStorageEventEditUtils from "../../../../Utils/LocalStorage/local.storage.event.edit.utils";

const ViewEventPage: React.FC<{}> = () => {

  const history = useHistory()
  const eventService = new EventService()
  const localStorageMember = new LocalStorageMemberUtils()
  const service = new EventService()
  const localStorageLoginUtils = new LocalStorageLoginUtils()
  const localStorageEventEditUtils = new LocalStorageEventEditUtils()

  const [event,setEvent] = useState<Event | undefined>()
  const [user,setUser] = useState<User | undefined>()
  const [isParticipantsVisible, setIsParticipantsVisible] = useState(false); 

  useEffect( () => {
    const localStorageEventViewUtils = new LocalStorageEventViewUtils()
    const idEvent = localStorageEventViewUtils.getId()

    if(idEvent)
        loadEvent(idEvent)

  }, [])

  const loadEvent = async (idEvent: number) => {
    const event = await service.getById(idEvent)
    setEvent(event)

    const userService = new UserService()
    const idUser = event?.member?.user?.id


    if(idUser){
      const user = await userService.getById(idUser)
      setUser(user)
    }
  }

  const joinMemberInEvent = async () => {
    const idMember = localStorageMember.getItem()

    if(idMember && event?.id){
        await eventService.addMemberToEvent(event?.id,idMember)
        loadEvent(event?.id)
    }
}

const removeMemberFromEvent = async () => {
    const idMember = localStorageMember.getItem()

    if(idMember){
        if(event?.id){
            await eventService.removeMemberFromEvent(event?.id,idMember)
            loadEvent(event?.id)
        }
    }else if(event?.id){
        const idUserLocalStorage = localStorageLoginUtils.getIdUser()
        if(idUserLocalStorage){
            await eventService.removeMemberFromEventByUserId(event?.id,idUserLocalStorage)
        }

        RouterUtil.goToPage(history,"myeventspage")
    }
}

const editarEvento = () => {
    if(event?.id){
        localStorageEventEditUtils.setId(event.id)
        RouterUtil.goToPage(history,"event-register")
    }
}

const excluirEvento = async () => {
    if(event?.id){
        await service.delete(event.id)
        RouterUtil.returnOfLastPage(history)
    }
}


  return(
    <>
    <HeaderComponent showCircleImageIfExistsCircleImage={true}  circleImage={user?.image?.url} showArrowBack={true} type='complex' showCircleImageJustImageExists={!!event && !!user} backgroungImage={ImageUtils.getImageByUrl(event?.image?.url)}></HeaderComponent>

        {
            !!event && !!user ? 
            
            (
            <main className="mainViewEvent">
                    <h3 className="nameUser">{event?.member?.user?.name}</h3>
                    <p>{ DateUtil.formatToDDMMYYYY(event?.creationDateTime ? event?.creationDateTime : new Date())}</p>

                    <h1 className="eventName">{event?.name}</h1>
                    <p className="description">{event?.description}</p>

                    <div className="infoContent">
                        <p>Categoria:</p>
                        <p>{event?.eventCategory?.name}</p>
                    </div>

                    <div className="infoContent">
                        <p>Hora:</p>
                        <p>{DateUtil.formatToTime(event?.dateTimeOfExecution ? event?.dateTimeOfExecution : new Date())}</p>
                    </div>

                    <div className="infoContent">
                        <p>Data:</p>
                        <p>{ DateUtil.formatToDDMMYYYY(event?.dateTimeOfExecution ? event?.dateTimeOfExecution : new Date())}</p>
                    </div>

                    <div className="infoContentLocal">
                        <p>Local</p>

                        <p>{"Cidade: " + event?.address?.city?.name + ", Bairro: " + event?.address?.neighborhood +
                        ", Rua: " + event?.address?.street + ", N°: " + event?.address?.number + ", CEP: " +
                        event?.address?.cep
                        }
                    </p>
                    </div>

                    <div className="infoContent">
                        <p>N° de Participantes:</p>

                        <p>{event?.registeredMemberList.length}
                    </p>
                    </div>

                    {
                        event?.member?.user?.id == localStorageLoginUtils.getIdUser() ? 
                        (
                            <div className="togle">
                                <div className="toggle-header" 
                                    onClick={() => setIsParticipantsVisible(!isParticipantsVisible)}
                                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                                >
                                <span className="togleText" style={{ marginRight: "8px" }}>{isParticipantsVisible ? "▼" : "▶"}</span>
                                <span className="togleText">Participantes</span>
                                </div>

                                {isParticipantsVisible && (
                                    <ul className="participant-list" style={{ listStyleType: "none", padding: "10px", marginTop: "10px" }}>
                                        {event?.registeredMemberList.map((member, index) => (
                                        <li key={index} style={{ padding: "5px 0", borderBottom: "1px solid #ccc" }}>
                                            {member.user?.name}
                                        </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) 
                        : 
                        (<></>)
                    }


                    {
                            event?.member?.user?.id == localStorageLoginUtils.getIdUser() ? (
                                <>
                                    <div className="buttonsCreator">
                                        <ButtonComponent text={"Editar"}
                                                width={"250px"} 
                                                onClick={editarEvento}
                                            ></ButtonComponent>

                                        <ButtonComponent text={"Excluir"}
                                                isCancel={true}
                                                width={"250px"} 
                                                onClick={excluirEvento}
                                            ></ButtonComponent>
                                    </div>
                                </>
                            ) : 
                            event?.registeredMemberList.findIndex( e => e.user?.id == localStorageLoginUtils.getIdUser()) != -1 ? (
                                <>
                                    <ButtonComponent text={"Cancelar Participação"}
                                        isCancel={true}
                                        width={"200px"} 
                                        onClick={removeMemberFromEvent}
                                    ></ButtonComponent>
                                </>
                            ) : (
                                <>
                                    <ButtonComponent text={"Participar"} 
                                        width={"200px"} 
                                        onClick={joinMemberInEvent}
                                    ></ButtonComponent>
                                </>
                            )
                        }
            </main>

            ) 
            
            : 
            
            (
                <FullScreenLoader value={event}></FullScreenLoader>
            )
        }

    </>
  )
}

export default ViewEventPage;