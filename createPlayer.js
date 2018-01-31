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

  display(){
    //fix  texture entanglement (move camera away from scene borders Z-axis) 
    this.camZ += camBorder;
    /* CAMERA ROTATION ENGINE */
    // rotationEquationForCamera: https://upload.wikimedia.org/wikipedia/commons/8/8c/Spherical_Coordinates_%28Latitude%2C_Longitude%29.svg
    // camAngleX = any angle
    // camAngleZ = angle in ranges (-PI / 2 ... PI / 2)
    this.lookAtX = cos(camAngleZ) * cos(camAngleX);
    this.lookAtY = cos(camAngleZ) * sin(camAngleX);
    this.lookAtZ = sin(camAngleZ);
    this.lookAtX = scaler * normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[0];
    this.lookAtY = scaler * normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[1];
    this.lookAtZ = scaler * normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[2];
    this.lookAtZ *= -1; // (making Z - axis positive ) see --> img/view.gif
    camera(this.camX, this.camY, this.camZ, this.camX + this.lookAtX , this.camY + this.lookAtY, this.camZ + this.lookAtZ,
           this.camX, this.camY, -sceneLength * 10); //create camera
    //fix  texture entanglement (move camera back after calculations Z-axis)
    this.camZ -= camBorder;
  }
  shoot(){
    if(fire == true && reloadReady){
      bulletArray.push(
        new Bullet(
          this.camX + camBorder * this.lookAtX,
          this.camY + camBorder * this.lookAtY,
          this.camZ + camBorder * this.lookAtZ + camBorder,
          3,
          this.lookAtX * 20,
          this.lookAtY * 20,
          this.lookAtZ * 20,
          bulletMaxId
        )
      );
      bulletMaxId++;
    }
    fire = false;
  }
  update(){
    //APPLY FORCES
    if(this.camZ > currentGround){
      this.speedZ -= gravity;
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
    // Player && boxes collision detection
    for(let i = 0 ; i < boxArray.length; i++){
      if(this.camZ > boxArray[i].pZ - boxArray[i].modelHeight / 2 && this.camZ < boxArray[i].pZ + boxArray[i].modelHeight / 2){ //Inside Z-axis

      }
    }

    if(this.camX > sceneLength - camBorder){
      this.camX = sceneLength - camBorder;
      this.speedX = 0;
      this.accX = 0;
    }else if(this.camX < camBorder){
      this.camX = camBorder;
      this.speedX = 0;
      this.accX = 0;
    } // if camX out of scene

    if(this.camY > sceneLength - camBorder){
      this.camY = sceneLength  - camBorder;
      this.speedY = 0;
      this.accY = 0;
    }else if(this.camY < camBorder){
      this.camY = camBorder;
      this.speedY = 0;
      this.accY = 0;
    } // if camY out of scene

    if(this.camZ < 0){
        this.camZ = 0;
        this.speedZ = 0;
        this.accZ = 0;
    }else if(this.camZ > sceneLength){
        this.camZ = sceneLength;
        this.speedZ = 0;
        this.accZ;
    } // if camZ out of scene

    // VELOSITY LIMIT 
    if(this.speedZ < -speedLimit){
      this.speedZ = -speedLimit;
    }else if(this.speedZ > speedLimit ){
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
  }
}