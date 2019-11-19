const i18n = require('LanguageData');

/**
 * language
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    private isChanged: boolean = true;
    @property
    private curLang: string = 'zh';

    onLoad() {
        this.isChanged = true;
        
    }

    start() {
        this.curLang = cc.sys.language;
        i18n.init(this.curLang);
    }

    update(dt) {
        i18n.updateSceneRenderers();
    }

    changeLanguage() {
        this.isChanged = !this.isChanged;
        i18n.init('en');
        if (this.isChanged) {
            i18n.init('zh');
        }
    }
}
