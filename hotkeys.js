function keyPressed(){
  if(keyCode === 32 ){ //SPACE
    jump = true;
  }
}


function mouseMoved(){
  //camera rotate LEFT / RIGHT
  if(prevX + sensetivity > mouseX){
    camAngleX -= sensetivity;
  }
  if(prevX - sensetivity < mouseX){
    camAngleX += sensetivity;
  }

  //camera rotate UP | DOWN 
  if(prevY > mouseY){
    if(camAngleZ < PI / 2 - sensetivity){
      camAngleZ += sensetivity;
    }
  }
  if(prevY < mouseY ){
    if(camAngleZ > -PI / 2   + sensetivity){
      camAngleZ -= sensetivity;
    }
  }
  prevX = mouseX;
  prevY = mouseY;
}


window.onresize = function(){
  myCanvas.style("width", innerWidth - 30 + "px");
  myCanvas.style("height", innerHeight - 30 + "px");
}
