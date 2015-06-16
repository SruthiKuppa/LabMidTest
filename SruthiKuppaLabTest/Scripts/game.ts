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
    { id: "dice1", src: "assets/images/no4.png"},
    { id: "dice2", src: "assets/images/no2.png" }
];


// Game Variables
var helloLabel: createjs.Text; // create a reference
var dice1: createjs.Bitmap;
var dice2: createjs.Bitmap;
var rollButton: createjs.Bitmap;


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
function rollButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
    //declaring the random number variables
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
function rollButtonOver() {
    rollButton.alpha = 0.8;
}

// Mouseout event
function rollButtonOut() {
    rollButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("DICES ARE ROLLED....RANDOM NUMBER GENERATED!");
    helloLabel = new createjs.Text("DICE ROLL!!", "40px Consolas", "#000000");
    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.9;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.9;
    helloLabel.x = 250;
    helloLabel.y = 220;
    stage.addChild(helloLabel);
    stage.addChild(dice1);
    stage.addChild(dice2);
   
    //rollButton = new Objects.Button(assets.getResult("rollbutton"), 160, 280);
    rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
    rollButton.regX = rollButton.getBounds().width * 0.5;
    rollButton.regY = rollButton.getBounds().height * 0.5;
    rollButton.x = 160;
    rollButton.y = 270;
    stage.addChild(rollButton);
    //declaring properties for dice1
    dice1 = new createjs.Bitmap(assets.getResult("dice1"));
    dice1.regX = dice1.getBounds().width * 0.5;
    dice1.regY = dice1.getBounds().height * 0.5;
    dice1.x = 80;
    dice1.y = 110;
    stage.addChild(dice1);
    //declaring properties for dice2
    dice2 = new createjs.Bitmap(assets.getResult("dice2"));
    dice2.regX = dice2.getBounds().width * 0.5;
    dice2.regY = dice2.getBounds().height * 0.5;
    dice2.x = 290;
    dice2.y = 110;
    stage.addChild(dice2);
    rollButton.on("click", rollButtonClicked);
    rollButton.on("mouseover", rollButtonOver);
    rollButton.on("mouseout", rollButtonOut);
}