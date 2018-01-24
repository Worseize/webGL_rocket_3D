keyPressed  = function(){
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


function mouseMoved(){
  //camera rotate LEFT / RIGHT
  if(prevX + sensetivityX > mouseX){
    camAngleX -= sensetivityX;
  }
  if(prevX - sensetivityX < mouseX){
    camAngleX += sensetivityX;
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

function scaleSpeed(event){
  if(event.deltaY > 5){
    camSpeed *= 2;
  }else if(event.deltaY < 5){
    camSpeed /= 2;
  }
}

window.onresize = function(){
  myCanvas = createCanvas(innerWidth - 30, innerHeight - 30, WEBGL);
}
function ifKeyIsPressed(){
  if(keyIsPressed){
    let speedX = camSpeed * player[0].lookAtX;
    let speedY = camSpeed * player[0].lookAtY;
    let limit = sceneLength / 2 - camBorder;
    if(keyCode === 65 || kk === 65){ //A move camera left
      if(player[0].camX > limit || player[0].camY > limit || player[0].camX < -limit || player[0].camY < -limit){
        player[0].camX = 0;
        player[0].camY = 0;
      }else{
        player[0].camX += speedY;
        player[0].camY -= speedX;
      }
    }else if(keyCode === 68 || kk === 68){ //D move camera right
      if(player[0].camX > limit || player[0].camY > limit || player[0].camX < -limit || player[0].camY < -limit){
        player[0].camX = 0;
        player[0].camY = 0;
      }else{
        player[0].camX -= speedY;
        player[0].camY += speedX;
      }
    }else if(keyCode === 87 || kk === 87){ //W move camera up
      if(player[0].camX > limit || player[0].camY > limit || player[0].camX < -limit || player[0].camY < -limit){
        player[0].camX = 0;
        player[0].camY = 0;
      }else{
        player[0].camX += speedX;
        player[0].camY += speedY;
      }
    }else if(keyCode === 83 || kk === 83){ //S move camera down
      if(player[0].camX < -limit || player[0].camY < -limit || player[0].camX > limit || player[0].camY > limit){
        player[0].camX = 0;
        player[0].camY = 0;
      }else{
        player[0].camX -= speedX;
        player[0].camY -= speedY;
      }
    }
  }else{
    kk = undefined;
  }
} 