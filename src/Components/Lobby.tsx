import * as React from 'react';
import './Static/game.scss';
import Header from './Header';
import Box from './Box';
import Game from './Game';
import Play from './Play';
import { gameChoises, gameChoise, ResultState } from '../Models/models';

type MyState = {
    balance: number;
    bet: number;
    win: number;
    selections: gameChoise[];
    playGame: boolean;
    userChoises: gameChoise[];
    result: ResultState;
};

class Lobby extends React.Component<any, MyState> {
    state: MyState = {
      balance: 5000,
      bet: 1000,
      win: 0,
      selections: gameChoises,
      playGame: false,
      userChoises: [],
      result: null
    };

    updateResult = (result: ResultState, winnerId: number) => {
        if (winnerId) {
            const newSelections = this.state.selections.map(selection => {
                if (selection.id === winnerId) {
                    return {...selection, isWinner: true};
                }
                return selection;
            });
            this.setState({
                selections: newSelections,
                result
            });
        } else {
            this.setState({
                result,
            });
        }
    }
        
    play = () => {
        if (this.state.playGame) {
            this.clearBets();
        } else {
            this.game();
        }
    }

    game = () => {
        if (this.state.userChoises.length > 0) {
            this.setState({
                playGame: !this.state.playGame
            });
        }
    }

    clearBets = () => {
        const newSelections = this.state.selections.map(selection => {
            return {...selection, bet: 0, isWinner: false};
        });

        this.setState({
            selections: newSelections,
            userChoises: [],
            playGame: !this.state.playGame,
            result: null
        });
    }

    updateBalance = (amount: number) => {
        this.setState({
            balance: this.state.balance + amount,
            win: amount > 0 ? this.state.win + 1 : this.state.win
        });
    }

    isValidated = (name: string) => {
        // check balance not exceeded
        if (this.state.balance <= 0) {
            return false;
        }
        // check not to bet on all selections
        let bettedSelections = this.state.selections.filter((selection)=>{
            return selection.bet > 0
        });
        let found = bettedSelections.find((selection)=> selection.name == name);
        if (bettedSelections.length > 1 && !found) {
            return false;
        }
        return true;
    }
    
    AddRemoveBet = (name: string) => {
        const amount: number = this.state.bet;
  
        if (this.isValidated(name) && !this.state.playGame) {
            
            const newSelections = this.state.selections.map(selection => {
                if (selection.name === name) {
                    return {...selection, bet: selection.bet + this.state.bet};
                }
                return selection;
            });

            const newSelections2 = newSelections.filter(selection => {
                if (selection.bet > 0) {
                    return selection
                }
            });

            this.setState(prevState => ({
                selections: newSelections,
                userChoises: newSelections2

            }));
            this.updateBalance(amount * -1);
        }
      }
    
      sort = (selections: gameChoise[]) => {
        selections.sort(function(a, b){  
            return a.sortId - b.sortId;
          });
          return selections;
      }

    render() {
      return (
        <div className='lobby'>
            <Header
                balance={this.state.balance}
                bet={this.state.bet}
                win={this.state.win}
            />
            <div className='gameContainer'>
                {
                    this.state.playGame
                    ? <Game
                        userChoises={ this.state.userChoises }
                        result={this.state.result }
                        updateBalance={ this.updateBalance }
                        updateResult={ this.updateResult }
                    />
                    : <div className='message'>PICK YOUR POSITIONS</div>
                }
            </div>
            <div className='boxContainer'>
                {
                    this.sort(this.state.selections).map(choise => (
                        <Box
                            key={choise.name}
                            choise={choise}
                            AddRemoveBet={ this.AddRemoveBet }
                            isValidated={ this.isValidated }
                        />   
                    ))
                }
            </div>
            <Play
                play={ this.play }
                playGame={ this.state.playGame }
                result={ this.state.result }
            />
        </div>
      );
    }
  }
export default Lobby;