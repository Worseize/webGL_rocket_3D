class Player{

  constructor(camX, camY, camZ, lookAtX, lookAtY, lookAtZ, upZ, zVelosity, prevCamX, prevCamY , prevCamZ){
    this.camX = camX;
    this.camY = camY;
    this.camZ = camZ;
    this.lookAtZ = lookAtZ;
    this.lookAtX = lookAtX;
    this.lookAtY = lookAtY;
    this.upZ = upZ;
    this.zVelosity = zVelosity;
    this.prevCamX = prevCamX;
    this.prevCamY = prevCamY;
    this.prevCamZ = prevCamZ;
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
           this.camX, this.camY, this.upZ);
  }
  jump(){
    if(jump){
      jumpTimer++;
      let i;
      let flagX; // inside box in X-axis
      let flagY; // inside box in Y-axis

      if(i != undefined && i < boxArray.length - 1){ // OPTIMIZATION 
        if(this.camX > boxArray[i].pX - boxArray[i].modelWidth / 2 && this.camX < boxArray[i].px + boxArray[i].modelWidth / 2){
          flagX = true;
          if(this.camY > boxArray[i].pY - boxArray[i].modelWidth / 2 && this.camY < boxArray[i].pY + boxArray[i].modelWidth / 2){
            flagY = true;
            return;
          }else{
            flagX = false;
            flagY = false;
          }
        }else{
          flagX = false;
          flagY = false;
        }
      }else{
        for(i = 0; i < boxArray.length; i++){
          if(this.camX > boxArray[i].pX - boxArray[i].modelWidth / 2 && this.camX < boxArray[i].px + boxArray[i].modelWidth / 2){
            flagX = true;
            if(this.camY > boxArray[i].pY - boxArray[i].modelWidth / 2 && this.camY < boxArray[i].pY + boxArray[i].modelWidth / 2){
              flagY = true;
              return;
            }else{
              flagX = false;
              flagY = false;
            }
          }else{
            flagX = false;
            flagY = false;
            console.log("in0");
          }
        }
      }

      if(flagX && flagY){
        console.log("in1");
        if(this.camZ < boxArray[i].pZ + boxArray[i].modelHeight / 2 && this.camZ + this.zVelosity > boxArray[i].pZ + boxArray[i].modelHeight / 2){
          currentGround = this.boxArray[i].pZ + boxArray[i].modelHeight / 2;
          jumpTimer = 0;
          console.log("in2");
        }else{
          currentGround = 0;
          console.log("out");
        }
      }

      if(this.camZ < camBorder){ // if player under the ground
        jumpTimer = 0;
        this.camZ = camBorder;
        this.zVelosity = 20;
        jump = false;
      }else if(this.camZ + this.zVelosity > currentGround + camBorder && camZ < currentGround + camBorder){ // if player jump on any object
        jumpTimer = 0;
        this.camZ = currentGround + camBorder;
        this.zVelosity = 20;
        jump = false;
      }else{
        this.zVelosity += -gravity * jumpTimer;
        if(this.zVelosity < -20){ //velosity limitation
          this.zVelosity = -20;
        }else if(this.zVelosity > 20){ //velosity limitation
          this.zVelosity = 20;
        }
        this.camZ += this.zVelosity;

      }
      this.prevCamX = this.camX;
      this.prevCamY = this.camY;
      this.prevCamZ = this.camZ;
    } // if(jump);
  }
}