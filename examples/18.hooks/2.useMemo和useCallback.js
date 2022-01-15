/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-15 09:57:03
 */

import React from "./react";
import ReactDOM from "./react-dom";
function Child({ data, handleClick }) {
  console.log('Child render');
  return (
    <button onClick={handleClick}>{data.number}</button>
  )
}
const MemoChild = React.memo(Child);
function App() {
  console.log('App');
  const [name, setName] = React.useState('zhufeng');
  const [number, setNumber] = React.useState(0);
  //希望handleClick在App组件重新渲染的时候，如果number变了就返回新的handleClick,如果number没有变，就返回老handleClick
  let data = React.useMemo(() => ({ number }), [number]);
  //希望data在App组件重新渲染的时候，如果number变了就变成新的data,如果number没有变，就返回老data
  let handleClick = React.useCallback(() => setNumber(number + 1), [number]);
  return (
    <div>
      <input type="text" value={name} onChange={event => setName(event.target.value)}/>
      <MemoChild data={data} handleClick={handleClick}/>
    </div>
  )
}

let element = <App></App>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
