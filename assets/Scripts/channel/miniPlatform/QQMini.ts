import { MiniGame } from "./MiniGame";
import { MiniApp } from "./MiniApp";


export  class QQMini extends MiniApp {
    constructor(name:string){
        super(name)
    }
    init() {
        throw new Error("Method not implemented.");
    }


}
MiniGame.addMiniPlatform(new QQMini('QQMini'));
