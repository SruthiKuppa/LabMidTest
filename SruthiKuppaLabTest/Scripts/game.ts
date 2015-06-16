/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "rollbutton", src: "assets/images/roll.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" },
    { id: "dice1", src: "assets/images/no1.png" },
    { id: "dice2", src: "assets/images/no2.png" }
];


// Game Variables
var helloLabel: createjs.Text; // create a reference
var dice1: createjs.Bitmap;
var dice2: createjs.Bitmap;
var pinkButton: createjs.Bitmap;


// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events for roll button
function pinkButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
    var randomNumDice1 = Math.floor(Math.random() * 6) + 1;
    var randomNumDice2 = Math.floor(Math.random() * 6) + 1;

    if (randomNumDice1.toString != null) {
        console.log("dice 1 value:"+randomNumDice1);
    }
    if (randomNumDice2.toString != null) {
        console.log("dice 2 value:" + randomNumDice2);
    }

}

// Callback functions that change the alpha transparency of the button

// Mouseover event
function pinkButtonOver() {
    pinkButton.alpha = 0.8;
}

// Mouseout event
function pinkButtonOut() {
    pinkButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");
    helloLabel = new createjs.Text("ROLL THE DICES!!", "40px Consolas", "#000000");
    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    helloLabel.x = 160;
    helloLabel.y =190;
    stage.addChild(helloLabel);

    pinkButton = new createjs.Bitmap(assets.getResult("pinkButton"));
    pinkButton.regX = pinkButton.getBounds().width * 0.5;
    pinkButton.regY = pinkButton.getBounds().height * 0.5;
    pinkButton.x = 160;
    pinkButton.y = 250;
    //declaring properties for dice1
    dice1 = new createjs.Bitmap(assets.getResult("dice1"));
    dice1.x = 110;
    dice1.y = 190;
    //declaring properties for dice1
    dice2 = new createjs.Bitmap(assets.getResult("dice1"));
    dice2.x = 110;
    dice2.y = 190;

    stage.addChild(pinkButton);
    stage.addChild(dice1);
    stage.addChild(dice2);
    pinkButton.on("click", pinkButtonClicked);
    pinkButton.on("mouseover", pinkButtonOver);
    pinkButton.on("mouseout", pinkButtonOut);
}