//CREATE GAMESCENE BORDERS
function pushSceneBordersToInstance(){
  borders[0] = new createSceneBorders(sceneLength / 2, 0, 0, sceneLength, sceneLength, wall, "left");
  borders[1] = new createSceneBorders(0, sceneLength / 2, 0, sceneLength, sceneLength, wall, "inside");
  borders[2] = new createSceneBorders(sceneLength / 2, sceneLength, 0, sceneLength, sceneLength, wall, "right");
  borders[3] = new createSceneBorders(sceneLength, sceneLength / 2, 0, sceneLength, sceneLength, wall, "outside");
  borders[4] = new createSceneBorders(sceneLength / 2, sceneLength / 2, -sceneLength / 2, sceneLength, sceneLength, stone, "bottom");
  borders[5] = new createSceneBorders(sceneLength / 2, sceneLength / 2, sceneLength / 2, sceneLength, sceneLength, cloud, "sky");
} 
//CREATE BOXES
function pushBoxesToInstance(){
	let rndX = random(boxSize / 2, sceneLength - boxSize / 2);
  let rndY = random(boxSize / 2, sceneLength - boxSize / 2);
  let rndZ = random(boxSize / 2, sceneLength - boxSize / 2);
  if(boxArray.length === 0){
    boxArray.push(new createStaticPrimitive(rndX, rndY, rndZ, boxSize , boxSize, stone, 1));
  }
  for(let j = 0; j < boxArray.length; j++){
    if(boxArray[j].pX - boxSize < rndX &&  boxArray[j].pX + boxSize > rndX){
    	if(boxArray[j].pY - boxSize < rndY &&  boxArray[j].pY + boxSize > rndY){
    		if(boxArray[j].pZ - boxSize < rndZ &&  boxArray[j].pZ + boxSize > rndZ){
    			pushBoxesToInstance();
    			return;
    		}
    	}
    }
  }
  boxArray.push(new createStaticPrimitive(rndX, rndY, rndZ, boxSize , boxSize , stone, 1));
}

//CREATE STATIC GUN IMAGE
function createGun(pathToGun){
  myGun = createImg(pathToGun);
  let partX = 2;
  let partY = 4;
  myGun.style("position","absolute");
  myGun.style("left", (partX - 1) / partX * absoluteW  + "px");
  myGun.style("top", (partY - 1) / partY * absoluteH  + "px");
  myGun.style("width", absoluteW / partX  + "px");
  myGun.style("height", absoluteH / partY + "px");
  myGun.style("pointer-events","none");
  myGun.style("user-select","none");
  myGun.id("myGun");
  
}

//CREATE STATIC AIM IMAGE
function createAim(pathToAim){
  myAim = createImg(pathToAim);
  myAim.style("position", "absolute");
  myAim.style("left", (absoluteW - aimSize) / 2 + "px"); // 100 = element Width
  myAim.style("top", (absoluteH - aimSize) / 2 + "px"); // 100 = element height
  myAim.style("width", aimSize + "px");
  myAim.style("height", aimSize + "px");
  myAim.style("pointer-events", "none");
  myAim.style("user-select", "none");
  myAim.style("user-drag", "none");
  myAim.id("myAim");
}

//CREATE FIRST SCENE (MENU)
function createMenu(text){
  firstScene = createGraphics(500, 500);
  firstScene.background(0);
  firstScene.fill(255);
  firstScene.textAlign(CENTER);
  firstScene.textSize(50);
  firstScene.text(text, 250, 250);
}