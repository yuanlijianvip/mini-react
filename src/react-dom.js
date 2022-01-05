/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 15:00:18
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 09:50:54
 */
import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from './constants';
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
    if (newDOM) {
        //把子DOM挂在到父DOM
        container.appendChild(newDOM);
        //执行子DOM的挂载完成事件
        if (newDOM.componentDidMount) newDOM.componentDidMount(); 
    }
}

/**
 * @Author: yuanlijian
 * @description: 把虚拟DOM转成真实DOM
 * @param {*} vdom 虚拟DOM
 * @return {*}
 */
function createDOM(vdom) {
    let { type, props, ref } = vdom;
    let dom; //真实DOM
    if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        return mountForwardComponent(vdom); //转发组件
    } else if (type === REACT_TEXT) {
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
    if (ref) ref.current = dom;
    return dom;
}
function mountForwardComponent(vdom) {
    let { type, props, ref } = vdom;
    let renderVdom = type.render(props, ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
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
    let { type: ClassComponent, props, ref } = vdom;
    //把函数对象传递给函数执行，返回要渲染的虚拟DOM
    let classInstance = new ClassComponent(props);
    //给虚拟DOM添加一个属性calssInstance
    vdom.classInstance = classInstance;
    //让ref.current指向类组件的实例
    if (ref) ref.current = classInstance;
    if (classInstance.componentWillMount) {
        classInstance.componentWillMount();
    }
    let renderVdom = classInstance.render();
    classInstance.oldRenderVdom = renderVdom;
    let dom = createDOM(renderVdom);
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount.bind(this);
    }
    return dom;
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
        //如果是类组件，从vdom.classInstance.oldRenderVdom取要渲染的虚拟DOM
        //如果是函数组件，从vdom.oldRenderVdom取要渲染的虚拟DOM
        let oldRenderVdom = vdom.classInstance ? vdom.classInstance.oldRenderVdom : vdom.oldRenderVdom;
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
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    //如果新老都是null, 什么也不做
    if(!oldVdom && !newVdom) {
        return;
        //如果说老的有，新的没有，需要删除老的
    } else if (oldVdom && !newVdom) {
        unMountVdom(oldVdom);
    } else if (!oldVdom && newVdom) {
        let newDOM = createDOM(newVdom);
        if (nextDOM) { //nextDOM
            parentDOM.insertBefore(newDOM, nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        if (newDOM.componentDidMount) newDOM.componentDidMount();
        //新老都有，但是类型不同，也不能复用
    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
        unMountVdom(oldVdom);
        let newDOM = createDOM(newVdom);
        if (nextDOM) { //nextDOM
            parentDOM.insertBefore(newDOM, nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        parentDOM.appendChild(newDOM);
        if (newDOM.componentDidMount) newDOM.componentDidMount();
        //新的有，老的也有，并且还一样，可以复用老的真实DOM节点，就可以走深度比较逻辑了，进行比较属性和子节点的过程
    } else {
        updateElement(oldVdom, newVdom);
    }
}
/**
 * @Author: yuanlijian
 * @description: 深度比较新老虚拟DOM的差异，把差异同步到真实DOM
 * @param {*} oldVdom
 * @param {*} newVdom
 * @return {*}
 */
function updateElement(oldVdom, newVdom) {
    if (oldVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        if (oldVdom.props !== newVdom.props) {
            currentDOM.textContent = newVdom.props;
        }
    } else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (typeof oldVdom.type === 'function') {
        //类组件
        if (oldVdom.type.isReactComponent) {
            //让新的虚拟DOM对象复用老的类组件的实例 //TODO
            updateClassComponent(oldVdom, newVdom);
        } else {
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}
/**
 * @Author: yuanlijian
 * @description: 更新函数组件
 * @param {*} oldVdom
 * @param {*} newVdom
 * @return {*}
 */
function updateFunctionComponent(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom); //TODO
    if(!currentDOM) return;
    let parentDOM = currentDOM.parentNode;
    let { type, props } = newVdom;
    let newRenderVdom = type(props);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom;
}
/**
 * @Author: yuanlijian
 * @description: 更新类组件
 * @param {*} oldVdom
 * @param {*} newVdom
 * @return {*}
 */
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance;
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVdom.props);
    }
    classInstance.updater.emitUpdate(newVdom.props);
}
function updateChildren(parentDOM, oldVChildren, newVChildren) {
    oldVChildren = (Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]).filter(item => item);
    newVChildren = (Array.isArray(newVChildren) ? newVChildren : [newVChildren]).filter(item => item);
    let maxLength = Math.max(oldVChildren.length, newVChildren.length);
    for (let i = 0; i < maxLength; i++) {
        //在老的DOM树中找出 索引大于当前的索引，并且存在真实DOM那个虚拟DOM
        let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom && findDOM(nextVdom));
    }
}
function unMountVdom(vdom) {
    let { type, props, ref } = vdom;
    //获取当前的真实DOM
    let currentDOM = findDOM(vdom);
    //生命周期 vdom有classInstance说明这是一个类组件
    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {
        vdom.classInstance.componentWillUnmount();
    }
    if (ref) {
        ref.current = null;
    }
    //递归删除子节点
    if (props.children) {
        let children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach(unMountVdom);
    }
    //把此虚拟DOM对应的老的DOM节点从父节点中移除
    if (currentDOM) {
        currentDOM.parentNode.removeChild(currentDOM); 
    }
}
const ReactDOM = {
    render
}

export default ReactDOM;