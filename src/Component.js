/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-02 11:59:51
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-03 11:37:18
 */
import { findDOM, compareTwoVdom } from './react-dom';
class Updater {
    constructor(classInstance) {
        //类组件的实例
        this.classInstance = classInstance;
        //等待更新的状态
        this.pendingStates = [];
        //更新后的回调
        this.callbacks = [];
    }
    addState(partialState, callback) {
        this.pendingStates.push(partialState);
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
        }
        //触发更新
        this.emitUpdate();
    }
    emitUpdate() {
        this.updateComponent();
    }
    updateComponent() {
        let { classInstance, pendingStates, callbacks } = this;
        //长度大于0说明当前正在准备要更新的分状态
        if (pendingStates.length > 0) {
            shouldUpdate(classInstance, this.getState());
        }
        if (callbacks.length > 0) {
            callbacks.forEach(callback => callback());
            callbacks.length = 0;
        }
    }
    //返回新状态
    getState() {
        let { classInstance, pendingStates } = this;
        //先获取老状态
        let { state } = classInstance;
        //用老状态合并新状态
        pendingStates.forEach((partialState) => {
            if (typeof partialState === 'function') {
                partialState = partialState(state);
            }
            state = { ...state, ...partialState };
        })
        //清空数组
        pendingStates.length = 0;
        return state;
    }
}
function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState;
    classInstance.forceUpdate();
}
export class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.updater = new Updater(this);
    }
    setState(partialState, callback) {
        this.updater.addState(partialState, callback);
    }
    //让类组件强行更新
    forceUpdate() {
        //获取此组件上一次render渲染出来的虚拟DOM
        let oldRenderVdom = this.oldRenderVdom;
        //获取虚拟DOM对应的真实DOM oldRenderVdom.dom
        let oldDOM = findDOM(oldRenderVdom);
        //重新执行render得到新的虚拟DOM
        let newRenderVdom = this.render();
        //把老的虚拟DOM和新的虚拟DOM进行对比，对比得到的差异更新到真实DOM
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
    }
}