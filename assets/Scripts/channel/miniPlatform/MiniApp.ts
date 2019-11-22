import { UT } from "../../framework/util/UtilTool";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-21 22:14:30 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-22 13:54:59
 *  小游戏平台基类
 */

export abstract class MiniApp {
    name: string;
    bannerAd: any[] = [];
    videoAd: any[] = [];
    constructor(name: string) {
        this.name = name;
    }
    abstract init(): any;
    log(str: string, ...params: any) {
        UT.log(str, params)
    }

    updataVersion(): void {

    }

    loadSubpackage(subpackageName = '', cb?: Function) {

    }

    protected showShareMenu() {

    }

    preloadBannerAd() {

    }



}

