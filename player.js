class Player{

  constructor(camX, camY, camZ, lookAtX, lookAtY, lookAtZ, upZ){
    this.camX = camX;
    this.camY = camY;
    this.camZ = camZ;
    this.lookAtZ = lookAtZ;
    this.lookAtX = lookAtX;
    this.lookAtY = lookAtY;
    this.upZ = upZ;
  }

  show(){
    /* CAMERA ROTATION ENGINE */
    this.lookAtX = cos(camAngleZ) * cos(camAngleX);
    this.lookAtY = cos(camAngleZ) * sin(camAngleX);
    this.lookAtZ = sin(camAngleZ);
    this.lookAtX = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[0];
    this.lookAtY = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[1];
    this.lookAtZ = normalization(this.lookAtX, this.lookAtY, this.lookAtZ)[2];
    camera(this.camX, this.camY, this.camZ, this.camX + this.lookAtX, this.camY + this.lookAtY, this.camZ + this.lookAtZ,
           this.camX, this.camY, this.upZ);
  }
  jump(){
    if(jump === true){
      jumpTimer++;
      this.camZ += -playerStartVelosity + gravity * jumpTimer;
      if(this.camZ > groundZ - camBorder){
        this.camZ = groundZ - camBorder;
        jump = false;
        fall = false;
        jumpTimer = 1;
      }
    }
  }
}