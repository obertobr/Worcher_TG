import { useEffect } from "react";
import HeaderComponent from "../../basicComponents/layoutComponents/header-component/header.component";
import { useHistory } from "react-router";
import LocalStorageEventViewUtils from "../../../../Utils/LocalStorage/local.storage.event.view.utils";

const ViewEventPage: React.FC<{}> = () => {

  const history = useHistory()

  useEffect( () => {
    const localStorageEventViewUtils = new LocalStorageEventViewUtils()
    const idEvent = localStorageEventViewUtils.getId()

    if(idEvent)
      console.log(idEvent)

  }, [])

  return(
    <>
    <HeaderComponent showArrowBack={true} type='simple' showCircleImage={true}></HeaderComponent>

      <main>

      </main>
    
    </>
  )
}

export default ViewEventPage;