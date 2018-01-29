class createSceneBorders{

	constructor(positionX, positionY, positionZ, modelWidth, modelHeight, modelTexture, orientation){
		this.pX = positionX;
		this.pY = positionY;
		this.pZ = positionZ;
		this.modelWidth = modelWidth;
		this.modelHeight = modelHeight;
		this.modelTexture = modelTexture;
		this.orientation = orientation; // left , right , top , buttom , inside, outside
	}

	show(){
		texture(this.modelTexture);
		push();
			translate(this.pX, this.pY, this.pZ + this.modelHeight / 2 );
			if(this.orientation === "left"){
				rotateX(PI / 2);
			}else if(this.orientation === "right"){
				rotateX(PI / 2);
			}else if(this.orientation ==="inside"){
				rotateY(PI / 2);
					rotateZ(PI / 2);
			}else if(this.orientation === "outside"){
				rotateY(PI / 2);
					rotateZ(PI / 2);
			}
			plane(this.modelWidth, this.modelHeight);
		pop();
	}

	move(){
		if(this.orientation === "sky"){
			this.pX+= 5;
			this.pY+= 5;
			if(this.pX > sceneLength + this.modelWidth / 2){
				this.pX = - this.modelWidth / 2;
			}else if(this.pX < -this.modelWidth / 2){
				this.pX = sceneLength + this.modelWidth / 2;
			}
			if(this.pY > sceneLength + this.modelHeight / 2){
				this.pY = - this.modelHeight / 2; 
			}else if(this.pY < -this.modelHeight / 2){
				this.pY = sceneLength  + this.modelHeight / 2;
			}
		}
	}
}