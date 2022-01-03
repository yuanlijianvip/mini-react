/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-03 11:42:47
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 11:42:48
 */

import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = (amount) => {
    this.setState((state)=>({number: state.number+amount}), () => {
      console.log('callback', this.state);
    });
  }
  render() {
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button onClick={() => this.handleClick(5)}>+</button>
      </div>
    )
  }
}


let element = <Counter></Counter>
console.log(element);
ReactDOM.render(
  element,
  document.getElementById('root')
);

