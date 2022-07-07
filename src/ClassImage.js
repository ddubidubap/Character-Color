import * as PIXI from 'pixi.js';

export class Image {
    // 이미지 생성자 ===========================================
    constructor(image=0) {
        // 경로를 지정하면 해당 경로의 이미지 설정 ===============
        if (image != 0) {
            this.sprite = new PIXI.Sprite.from(image)
        }

        this.x = new Number();      // x좌표
        this.y = new Number();      // y좌표
        this.scale = new Number();  // 크기
        this.container = new PIXI.Container();
    }

    // 주어진 정수에 따라 정해진 이미지 설정 (컬러 버튼 용) =======
    setImageFromInt(image) {
        let red = "./assets/redChar.png";
        let green = "./assets/greenChar.png";
        let blue = "./assets/blueChar.png";

        if (image == 0) 
            this.sprite = new PIXI.Sprite.from(red);
        else if (image == 1) 
            this.sprite = new PIXI.Sprite.from(green);
        else 
            this.sprite = new PIXI.Sprite.from(blue);
    }

    // 이미지 위치 설정 ========================================
    setLocation(x, y, anchor=false) {
        this.x = x;
        this.y = y;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        if (anchor) 
            this.sprite.anchor.set(0.5, 0.5);
    }

    // 이미지 크기 설정 =======================================
    setScale(scale) {
        this.scale = scale;

        this.sprite.scale.x *= this.scale;
        this.sprite.scale.y *= this.scale;
    }

    // 이미지 객체 설정 =======================================
    create() {
        this.sprite.anchor.set(0.5, 0.5);
        this.container.addChild(this.sprite);
        return this.container;
    }
}