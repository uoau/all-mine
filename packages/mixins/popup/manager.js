class PopupManager {
    constructor() {
        this.zIndex = 2000;
    }

    getZIndex() {
        this.zIndex += 1;
        return this.zIndex;
    }
}

export default new PopupManager();
