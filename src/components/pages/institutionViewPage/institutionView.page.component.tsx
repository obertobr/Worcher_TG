import ButtonComponent from '../../basicComponents/button-component/button.components';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';
import './institutionViewPageConteiner.css';
import './institutionViewPageContent.css';
import './institutionViewPageMain.css';


import logo from "../../../assets/rafael.png"

interface instituitionViewInterface {
  title: string;
  desc: string;
  intAddress?: string;
}

const InstituitionViewPage: React.FC<instituitionViewInterface> = ({
  title = "Vida e Adoração",
  desc = "Uma igreja evangélica acolhedora e vibrante.Venha fazer parte de uma comunidade apaixonada em busca de significado e serviço. Junte-se a nós para uma jornada espiritual inspiradora e cheia de propósito.",  
  intAddress = "R. Cel. Teófilo Leme, 1552 - Centro, Bragança Paulista - SP, 12900-005"
}) => {

  return(
    <>
    <HeaderComponent type='complex' circleImage={logo}></HeaderComponent>
      <div className="contentIntView">
      
        <main>
          <div className="intViewContainer">
            <h2 className='title center'>{title}</h2>
            <p className='center'>{desc}</p>
          </div>

          <div className="intViewAddressContainer">
            <h2 className='titleSecond'>ENDEREÇO</h2>
            <p>{intAddress}</p>
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