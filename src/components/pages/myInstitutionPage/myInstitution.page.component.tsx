import InstitutionCard from "../../basicComponents/institution-card-component/institutionCard.component";
import './myInstitutionPageContainer.css';
import './myInstitutionPageContent.css';

const MyInstitutionPage: React.FC<{}> = () => {
  return(
    <>
    <main>
      <div className="contentInst">
        <h2>Minhas Instituições</h2>
        <div className="containerInst">
          <InstitutionCard title="Vida e Adoração" memberCount={123}/>
          <InstitutionCard title="Vida e Amoração" memberCount={554}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
          <InstitutionCard title="Escola de Deus" memberCount={636}/>
        </div>
      </div>
    </main>
    
    </>
  )
}

export default MyInstitutionPage;