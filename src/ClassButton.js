import * as PIXI from 'pixi.js';

export class Button {
    // 버튼 생성자 ====================================================================
    constructor(innerText) {
        this.callback;          // 콜백 함수
        this.x = new Number();  // 시작 x 좌표
        this.y = new Number();  // 시작 y 좌표
        this.w = new Number();  // 너비
        this.h = new Number();  // 높이

        // 버튼
        this.btn = new PIXI.Graphics();
        this.btn.interactive = true;
        this.btn.buttonMode = true;

        // 버튼 안의 텍스트
        this.innerText = new PIXI.Text(innerText);
        this.innerText.interactive = true;
        this.innerText.buttonMode = true;

        this.container = new PIXI.Container();
    }

    // 콜백함수 설정 ==================================================================
    setCallback(callback) {
        this.callback = callback;
        this.btn.on("click", this.callback);
        this.innerText.on("click", this.callback);
    }

    // 사각형 버튼 생성 ===============================================================
    setRectSizeColor(x, y, w, h, color=0, anchor=false) {
        // 시작 좌표, 크기 설정
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        // 입력값을 중앙좌표로 설정할 수 있도록 함
        if (anchor) {
            this.x = this.x - (this.w / 2);
            this.y = this.y - (this.h / 2)
        }

        // 색을 지정하면 해당 색으로 버튼 색 설정
        if (color != 0) {
            this.btn.beginFill(color);
            this.btn.drawRoundedRect(this.x, this.y, this.w, this.h);
            this.btn.endFill();
        } 
        // 색을 지정하지 않으면 색칠하지 않음
        else {
            this.btn.drawRoundedRect(this.x, this.y, this.w, this.h);
        }
    }

    // 원형 버튼 생성 =================================================================
    setCircleSizeColor(x, y, r, color=0, anchor=false) {
        this.x = x;
        this.y = y;
        this.r = r;

        // 입력값을 중앙좌표로 설정할 수 있도록 함
        if (anchor) {
            this.x = this.x - (this.w / 2);
            this.y = this.y - (this.h / 2)
        }

        // 색을 지정하면 해당 색으로 버튼 색 설정
        if (color != 0) {
            this.btn.beginFill(color);
            this.btn.drawCircle(x, y, r);
            this.btn.endFill();
        } 
        // 색을 지정하지 않으면 색칠하지 않음
        else {
            this.btn.drawCircle(x, y, r);
        }
    }

    // 버튼 안의 텍스트 ===============================================================
    setText(text) {
        this.innerText = new PIXI.Text(text);
    }

    // 텍스트 위치 설정 (anchor 설정 가능) ============================================
    setTextLocation(x, y, anchor=false) {
        this.innerText.x = x;
        this.innerText.y = y;

        if (anchor) {
            this.innerText.anchor.set(0.5, 0.5);
        }
    }

    // 텍스트 스타일 설정 =============================================================
    setTextStyle(textColor, fontSize, fontWeight) {
        const style = new PIXI.TextStyle({
            fill: [textColor],
            fontSize: fontSize,
            fontWeight: fontWeight
        })
        this.innerText.style = style;
    }

    // 버튼 비활성화 ==================================================================
    deactivate() {
        this.btn.interactive = false;
        this.btn.buttonMode = false;
        this.innerText.interactive = false;
        this.innerText.buttonMode = false;
    }

    // 버튼 활성화 ===================================================================
    activate() {
        this.btn.interactive = true;
        this.btn.buttonMode = true;
        this.innerText.interactive = true;
        this.innerText.buttonMode = true;
    }

    // 버튼 객체 생성 =================================================================
    create() {
        this.container.addChild(this.btn);
        this.container.addChild(this.innerText);
        return this.container;
    }
}