class createModel{

	constructor(positionX, positionY, positionZ, modelWidth, modelHeight, modelTexture, modelIndex, flat){
		this.pX = positionX;
		this.pY = positionY;
		this.pZ = positionZ;
		this.modelWidth = modelWidth;
		this.modelHeight = modelHeight;
		this.modelTexture = modelTexture;
		this.modelIndex = modelIndex; // [0, 1, 2, 3, 4, 5, 6] --> (plane, box, sphere, cylinder, cone, ellipsoid, torus)
		this.flat = flat; // left , right , top , buttom , inside, outside
	}

	show(){
		texture(this.modelTexture);
		push();
		translate(this.pX, this.pY, this.pZ + this.modelHeight / 2 );
		if(this.modelIndex === 0 ){ //plane
			if(this.flat === "left"){
				rotateX(PI / 2);
			}else if(this.flat === "right"){
				rotateX(PI / 2);
			}else if(this.flat ==="inside"){
				rotateY(PI / 2);
  				rotateZ(PI / 2);
			}else if(this.flat === "outside"){
				rotateY(PI / 2);
 				rotateZ(PI / 2);
			}
			plane(this.modelWidth, this.modelHeight);
		}else if(this.modelIndex === 1){ //box
	      	box(this.modelHeight);
		}else if(this.modelIndex === 2){ // sphere
			sphere(this.modelHeight);
		}else if(this.modelIndex === 3){ //cylinder
				
		}else if(this.modelIndex === 4){ //cone
			rotateX(3 * PI / 2);
			cone(this.modelWidth , this.modelHeight)
		}else if(this.modelIndex === 5){ //ellipsoid
			
		}else if(this.modelIndex === 6){ //torus
			
		}
		pop();
	}

	move(){
		if(this.flat === "sky"){
			this.pX+= 5;
			this.pY+= 5;
			if(this.pX > sceneLength / 2 + this.modelWidth / 2){
				this.pX = -sceneLength / 2 - this.modelWidth / 2;
			}else if(this.pX < -sceneLength / 2 - this.modelWidth / 2){
				this.pX = sceneLength / 2 + this.modelWidth / 2;
			}
			if(this.pY > sceneLength / 2 + this.modelHeight / 2){
				this.pY = -sceneLength / 2 - this.modelHeight / 2; 
			}else if(this.pY < -sceneLength / 2 - this.modelHeight / 2){
				this.pY = sceneLength / 2 + this.modelHeight / 2;
			}
		}
	}
}