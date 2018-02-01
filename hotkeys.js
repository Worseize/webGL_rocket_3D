function keyPressed(){
  if(scene === 1){
    if(keyCode === 32 ){ //SPACE
      jump = true;
    }else if(keyCode === 82){ // R (reload gun)
      if(reloadReady){
        reloadReady = false;
        myGun.remove();
        createGun("img/akReload.gif")
        delayRemove();
      }
    }
  }
}

function mouseReleased(){
  if(scene === 1){
    fire = true;
  }
}

function mouseMoved(){
  if(pointerLock === false && scene === 1){
    scene = 0;
    myAim.remove();
    myGun.remove();
    createMenu("Paused");
    camera(0, 0, -500, 0, 0, 0, 0, 1000, 0);
  }
  //camera rotate LEFT / RIGHT
  if(prevX + sensetivity > mouseX){
    camAngleX -= sensetivity;
  }
  if(prevX - sensetivity < mouseX){
    camAngleX += sensetivity;
  }

  //camera rotate UP | DOWN 
  if(prevY > mouseY){
    if(camAngleZ < PI / 2 - sensetivity * 5){
      camAngleZ += sensetivity;
    }
  }
  if(prevY < mouseY ){
    if(camAngleZ > -PI / 2   + sensetivity * 5){
      camAngleZ -= sensetivity;
    }
  }
}