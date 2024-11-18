import { useEffect } from "react";
import ButtonComponent from "../../basicComponents/button-component/button.components";
import InstitutionCard from "../../basicComponents/institution-card-component/institutionCard.component";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const FeedPage: React.FC<{}> = () => {

  const history = useHistory()

  useEffect( () => {
    
      
  }, [])



  return(
    <>
    <HeaderComponent showHome={true} showArrowBack={false} type='simple' showCircleImage={true}></HeaderComponent>

      <main>
        Palhaço
      </main>
    
    <FooterComponent isWithinTheInstitution={true}></FooterComponent>
    </>
  )
}

export default FeedPage;