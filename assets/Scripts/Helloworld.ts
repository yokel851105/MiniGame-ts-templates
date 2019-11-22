
import { EventMng } from "./framework/messenger/EventManager";
import { EventName } from "./framework/messenger/EventName";
import { UT } from "./framework/util/UtilTool";
import { HttpNetRequest } from "./framework/net/HttpNetRequest";
import { MiniGame } from "./channel/miniPlatform/MiniGame";
const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Label)
    testEventlabel: cc.Label = null;
    @property
    text: string = 'hello';

    @property(cc.Node)
    testUi: cc.Node = null;

    onLoad() {
        MiniGame.getCurMini();
        MiniGame.initPlatform();
    }

    onEnable() {
        EventMng.addEventListener(EventName.testEvent, this.testUI, this);
    }
    onDisable() {
        EventMng.removeEventListener(EventName.testEvent, this.testUI, this);
    }

    start() {
        // init logic
        this.label.string = this.text;
        UT.changeLabeli18n(this.testEventlabel, 'event')
        UT.log(UT.geti18nStr(this.testEventlabel.string))

    }

    testUI(eventName: string, evenData: any) {
        var msg = evenData.msg;
        UT.changeLabeli18n(this.testEventlabel, msg)
        UT.log(this.testEventlabel.string)
    }

    touchBtnEvent() {
        this.testUi.active = true;
        this.getPerformanceNow(() => {
            UT.log('-----getPerformanceNow------')
        })
        UT.jsonLog('touchBtnEvent  ' + MiniGame.name);

        UT.log('-----getPerformanceNow-MiniGame.getAllName()-----' + JSON.stringify(MiniGame.getAllName()));

    }

    share(){
        MiniGame.share();
    }

    getPerformanceNow(cb: any) {
        HttpNetRequest.getPerformanceNow().then((res: any) => {
            cb(res);
            UT.jsonLog(res)
            UT.log('---------' + res.data);

        }).catch((res) => {
            UT.jsonLog(res, ' getPerformanceNow error  ');
        })
    }
}
