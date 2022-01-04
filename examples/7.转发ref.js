/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-04 07:20:56
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-04 07:20:57
 */

import React from "./react";
import ReactDOM from "./react-dom";


function TextInput(props, forwardRef) {
  return <input ref={forwardRef}/>
}

const ForwardedTextInput = React.forwardRef(TextInput);
class Form extends React.Component {
  constructor() {
    super();
    this.textInputRef = React.createRef();
  }
  getFocus = () => {
    this.textInputRef.current.focus();
  }
  render() {
    return (
      <div>
        <ForwardedTextInput ref={this.textInputRef}/>
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}

let element = <Form></Form>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
