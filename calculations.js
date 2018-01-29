function  normalization(x, y, z){
  let len = [];
  len[0] = x / sqrt(x * x +  y * y +  z * z);
  len[1] = y / sqrt(x * x +  y * y +  z * z);
  len[2] = -z / sqrt(x * x +  y * y +  z * z);
  return len;
}
function createUncollidedBoxes(){
	if(boxArray.length === 0){
		let rnd = random(0, sceneLength);
	  	boxArray.push(new createStaticPrimitive(rnd, rnd, rnd, boxSize , boxSize, stone, 1));
  	}
  	let rndX = random(boxSize / 2, sceneLength - boxSize / 2);
    let rndY = random(boxSize / 2, sceneLength - boxSize / 2);
    let rndZ = random(boxSize / 2, sceneLength - boxSize / 2);
    for(let j = 0; j < boxArray.length; j++){
      if(boxArray[j].pX - boxSize < rndX &&  boxArray[j].pX + boxSize > rndX){
      	if(boxArray[j].pY - boxSize < rndY &&  boxArray[j].pY + boxSize > rndY){
      		if(boxArray[j].pZ - boxSize < rndZ &&  boxArray[j].pZ + boxSize > rndZ){
      			createUncollidedBoxes();
      			return;
      		}
      	}
      }
    }
    boxArray.push(new createStaticPrimitive(rndX, rndY, rndZ, boxSize , boxSize , stone, 1));
}

Object.prototype.removeItem = function(key, value){
    if(value === undefined){
      return;
    }
    for(var i in this){
      if(this[i][key] === value){
        this.splice(i, 1);
      }
    }
};

//Debug part
function changeScaler(event){
  if(event.deltaY > 5){
    if(scaler > 0.1){
      scaler -= 0.1;
    }
  }else if(event.deltaY < 5){
    if(scaler < 3){
      scaler += 0.1;
    }
  }
}