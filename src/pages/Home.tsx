import { Component, ReactNode } from 'react';
import TextInputComponent from '../components/basicComponents/text-input-component/text.input.component';
import { ThemeManager } from '../components/themeManager/theme.manager';
import './Home.css';

interface HomeState {
  inputValue: string;
}

export default class Home extends Component<{}, HomeState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  handleInputChange = (value: string) => {
    this.setState({ inputValue: value })
  }

  render(): ReactNode {
      return (
        <div>
          <button onClick={() => ThemeManager.setLight()}>Theme claro</button>
          <br />
          <button onClick={() => ThemeManager.setDark()}>Theme escuro</button>


          <TextInputComponent 
                              textLabel='NOME'
                              typeInput='text'
                              placeHolder='Digite algo'
                              onInputChange={this.handleInputChange}
          ></TextInputComponent>
        
        <br/>
        <p>{this.state.inputValue}</p>
        </div>
      )
  }
}