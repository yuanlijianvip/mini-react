/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-03 17:02:20
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 17:02:20
 */

import React from "./react";
import ReactDOM from "./react-dom";
/**
 * 1.在React能管理的方法是更新是异步的，批量
 * 2.在React管理不到的地方更新就是同步的
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, age: 13 };
  }
  //event合成事件对象，并不是原生的事件对象
  //15事件和17有所不同，最大不同点，15的事件都是代理到document,17之后都代理给了容器 div#root
  //因为React希望一个页面可以运行多个react版本
  handleClick = (event) => {
    console.log('handleClick');
    event.stopPropagation();
    
    //在handleClick方法中执行是批量的，是异步的，会在方法执行结束之后在更新
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    setTimeout(() => {
      //在setTimeout里的更新是同步的
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
    });
  };
  handleDivClick = () => {
    console.log('handleDivClick');
  }
  render() {
    return (
      <div onClick={this.handleDivClick}>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

let element = <Counter></Counter>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
