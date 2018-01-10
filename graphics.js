new p5();
let angle = 0.01, graphics, mouseIsPressed , start = false;
function setup(){
  createCanvas(400, 400, WEBGL);
  graphics = createGraphics(200, 200);
  graphics.background(255);
}


mouseDragged = function(){
    graphics.stroke(0, 0, 0);
    graphics.strokeWeight(3);

    graphics.point(mouseX, mouseY );
}
keyPressed = function(){
  if(keyCode == ENTER){
    start = true;
  }else if(keyCode == ESCAPE){
    start = false;
  }
}
function draw(){
  background(0);
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, 1);
  rotateX(angle);
  rotateY(angle);
  rotateZ(angle);
  texture(graphics);
  box(200);
  if(start){
     angle+=0.001;
  }
}
