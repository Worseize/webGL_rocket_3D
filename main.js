
/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

// document.body.getElementsByTagName('*') - SHOWS ALL DOM NODES IN CONSOLE

new p5();
let camBorder = 100, gravity = 1, sceneLength = 3000, sensetivity = 0.03 , camAngleX = 0, camAngleZ = 0, boxSize = 100, fire = false,
    jump = false, borders = [], boxArray = [], horizont = [], boxAmount = 50, playerArray = [], friction = 0.95, bulletArray = [],
    bulletMaxId = 0, currentGround = 0, time = 1, prevX = mouseX, prevY = mouseY, speedLimit = boxSize / 2 - 1, scaler = 1 ,
    absoluteW, absoluteH, reloadReady = true;

function preload(){
  cloud = loadImage('img/cloud.png');
  stone = loadImage('img/stone.png');
  wall = loadImage('img/wall.png');
  view = loadImage('img/view.gif');
  bulletImg = loadImage('img/bullet.jpg');
  akInHands = loadImage('img/akInHands.png');
  akReload = loadImage('img/akReload.gif');

}

function setup(){
  absoluteW = innerWidth - 5;
  absoluteH = innerHeight - 5;
  myCanvas = createCanvas(absoluteW, absoluteH, WEBGL);
  myCanvas.style("cursor", "none");
  //AIM
  myAim = createImg("img/aim.png");
  myAim.style("position","absolute");
  myAim.style("left",(absoluteW - 100) / 2 + "px"); // 100 = element Width
  myAim.style("top",(absoluteH - 100) / 2 + "px"); // 100 = element height
  myAim.style("width","100px");
  myAim.style("height","100px");
  myAim.style("pointer-events","none");
  myAim.style("user-select","none");
  myAim.style("user-drag","none");
  myAim.id("myAim");
  //GUN
  myGun = createImg("img/akInHands.png");
  let partX = 2;
  let partY = 4;
  myGun.style("position","absolute");
  myGun.style("left", (partX - 1) / partX * absoluteW  + "px");
  myGun.style("top", (partY - 1) / partY * absoluteH  + "px");
  myGun.style("width", absoluteW / partX  + "px");
  myGun.style("height", absoluteH / partY + "px");
  myGun.style("pointer-events","none");
  myGun.style("user-select","none");
  myGun.style("user-drag","none");
  myGun.id("myGun");

  prevX = mouseX;
  prevY = mouseY;
  //create primitives
  for(let i = 0; i < boxAmount - 1; i++){
    createUncollidedBoxes();
  }
  //create walls
  borders[0] = new createSceneBorders(sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, "left");
  borders[1] = new createSceneBorders(0, sceneLength / 2, 0, sceneLength, sceneLength, wall, "inside");
  borders[2] = new createSceneBorders(sceneLength / 2, sceneLength, 0, sceneLength, sceneLength, wall, "right");
  borders[3] = new createSceneBorders(sceneLength, sceneLength / 2, 0, sceneLength, sceneLength, wall, "outside");
  borders[4] = new createSceneBorders(sceneLength / 2, sceneLength / 2, -sceneLength / 2, sceneLength, sceneLength, stone, "bottom");
  borders[5] = new createSceneBorders(sceneLength / 2, sceneLength / 2, sceneLength / 2, sceneLength, sceneLength, cloud, "sky");
  //create camera
  playerArray[0] = new Player(sceneLength / 2, sceneLength / 2, 0, 1, 0, 0, 0 , 0 , 0 , 0 , 0, 0);
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
}
