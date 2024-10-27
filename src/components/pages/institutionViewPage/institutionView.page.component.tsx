import ButtonComponent from '../../basicComponents/button-component/button.components';
import './institutionViewPageConteiner.css';
import './institutionViewPageContent.css';
import './institutionViewPageMain.css';

interface instituitionViewInterface {
  title?: string;
  desc?: string;
  intAddress?: string;
}

const InstituitionViewPage: React.FC<instituitionViewInterface> = ({
  title = "Vida e Adoração",
  desc = "Uma igreja evangélica acolhedora e vibrante.Venha fazer parte de uma comunidade apaixonada em busca de significado e serviço. Junte-se a nós para uma jornada espiritual inspiradora e cheia de propósito.",  
  intAddress = "R. Cel. Teófilo Leme, 1552 - Centro, Bragança Paulista - SP, 12900-005"
}) => {

  return(
    <>
      <div className="contentIntView">
        <header>
          {/* componente para o header padrão das páginas */}
        </header>

        <main>
          <div className="intViewContainer">
            <h2>{title}</h2>
            <br />
            <p>{desc}</p>
          </div>

          <div className="intViewAddressContainer">
            <h2>ENDEREÇO</h2>
            <h3>{intAddress}</h3>
          </div>

          <ButtonComponent width='80%' text='Solicitar Entrada' onClick={() => {} } />
        </main>

        <footer>
          {/* componente para o footer padrão das páginas */}
        </footer>

      </div>
    </>
  );
}

export default InstituitionViewPage;