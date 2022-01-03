import React from "./react";
import ReactDOM from "./react-dom";
import { updateQueue } from './Component'
/**
 * 1.在React能管理的方法是更新是异步的，批量
 * 2.在React管理不到的地方更新就是同步的
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, age: 13 };
  }
  handleClick = (amount) => {
    updateQueue.isBatchingUpdate = true;
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
    updateQueue.batchUpdate();
  };
  render() {
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button onClick={() => this.handleClick(5)}>+</button>
      </div>
    );
  }
}

let element = <Counter></Counter>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
