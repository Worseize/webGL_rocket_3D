class createStaticPrimitive{

	constructor(positionX, positionY, positionZ, modelWidth, modelHeight, modelTexture, modelIndex){
		this.pX = positionX;
		this.pY = positionY;
		this.pZ = positionZ;
		this.modelWidth = modelWidth;
		this.modelHeight = modelHeight;
		this.modelTexture = modelTexture;
		this.modelIndex = modelIndex; // [0, 1, 2, 3, 4, 5, 6] --> (plane, box, sphere, cylinder, cone, ellipsoid, torus)
	}

	show(){
		texture(this.modelTexture);
		push();
		if(this.modelIndex === 0){
			translate(this.pX, this.pY, this.pZ);
			rotateY(PI/2);
			plane(this.modelWidth, this.modelHeight);
		}if(this.modelIndex === 1){ // box
			translate(this.pX, this.pY, this.pZ);
	      	box(this.modelHeight);
		}
		pop();
	}
}