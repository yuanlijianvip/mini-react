/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-06 21:29:17
 */

import React from "./react";
import ReactDOM from "./react-dom";

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 }
  }
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ border: '1px solid red' }}>
        <h1>移动一下鼠标</h1>
        <p>当前鼠标的位置是{this.state.x},{this.state.y}</p>
      </div>
    )
  }
}
let element = <MouseTracker></MouseTracker>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
