new p5();
let graphics, time = 0, rocket;

function preload(){
  rocket1 = loadImage('img/rocket1.png');
}
window.onresize = function(){
  createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
}
function setup(){
  createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
}

function draw(){
  background(0);
  //ambientLight(255);
  directionalLight(255, 255, 255, 0, 1, 1);
  texture(rocket1);
  //rotateX(time/180 * PI);
  //rotateY(time/180 * PI);
  rotateZ(time/180 * PI);
  showShip();
  camera(0,0,500,0,0,0,0,1,0)
  time++
}

function showShip(){
  translate(200,0,0);
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
}