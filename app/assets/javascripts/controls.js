function controls(){
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
    // do something
  // }
  var isChromium = window.chrome, vendorName = window.navigator.vendor;
  if (isChromium !== null && vendorName === "Google Inc.") {
    // chrome
    gamepads = navigator.webkitGetGamepads();
  } else {
    // firefox
    gamepads = navigator.getGamepads();
  }
  if (gamepads.length > 0){
    pad1 = gamepads[0];
    // 360 control
    if ( Math.abs(pad1.axes[0]) > 0.2 ){
      cube.position.x += pad1.axes[0];
      // cube.position.z -= pad1.axes[0];
      p1pointer.position.set(cube.position.x + pad1.axes[0]*3, cube.position.y, cube.position.z + pad1.axes[1]*3);
    }
    if ( Math.abs(pad1.axes[1]) > 0.2 ){
      // cube.position.x += pad1.axes[1];
      cube.position.z += pad1.axes[1];
      p1pointer.position.set(cube.position.x + pad1.axes[0]*3, cube.position.y, cube.position.z + pad1.axes[1]*3);
    }
    if (pad1.buttons[0] == 1 || pad1.buttons[0].value == 1){
      p1jump();
      setTimeout(function(){
        p1fall();
      }, 400);
    }
    if (pad1.buttons[2] == 1 || pad1.buttons[2].value == 1){
      p1punch();
    }
    if (pad1.buttons[3] == 1 || pad1.buttons[3].value == 1){
      modelpunch();
    }
    //  360 dpad
    // if (pad1.axes[5] == 1){
    //   cube.position.x += 1;
    //   cube.position.z -= 1;
    // } else if (pad1.axes[5] == -1){
    //   cube.position.x -= 1;
    //   cube.position.z += 1;
    // }
    // if (pad1.axes[6] == 1){
    //   cube.position.x += 1;
    //   cube.position.z += 1;
    // } else if (pad1.axes[6] == -1){
    //   cube.position.x -= 1;
    //   cube.position.z -= 1;
    // }
  } // end if first controller found
}