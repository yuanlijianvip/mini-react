/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 12:44:05
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-13 21:53:34
 */

import { REACT_ELEMENT, REACT_FORWARD_REF_TYPE, REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO } from './constants';
import { wrapToVdom, shallowEqual } from './utils';
import { Component, PureComponent } from './Component';

/**
 * @Author: yuanlijian
 * @description: 用来创建React元素的工厂方法
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children 儿子们
 * @return {*}
 */
function createElement(type, config, children) {
    let ref, key;
    if (config) {
        ref = config.ref;
        key = config.key;
        delete config.ref;
        delete config.key;
        delete config.__source;
        delete config.__self;
    }
    let props = { ...config };
    //有多个儿子，props.children就是一个数组了
    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        props.children = wrapToVdom(children);
    }
    return {
        $$typeof: REACT_ELEMENT,
        type,
        ref,
        key,
        props
    }
}
function createRef() {
    return { current: null };
}
function forwardRef(render) {
    return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render
    }
}
let Children = {
    map(children, mapFn) {
        return Array.flatten(children).map(mapFn);
    }
}
function createContext() {
    let context = { $$typeof: REACT_CONTEXT };
    context.Provider = {
        $$typeof: REACT_PROVIDER,
        _context: context
    }
    context.Consumer = {
        $$typeof: REACT_CONTEXT,
        _context: context
    }
    return context;
}
function cloneElement(element, newProps, ...newChildren) {
    let oldChildren = element.props && element.props.children;
    oldChildren = (Array.isArray(oldChildren) ? oldChildren : [oldChildren]).filter(item => typeof item !== 'undefined').map(wrapToVdom);
    newChildren = newChildren.filter(item => typeof item !== 'undefined').map(wrapToVdom);
    let props = { ...element.props, ...newProps };
    if (newChildren.length > 0) {
        props.children = newChildren;
    } else {
        props.children = oldChildren;
    }
    if (props.children.length === 0) {
        props.children = undefined;
    } else if (props.children.length === 1) {
        props.children = props.children[0];
    }
    return { ...element, props };
}
/**
 * @Author: yuanlijian
 * @description: 返回一个可以在属性不变的时候不重新渲染的组件
 * @param {*} type 函数组件
 * @param {*} compare 比较 属性是否相同的方法
 * @return {*}
 */
function memo(type, compare = shallowEqual) {
    return {
        $$typeof: REACT_MEMO,
        compare,
        type
    }
}
const React = {
    createElement,
    Component,
    createRef,
    forwardRef,
    Children,
    createContext,
    cloneElement,
    PureComponent,
    memo
}

export default React;