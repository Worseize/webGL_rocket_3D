function keyPressed(){
  if(start){
    if(keyCode === 32 ){ //SPACE
      jump = true;
    }else if(keyCode === 82){ // R (reload gun)
      if(reloadReady){
        reloadReady = false;
        //remove old texture
        document.body.removeChild(document.getElementById('myGun'));
        // show gif
        myGun = createImg("img/akReload.gif");
        let partX = 1;
        let partY = 2;
        myGun.style("position","absolute");
        myGun.style("left", (partX - 1) / partX * absoluteW  + "px");
        myGun.style("top", (partY - 1) / partY * absoluteH  + "px");
        myGun.style("width", absoluteW / partX  + "px");
        myGun.style("height", absoluteH / partY + "px");
        myGun.style("pointer-events","none");
        myGun.style("user-select","none");
        myGun.style("user-drag","none");
        myGun.id("myGun");
        // remove gif and show old texture back 
        delayCreate();
      }
    }
  }
  if(keyCode === 27){
    start = false;
    removeElements();
    createMenu();
  }
}

function mouseReleased(){
  if(start){
    fire = true;
  }
}

function mouseMoved(){
  //camera rotate LEFT / RIGHT
  if(prevX + sensetivity > mouseX){
    camAngleX -= sensetivity;
  }
  if(prevX - sensetivity < mouseX){
    camAngleX += sensetivity;
  }

  //camera rotate UP | DOWN 
  if(prevY > mouseY){
    if(camAngleZ < PI / 2 - sensetivity * 5){
      camAngleZ += sensetivity;
    }
  }
  if(prevY < mouseY ){
    if(camAngleZ > -PI / 2   + sensetivity * 5){
      camAngleZ -= sensetivity;
    }
  }
}


window.onresize = function(){
  if(start){
    absoluteW = innerWidth - 5;
    absoluteH = innerHeight - 5;
    myCanvas = createCanvas(absoluteW, absoluteH, WEBGL);
    myCanvas.style("cursor", "none");
    removeElements();
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
  }
}
