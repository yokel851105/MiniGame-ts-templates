import { MiniApp } from "./MiniApp";
import { MiniGame } from "./MiniGame";
import { NetUrlConstants } from "../../framework/net/NetUrlConstants";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-21 22:17:15 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-22 18:00:36
 * 
 * wx  mini
 */

export let WXShareConfig = {
    shareImageUrl: 'https://cdn.hzweimo.com/battlecastles/remoteres/shareImg/',
    title: '大炮口径就是正义',
    imageUrl: '12303.png'
}
/**
 * 可以创建几个  不同UI显示不同的banner
 */
export let BannerAdUnitId = ['adunit-ffd4823b8b0f71bd']

/**
 * 不同的视频时长
 */
export let VideoAdUnitId = ['adunit-82ce786ed85cce4e']


export class WxMini extends MiniApp {
    constructor(name: string) {
        super(name);
        this.log('---------WxMini----------')
    }
    init(): any {
        this.log(`${this.name}-----init------`)
        this.onShow();
        this.onHide();
        this.showShareMenu();
        this.preloadBannerAd();
        this.proLoadVideo();
    }

    updataVersion(): void {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            console.log('new version download failed')
        })
    }

    private showModal(): void {

    }

    loadSubpackage(subpackageName = '', cb?: Function) {
        cc.loader.downloader.loadSubpackage(subpackageName, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            cb();
        });
    }

    exitMiniProgram() {
        wx.exitMiniProgram({})
    }

    getSystemInfoSync(): Object {
        const res = wx.getSystemInfoSync()
        return res;
    }

    getSystemInfo() {
        return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success(res: any) {
                    resolve(res)
                },
                fail(res: any) {
                    reject(res)
                }
            })
        })
    }


    //主动转发
    protected showShareMenu() {
        wx.showShareMenu({
            complete: () => {
                this.log('---showShareMenu-complete');
            }
        });
        let title = WXShareConfig.title;
        let imageUrl = WXShareConfig.shareImageUrl + WXShareConfig.imageUrl;
        // let imageUrl =  WXShareConfig.imageUrl;

        var query = "title=" + title + "&imageUrl=" + imageUrl;
        let shareCb = () => {
            return {
                title: title,
                imageUrl: imageUrl,
                query: query
            }
        }
        wx.onShareAppMessage(shareCb)
        this.log('---showShareMenu-');
    }

    shareAppMessage() {
        let title = WXShareConfig.title;
        let imageUrl = WXShareConfig.shareImageUrl + WXShareConfig.imageUrl;
        // let imageUrl =  WXShareConfig.imageUrl;

        var query = "title=" + title + "&imageUrl=" + imageUrl;
        let shareObj = {
            title: title, imageUrl: imageUrl, query: query
        };
        wx.shareAppMessage(shareObj)
    }

    //需要传递的代表场景的数字，需要在 0 - 50 之间
    setMessageToFriendQuery(num: number): boolean {
        return wx.setMessageToFriendQuery({ shareMessageToFriendScene: num })
    }

    private onShow() {
        wx.onShow((res: any) => {
            this.log("MiniGame.currentSys.onShow res " + JSON.stringify(res));
        })
    }

    private onHide() {
        wx.onHide(() => {
            this.log('onHide');
        });
    }

    offshow() {
        wx.offShow()
    }

    offHide() {
        wx.offHide();
    }

    getLaunchOptionsSync(): Object {
        return wx.getLaunchOptionsSync();
    }

    setKeepScreenOn(isKeepScreenOn = true) {
        wx.setKeepScreenOn({
            keepScreenOn: isKeepScreenOn
        })
    }

    vibrateShort() {
        wx.vibrateShort();
    }

    vibrateLong() {
        wx.vibrateLong();
    }

    setClipboardData(data: any) {
        wx.setClipboardData({
            data: data
        })
    }

    getClipboardData(cb?: Function) {
        wx.getClipboardData({
            success(res: any) {
                cb(res.data)
            }
        })
    }

    doGet(url: string, params: any, resolve: Function, reject: Function, headers?: any, ) {
        if (params) {
            if (url.indexOf('?') == -1) {
                url += '?';
            }
            url += params;
        }
        this.doHttp(url, params, 'GET', resolve, reject, headers);
    }

    doPost(url: string, params: any, resolve: Function, reject: Function, headers?: any, ) {
        this.doHttp(url, params, "POST", resolve, reject, headers);
    }

    private doHttp(url: string, params: any, method: string, resolve: Function, reject?: Function, headers?: any) {
        let baseUrl = NetUrlConstants.isDebug ? NetUrlConstants.betaUrl : NetUrlConstants.prodUrl;
        baseUrl = baseUrl.replace(/^\s+|\s+$/g, "");
        url = baseUrl + url + "?time=" + Date.parse(new Date().toString());
        this.log(`${this.name}-------${url}`)
        const requestTask = wx.request({
            url: url,
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: method,
            data: params,
            success: function (res) {
                resolve(res.data)
            },
            fail: function (res) {
                reject(res);
            }
        })

        // requestTask.abort()
    }

    preloadBannerAd() {
        BannerAdUnitId.forEach((item, index) => {
            this.log('----------=' + item)
            this.loadBannerAd(index, item);
        })

    }

    private loadBannerAd(index: number, adUnitId: string): any {
        let systemInfo: Object = this.getSystemInfoSync();
        let windowWidth = systemInfo.windowWidth;
        let windowHeight = systemInfo.windowHeight;
        let pixelRatio = systemInfo.pixelRatio;

        let ratio = windowHeight / windowWidth;
        let topDelat = 0;
        let hAlign = 0.7;
        if (ratio >= 2.0) {
            topDelat = (windowHeight - 667) / pixelRatio;
            hAlign = 1
        }
        // 广告
        // adIntervals: adIntervals,
        let bannerAd = wx.createBannerAd({
            adUnitId: adUnitId,
            adIntervals: 30,
            style: {
                left: 0,
                top: windowHeight - 50,
                width: windowWidth,
                height: windowHeight * hAlign,
            }
        })
        bannerAd.onResize(() => {
            bannerAd.style.left = 0;
            bannerAd.style.top = windowHeight - bannerAd.style.realHeight - 10;
        });
        bannerAd.onError(function (res) {
            console.log(res);
        })
        this.bannerAd[index] = bannerAd;
    }


    showBannerAd(index: number) {
        if (index >= BannerAdUnitId.length) return;
        if (this.bannerAd[index])
            this.bannerAd[index].show();
    }

    hideBannerAd(index: number) {
        if (index >= BannerAdUnitId.length) return;
        if (this.bannerAd[index])
            this.bannerAd[index].hide();
    }


    proLoadVideo() {

        VideoAdUnitId.forEach((item, index) => {
            this.loadVideoAd(index, item)
        })

    }

    loadVideoAd(index: number, adUnitId: string) {
        this.videoAd[index] = wx.createRewardedVideoAd({
            adUnitId: adUnitId
        })
        this.videoAd[index].load().then(() => {
            this.log("视频广告加载下一个广告成功");
        }).catch(err => {
            console.log(err.errMsg)
            this.videoAd[index].load().then(() => {

            })
        })

        this.videoAd[index].onError(err => {
            console.log(err.errMsg)
            this.videoAd[index].offError();

        })

    }

    addRewardedVideoAd(index: number, cb: Function) {
        if (index >= VideoAdUnitId.length) return;
        let videoAd = this.videoAd[index];
        if (videoAd == null) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-82ce786ed85cce4e'
            })
            videoAd.load().then(() => {
                this.log("视频广告加载成功");
                videoAd.show()
            }).catch(err => {
                console.log(err.errMsg)
                videoAd.load().then(() => videoAd.show())
            })
        } else {
            // 用户触发广告后，显示激励视频广告
            this.log("视频已经成功，直接开始播放");
            videoAd.show().catch(() => {
                // 失败重试
                videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        }


        videoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined\

            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                videoAd.offClose();
                this.log(" 小于 2.1.0 的基础库版本，res 是一个 undefined   播放完广告获取奖励");

                if (cb != null)
                    cb("观看完整视频广告");

                cb = null;
                this.loadVideoAd(index, VideoAdUnitId[index]);

            }
            else {
                // 播放中途退出，不下发游戏奖励
                this.log(" 播放中途退出，不下发游戏奖励");

                cb = null;
                videoAd.offClose();
                this.loadVideoAd(index, VideoAdUnitId[index]);
                // GameEvent.instance().dispatchCustomEvent(EventName.EName.SHOW_TIPS, {message: '广告未看完无法领取奖励'});
            }

        })

        videoAd.onError(err => {
            console.log(err.errMsg)
            videoAd.offError();
            cb("");
        })
    }





}
MiniGame.addMiniPlatform(new WxMini('WxMini'));