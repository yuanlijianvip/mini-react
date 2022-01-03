/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-02 13:34:23
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-02 13:34:24
 */

import React from './react';
import ReactDOM from './react-dom';

class ClassComponent extends React.Component {
  render() {
    return (
      <h1 className="title" style={{ color: 'red' }}>
        <span>{this.props.name}</span>
        <span>{this.props.children}</span>
      </h1>
    )
  }
}
let element = <ClassComponent name="hello">world</ClassComponent>
console.log(element);
ReactDOM.render(
  element,
  document.getElementById('root')
);