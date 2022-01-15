/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-15 10:54:41
 */

import React from "./react";
import ReactDOM from "./react-dom";
function reducer(state = { number: 0 }, action) {
  switch(action.type) {
    case 'ADD':
      return { number: state.number + 1 };
    case 'MINUS':
      return { number: state.number - 1 };
    default: 
      return state;
  }
}
function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { number: 0 });
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={()=>dispatch({type: 'ADD'})}>+</button>
      <button onClick={()=>dispatch({type: 'MINUS'})}>-</button>
    </div>
  )
}

let element = <Counter></Counter>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
