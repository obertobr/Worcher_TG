import "./eventCard.css"
import image from "../../../assets/ministerioJovem.jpg"
import ButtonComponent from "../button-component/button.components"
import DateUtil from "../../../../Utils/DateUtil"
import EventCategory from "../../../../Models/Event/event.category.entity"
import EventService from "../../../../Service/Event/event.service"
import LocalStorageMemberUtils from "../../../../Utils/LocalStorage/local.storage.member.utils"
import Member from "../../../../Models/User/member.entity"
import ImageUtils from "../../../../Utils/image/image.utils"

interface EventCardProps {
    id: number | undefined,
    name: string | undefined
    creationDateTime: Date | undefined,
    dateTimeOfExecution: Date | undefined,
    category: EventCategory | undefined,
    memberId: number | undefined,
    memberList: Member[] | undefined,
    urlImage: string | undefined,
    changeParticipate?: () => {},
    viewEventClicked: (idEvent: number | undefined) => void
}
const EventCard: React.FC<EventCardProps> = ({
    id,
    name,
    creationDateTime,
    dateTimeOfExecution,
    category,
    memberId,
    memberList = [],
    urlImage,
    changeParticipate,
    viewEventClicked
}) => {

    const eventService = new EventService()
    const localStorageMember = new LocalStorageMemberUtils()

    const creationDateTimeFormated = DateUtil.formatToDDMMYYYY(creationDateTime ? creationDateTime : new Date())
    const dateTimeOfExecutionFormated = DateUtil.formatToDDMMYYYY(dateTimeOfExecution ? dateTimeOfExecution : new Date())
    const differenceTime = DateUtil.getRelativeTime(creationDateTime ? creationDateTime : new Date())

    const joinMemberInEvent = async () => {
        const idMember = localStorageMember.getItem()

        if(idMember && id)
            await eventService.addMemberToEvent(id,idMember)

        if(changeParticipate)
            changeParticipate()
    }

    const removeMemberFromEvent = async () => {
        const idMember = localStorageMember.getItem()

        if(idMember && id)
            await eventService.removeMemberFromEvent(id,idMember)

        if(changeParticipate)
            changeParticipate()
    }

    return (
        <>
            <div className="cardComponentContainer">
                <div className="dateCreation">
                    <p>{creationDateTimeFormated}</p>
                    <p>{differenceTime}</p>
                </div>

                <img onClick={() => viewEventClicked(id)} className="eventImage" src={ImageUtils.getImageByUrl(urlImage)} alt="image event"/>

                <h3 className="nameEvent">{name}</h3>
                <p className="dateExec">{"Data de Realização: " +  dateTimeOfExecutionFormated}</p>
                <p className="dateExec">{"Categoria: " + category?.name}</p>

                {
                    memberId == localStorageMember.getItem() ? (
                        <>
                        <ButtonComponent text={"Editar Evento"}
                                 width={"200px"} 
                                 onClick={() => {console.log("Editar")}}
                            ></ButtonComponent>
                        </>
                    ) : 
                    memberList.findIndex( e => e.id == localStorageMember.getItem()) != -1 ? (
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

            </div>
        </>
    )
}

export default EventCard