/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-03 17:17:55
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 17:17:55
 */

import React from "./react";
import ReactDOM from "./react-dom";

class Sum extends React.Component {
  constructor() {
    super();
    this.a = React.createRef(); // { current: null }
    this.b = React.createRef();
    this.result = React.createRef();
  }
  handleClick = (event) => {
    let valueA = this.a.current.value;
    let valueB = this.b.current.value;
    this.result.current.value = valueA + valueB;

  }
  render() {
    return (
      <div>
        <input ref={this.a}/> + <input ref={this.b}/>
        <button onClick={this.handleClick}>=</button>
        <input ref={this.result} />
      </div>
    )
  }
}

let element = <Sum></Sum>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
