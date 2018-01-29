class createAim{

	constructor(positionX, positionY, positionZ, modelWidth, modelHeight){
		this.pX = positionX;
		this.pY = positionY;
		this.pZ = positionZ;
		this.modelWidth = modelWidth;
		this.modelHeight = modelHeight;
	}

	show(){
		texture(aim);
		push();
		translate(this.pX, this.pY, this.pZ); //init position 
		rotateZ(camAngleX - camAngleZ); // end X -Y rotation
		rotateY(-camAngleZ); // init rotation + Y - Z rotation
		rotateX(-camAngleZ); // start X - Y rotation
		rotateY(PI / 2); // init rotation
		plane(this.modelWidth, this.modelHeight);
		pop();
	}
	update(){
		//lookAt players view 
		this.pX = playerArray[0].camX + camBorder * playerArray[0].lookAtX;
		this.pY = playerArray[0].camY + camBorder * playerArray[0].lookAtY;
		this.pZ = playerArray[0].camZ + camBorder * (playerArray[0].lookAtZ + 1);
	}	
}