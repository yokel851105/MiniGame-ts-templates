import { MiniApp } from "./MiniApp";
import { MiniGame } from "./MiniGame";

export class VivoMini extends MiniApp {
    constructor(name: string) {
        super(name);
    }
    init(): any {
        this.log(`${this.name}-----init------`)
    }
}
MiniGame.addMiniPlatform(new VivoMini('VivoMini'))