/*
 * @Author: Yang Huan 
 * @Date: 2019-11-21 14:43:40 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-21 16:00:43
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
