import * as React from 'react';
import './Static/box.scss';
import { gameChoise } from '../Models/models';

type MyProps = {
    choise: gameChoise;
    AddRemoveBet: Function;
    isValidated: Function;
};
type MyState = {
    bet: number; // like this
};
class Box extends React.Component<MyProps, MyState> {
    state: MyState = {
      bet: 0,
    };



    render() {
      const winningClassName = this.props.choise.isWinner ? 'win' : '';
      return (
        <div className={`box ${ this.props.choise.name } ${ winningClassName }`} onClick={ () => this.props.AddRemoveBet(this.props.choise.name) }>
          {
            this.props.choise.bet > 0
            && <div className='chip'>{this.props.choise.bet}</div>
          }
          <div className='name'>{this.props.choise.name}</div>
          
        </div>
      );
    }
  }
export default Box;