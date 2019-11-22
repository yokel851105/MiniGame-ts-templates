import { EventMng } from "../../../../framework/messenger/EventManager";
import { EventName } from "../../../../framework/messenger/EventName";
import { MiniGame } from "../../../../channel/miniPlatform/MiniGame";
import { UT } from "../../../../framework/util/UtilTool";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-19 17:34:13 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-22 17:59:03
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onEnable() {
        MiniGame.showBannerAd(0);
    }

    onDisable() {
        MiniGame.hideBannerAd(0);
    }

    touchBtnEvent() {
        EventMng.dispatchEvent(EventName.testEvent, { msg: 'customEvent' })
        this.node.active = false;
    }

    showVideo() {
      
        MiniGame.addRewardedVideoAd(0, () => {
            UT.log('____________showVideo__------------')
        })
    }

    // update (dt) {}
}
