/*
  author : Nikita Bogdanov
  e-mail : worseize@gmail.com
  location : Estonia , Tallinn. 
  time: January 2018
*/

new p5();
let scene = 1 ,jumpTimer = 1 , playerStartVelosity = 10, gravity = 0.33, sceneLength = 3000, camX = 0, camY = 0 , camZ = 0 , sensetivityX,
    sensetivityY , width, prevX, prevY , graphics, time = 0, rocket , lookAtX = 1, lookAtY = 0 , lookAtZ = 0, camAngleX = 0, camAngleZ = 0,
    kk , camSpeed = 10, jump = false, myAim;

let groundZ = sceneLength /  2 - 75;

function preload(){
  rocket1 = loadImage('img/rocket1.png');
  aim = loadImage('img/aim.png');
  craft = loadImage('img/craft.png');
  cube = loadImage('img/cube.png');
  mountain = loadImage('img/mountain.png');
  cloud = loadImage('img/cloud.png');
  tree = loadImage('img/tree.png');
  nature = loadImage('img/nature.png');
  grass = loadImage('img/grass.png');
  stone = loadImage('img/stone.png');
  bricks = loadImage('img/bricks.png');
  arcTexture = loadImage('img/arc.png');
}
window.onresize = function(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
}
function setup(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
  //myCanvas.style("cursor", "crosshair");
  myCanvas.style("cursor", "none");
  prevX = mouseX;
  prevY = mouseY;
  sensetivityX = myCanvas.width / 10000;
  sensetivityY = myCanvas.height / 10000;
  camZ = groundZ;
  pixelDensity(1);
  /*
  myCanvas.mouseWheel(changeCamPosition);
  */
}

function draw(){
  /*
  if(scene == 0){

  }else if(scene == 1){
  */
    if(keyIsPressed){
      let speedX = camSpeed * lookAtX;
      let speedY = camSpeed * lookAtY;
      let limit = sceneLength / 2 - 150;
      if(keyCode === 65 || kk === 65){ //A move camera left
        if(camX > limit || camY > limit || camX < -limit || camY < -limit){
          camX = 0;
          camY = 0;
        }else{
          camX -= speedY;
          camY += speedX;
        }
      }else if(keyCode === 68 || kk === 68){ //D move camera right
        if(camX > limit || camY > limit || camX < -limit || camY < -limit){
          camX = 0;
          camY = 0;
        }else{
          camX += speedY;
          camY -= speedX;
        }
      }else if(keyCode === 87 || kk === 87){ //W move camera up
        if(camX > limit || camY > limit || camX < -limit || camY < -limit){
          camX = 0;
          camY = 0;
        }else{
          camX += speedX;
          camY += speedY;
        }
      }else if(keyCode === 83 || kk === 83){ //S move camera down
        if(camX < -limit || camY < -limit || camX > limit || camY > limit){
          camX = 0;
          camY = 0;
        }else{
          camX -= speedX;
          camY -= speedY;
        }
      }
    }else{
      kk = undefined;
    } 
    background(155,255,255);
    ambientLight(55);
    directionalLight(255, 255, 255, 1, 1, 1);
      //wooden box
      texture(cube);
      push();
      translate(1000, 500, groundZ + 75 - 100); // -100 = -200/2
      box(200);
      pop();
      //cone
      texture(grass);
      push();
      translate(-1000, -500, groundZ + 75 - 50); // -150 =  - (1000 / 2) 
      rotateX(3 * PI / 2);
      cone(200 , 100); // r+h
      pop();
      /* 
      if(camX  inside area and camY inside area change camZ as f(x,y) )
      */
    showShip();
    showSceneBorders();

    /* CAMERA ROTATION ENGINE */
    lookAtX = cos(camAngleZ) * cos(camAngleX);
    lookAtY = cos(camAngleZ) * sin(camAngleX);
    lookAtZ = sin(camAngleZ);
    //showCursor();
    lookAtX = normalization(lookAtX, lookAtY, lookAtZ)[0];
    lookAtY = normalization(lookAtX, lookAtY, lookAtZ)[1];
    lookAtZ = normalization(lookAtX, lookAtY, lookAtZ)[2];

    if(camX == 0 && camY == 0 && camZ == 0){
      camera(camX, camY , camZ, lookAtX , lookAtY , lookAtZ, 0, 0, 1);
    }else{
      camera(camX, camY , camZ, camX + lookAtX ,camY + lookAtY , camZ + lookAtZ, camX, camY, 100000);
    }
    time++
    if(jump === true){
      jumpTimer++;
      camZ += -playerStartVelosity + gravity * jumpTimer;
      if(camZ > groundZ){
        camZ = groundZ;
        jump = false;
        jumpTimer = 1;
      }
    }
//}
}

keyPressed  = function(){
  if(scene == 1){
    if(keyCode === 65){ //A
      kk = 65;
    }
    if(keyCode === 68){ //D
      kk = 68;
    }
    if(keyCode === 87){ //W
      kk = 87;
    }
    if(keyCode === 83){ //S
      kk = 83;
    }
    if(keyCode === 32){ //SPACE
      jump = true;
    }
  }
}
/*
function mouseClicked(){
  if(scene == 0){
    scene = 1;
  }else{
    scene = 0;
  }
}
*/
function mouseMoved(){
  //camera rotate LEFT / RIGHT
  if(prevX + sensetivityX > mouseX){
    camAngleX += sensetivityX;
  }
  if(prevX - sensetivityX < mouseX){
    camAngleX -= sensetivityX;
  }

  //camera rotate UP | DOWN 
  if(prevY > mouseY){
    if(camAngleZ < PI / 2 - sensetivityY){
      camAngleZ += sensetivityY;
    }
  }
  if(prevY < mouseY ){
    if(camAngleZ > -PI / 2   + sensetivityY){
      camAngleZ -= sensetivityY;
    }
  }
  prevX = mouseX;
  prevY = mouseY;
}

function  normalization(x, y, z){
  let len = [];
  len[0] = x / sqrt(x * x +  y * y +  z * z);
  len[1] = y / sqrt(x * x +  y * y +  z * z);
  len[2] = -z / sqrt(x * x +  y * y +  z * z);
  return len;
}



function showShip(){
  texture(rocket1);
  push();
    translate(0, 0, groundZ - 1000);
    push();
      rotateX(PI / 4);
      rotateY(PI / 4);
      rotateZ(time/180 * PI);
      translate(100,0,0);
      push();
        translate(0, -10 + (20 + 100 + 10) / 2 , 0) // move whole ship to origin
        //body + cap
        cone(10,20);
        push();
          translate(0, -60, 0);
          cylinder(10, 100);
          translate(0, -50, 0);
          cone(10,10)
        pop();

        //fuel 1
        push()
          translate(10, -75,10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 2
        push()
          translate(10, -75,-10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 3
        push()
          translate(-10, -75,-10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 4
        push()
          translate(-10, -75,10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();
      pop();
    pop();
  pop();
}

function showSceneBorders(){
  texture(arcTexture);
  // Left plane
  push();
  translate(0, -sceneLength / 2, 0);
  rotateX(PI/2);
  rotateX(0);
  plane(sceneLength,sceneLength);
  pop();

  texture(stone);
  // Inside plane
  push();
  translate(-sceneLength / 2, 0, 0);
  rotateY(PI/2);
  rotateZ(PI/2);
  rotateX(0);
  plane(sceneLength,sceneLength);
  pop();
  // Right plane
  push();
  translate(0, sceneLength / 2, 0);
  rotateX(PI / 2);
  rotateX(0);
  plane(sceneLength,sceneLength);
  pop();
  // Outside plane
  translate(sceneLength / 2, 0, 0);
  push();
  rotateY(PI/2);
  rotateZ(PI/2);
  rotateX(0);
  plane(sceneLength,sceneLength);
  pop();
  // Bottom plane
  push();
  translate(-sceneLength / 2, 0, sceneLength / 2);
  plane(sceneLength,sceneLength);
  pop();

  // Top plane
  texture(cloud);
  push();
  translate(-sceneLength / 2, 0, -sceneLength / 2);
  rotateX(0);
  plane(sceneLength,sceneLength);
  pop();  
}