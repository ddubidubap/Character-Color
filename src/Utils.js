import { Button } from './ClassButton';
import { Text } from './ClassText';
import { Image } from './ClassImage';
import { Container } from './ClassContainer';


// 뒤로가기 버튼
export function backButton(activated, callback) {
    let backButton = new Button("←");
    backButton.setCallback(callback);
    backButton.setRectSizeColor(10, 10, 50, 50, 0);
    backButton.setTextLocation(10, 5)
    backButton.setTextStyle("#000000", 30, "bold");

    if (!activated) backButton.deactivate();
    let backButtonObj = backButton.create();

    return backButtonObj;
}

// 제목
export function titleText() {
    const titleMessage = "캐릭터 짝 맞추기"
    let title = new Text(titleMessage);
    title.setLocation(300, 25, true);
    title.setTextStyle("#000000", 30, "bold");
    let titleObj = title.create();

    return titleObj;
}

// 게임 방법 설명 텍스트
export function explainText() {
    const explain = "캐릭터와 같은 색 버튼을 터치해 주세요!";
    let explainText = new Text(explain);
    explainText.setTextStyle("#000000", 25, "normal");
    explainText.setLocation(300, 100, true);
    let explainTextObj = explainText.create();

    return explainTextObj;
}

// 게임 방법 설명 이미지
export function explainImage() {
    let explainImage = new Image("./assets/explainImage.png");
    explainImage.setLocation(300, 400);
    let explainImageObj = explainImage.create();

    return explainImageObj;
}

// 게임 시작 버튼
export function belowButton(text, callback) {
    let belowBtn = new Button(text);
    belowBtn.setCallback(callback);
    belowBtn.setRectSizeColor(300, 700, 300, 50, 0xBDBDBD, true);
    belowBtn.setTextLocation(300, 700, true);
    belowBtn.setTextStyle("#000000", 30, "bold");
    let belowBtnObj = belowBtn.create();

    return belowBtnObj;
}

// 점수 텍스트
export function gameScoreText(score) {
    let scoreText = new Text(`${score} 점`);
    scoreText.setLocation(300, 100, true);
    scoreText.setTextStyle("#000000", 30, "bold");
    let scoreTextObj = scoreText.create();

    return scoreTextObj;
}

// 60초 타이머
export function gameTimeBar() {
    let timeGivenBar = new Button("");
    timeGivenBar.deactivate();
    timeGivenBar.setRectSizeColor(300, 155, 360, 30, 0xEAEAEA, true);
    let timeGivenBarObj = timeGivenBar.create();

    return timeGivenBarObj;
}

// 흘러가는 시간
export function gameTimeLeftBar(timeLeft, width) {
    let timeLeftBar = new Button("");
    timeLeftBar.deactivate();
    timeLeftBar.setText(`${timeLeft}초`);
    timeLeftBar.setTextLocation(300, 155, true);
    timeLeftBar.setTextStyle("#000000", 20, "normal");
    timeLeftBar.setRectSizeColor(120, 140, width, 30, 0x86E57F);
    let timeLeftBarObj = timeLeftBar.create();

    return timeLeftBarObj;
}

// 초기에 생성되는 6개의 캐릭터
export function initChar() {
    let charList = new Array();
    let charContainer = new Container();

    for (var i = 0; i <= 5; i++) {
        let randInt = randomInt(2);
        charList.push(randInt);
    
        let png = new Image();
        png.setImageFromInt(randInt);       // 이미지 설정
        png.setLocation(300, 250 + (i*50), true); // 위치 조정
        png.setScale(1.5 + (0.1 * i));      // 10%씩 키움
        png = png.create();
    
        charContainer.addChild(png);
    }

    return [charList, charContainer];
}

// 컬러 버튼 
export function colorButton(activated, x, color, callback) {
    let colorBtn = new Button("")
    colorBtn.setCallback(callback);
    colorBtn.setCircleSizeColor(x, 700, 50, color, true);

    if (!activated) colorBtn.deactivate();

    let colorBtnObj = colorBtn.create();
    return colorBtnObj;
}

// 틀림 표시
export function wrongAnswer(x) {
    let wrong = new Image("./assets/wrong.png");
    wrong.setScale(0.6);
    wrong.setLocation(x, 700, true);
    let wrongObj = wrong.create();

    return wrongObj;
}

// 오버레이 위에 띄울 텍스트 1
export function mainTextOnOverlay(mainText) {
    let text = new Text(mainText);
    text.setTextStyle("#FFFFFF", 50, "bold");
    text.setLocation(300, 200, true);
    let textObj = text.create();

    return textObj;
}

// 오버레이 위에 띄울 텍스트 2
export function subTextOnOverlay(subText) {
    let text = new Text(subText);
    text.setLocation(300, 150, true);
    text.setTextStyle("#FFFFFF", 30, "bold");
    let textObj = text.create();

    return textObj;
}

// 자식 바꿔치기
export function changeChildren(container, remove, add) {
    container.removeChild(remove);
    container.addChild(add);

    // for (var i of remove)
    //     container.removeChild(i);

    // for (var i of add)
    //     container.addChild(i);
}

// 0 ~ x 사이의 정수 반환
export function randomInt(x) {
    let randInt = Math.floor(Math.random() * (x+1));
    return randInt;
}
