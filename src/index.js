/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 19:34:01
 */

import React from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  }
  /**
   *（1、删除B D F，2、把B插入到3位置，3、插入G到4位）
   * @Author: yuanlijian
   * @description: 
   * @param {*}
   * @return {*}
   */  
  handleClick = (event) => {
    this.setState({
      list: ['A', 'C', 'E', 'B', 'G']
    })
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.list.map(item => <li key={item}>{item}</li>)
          }
        </ul>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

let element = <Counter></Counter>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
