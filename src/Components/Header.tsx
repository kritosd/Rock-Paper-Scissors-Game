import * as React from 'react';
import './Static/header.scss';
type MyProps = {
    balance: number;
    bet: number;
    win: number;
  };

function Header(props: MyProps) {
    
    return (
        <div className='headerContainer'>
            <div className='header'>
                <span className='balance'>
                    <span className='title'>BALANCE: </span>
                    <span> {props.balance}</span>
                </span>
                <span className='bet'>
                    <span className='title'>BET: </span>
                    <span> {props.bet}</span>
                </span>
                <span className='wins'>
                    <span className='title'>WIN: </span>
                    <span> {props.win}</span>
                </span>
            </div>
        </div>
    );
}
export default Header;