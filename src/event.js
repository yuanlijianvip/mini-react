/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-03 14:55:05
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-05 08:27:09
 */
import { updateQueue } from './Component';
/**
 * @Author: yuanlijian
 * @description: 给DOM添加合成事件，不是天然的，人工合成的
 * 为什么要合成？
 * 1、做一个类似面向切面编程的操作 AOP.在用户自己的handler函数之前做一些事情，之后做一些事情
 * 2、处理浏览器的兼容性 提供兼容所有浏览器的统一的API,屏蔽浏览器的差异
 * 3、模拟事件冒泡和阻止冒泡的过程
 * @param {*} dom 绑定事件的真实DOM button
 * @param {*} eventType 绑定时候的属性名
 * @param {*} handler 用户自己编写的事件处理函数
 * @return {*}
 */
function addEvent(dom, eventType, handler) {
    //button._store={}
    let store = dom._store || (dom._store = {});
    //button._store['onClick']=handleClick
    store[eventType] = handler;
    if (!document[eventType]) {
        document[eventType] = dispatchEvent;
    }
}

/**
 * @Author: yuanlijian
 * @description: document身上绑定的点击事件的实践处理函数
 * @param {*} nativeEvent
 * @return {*}
 */
function dispatchEvent(nativeEvent) {
    updateQueue.isBatchingUpdate = true;
    //type = click target事件源DOM  点击的是button的话就是button
    let { type, target } = nativeEvent;
    let eventType = `on${type}`; //onclick
    let syntheticEvent = createSyntheticEvent(nativeEvent);
    while (target) {
        let { _store } = target;
        let handler = _store && _store[eventType];
        if (handler) handler(syntheticEvent);
        if (syntheticEvent.isPropagationStopped) {
            break;
        }
        target = target.parentNode;
    }
    // updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
    let syntheticEvent = {};
    for (let key in nativeEvent) {
        let value = nativeEvent[key];
        if (typeof value === 'function') value = value.bind(nativeEvent);
        syntheticEvent[key] = value;
    }
    syntheticEvent.nativeEvent = nativeEvent;
    syntheticEvent.isPropagationStopped = false; //当前的是否已经阻止冒泡了
    syntheticEvent.stopPropagation = stopPropagation;
    syntheticEvent.defaultPrevented = false; //当前的是否已经阻止默认行为
    syntheticEvent.preventDefault = preventDefault;
    return syntheticEvent;
}
function preventDefault() {
    const event = this.nativeEvent;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    this.defaultPrevented = true;
}
function stopPropagation() {
    const event = this.nativeEvent;
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
    this.isPropagationStopped = true;
}

export {
    addEvent
}