/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-02 11:31:56
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-02 11:31:57
 */

import React from './react';
import ReactDOM from './react-dom';

/**
 * 函数组件
 * 1.必须接收一个props对象，并返回一个React元素
 * 2.函数组件的名称必须是大写的开头
 * 3.必须先定义再使用
 * 4.函数组件能且只能返回一个根节点 JSX表达式必须具有一个父元素
 * 5.React元素不但可以是DOM标签字符串，也可以是函数
 * @Author: yuanlijian
 * @description: 
 * @param {*} props
 * @return {*}
 */
function FunctionComponent(props) {
  return (
    <h1 className="title" style={{color: 'red'}}>
      <span>{props.name}</span>
      <span>{props.children}</span>
    </h1>
  )
}
//React元素可以是字符串表示原生组件，也有可能是函数，表示函数组件
let element = <FunctionComponent name="hello">world</FunctionComponent>
console.log(element);
ReactDOM.render(
  element,
  document.getElementById('root')
);

