export class MiniGame {
    static miniPFArr: any[] = [];
    static addMiniPlatform(miniPPF: any) {
        if (this.miniPFArr[miniPPF.name]) {
            console.log("addShader - shader already exist: ", miniPPF.name);
            return;
        }
        // if (cc. ._forward) {
            
        // }

    }
    static getAllName = function () {
        let array = Object.keys(this.miniPFArr);
        let result = array.map((name, value) => {
            return { name, value };
        });
        return result;
    };

}