function  normalization(x, y, z){
  let len = [];
  len[0] = x / sqrt(x * x +  y * y +  z * z);
  len[1] = y / sqrt(x * x +  y * y +  z * z);
  len[2] = -z / sqrt(x * x +  y * y +  z * z);
  return len;
}