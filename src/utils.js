/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 13:28:14
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-07 09:48:46
 */

import { REACT_TEXT } from './constants';

/**
 * @Author: yuanlijian
 * @description: 把虚拟DOM节点进行包装，如果此虚拟DOM是一个文本，比如说是字符串或者数字，包装成一虚拟DOM节点对象
 * @param {*} element 虚拟DOM
 * @return {*}
 */
export function wrapToVdom(element) {
    return typeof element === 'string' || typeof element === 'number' ? {
        type: REACT_TEXT, props: element
    } : element;
}

/**
 * @Author: yuanlijian
 * @description: 浅比较两个对象
 * @param {*} obj1 对象1
 * @param {*} obj2 对象2
 * @return {*}
 */
export function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }
    //如果都是对象，并且属性都是存在的
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}