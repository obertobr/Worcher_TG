import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './components/pages/loginPage/login.page.component';
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
import SingUpPage from './components/pages/singUpPage/singup.page.component';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <div className={style.contentMain}>
      <IonRouterOutlet>
       
          <Route exact path="/singup" component={SingUpPage}/>
         
          <Route exact path="/home" component={Home} />

          <Route exact path="/login" component={LoginPage}/>

          <Route exact path="/">
            <Redirect to="/test" />
          </Route>
      </IonRouterOutlet>
      </div>
    </IonReactRouter>
  </IonApp>
);

export default App;
