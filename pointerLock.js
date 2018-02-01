document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

function updatePosition(e){
  prevX = -e.movementX + mouseX;
  prevY = -e.movementY + mouseY;
}

function staticImagesInDomCreate(){
  //AIM
  myAim = createImg("img/aim.png");
  myAim.style("position","absolute");
  myAim.style("left",(absoluteW - 100) / 2 + "px"); // 100 = element Width
  myAim.style("top",(absoluteH - 100) / 2 + "px"); // 100 = element height
  myAim.style("width","100px");
  myAim.style("height","100px");
  myAim.style("pointer-events","none");
  myAim.style("user-select","none");
  myAim.style("user-drag","none");
  myAim.id("myAim");
  //GUN
  myGun = createImg("img/akInHands.png");
  let partX = 2;
  let partY = 4;
  myGun.style("position","absolute");
  myGun.style("left", (partX - 1) / partX * absoluteW  + "px");
  myGun.style("top", (partY - 1) / partY * absoluteH  + "px");
  myGun.style("width", absoluteW / partX  + "px");
  myGun.style("height", absoluteH / partY + "px");
  myGun.style("pointer-events","none");
  myGun.style("user-select","none");
  myGun.style("user-drag","none");
  myGun.id("myGun");

  prevX = mouseX;
  prevY = mouseY;
}