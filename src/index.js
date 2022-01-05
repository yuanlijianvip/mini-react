/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-06 00:05:10
 */

import React from "react";
import ReactDOM from "react-dom";

let ThemeContext = React.createContext();
console.log(ThemeContext);
const { Provider, Consumer } = ThemeContext;
let style = { margin: '5px', padding: '5px' }

function Title() {
  return (
    <Consumer>
      {
        (contextValue) => (
          <div style={{...style, border: `5px solid ${contextValue.color}`}}>
            Title
          </div>
        )
      }
    </Consumer>
  )
}
class Header extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div style={{...style, border: `5px solid ${this.context.color}`}}>
        Herder
        <Title />
      </div>
    )
  }
}
function Content() {
  return (
    <Consumer>
      {
        (contextValue) => (
          <div style={{...style, border: `5px solid ${contextValue.color}`}}>
            Content
            <button style={{color: 'red'}} onClick={()=>contextValue.changeColor('red')}>变红</button>
            <button style={{color: 'green'}} onClick={()=>contextValue.changeColor('green')}>变绿</button>
          </div>
        )
      }
    </Consumer>
  )
}
class Main extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div style={{...style, border: `5px solid ${this.context.color}`}}>
        Main
        <Content />
      </div>
    )
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "red" };
  }
  changeColor = (color) => {
    this.setState({color});
  }
  render() {
    let contextValue = {color: this.state.color, changeColor: this.changeColor};
    return (
      <Provider value={contextValue}>
        <div style={{ ...style, width: '300px' }}>
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

let element = <Page></Page>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
