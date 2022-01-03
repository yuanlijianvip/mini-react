/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-03 18:05:45
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 18:05:46
 */

import React from "./react";
import ReactDOM from "./react-dom";

class Form extends React.Component {
  constructor() {
    super();
    this.textInputRef = React.createRef();
  }
  getFocus = () => {
    this.textInputRef.current.getFocus();
  }
  render() {
    return (
      <div>
        <TextInput ref={this.textInputRef}/>
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}

class TextInput extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  getFocus = () => {
    this.inputRef.current.focus();
  }
  render() {
    return <input ref={this.inputRef} />
  }
}

let element = <Form></Form>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
