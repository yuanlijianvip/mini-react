/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-19 13:13:26
 */

import React from "./react";
import ReactDOM from "./react-dom";

function Animation(props) {
    const ref = React.useRef();
    let style = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'red'
    }
    React.useLayoutEffect(() => {
        ref.current.style.transform = `translate(500px)`;
        ref.current.style.transition = `all 500ms`;
    })
    return (
        <div style={style} ref={ref}></div>
    )
}

let element = <Animation></Animation>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));