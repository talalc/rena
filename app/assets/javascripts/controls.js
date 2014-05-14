function controls(){

  gamepads = navigator.webkitGetGamepads() || navigator.getGamepads();

  if (gamepads.length > 0){
    p1.pad = gamepads[0];
  }
  if (gamepads.length > 1){
    p2.pad = gamepads[1];
  }

//  360 dpad - in case would like to add support
// if (pad1.axes[5] == 1){
// } else if (pad1.axes[5] == -1){
// }
// if (pad1.axes[6] == 1){
// } else if (pad1.axes[6] == -1){
// }
// movement forward
// KeyboardJS.on('w, up', function(event){
// });
// movement right
// KeyboardJS.on('s, down', function(event){
// });
// // movement left
// KeyboardJS.on('d, right', function(event){
// });
// // movement right
// KeyboardJS.on('a, left', function(event){
// });
// if ( keyboard.pressed("z") ){
//   do something
// }
}