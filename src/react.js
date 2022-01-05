/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 12:44:05
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 19:49:33
 */

import { REACT_ELEMENT, REACT_FORWARD_REF_TYPE } from './constants';
import { wrapToVdom } from './utils';
import { Component } from './Component';

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
const React = {
    createElement,
    Component,
    createRef,
    forwardRef,
    Children
}

export default React;