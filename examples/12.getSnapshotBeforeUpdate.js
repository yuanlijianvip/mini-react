/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 22:44:51
 */

import React from "./react";
import ReactDOM from "./react-dom";

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }
    this.wrapper = React.createRef();
  }
  addMessage = () => {
    this.setState({
      messages: [`${this.state.messages.length}`, ...this.state.messages]
    })
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.addMessage();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop, //100px
      prevScrollHeight: this.wrapper.current.scrollHeight //200px
    }
  }
  componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
    this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight-prevScrollHeight);
  }
  render() {
    let style={
      width: '200px',
      height: '100px',
      border: "1px solid red",
      overflow: 'auto'
    }
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))
        }
      </div>
    )
  }
}

let element = <ScrollList></ScrollList>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
