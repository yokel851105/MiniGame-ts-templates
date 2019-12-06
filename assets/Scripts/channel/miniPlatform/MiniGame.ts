import { UT } from "../../framework/util/UtilTool";

export let MiniPFArr: any = [];
/**
 * mini game 
 */
export class MiniGame {
    static miniPFArr: any[] = [];
    static curMin: string = '';
    constructor() {

    }
    /**
     * static WECHAT_GAME: number;
            static QQ_PLAY: number;
            static FB_PLAYABLE_ADS: number;
            static BAIDU_GAME: number;
            static VIVO_GAME: number;
            static OPPO_GAME: number;
            static HUAWEI_GAME: number;
            static XIAOMI_GAME: number;
            static JKW_GAME: number;
            static ALIPAY_GAME: number;
            
            static ANDROID: number;
            static IPHONE: number;
            static IPAD: number;
     */
    static getCurMini() {
        UT.log('---------  cc.sys.EDITOR_CORE----------' + cc.sys.EDITOR_CORE)
        UT.log('---------  cc.sys.platform----------' + cc.sys.platform)
        if (cc.sys.platform == 2)
            this.curMin = '';

        switch (cc.sys.platform) {
            case cc.sys.WECHAT_GAME:
                this.curMin = 'WxMini';
                break;
            case cc.sys.QQ_PLAY:
                this.curMin = 'QQMini';
                break;
            case cc.sys.VIVO_GAME:
                this.curMin = 'VivoMini';
                break;
            case cc.sys.OPPO_GAME:
                this.curMin = 'OppoMini';
                break;
            case cc.sys.ALIPAY_GAME:
                this.curMin = 'ALiPayMini';
                break;
            case cc.sys.ANDROID:
                this.curMin = 'ALiPayMini';
                break;
            default:
                break;
        }
    }

    static addMiniPlatform(miniPPF: any) {
        UT.log('---------addMiniPlatform-------miniPPF.name---' + miniPPF.name)
        if (this.miniPFArr[miniPPF.name]) {
            console.log("addShader - shader already exist: ", miniPPF.name);
            return;
        }
        // cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        //     this.miniPFArr[miniPPF.name] = miniPPF;
        // });
        this.miniPFArr[miniPPF.name] = miniPPF;
    }
    static getAllName = function () {
        let array = Object.keys(this.miniPFArr);
        let result = array.map((name, value) => {
            return { name, value };
        });
        return result;
    };

    static initPlatform() {
        UT.log('---------addMiniPlatform----this.curMin------' + this.curMin)
        if (this.curMin == '') return;
        this.miniPFArr[this.curMin].init();
    }

    static share() {
        this.miniPFArr[this.curMin].shareAppMessage();
    }

    static showBannerAd(index: number) {
        this.miniPFArr[this.curMin].showBannerAd(index);
    }
    static hideBannerAd(index: number) {
        this.miniPFArr[this.curMin].hideBannerAd(index);
    }

    static addRewardedVideoAd(index: number, cb: Function) {
        this.miniPFArr[this.curMin].addRewardedVideoAd(index, cb);
    }

    static login() {
        this.miniPFArr[this.curMin].login().then((res) => {
            console.log('openId = ', res.data.openId)
        }).catch((res) => {

        })
    }


}

// cc.game.once(cc.game.EVENT_ENGINE_INITED, () => {
//     cc.dynamicAtlasManager.enabled = false;
//     UT.log('-------EVENT_ENGINE_INITED---11111-----')
//     cc.loader.loadResDir('mini',(error, res: any[]) => {
//         UT.log(typeof (res))
//         MiniGame.miniPFArr = res;
//         let array = res.forEach((item: any, i: number) => {
//             UT.log('-------EVENT_ENGINE_INITED--------')
//             UT.log(typeof (item))
//             MiniGame.miniPFArr[item.name] = item;
//         })
//         //@ts-ignore
//         cc.Class.Attr.setClassAttr(MiniGame, 'program', 'enumList', array);
//     });
// })