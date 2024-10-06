import './Home.css';
import { Component, ReactNode } from 'react';
import  UserService from '../../Service/User/user.service'
import User from '../../Models/User/user.entity';
import Config from '../../Models/User/config.entity';
import Account from '../../Models/User/account.entity';


export default class Home extends Component {

  service: UserService = new UserService();

  private save = () => {
    
    //const count = service.count().then( number => console.log(number))

    const user = new User()
    user.name = "Mateus"
    user.dateOfBirth = new Date(2000,1,1);
    user.cpf = "473.740.270-28"

    const config = new Config()
    config.recieveEmails = true
    config.recieveNotifications = true

    const account = new Account()
    account.email = "real.azzi@gmail.com"
    account.password = "123abcedfgh"

    user.config = config;
    user.account = account

    this.service.save(user)
  }

  private get = () => {
    this.service.getById(1).then( user => console.log(user) );
  }

  render(): ReactNode {
      return (
        <div>
          <button onClick={() => this.save()}>Save</button>
          <br />
          <button onClick={() => this.get()}>Get</button>
        </div>
      )
  }
}