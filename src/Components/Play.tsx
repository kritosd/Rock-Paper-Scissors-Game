import * as React from 'react';
import { ResultState } from '../Models/models';
import './Static/play.scss';
type MyProps = {
    play: Function;
    playGame: boolean;
    result: ResultState;
  };
class Play extends React.Component<MyProps, any> {

    render() {
        const buttonLabel = this.props.playGame ? 'Clear' : 'Play',
            disabledButton = this.props.playGame && this.props.result === null;
      return (
        <div className='play'>
            <button
                type='button'
                onClick={() => this.props.play()}
                disabled={ disabledButton }
            >
                    { buttonLabel }
            </button>
        </div>
      );
    }
  }
export default Play;