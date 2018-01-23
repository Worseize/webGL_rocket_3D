/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

new p5();
let camBorder = 75, scene = 1 ,jumpTimer = 1 , playerStartVelosity = 20, gravity = 0.33, sceneLength = 3000, camX = 0, camY = 0 , camZ = 0 , sensetivityX,
    sensetivityY , width, prevX, prevY , graphics, time = 0, lookAtX = 1, lookAtY = 0 , lookAtZ = 0, camAngleX = 0, camAngleZ = 0,
    kk , camSpeed = 10, jump = false, myAim, fall = false, groundZ = sceneLength /  2, borders = [], boxArray = [], sphereArray = [], boxAmount = 5,
    sphereAmount = 5;

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
  sensetivityX = myCanvas.width / 10000;
  sensetivityY = myCanvas.height / 10000;
  camZ = groundZ - camBorder;
  myCanvas.mouseWheel(scaleSpeed);
  let h = 0;
  for(let i = 0; i < boxAmount ; i++){
    boxArray.push(new createModel(random(-1,1) * sceneLength / 2 , random(-1,1) * sceneLength / 2 , -h - 1, 100 - 2 * i, 100 - 2 * i, stone, 1, "none"));
    h += 100 - 2 * i;
  }
  h = 0;
  for(let i = 0; i < sphereAmount ; i++){
    sphereArray.push(new createModel(random(-1,1) * sceneLength / 2 , random(-1,1) * sceneLength / 2 , -h - 1, 100 - 2 * i, 100 - 2 * i, bricks, 2, "none"));
    h += 100 - 2 * i;
  }

  borders[0] = new createModel(0,-sceneLength / 2, 0, sceneLength, sceneLength, wall, 0, "left");
  borders[1] = new createModel(-sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, 0, "inside");
  borders[2] = new createModel(0, sceneLength / 2, 0, sceneLength, sceneLength, wall, 0, "right");
  borders[3] = new createModel(sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, 0, "outside");
  borders[4] = new createModel(0, 0, sceneLength / 2, sceneLength, sceneLength, stone, 0, "bottom");
  borders[5] = new createModel(0, 0, -sceneLength / 2, sceneLength, sceneLength, cloud, 0, "sky");
  player = new Player(camX, camY, camZ, camX + lookAtX, camY + lookAtY, camZ + lookAtZ, sceneLength * 10);
}

function draw(){
  ifKeyIsPressed(); //camera move
  background(155,255,255);
  ambientLight(44);
  directionalLight(88,88,88,1,1,1);
  for(let i = 0; i < borders.length; i++){
    borders[i].show();
    if(i == 5){
      borders[i].move(); //sky
    }
  }
  for(let i = 1; i < boxArray.length; i++){
    boxArray[i].show();
  }
  for(let i = 1; i < sphereArray.length; i++){
    sphereArray[i].show();
  }
  showShip();
  player.show(); //camera rotate
  player.jump(); //camera jump
}
