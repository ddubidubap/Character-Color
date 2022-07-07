import * as PIXI from 'pixi.js';

export class Container extends PIXI.Container {
    // 컨테이너 생성자 ================================================
    constructor() {
        super();
        this.container = new PIXI.Container();
        this.area = new PIXI.Graphics();
    }

    // 위치, 크기, 색 설정 ============================================
    setSizeColor(x, y, w, h, color, opacity=1, anchor=false) {
        this.area = new PIXI.Graphics();
        if (anchor) {
            x = x - (w / 2);
            y = y - (h / 2)
        }
        
        this.area.beginFill(color, opacity);
        this.area.drawRect(x, y, w, h);
        this.area.endFill();    
        this.container.addChild(this.area);
    }

    // 컨테이너 안에 자식 넣기 ========================================
    addMyChildren(children) {
        for (var i of children) 
            this.container.addChild(i);
    }

    // 컨테이너 안의 자식 지우기 ======================================
    removeMyChildren(children) {
        for (var i of children) 
            this.container.removeChild(i);
    }

    // 컨테이너 객체 생성 =============================================
    create() {
        return this.container;
    }
}