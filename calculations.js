function  normalization(x, y, z){
  let len = [];
  len[0] = x / sqrt(x * x +  y * y +  z * z);
  len[1] = y / sqrt(x * x +  y * y +  z * z);
  len[2] = -z / sqrt(x * x +  y * y +  z * z);
  return len;
}
function showShip(){
	time++;
  texture(rocket1);
  push();
    translate(0, 0, groundZ - 1000);
    push();
      rotateX(PI / 4);
      rotateY(PI / 4);
      rotateZ(time/180 * PI);
      translate(100,0,0);
      push();
        translate(0, -10 + (20 + 100 + 10) / 2 , 0) // move whole ship to origin
        //body + cap
        cone(10,20);
        push();
          translate(0, -60, 0);
          cylinder(10, 100);
          translate(0, -50, 0);
          cone(10,10)
        pop();

        //fuel 1
        push()
          translate(10, -75,10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 2
        push()
          translate(10, -75,-10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 3
        push()
          translate(-10, -75,-10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();

        //fuel 4
        push()
          translate(-10, -75,10);
          cone(5,10);
          push();
            translate(0, -20, 0);
            cylinder(5, 30);
            translate(0,-15,0);
            cone(3, 10);
          pop();
        pop();
      pop();
    pop();
  pop();
}