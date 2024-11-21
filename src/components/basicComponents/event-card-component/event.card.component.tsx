import "./eventCard.css"
import image from "../../../assets/ministerioJovem.jpg"
import ButtonComponent from "../button-component/button.components"
import DateUtil from "../../../../Utils/DateUtil"
import EventCategory from "../../../../Models/Event/event.category.entity"

interface EventCardProps {
    name: string | undefined
    creationDateTime: Date | undefined,
    dateTimeOfExecution: Date | undefined,
    category: EventCategory | undefined,
}
  
const EventCard: React.FC<EventCardProps> = ({
    name,
    creationDateTime,
    dateTimeOfExecution,
    category
}) => {

    const creationDateTimeFormated = DateUtil.formatToDDMMYYYY(creationDateTime ? creationDateTime : new Date())
    const dateTimeOfExecutionFormated = DateUtil.formatToDDMMYYYY(dateTimeOfExecution ? dateTimeOfExecution : new Date())

    return (
        <>
            <div className="cardComponentContainer">
                <div className="dateCreation">
                    <p>{creationDateTimeFormated}</p>
                    <p>Há 34 dias</p>
                </div>

                <img onClick={() => console.log("oi")} className="eventImage" src={image} alt="image event"/>

                <h3 className="nameEvent">{name}</h3>
                <p className="dateExec">{dateTimeOfExecutionFormated + " - " + category?.name}</p>

                <ButtonComponent text={"Participar"} 
                                 width={"200px"} 
                                 onClick={() => {}}
                ></ButtonComponent>
            </div>
        </>
    )
}

export default EventCard