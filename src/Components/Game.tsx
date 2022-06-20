import * as React from 'react';
import { gameChoise, gameChoises, ResultState } from '../Models/models';
import './Static/game.scss';
type MyProps = {
  userChoises: gameChoise[];
  result: ResultState;
  updateBalance: Function;
  updateResult: Function;
};
type MyState = {
  computerChoise: gameChoise;
  index: number;
  winnings: number;
};
class Game extends React.Component<MyProps, MyState> {
    state: MyState = {
      computerChoise: gameChoises[Math.floor(Math.random() * gameChoises.length)],
      index: 0,
      winnings: 0
    };

    componentDidMount(): void {
      let res: number,
        result: string,
        indx: number,
        winnings: number = 0,
        winnerId: number;

      console.log('Computer Chose: ', this.state.computerChoise.name);

      for (var index = 0; index < this.props.userChoises.length; index++) {

        // compare
        res = Math.abs(this.state.computerChoise.id - this.props.userChoises[index].id) > 1
        ? (this.state.computerChoise.id % 3) - (this.props.userChoises[index].id % 3)
        : this.state.computerChoise.id - this.props.userChoises[index].id;

        // get result state
        const resultStates = [ResultState.WIN, ResultState.TIE, ResultState.LOSE];
        result = resultStates[res + 1];
        indx = index;


        if (result === ResultState.WIN) {
          winnerId = this.props.userChoises[index].id;
          winnings = this.calculateWinnings(index);
          break;
        }
      }

      
      setTimeout(() => {
        this.setState({
          index: indx
        });
      }, 2000);

      setTimeout(() => {
        this.setState({
          winnings
        });
        this.props.updateResult(result, winnerId);
      }, 4000);

    }

    componentWillUnmount(): void {
        if (this.state.winnings) {
          this.props.updateBalance(this.state.winnings);
        }
    }

    calculateWinnings = (index: number) => {
      let winnings = 0;
      if (this.props.userChoises.length > 1) {
        winnings = this.props.userChoises[index].bet * 3;
      } else {
        winnings = this.props.userChoises[index].bet * 14;
      }
      return winnings;
    }

    calculateValues = () => {
      const title = this.props.result === ResultState.TIE
      ? 'TIE'
      : (this.props.result === ResultState.WIN ? `${this.props.userChoises[this.state.index].name} WIN` : `${this.state.computerChoise.name} WIN`),
      className = this.props.result.toLocaleLowerCase(),
      winnings = this.state.winnings > 0 ? this.state.winnings : '',
      subtitle = this.props.result === ResultState.TIE? 'YOU LOST' : <div>YOU {this.props.result} <span className='winnings'>{winnings}</span></div>;

      return {
        title,
        className,
        subtitle
      }
    }

    render() {
      if (this.props.result === null) {
        return (
          <div className='game'>
            <div>{this.state.computerChoise.name}</div>
            <div className='divider'>VS</div>
            <div>{this.props.userChoises[this.state.index].name}</div>
          </div>
        );
      } else {
        const { className, title, subtitle } = this.calculateValues();
        return (
          <div className={`game result ${ className } `}>
            <div className='title'> {title} </div>
            <div className='subtitle'>{subtitle}</div>
          </div>
        );
      }
    }
  }
export default Game;