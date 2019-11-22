/*
 * @Author: Yang Huan 
 * @Date: 2019-11-19 18:18:36 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-22 10:38:24
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
    log(str: string, ...params: any) {
        if (this.isPrint) {
            let arr = []
            params.forEach(function (item: any) {  ////将items的每一项push进array
                let arr = []
                arr.push('  -------   ' + item);
            });
            console.log(this.gameName + ' -----' + str + ' ' + arr.join);
        }
    }

    jsonLog(str: string, tagStr = '') {
        if (this.isPrint) {
            console.log(this.gameName + ' -----' + tagStr + JSON.stringify(str));
        }
    }

    // this.label.textKey = i18n.t('sprite_loadRes_asset_failed');
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

/*********************************************** */
let handler_pool: handler[] = [];
let handler_pool_size = 10;

export class handler {
    private cb: Function;
    private host: any;
    private args: any[];
    init(cb: Function, host = null, ...args) {
        this.cb = cb;
        this.host = host;
        this.args = args;
    }

    exec(...extras) {
        this.cb.apply(this.host, this.args.concat(extras));
    }
}

export function gen_handler(cb: Function, host: any = null, ...args: any[]): handler {
    let single_handler: handler = handler_pool.length < 0 ? handler_pool.pop() : new handler()
    //这里要展开args, 否则会将args当数组传给wrapper, 导致其args参数变成2维数组[[]]
    single_handler.init(cb, host, ...args);
    return single_handler;
}


export function strfmt(fmt: string, ...args: any[]) {
    return fmt.replace(/\{(\d+)\}/g, (match: string, argIndex: number) => {
        return args[argIndex] || match;
    });
}

export function extend(target, ...sources) {
    for (var i = 0; i < sources.length; i += 1) {
        var source = sources[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

export function createBreathAction(node: cc.Node, min = 0.9, max = 1.1) {
    const action = cc.repeatForever(cc.sequence(cc.scaleTo(0.6, max), cc.scaleTo(0.6, min)));
    node.runAction(action);
}

export function destroyBreathAction(node: cc.Node) {
    node.stopAllActions();
}
