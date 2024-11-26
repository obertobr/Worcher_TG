import LocalStorageLoginUtils from "../../../../Utils/LocalStorage/local.storage.login.utils";
import CheckBoxComponent from "../../basicComponents/check-box-component/check.box.component";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import ToggleThemeComponent from "../../basicComponents/toggle-theme-component/toggleTheme.component";
import ConfigService from "../../../../Service/User/config.service"

import './configurationPage.css';
import { useEffect, useState } from "react";

const ConfigurationPage: React.FC<{}> = () => {

  const configService = new ConfigService()
  const [valueDefault, setValueDefault] = useState<boolean>()

  useEffect(() => {
    getAccount()
  },[])

  const getAccount = async () => {
    const localStorageLogin = new LocalStorageLoginUtils()
    const configId = localStorageLogin.getConfig()?.id

    if(configId){
      const config = await configService.getById(configId)
      setValueDefault(config?.recieveEmails)
    }

  }


  const changeValue = async (allow: boolean) => {
    const localStorageLogin = new LocalStorageLoginUtils()
    const config = localStorageLogin.getConfig()

    if(config){
      config.recieveEmails = allow
      await configService.update(config)
    }
  }

  return(
    <>
    <HeaderComponent type="simple" showCircleImage={false} showArrowBack={true} />
    
    <div className="configContainer">
      <ToggleThemeComponent />

      <div className="configCheckBox">
        <CheckBoxComponent value={valueDefault} textCheckBox="Permitir receber e-mails de anúncios." changeValue={(e: boolean) => changeValue(e) } />
      </div>
    </div>
    </>
  )
}

export default ConfigurationPage;