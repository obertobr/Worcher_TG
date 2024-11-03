import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import AuthPage from './components/pages/authPage/auth.page.component';
import LoginPage from './components/pages/loginPage/login.page.component';
import SingUpPage from './components/pages/singUpPage/singup.page.component';
import style from './components/styleComponents/router.module.css';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import { useEffect } from 'react';
import CategoryRegistrationPage from './components/pages/categoryRegistrationPage/categoryRegistration.page.component';
import InstitutionRegister from './components/pages/institutionRegisterPage/institutionRegister.page.component';
import InstituitionViewPage from './components/pages/institutionViewPage/institutionView.page.component';
import MemberViewPage from './components/pages/memberManegerPage/memberManager.page.component';
import PositionRegistrationPage from './components/pages/positionRegistrationPage/positionRegistration.page.component';
import TestPage from './components/pages/testPage/test.page.component';
import './theme/variables.css';
import LoadAplicationManager from './classes/LoadAplication/load.aplication.manager';
import handleKeyDown from './components/themeManager/handle.key.down.theme.change'


setupIonicReact();

const App: React.FC = () => {
  
  // useEffect chamado uma vez na inicialização da aplicação
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown )

    const loadAplicationManager = new LoadAplicationManager()
    loadAplicationManager.init()
  }, [])

  
  return (
  <IonApp>
    <IonReactRouter>
    <div className={style.contentMain}>
      <IonRouterOutlet>
       
          <Route exact path="/singup" component={SingUpPage}/>
         
          <Route exact path="/home" component={Home} />

          <Route exact path="/login" component={LoginPage}/>

          <Route exact path="/auth-page" component={AuthPage} />

          <Route exact path="/institution-register" component={InstitutionRegister} />

          <Route exact path='/test' component={TestPage} />

          <Route exact path='/inst-page' component={InstituitionViewPage} />

          <Route exact path='/category-registration' component={CategoryRegistrationPage} />

          <Route exact path='/position-registration' component={PositionRegistrationPage} />

          <Route exact path='/member-view' component={MemberViewPage} />

          <Route exact path="/">
            <Redirect to="/test" />
          </Route>
      </IonRouterOutlet>
      </div>
    </IonReactRouter>
  </IonApp>
)};

export default App;
