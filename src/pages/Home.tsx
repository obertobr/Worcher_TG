import './Home.css';
import { Component, ReactNode } from 'react';
import TextInputComponent from '../components/basicComponents/text-input-component/text.input.component'
import style from '../components/styleComponents/input.module.css'
import { ThemeManager } from '../components/themeManager/theme.manager';

export default class Home extends Component {

  render(): ReactNode {
      return (
        <div>
          <button onClick={() => ThemeManager.setLight()}>Theme claro</button>
          <br />
          <button onClick={() => ThemeManager.setDark()}>Theme escuro</button>

          <TextInputComponent useLabel={true}
                              textLabel='Lucas'
                              typeInput='text'
                              placeHolder='Digite algo'
                              style={style}
          ></TextInputComponent>
        </div>
      )
  }
}