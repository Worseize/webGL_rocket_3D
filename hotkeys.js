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
    let speedX = camSpeed * player.lookAtX;
    let speedY = camSpeed * player.lookAtY;
    let limit = sceneLength / 2 - 150;
    if(keyCode === 65 || kk === 65){ //A move camera left
      if(player.camX > limit || player.camY > limit || player.camX < -limit || player.camY < -limit){
        player.camX = 0;
        player.camY = 0;
      }else{
        player.camX -= speedY;
        player.camY += speedX;
      }
    }else if(keyCode === 68 || kk === 68){ //D move camera right
      if(player.camX > limit || player.camY > limit || player.camX < -limit || player.camY < -limit){
        player.camX = 0;
        player.camY = 0;
      }else{
        player.camX += speedY;
        player.camY -= speedX;
      }
    }else if(keyCode === 87 || kk === 87){ //W move camera up
      if(player.camX > limit || player.camY > limit || player.camX < -limit || player.camY < -limit){
        player.camX = 0;
        player.camY = 0;
      }else{
        player.camX += speedX;
        player.camY += speedY;
      }
    }else if(keyCode === 83 || kk === 83){ //S move camera down
      if(player.camX < -limit || player.camY < -limit || player.camX > limit || player.camY > limit){
        player.camX = 0;
        player.camY = 0;
      }else{
        player.camX -= speedX;
        player.camY -= speedY;
      }
    }
  }else{
    kk = undefined;
  }
} 