import { MiniApp } from "./MiniApp";
import { MiniGame } from "./MiniGame";

export  class OppoMini extends MiniApp {
    constructor(name: string) {
        super(name);
    }

    init() {
        throw new Error("Method not implemented.");
    }

   
}
MiniGame.addMiniPlatform(new OppoMini('OppoMini'));
