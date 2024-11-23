import { useEffect } from "react";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import "./scheduleContent.css";

const events = [
  { title: 'Culto de Jovens', date: '2024-11-09', color: '#4fc3f7' }, // Azul claro
  { title: 'Encontro de mulheres', date: '2024-11-25', color: '#f44336' }, // Vermelho
  { title: 'teste 2', date: '2024-11-25', color: '#f44336' },
  { title: 'teste 3', date: '2024-11-25', color: '#f44336' },
  { title: 'teste 4', date: '2024-11-25', color: '#f44336' },
  { title: 'teste 5', date: '2024-11-25', color: '#f44336' },
  { title: 'teste 6', date: '2024-11-25', color: '#f44336' }
];

const SchedulePage: React.FC<{}> = () => {

  const handleMonthChange = (info: any) => {
    const startDate = info.start; // Data inicial do mês
    const endDate = info.end; // Data final do mês
    console.log('Mês alterado! De:', startDate, 'Até:', endDate);
  };

  return (
    <>
      <HeaderComponent showHome={true} showArrowBack={false} type='simple' showCircleImage={true}></HeaderComponent>

      <main>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth',
          }}
          events={events}
          eventDisplay="block"
          dayMaxEvents={3} 
          moreLinkText={(num) => `+${num} mais`}
          datesSet={handleMonthChange}
        />
      </main>

      <FooterComponent isWithinTheInstitution={true}></FooterComponent>
    </>
  )
}

export default SchedulePage;