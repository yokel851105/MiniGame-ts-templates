/*
 * @Author: Yang Huan 
 * @Date: 2019-11-19 18:18:36 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-19 18:52:00
 * 工具类
 */
const i18n = require('LanguageData');

export class UtilTool {
    public isPrint: boolean = true;
    public gameName: string = 'ts-template';
    private labelBaseKey: string = 'label_txt.';
    private static instance: UtilTool = null;

    public static getInstance(): UtilTool {
        if (!this.instance)
            this.instance = new UtilTool();
        return this.instance;
    }
    //打印
    log(str: string, params = '') {
        if (this.isPrint) {
            console.log(this.gameName + ' -----' + str + ' ' + params);
        }
    }

    jsonLog(str: string, tagStr = '') {
        if (this.isPrint) {
            console.log(this.gameName + ' -----' + tagStr + JSON.stringify(str));
        }
    }

    changeLabeli18n(lable: cc.Label, lableKey: string, baseKey = true): void {
        let labelBaseKey = '';
        if (baseKey)
            labelBaseKey = this.labelBaseKey;
        lable.node.getComponent('LocalizedLabel').dataID = labelBaseKey + lableKey;
    }

    geti18nStr(key: string): string {
        let str = '';
        if ('' != key)
            str = i18n.t(key)
        return str;
    }

}

export let UT = UtilTool.getInstance()
