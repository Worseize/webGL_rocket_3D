new p5();
let graphics, time = 0, rocket , camAngleX = 1, camAngleY = 1 , kk, myText , camRadius = 300, camRadiusStep = 20;

function preload(){
  rocket1 = loadImage('img/rocket1.png');
}
window.onresize = function(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
}
function setup(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
  myCanvas.mouseWheel(changeCamRadius);
  myText = createGraphics(200, 200);
  graphics = createGraphics(1, 1);
  pixelDensity(1);
}

function draw(){
  ambientLight(55);
  if(keyIsPressed){
    if(keyCode === 65 || kk === 65){
      camAngleX += 0.1;
    }else if(keyCode === 68 || kk === 68){
      camAngleX -= 0.1;
    }else if(keyCode === 87 || kk === 87){
      camAngleY -= 0.1;
    }else if(keyCode === 83 || kk === 83){
      camAngleY -= 0.1;
    }
  }else{
    kk = undefined;
  }
  background(155,255,255);

  myText.background(155,155,155);
  myText.textSize(20);
  myText.fill(255);
  myText.textAlign(CENTER);
  myText.text("controls", myText.width / 2, myText.height / 2);

  texture(myText);
  plane(200,200);


  directionalLight(255, 255, 255, 1, 1, 1);
  texture(graphics);
  graphics.background(255,255,0);
  for(let j = 0 ; j < 10; j ++){
    push();
    translate(0 , 100 * cos(j / 5 * PI), 100 * sin(j / 5 * PI))
    sphere(3);
    pop();
  }

  graphics.background(0,255,0);
  for(let i = 0 ; i < 10; i ++){
    push();
    translate(100 * sin(i / 5 * PI) , 100 * cos(i / 5 * PI), 0)
    sphere(3);
    pop();
  }

  texture(rocket1);
  showShip();
  let camPosX = camRadius * sin(camAngleX);
  let camPosY = camRadius * cos(camAngleX);
  let camPosZ = 0;
  camera(camPosX, camPosY , camPosZ, -camPosX , -camPosY , -camPosZ, 0, 0, 1);
  time++
}

keyPressed  = function(){
  if(keyCode === 65){
    kk = 65;
  }else if(keyCode === 68){
    kk = 68;
  }else if(keyCode === 87){
    kk = 87;
  }else if(keyCode === 83){
    kk = 83;
  }
}

function changeCamRadius(event){
  if(event.deltaY > camRadiusStep){
    if(camRadius != camRadiusStep){
      camRadius -= camRadiusStep;
    }else{
      camRadius -= 2 * camRadiusStep;
    }

  }else if(event.deltaY < camRadiusStep){
    if(camRadius != -camRadiusStep){
      camRadius += camRadiusStep;
    }else{
      camRadius += 2 * camRadiusStep;
    }
  }
}

function showShip(){
  push();
    rotateX(PI/4);
    rotateY(PI/4);
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
}