function keyPressed(){
  if(scene === 1){
    if(keyCode === 32 ){ //SPACE
      jump = true;
    }else if(keyCode === 82){ // R (reload gun)
      // playerArray[0].gunArray[0] === 1 (if gunID === 1 --> ak-47 )
      if(reloadReady && playerArray[0].gunArray[4] === 0 && playerArray[0].gunArray[0] === 1){ 
        reloadReady = false;
        myGun.remove();
        createGun("img/akReload.gif")
        delayRemove();
      }
    }else if(keyCode === 49){ // automatics
      myGun.remove();
      playerArray[0].gunArray[4] = 0; // current gun is ak-47
      createGun('img/akInHands.png');
    }else if(keyCode === 50){ // pistol
      
    }else if(keyCode === 51){ // knife
      myGun.remove();
      playerArray[0].gunArray[4] = 2; // current gun is knife
      createGun('img/knife.png');
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
    if(camAngleZ < PI / 2 - sensetivity){
      camAngleZ += sensetivity;
    }
  }
  if(prevY < mouseY ){
    if(camAngleZ > -PI / 2   + sensetivity){
      camAngleZ -= sensetivity;
    }
  }
}