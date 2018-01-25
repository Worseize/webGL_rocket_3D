function  normalization(x, y, z){
  let len = [];
  len[0] = x / sqrt(x * x +  y * y +  z * z);
  len[1] = y / sqrt(x * x +  y * y +  z * z);
  len[2] = -z / sqrt(x * x +  y * y +  z * z);
  return len;
}
function createUncollidedBoxes(){
	if(boxArray.length === 0){
		let rnd = random(-sceneLength, sceneLength);
	  	boxArray.push(new createModel(rnd, rnd, rnd, boxSize , boxSize, stone, 1, "none"));
  	}

  	let rndX = random(-sceneLength / 2, sceneLength / 2);
    let rndY = random(-sceneLength / 2, sceneLength / 2);
    let rndZ = random(0, sceneLength);
    for(let j = 0; j < boxArray.length; j++){
      if(boxArray[j].pX - boxSize < rndX &&  boxArray[j].pX + boxSize > rndX){
      	if(boxArray[j].pY - boxSize < rndY &&  boxArray[j].pY + boxSize > rndX){
      		if(boxArray[j].pZ - boxSize < rndZ &&  boxArray[j].pZ + boxSize > rndX){
      			createUncollidedBoxes();
      			return;
      		}
      	}
      }
    }
    boxArray.push(new createModel(rndX, rndY, rndZ, boxSize , boxSize , stone, 1, "none"));
}