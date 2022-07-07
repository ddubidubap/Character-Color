import * as PIXI from 'pixi.js';
import * as utils from './Utils';
import { Button } from './ClassButton';
import { Text } from './ClassText';
import { Image } from './ClassImage';
import { Container } from './ClassContainer';

var currentPage = 0;
var score = 0
var time = 60;
var timeWidth = 360;
var clickedButton = "";
var titleBar = new Container();
var explainArea = new Container();
var gamingArea = new Container();

var falseBtn = new PIXI.Container();
var wrongBtn = new PIXI.Container();
var trueBtn = new PIXI.Container();

var overlay = new Container();

// PIXI Application 객체 =========================================
const app = new PIXI.Application({
    width: 600,
    height: 800,
    backgroundColor: 0xFFFFFF
});
// ==============================================================


// 상단바 ========================================================
var backButton = utils.backButton(true, goBack);
var title = utils.titleText();

titleBar.setSizeColor(0, 0, 600, 50, 0xBDBDBD);
titleBar.addMyChildren([backButton, title]);
var titleBarObj = titleBar.create();

app.stage.addChild(titleBarObj);
// ==============================================================


// 게임 방법 설명 ================================================
var explainText = utils.explainText();
var explainImage = utils.explainImage();
var startButton = utils.belowButton("게임 시작!", gameStart);

explainArea.addMyChildren([explainText, explainImage, startButton]);
var explainAreaObj = explainArea.create();

app.stage.addChild(explainAreaObj);
// ==============================================================


// 오버레이 덮기 =================================================
var readyText = utils.mainTextOnOverlay("READY...");
var goText = utils.mainTextOnOverlay("GO!!")

overlay.setSizeColor(0, 0, 600, 800, 0x000000, 0.8);
var overlayObj = overlay.create();
// ==============================================================


// 게임 화면 =====================================================
// 점수, 타이머
var gameScore = utils.gameScoreText(score);
var givenTime = utils.gameTimeBar();
var timeLeft = utils.gameTimeLeftBar(time, timeWidth);

// 캐릭터 초기화
var initChar = utils.initChar();
var charList = initChar[0];
var charContainer = initChar[1];

// 비활성화된 컬러 버튼
var falseRedBtn = utils.colorButton(false, 150, 0xFF0000, function(){});
var falseGreenBtn = utils.colorButton(false, 300, 0x009B0F, function(){});
var falseBlueBtn = utils.colorButton(false, 450, 0x1F30FF, function(){});
falseBtn.addChild(falseRedBtn);
falseBtn.addChild(falseGreenBtn);
falseBtn.addChild(falseBlueBtn);

// 활성화된 컬러 버튼
var redButton = utils.colorButton(true, 150, 0xFF0000, setRed);
var greenButton = utils.colorButton(true, 300, 0x009B0F, setGreen);
var blueButton = utils.colorButton(true, 450, 0x1F30FF, setBlue);
trueBtn.addChild(redButton);
trueBtn.addChild(greenButton);
trueBtn.addChild(blueButton);

gamingArea.addMyChildren([
    gameScore, givenTime, timeLeft, 
    charContainer, falseBtn
]);
var gamingAreaObj = gamingArea.create();
// ==============================================================


// 캔버스를 탭에 띄우기 ===========================================
document.body.appendChild(app.view);
// ==============================================================


// 뒤로가기 버튼 누를 시 실행되는 함수 -----------------------------
function goBack() {
    if (currentPage == 0) alert("현재 첫 번째 페이지에 있습니다")
    else if (currentPage == 1) window.location.reload();
}
// --------------------------------------------------------------


// 게임 시작 버튼 누를 시 실행되는 함수 ----------------------------
function gameStart() {
    currentPage = 1;

    let falseBackBtn = utils.backButton(false, goBack);
    titleBarObj.removeChild(backButton);
    titleBarObj.addChild(falseBackBtn);
    overlayObj.addChild(readyText);

    app.stage.removeChild(explainAreaObj);
    app.stage.addChild(titleBarObj);
    app.stage.addChild(gamingAreaObj);
    app.stage.addChild(overlayObj);

    // 1초 뒤에 READY --> GO
    setTimeout(function() {
        overlayObj.removeChild(readyText);
        overlayObj.addChild(goText);
    }, 1 * 1000);

    // 0.25초 뒤에 오버레이 없애기
    setTimeout(function() {
        app.stage.removeChild(overlayObj);
    }, 1.25 * 1000);

    // 0.25초 뒤에 버튼 활성화
    setTimeout(function() {
        titleBarObj.addChild(backButton);
        gamingArea.removeMyChildren([falseBtn]);
        gamingArea.addMyChildren([trueBtn]);
        gamingAreaObj = gamingArea.create();

        app.stage.addChild(titleBarObj);
        app.stage.addChild(gamingAreaObj);
    }, 1.25 * 1000);

    // 0.25초 뒤에 타이머 활성화
    setTimeout(function() {
        setInterval(timeRun, 1000)
    }, 1.25 * 1000);

    // 60초 뒤에 게임 종료
    setTimeout(finishGame, 61.26 * 1000);
}
// --------------------------------------------------------------


// 타이머 활성화 함수 --------------------------------------------
function timeRun() {
    if (time == 0) return;

    timeWidth = timeWidth - 6;
    gamingArea.removeMyChildren([timeLeft]);
    timeLeft = utils.gameTimeLeftBar(--time, timeWidth);
    gamingArea.addMyChildren([timeLeft]);
    gamingAreaObj = gamingArea.create();

    app.stage.addChild(gamingAreaObj);
}
// --------------------------------------------------------------


// 게임 종료 함수 ------------------------------------------------
function finishGame() {
    let overText = utils.subTextOnOverlay("게임 종료");
    let finalScore = utils.mainTextOnOverlay(`${score}점`);
    let exitButton = utils.belowButton("확인", function() {
        currentPage = 0;
        window.location.reload();
    });

    overlayObj.removeChildren(0);
    overlay.setSizeColor(0, 0, 600, 800, 0x000000, 0.8);
    overlay.addMyChildren([overText, finalScore, exitButton]);
    overlayObj = overlay.create();

    gamingArea.removeMyChildren([trueBtn]);
    gamingArea.addMyChildren([falseBtn]);
    gamingAreaObj = gamingArea.create();

    app.stage.addChild(gamingAreaObj);
    app.stage.addChild(overlayObj);
}
// --------------------------------------------------------------


// 사용자가 컬러 버튼을 눌렀을 경우의 함수 -------------------------
function setRed() { 
    clickedButton = "red";
    compareAnswer();
    updateCharList();
    updateScore();
}
function setGreen() { 
    clickedButton = "green"; 
    compareAnswer();
    updateCharList();
    updateScore();
}
function setBlue() { 
    clickedButton = "blue"; 
    compareAnswer();
    updateCharList();
    updateScore();
}
// --------------------------------------------------------------


// 사용자 답 & 실제 답 비교 함수 ----------------------------------
function compareAnswer() {
    let element = charList[charList.length - 1];

    // 맞음
    if (element == 0 && clickedButton == "red" 
        || element == 1 && clickedButton == "green"
        || element == 2 && clickedButton == "blue") {

        console.log("맞아")
        score += 100;
    }
    
    // 틀림
    else {
        console.log("아니야")

        let wrong1 = utils.wrongAnswer(150);
        let wrong2 = utils.wrongAnswer(300);
        let wrong3 = utils.wrongAnswer(450);

        wrongBtn.addChild(wrong1);
        wrongBtn.addChild(wrong2);
        wrongBtn.addChild(wrong3);

        gamingAreaObj.removeChild(trueBtn);
        gamingAreaObj.addChild(falseBtn);
        gamingAreaObj.addChild(wrongBtn);

        setTimeout(function() {
            gamingAreaObj.removeChild(falseBtn);
            gamingAreaObj.removeChild(wrongBtn);
            gamingAreaObj.addChild(trueBtn)
        }, 0.75 * 1000);
    }
}
// --------------------------------------------------------------


// 캐릭터 배열 재생성 --------------------------------------------
function updateCharList() {
    let randInt = utils.randomInt(2);
    charList.unshift(randInt);
    charList.pop();

    charContainer.removeChildren(0);
    gamingAreaObj.removeChild(charContainer);

    // 캐릭터 컨테이너 재생성
    for (var i in charList) {
        let png = new Image();
        png.setImageFromInt(charList[i]);   // 이미지 설정
        png.setLocation(300, 250 + (i*50), true); // 위치 조정
        png.setScale(1.5 + (0.1 * i));      // 10%씩 키움
        png = png.create();    

        charContainer.addChild(png);
    }
    gamingAreaObj.addChild(charContainer);
}
// --------------------------------------------------------------


// 점수 획득 함수 ------------------------------------------------
function updateScore() {
    gamingAreaObj.removeChild(gameScore);
    gameScore = utils.gameScoreText(score);
    gamingAreaObj.addChild(gameScore);
}
// --------------------------------------------------------------