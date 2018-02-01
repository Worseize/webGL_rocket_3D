class Bullet{

  constructor(pX, pY, pZ, r, speedX, speedY, speedZ, id){
    this.pX = pX;
    this.pY = pY;
    this.pZ = pZ;
  	this.r = r;
  	this.speedX = speedX;
  	this.speedY = speedY;
  	this.speedZ = speedZ;
    this.id = id;
  }
  update(){
  	this.pX += this.speedX;
  	this.pY += this.speedY;
  	this.pZ += this.speedZ;
  }
  checkEdges(){

    if(this.pZ > sceneLength || this.pZ < 0 || this.pX < 0 || this.pX > sceneLength || this.pY < 0 || this.pY > sceneLength){
      bulletArray.removeItem('id', this.id);
    }
    //(Bullet && Box) collision
    //Bottom + Top
    for(let i = 0 ; i < boxArray.length; i++){
      if(this.pX > boxArray[i].pX - boxArray[i].h / 2 && this.pX < boxArray[i].pX + boxArray[i].h / 2){
        if(this.pY > boxArray[i].pY - boxArray[i].h / 2 && this.pY < boxArray[i].pY + boxArray[i].h / 2){
          if(this.pZ > boxArray[i].pZ - boxArray[i].h / 2 && this.pZ < boxArray[i].pZ + boxArray[i].h / 2){
            bulletArray.removeItem('id', this.id);
            break;
          }
        }
      }
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

  }
  display(){
  	texture(bulletImg);
    push();
  	translate(this.pX , this.pY, this.pZ);
  	sphere(this.r);
    pop();
  }
}