class Player{

  constructor(camX, camY, camZ, lookAtX, lookAtY, lookAtZ, speedX, speedY, speedZ, accX, accY, accZ){
    this.camX = camX;
    this.camY = camY;
    this.camZ = camZ;
    this.lookAtZ = lookAtZ;
    this.lookAtX = lookAtX;
    this.lookAtY = lookAtY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speedZ = speedZ;
    this.accX = accX;
    this.accY = accY;
    this.accZ = accZ;
  }

  show(){
    /* CAMERA ROTATION ENGINE */
    this.lookAtX = cos(camAngleZ) * cos(camAngleX);
    this.lookAtY = cos(camAngleZ) * sin(camAngleX);
    this.lookAtZ = sin(camAngleZ);
    this.lookAtX = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[0];
    this.lookAtY = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[1];
    this.lookAtZ = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[2];
    camera(this.camX, this.camY, this.camZ, this.camX + this.lookAtX, this.camY + this.lookAtY, this.camZ - this.lookAtZ,
           this.camX, this.camY, -sceneLength * 10);
  }
  update(){
    //APPLY FORCES
    if(this.camZ > currentGround){
      this.accZ -= gravity;
    }
    //APPLY JUMP START VELOSITY
    if(jump){
      if(this.camZ === currentGround){
        this.speedZ += speedLimit;
      }
      jump = false;
    }

    if(keyIsDown(87)){ //W
      this.speedX += this.lookAtX;
      this.speedY += this.lookAtY;
    }else if(keyIsDown(83)){ //S
      this.speedX -= this.lookAtX;
      this.speedY -= this.lookAtY;
    }else if(keyIsDown(65)){ //A
      this.speedX += this.lookAtY;
      this.speedY -= this.lookAtX;
    }else if(keyIsDown(68)){ //D
      this.speedX -= this.lookAtY;
      this.speedY += this.lookAtX;
    }

    this.speedX += this.accX;
    this.speedY += this.accY;
    this.speedZ += this.accZ;
    this.camX += this.speedX;
    this.camY += this.speedY;
    this.camZ += this.speedZ;
    this.speedX *= friction;
    this.speedY *= friction;
    this.speedZ *= friction;
  }
  checkEdges(){
    let flagX; // inside box in X-axis
    let flagY; // inside box in Y-axis
    let flagZ1; // under the box
    let flagZ2; // on top of the box

    //COLLISION FOR Z - axis
    for(let i = 0; i < boxArray.length; i++){
      if(this.camX > boxArray[i].pX - boxArray[i].modelWidth / 2  && this.camX < boxArray[i].pX + boxArray[i].modelWidth / 2 ){
          flagX = true;
        if(this.camY > boxArray[i].pY - boxArray[i].modelWidth / 2  && this.camY < boxArray[i].pY + boxArray[i].modelWidth / 2 ){
          flagY = true;

          if(this.camZ > boxArray[i].pZ - boxArray[i].modelHeight / 2 - camBorder && this.camZ  < boxArray[i].pZ - camBorder){ // if player under the box bottom (collision detected)
            flagZ1 = true;
            flagZ2 = false;
            this.speedZ *= -1;
            currentGround = camBorder;
          }else if(this.camZ  < boxArray[i].pZ + boxArray[i].modelHeight / 2 + camBorder && this.camZ > boxArray[i].pZ + camBorder){ // if player jump on any object (collision detected)
            flagZ1 = false;
            flagZ2 = true;
            this.speedZ = 0;
            this.accZ = 0;
            currentGround = boxArray[i].pZ + boxArray[i].modelHeight / 2 + camBorder;
            jump = false;
          }else{
            flagZ1 = false;
            flagZ2 = false;
            currentGround = camBorder;
          }

          break;
        }else{
          flagX = false;
          flagY = false;
        }
      }else{
        flagX = false;
        flagY = false;
      }
    }



    if(this.camX > sceneLength / 2 - camBorder ){
      this.camX = sceneLength / 2 - camBorder;
      this.speedX = 0;
      this.accX = 0;
    }else if(this.camX < -sceneLength / 2 + camBorder){
      this.camX = -sceneLength / 2 + camBorder;
      this.speedX = 0;
      this.accX = 0;
    } // if camX out of scene

    if(this.camY > sceneLength / 2 - camBorder){
      this.camY = sceneLength / 2 - camBorder;
      this.speedY = 0;
      this.accY = 0;
    }else if(this.camY < -sceneLength / 2 + camBorder){
      this.camY = -sceneLength / 2 + camBorder;
      this.speedY = 0;
      this.accY = 0;
    } // if camY out of scene
    if(flagZ2){
        this.camZ = currentGround ;
        this.speedZ = 0;
        this.accZ = 0;
        jump = false;
      // if camZ on a box
    }else{
      if(this.camZ < camBorder){
        this.camZ = camBorder;
        this.speedZ = 0;
        this.accZ = 0;
        jump = false;
      }else if(this.camZ > sceneLength - camBorder){
        this.camZ = sceneLength - camBorder;
        this.speedZ = 0;
        this.accZ;
      } // if camZ out of scene
    }

    // VELOSITY LIMIT 
    if(this.speedZ < -speedLimit){
      this.speedZ = -speedLimit;
    }else if(this.speedZ > speedLimit){
      this.speedZ = speedLimit;
    }
    if(this.speedY < -speedLimit){
      this.speedY = -speedLimit;
    }else if(this.speedZ > speedLimit){
      this.speedY = speedLimit;
    }
    if(this.speedX < -speedLimit){
      this.speedX = -speedLimit;
    }else if(this.speedZ > speedLimit){
      this.speedX = speedLimit;
    }
    //console.log(flagZ1 + "   " + flagZ2);
  }
}