/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-06 11:45:32
 */

import React from "react";
import ReactDOM from "react-dom";

/**
 * 高阶组件有两种用法
 * 1.属性代理  2.反向继承
 */
const withLoading = message => OldComponent => {
  return class extends React.Component {
    render() {
      const state = {
        show() {
          let div = document.createElement('div');
          div.id = 'loadingDiv';
          div.innerHTML = `<p style="position:absolute;top:100px;z-index:10;background-color:gray">${message}</p>`
          document.body.appendChild(div);
        },
        hide() {
          document.getElementById('loadingDiv').remove();
        }
      }
      return <OldComponent {...this.props} {...state}/>
    }
  }
}

@withLoading('加载中......')
class App extends React.Component {
  render() {
    return (
      <div>
        <p>App</p>
        <button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    )
  }
}
// const WithLoadingApp = withLoading('加载中......')(App);
let element = <App></App>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
