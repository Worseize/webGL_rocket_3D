
/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

new p5();
let camBorder = 75, gravity = 1, sceneLength = 2000, sensetivity = 0.08 , camAngleX = 0, camAngleZ = 0, boxSize = 100, fire = false, jump = false,
    borders = [], boxArray = [], boxAmount = 1, playerArray = [], friction = 0.95, bulletArray = [], bulletMaxId = 0, currentGround = 0, time = 1, prevX = mouseX,
    prevY = mouseY, speedLimit = boxSize / 2 - 1, aimArray = [], scaler = 1;

function preload(){
  cloud = loadImage('img/cloud.png');
  aim = loadImage('img/aim.png');
  stone = loadImage('img/stone.png');
  wall = loadImage('img/wall.png');
  bulletImg = loadImage('img/bullet.jpg');
}

function setup(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
  myCanvas.style("cursor", "none");
  myCanvas.mouseWheel(changeScaler);
  prevX = mouseX;
  prevY = mouseY;
  //CREATE OBJECTS ON SCENE
  for(let i = 0; i < boxAmount - 1; i++){
    createUncollidedBoxes();
  }
  //-create walls

  borders[0] = new createSceneBorders(sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, "left");
  borders[1] = new createSceneBorders(0, sceneLength / 2, 0, sceneLength, sceneLength, wall, "inside");
  borders[2] = new createSceneBorders(sceneLength / 2, sceneLength, 0, sceneLength, sceneLength, wall, "right");
  borders[3] = new createSceneBorders(sceneLength, sceneLength / 2, 0, sceneLength, sceneLength, wall, "outside");
  borders[4] = new createSceneBorders(sceneLength / 2, sceneLength / 2, -sceneLength / 2, sceneLength, sceneLength, stone, "bottom");
  borders[5] = new createSceneBorders(sceneLength / 2, sceneLength / 2, sceneLength / 2, sceneLength, sceneLength, cloud, "sky");
  //-create Camera
  playerArray[0] = new Player(sceneLength / 2, sceneLength / 2, 0, 1, 0, 0, 0 , 0 , 0 , 0 , 0, 0);
  aimArray[0] = new createAim(playerArray[0].camX, playerArray[0].camY, playerArray[0].camZ, 15, 15);
}

function draw(){
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
  //Aim methods
  texture(aim);
  aimArray[0].show();
  aimArray[0].update();
}
