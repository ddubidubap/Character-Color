import * as PIXI from 'pixi.js';

export class Text {
    // 텍스트 생성자 =========================================
    constructor(innerText) {
        this.innerText = new PIXI.Text(innerText);
        this.container = new PIXI.Container();
    }

    // 텍스트 설정 ===========================================
    setText(text) {
        this.innerText = text;
    }

    // 텍스트 위치 설정 ======================================
    setLocation(x, y, anchor=false) {
        this.innerText.x = x;
        this.innerText.y = y;

        if (anchor)
            this.innerText.anchor.set(0.5, 0.5);
    }

    // 텍스트 스타일 설정 ====================================
    setTextStyle(textColor, fontSize, fontWeight) {
        const style = new PIXI.TextStyle({
            fill: [textColor],
            fontSize: fontSize,
            fontWeight: fontWeight,
        })
        this.innerText.style = style;
    }

    // 텍스트 객체 생성 ======================================
    create() {
        this.container.addChild(this.innerText);
        return this.container;
    }
}