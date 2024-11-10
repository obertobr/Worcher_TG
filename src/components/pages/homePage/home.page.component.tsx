import FooterComponent from "../../basicComponents/layoutComponents/footer-component/footer.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";

const HomePage: React.FC<{}> = () => {
   
    return (
        <>
           <HeaderComponent type='simple' showCircleImage={true}></HeaderComponent>

           <FooterComponent></FooterComponent>
        </>
    )
}

export default HomePage;