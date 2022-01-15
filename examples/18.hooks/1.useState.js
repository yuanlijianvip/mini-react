/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-14 09:43:22
 */

import React from "./react";
import ReactDOM from "./react-dom";

function App() {
  const [number, setNumber] = React.useState(0);
  const handleClick = () => {
    setNumber(number + 1);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}

let element = <App></App>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
