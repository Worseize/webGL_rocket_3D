//REMOVE RELOADING .gif ANIMATION
function delayRemove() {
  timer = window.setTimeout(
    function() {
      myGun.remove();
      createGun("img/akInHands.png");
      reloadReady = true;
    },
    3000
  );
}

// https://stackoverflow.com/questions/346021/how-do-i-remove-objects-from-a-javascript-associative-array by HarpyWar
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