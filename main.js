
/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

// document.body.getElementsByTagName('*') - SHOWS ALL DOM NODES IN CONSOLE

new p5();

//DEFINE
let absoluteW, absoluteH, delayRemoveReloadAnimation;
//VARIABLES
let camBorder = 100, gravity = 1, sceneLength = 3000, sensetivity = 0.05 , camAngleX = 0, camAngleZ = 0, boxAmount = 50, friction = 0.95,
    bulletMaxId = 0, currentGround = 0, time = 1, speedLimit = 50, scaler = 1 , aimSize = 100, scene = 0, firstSceneTimer = 0;
//ARRAYS
let borders = [], boxArray = [], horizont = [], playerArray = [], bulletArray = [];
//BOOLEAN
let fire = false, jump = false, reloadReady = true, pointerLock = false;
//SENSORS || DEPENDENT VARIABLES
let prevX = mouseX, prevY = mouseY, boxSize = speedLimit * 2 + 100;

function preload(){
  cloud = loadImage('img/cloud.png');
  stone = loadImage('img/stone.png');
  wall = loadImage('img/wall.png');
  view = loadImage('img/view.gif');
  bulletImg = loadImage('img/bullet.jpg');
  akInHands = loadImage('img/akInHands.png');
  akReload = loadImage('img/akReload.gif');
  aim = loadImage('img/aim.png');
}

function setup(){
  //CREATE CANVAS
  absoluteW = innerWidth - 5;
  absoluteH = innerHeight - 5;
  myCanvas = createCanvas(absoluteW, absoluteH, WEBGL);
  //SCENE 0
  createMenu("Click to start");

  //POINTER LOCK SETUP START AFTER DEFINE CANVAS (myCanvas = createCAnvas...)
  pointerLockSetup();

  //CREATE PRIMITIVES
  for(let i = 0; i < boxAmount - 1; i++){
    pushBoxesToInstance();
  }
  //CREATE SCENE BORDERS
  pushSceneBordersToInstance();
  //CREATE MYSELF VIEW (CAMERA)
  playerArray[0] = new Player(sceneLength / 2, sceneLength / 2, 0, 1, 0, 0, 0 , 0 , 0 , 0 , 0, 0);
}

function draw(){
  if(scene === 0){
    background(55);
    if(firstSceneTimer < 2 * PI){
      rotateX(firstSceneTimer);
    }else if(firstSceneTimer < 4 * PI){
    //pause
    }else if(firstSceneTimer < 6 * PI){
      rotateY(firstSceneTimer);
    }else if(firstSceneTimer < 8 * PI){
    //pause
    }else if(firstSceneTimer < 10 * PI){
      rotateZ(firstSceneTimer);
    }else if(firstSceneTimer < 12 * PI){
    //pause
    }else {
      firstSceneTimer = 0;
    }
    texture(firstScene);
    plane(300, 300);
    firstSceneTimer += PI * 3 / 180; // 3 degree per frame

  }else if(scene === 1){
    background(155, 255, 255);
    ambientLight(155);
    //Scene borders methods
    for(let i = 0; i < borders.length; i++){
      borders[i].show();
      if(i == 5){
        borders[i].move(); //sky
      }
    }
    //Boxes methods
    for(let i = 0; i < boxArray.length; i++){
      boxArray[i].show();
    }
    // Player methods 
    playerArray[0].shoot();
    playerArray[0].update(); //camera move
    playerArray[0].checkEdges(); // check colisions
    playerArray[0].display(); //camera rotate
    //Bullet methods
    if(bulletArray.length > 0){
      for(let i = 0; i < bulletArray.length; i++){
        bulletArray[i].display();
        bulletArray[i].update();
        bulletArray[i].checkEdges();
      }
    }
  }
}