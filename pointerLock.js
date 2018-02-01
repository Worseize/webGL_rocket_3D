function pointerLockSetup(){
	var canvas = document.querySelector('canvas');
	canvas.onclick = function(){
		if(scene === 0){
		  scene = 1;
		  firstScene.remove();
		  firstSceneTimer = 0;
		  createAim('img/aim.png');
		  createGun('img/akInHands.png');
		  canvas.requestPointerLock();
		}else if (scene === 1){
			if(pointerLock === false){
				scene = 0;
				myAim.remove();
				myGun.remove();
				createMenu("Paused");
				camera(0, 0, -500, 0, 0, 0, 0, 1000, 0);
			}
		}
	};
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

}

function lockChangeAlert() {
  if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
    pointerLock = true;
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
    pointerLock = false;
  }
}

function updatePosition(e){
  prevX = -e.movementX + mouseX;
  prevY = -e.movementY + mouseY;

}