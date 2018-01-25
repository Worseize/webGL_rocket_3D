
/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

new p5();
let camBorder = 75, gravity = 0.05, sceneLength = 2000, sensetivity = 0.05 , camAngleX = 0, camAngleZ = 0, boxSize = 100, jump = false, friction = 0.93,
    borders = [], boxArray = [], boxAmount = 50, player = [], currentGround = camBorder, time = 1, prevX = mouseX, prevY = mouseY, speedLimit = 50;

function preload(){
  rocket1 = loadImage('img/rocket1.png');
  aim = loadImage('img/aim.png');
  cloud = loadImage('img/cloud.png');
  stone = loadImage('img/stone.png');
  bricks = loadImage('img/bricks.png');
  wall = loadImage('img/wall.png');
}

function setup(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
  myCanvas.style("cursor", "none");
  prevX = mouseX;
  prevY = mouseY;
  //CREATE OBJECTS ON SCENE
  for(let i = 0; i < boxAmount - 1; i++){
    createUncollidedBoxes();
  }
  //-create walls
  borders[0] = new createModel(0, -sceneLength / 2, 0, sceneLength, sceneLength, wall, 0, "left");
  borders[1] = new createModel(-sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, 0, "inside");
  borders[2] = new createModel(0, sceneLength / 2, 0, sceneLength, sceneLength, wall, 0, "right");
  borders[3] = new createModel(sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, 0, "outside");
  borders[4] = new createModel(0, 0, -sceneLength / 2, sceneLength, sceneLength, stone, 0, "bottom");
  borders[5] = new createModel(0, 0, sceneLength / 2, sceneLength, sceneLength, cloud, 0, "sky");
  //-create Camera
  player[0] = new Player(0, 0, 75, 1, 0, 75, 0 , 0 , 0 , 0 , 0, 0);
}

function draw(){
  background(155,255,255);
  ambientLight(44);
  directionalLight(88,88,88,1,1,1);
  for(let i = 0; i < borders.length; i++){
    borders[i].show();
    if(i == 5){
      borders[i].move(); //sky
    }
  }
  for(let i = 0; i < boxArray.length; i++){
    boxArray[i].show();
  }
  
  player[0].update(); //camera move
  player[0].checkEdges(); // check colisions
  player[0].show(); //camera rotate
}
