import { EventMng } from "../../../../framework/messenger/EventManager";
import { EventName } from "../../../../framework/messenger/EventName";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-19 17:34:13 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-19 17:55:30
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    touchBtnEvent() {
        EventMng.dispatchEvent(EventName.testEvent, { msg: 'customEvent' })
        this.node.active = false;
    }

    // update (dt) {}
}
