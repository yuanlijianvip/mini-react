/*
 * @Description:
 * @version:
 * @Author: yuanlijian
 * @Date: 2022-01-01 11:32:43
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-23 01:05:56
 */

import React from "./react";
import ReactDOM from "./react-dom";
function App() {
    console.log(<React.Fragment>
        <p>p1</p>
        <p>p2</p>
    </React.Fragment>);
    return (
        <React.Fragment>
            <p>p1</p>
            <p>p2</p>
        </React.Fragment>
    )
}

let element = <App></App>;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));