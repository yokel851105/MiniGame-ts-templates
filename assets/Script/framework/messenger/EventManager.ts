import { type } from "os";
/*
 * @Author: Yang Huan 
 * @Date: 2019-11-19 16:41:22 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-19 18:30:32
 * EventManager 
 */

export type EventManagerCallFunc = (eventName: string, eventData: any) => void;

interface CallbackTarget {
    callback: EventManagerCallFunc,
    target: any,
}

export class EventManager {
    private static instance: EventManager = null;

    private _eventListeners: { [key: string]: CallbackTarget[] } = {};

    //singleton mode
    public static getInstance(): EventManager {
        if (!this.instance) {
            this.instance = new EventManager();
        }
        return this.instance
    }

    public static destroy(): void {
        if (this.instance)
            this.instance = null;
    }

    private getEventListenersIndex(eventName: string, callback: EventManagerCallFunc, target: any): number {
        let index = -1;
        let listenerData = this._eventListeners[eventName]
        for (let i = 0; i < listenerData.length; i++) {
            let iterator = listenerData[i];
            if (iterator.callback == callback && (!target || iterator.target == target)) {
                index = i;
                break;
            }

        }
        return index;
    }

    addEventListener(eventName: string, callback: EventManagerCallFunc, target: any): boolean {
        if (!eventName) {
            cc.warn('evenName is null' + eventName);
            return;
        }

        if (null == callback) {
            cc.warn('addEventListener callback is null');
            return false;
        }

        let callbackTarget: CallbackTarget = { callback: callback, target: target };

        if (null == this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [callbackTarget]
        } else {
            let index = this.getEventListenersIndex(eventName, callback, target);
            if (-1 == index)
                this._eventListeners[eventName].push(callbackTarget);
        }
        return true;
    }

    setEventListener(eventName: string, callback: EventManagerCallFunc, target: any): boolean {
        if (!eventName) {
            cc.warn('evenName is null' + eventName);
            return;
        }

        if (null == callback) {
            cc.warn('setEventListener callback is null');
            return false;
        }
        let callbackTarget: CallbackTarget = { callback: callback, target: target };
        this._eventListeners[eventName].push(callbackTarget);
        return;
    }

    removeEventListener(eventName: string, callback: EventManagerCallFunc, target: any) {
        if (null != this._eventListeners[eventName]) {
            let index = this.getEventListenersIndex(eventName, callback, target);
            if (-1 != index)
                this._eventListeners[eventName].splice(index, 1);
        }
    }

    dispatchEvent(eventName: string, eventData: any) {
        cc.log(`--------------- diapatchEvent${eventName}  | ${JSON.stringify(eventData)}`);
        if (null != this._eventListeners[eventName]) {
            let callbacklist: CallbackTarget[] = [];
            for (const iterator of this._eventListeners[eventName]) {
                callbacklist = [...callbacklist, { callback: iterator.callback, target: iterator.target }];
            }
            for (const iterator of callbacklist) {
                iterator.callback.call(iterator.target, eventName, eventData);
            }
        }
        cc.log(`==================== diapatchEvent ${eventName} end`);
    }

}

export let EventMng = EventManager.getInstance();
