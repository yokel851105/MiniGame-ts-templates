import { NetUrlConstants } from "./NetUrlConstants";
import { handler, UT } from "../util/UtilTool";
import { HttpNet } from "./native/HttpNetManager";
import { MiniGame } from "../../channel/miniPlatform/MiniGame";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-21 17:36:59 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-22 10:37:30
 * 网络请求
 */
export class HttpNetRequest {

    static getPerformanceNow() {
        UT.log('---1111---')
        return new Promise((resolve: Function, reject: Function) => {
            if (cc.sys.isNative) {
                HttpNet.doGet(NetUrlConstants.now_url, {}, resolve, reject)
            } else {
                MiniGame.miniPFArr[MiniGame.curMin].doGet(NetUrlConstants.now_url, {}, resolve, reject)
            }
        })
    }

    


}