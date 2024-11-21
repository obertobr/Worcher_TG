import { useEffect } from "react";
import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import RouterUtil from "../../../../Utils/Components/RouterUtil";
import { useHistory } from "react-router";

const SchedulePage: React.FC<{}> = () => {

  const history = useHistory()

  useEffect( () => {
    
      
  }, [])



  return(
    <>
    <HeaderComponent showHome={true} showArrowBack={false} type='simple' showCircleImage={true}></HeaderComponent>

      <main>

      </main>
    
    <FooterComponent isWithinTheInstitution={true}></FooterComponent>
    </>
  )
}

export default SchedulePage;