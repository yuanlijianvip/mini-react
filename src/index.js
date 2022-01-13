/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-13 21:52:41
 */

import React from "./react";
import ReactDOM from "./react-dom";

class ClassCounter extends React.PureComponent {
  render() {
    console.log('ClassCounter');
    return (
      <div>ClassCounter:{this.props.count}</div>
    )
  }
}

function FunctionCounter(props) {
  console.log('Function Counter');
  return (
    <div>FunctionCounter: {props.count}</div>
  )
}
//新组件就有类似于PureComponent的功能了
const MemoFunctionCounter = React.memo(FunctionCounter);
class App extends React.Component {
  constructor() {
    super();
    this.state = { number: 0 };
    this.amountRef = React.createRef();
  }
  handleClick = (event) => {
    let number = this.state.number + parseInt(this.amountRef.current.value);
    this.setState({ number });
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <ClassCounter count={this.state.number}/>
        <MemoFunctionCounter count={this.state.number}/>
        <input ref={this.amountRef}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

let element = <App></App>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
