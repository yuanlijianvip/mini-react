/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-06 20:07:59
 */

import React from "react";
import ReactDOM from "react-dom";

/**
 * 高阶组件有两种用法
 * 1.属性代理  2.反向继承
 * 反向继承：当你想改造一个第三方的组件库，又不能去改它的源代码
 */
class Button extends React.Component {
  state = {name: '按钮'}
  componentWillMount() {
    console.log('Button componentWillMount');
  }
  componentDidMount() {
    console.log('Button componentDidMount');
  }
  render() {
    console.log('Button render');
    return <button name={this.state.name} title={this.props.title}/>
  }
}
const enhancer = OldComponent => {
  return class extends OldComponent {
    state = { number: 0 }
    componentWillMount() {
      console.log('enhancer componentWillMount');
      super.componentWillMount();
    }
    componentDidMount() {
      console.log('enhancer componentDidMount');
      super.componentDidMount();
    }
    handleClick = () => {
      this.setState({ number: this.state.number + 1 })
    }
    render() {
      console.log('enhancer render');
      let renderElement = super.render();
      let newProps = {
        ...renderElement.props,
        ...this.state,
        onClick: this.handleClick
      }
      return React.cloneElement(renderElement, newProps, this.state.number);
    }
  }
}
const EnhancerButton = enhancer(Button);
let element = <EnhancerButton></EnhancerButton>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
