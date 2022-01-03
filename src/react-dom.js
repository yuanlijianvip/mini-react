/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 15:00:18
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 15:37:36
 */
import { REACT_TEXT } from './constants';
import { addEvent } from './event';

function render(vdom, container) {
    mount(vdom, container);
}

/**
 * @Author: yuanlijian
 * @description: 把虚拟DOM转成真实DOM插入容器里
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 * @return {*}
 */
function mount(vdom, container) {
    let newDOM = createDOM(vdom);
    container.appendChild(newDOM);
}

/**
 * @Author: yuanlijian
 * @description: 把虚拟DOM转成真实DOM
 * @param {*} vdom 虚拟DOM
 * @return {*}
 */
function createDOM(vdom) {
    let { type, props } = vdom;
    let dom; //真实DOM
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props);
    } else if (typeof type === 'function') {
        if (type.isReactComponent) {
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);
    }
    if (props) {
        updateProps(dom, {}, props);
        const children = props.children;
        if (typeof children === 'object' && children.type) {
            mount(children, dom);
        } else if (Array.isArray(children)) {
            reconcileChildren(children, dom);
        }
    }
    //让vdom的dom属性指定它创建出来的真实DOM
    vdom.dom = dom;
    return dom;
}

function mountFunctionComponent(vdom) {
    //获取函数本身
    let { type, props } = vdom;
    //把函数对象传递给函数执行，返回要渲染的虚拟DOM
    let renderVdom = type(props);
    //vdom.老的要渲染的虚拟DOM=renderVdom,方便后面的DOM
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}

function mountClassComponent(vdom) {
    //获取函数本身
    let { type: ClassComponent, props } = vdom;
    //把函数对象传递给函数执行，返回要渲染的虚拟DOM
    let classInstance = new ClassComponent(props);
    let renderVdom = classInstance.render();
    vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}

function reconcileChildren(children, parentDOM) {
    children.forEach((child, index) => {
        mount(child, parentDOM);
    });
}

/**
 * @Author: yuanlijian
 * @description: 更新真实DOM的属性
 * @param {*} dom
 * @param {*} oldProps
 * @param {*} newProps
 * @return {*}
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
    for (let key in newProps) {
        //属性中的children属性不在此处处理
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else if (/^on[A-Z].*/.test(key)) {
            // dom[key.toLowerCase()] = newProps[key]; //TODO
            addEvent(dom, key.toLowerCase(), newProps[key]);
        } else {
            dom[key] = newProps[key];
        }
    }
    //如果属性在老的属性有，新的属性没有，需要从真实DOM中删除
    for (let key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}
export function findDOM(vdom) {
    if (!vdom) return null;
    //如果vdom上有dom属性，说明这个vdom是一个原生组件 span div p
    if (vdom.dom) {
        return vdom.dom; //返回它对应的真实DOM即可
    } else {
        //它可能一个函数组价或者类组件
        let oldRenderVdom = vdom.oldRenderVdom;
        return findDOM(oldRenderVdom);
    }
}
/**
 * @Author: yuanlijian
 * @description: 进行DOM-DIFF对比
 * @param {*} parentDOM 父真实DOM节点
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 * @return {*}
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
    //获取老的真实DOM
    let oldDOM = findDOM(oldVdom);
    let newDOM = createDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
}
const ReactDOM = {
    render
}

export default ReactDOM;