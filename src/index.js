/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-18 09:49:42
 */

import React from "./react";
import ReactDOM from "./react-dom";
// function reducer(state, action) {
//   return state + 5;
// }
function Counter(props) {
  let [number, setNumber] = React.useState(0);
  // let [number, dispatch] = React.useReducer(reducer, 0);
  //此函数会在组件和DOM渲染之后执行，可以执行一些副作用的代码
  React.useEffect(()=> {
    console.log('开启定时器');
    const timer = setInterval(()=> {
      setNumber(number => number+1);
      // dispatch(number => number + 3);
    }, 1000);
    //useEffect返回一个销毁函数，会在下次执行useEffect回调之前执行
    return () => {
      //清除定时器
      console.log('清除定时器');
      clearInterval(timer);
    }
  }, [])
  return (
    <div>{number}</div>
  )
}

let element = <Counter></Counter>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));