/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 21:55:06
 */

import React from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
  //设置默认属性对象
  static defaultProps = {
    name: "aaa"
  }
  constructor(props) {
    super(props);
    //设置默认状态对象
    this.state = {number: 0};
  }
  handleClick = () => {
    this.setState({number: this.state.number +1});
  }
  render() {
    console.log('Counter 3.render');
    return (
      <div id="counter">
        <p>{this.state.number}</p>
        <ChildCounter count={this.state.number}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
class ChildCounter extends React.Component {
  constructor() {
    super();
    this.state = { number: 0 };
  }
  //所有will的方法都废弃了 componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    const { count } = nextProps;
    if (count % 2 === 0) {
      return { number: count * 2 }
    } else if (count % 3 === 0) {
      return { number: count * 3 }
    }
    return null;
  }
  render() {
    console.log('ChildCounter 2.render');
    return <div id="sub-counter">{this.state.number}</div>
  }
}

let element = <Counter></Counter>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
