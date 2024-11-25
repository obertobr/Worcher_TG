import CheckBoxComponent from "../../basicComponents/check-box-component/check.box.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import ToggleThemeComponent from "../../basicComponents/toggle-theme-component/toggleTheme.component";

import './configurationPage.css';

const ConfigurationPage: React.FC<{}> = () => {
  return(
    <>
    <HeaderComponent type="simple" showCircleImage={false} showArrowBack={true} />
    
    <div className="configContainer">
      <ToggleThemeComponent />

      <div className="configCheckBox">
        <CheckBoxComponent textCheckBox="Permitir receber e-mails de anúncios e promoções de Worcher." changeValue={() => {} } />
      </div>
    </div>
    </>
  )
}

export default ConfigurationPage;