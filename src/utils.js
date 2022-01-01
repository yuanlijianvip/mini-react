/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-01 13:28:14
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-01 18:46:20
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