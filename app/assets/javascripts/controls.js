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
      p1.mesh.position.x += pad1.axes[0];
      p1pointer.position.set(p1.mesh.position.x + pad1.axes[0]*15, p1.mesh.position.y, p1.mesh.position.z + pad1.axes[1]*15);
    }
    if ( Math.abs(pad1.axes[1]) > 0.2 ){
      p1.mesh.position.z += pad1.axes[1];
      p1pointer.position.set(p1.mesh.position.x + pad1.axes[0]*15, p1.mesh.position.y, p1.mesh.position.z + pad1.axes[1]*15);
    }
    if (pad1.buttons[0] == 1 || pad1.buttons[0].value == 1){
      p1.jump();
      setTimeout(function(){
        p1.fall();
      }, 400);
    }
    if (pad1.buttons[2] == 1 || pad1.buttons[2].value == 1){
      p1.punch1();
    }
    if (pad1.buttons[3] == 1 || pad1.buttons[3].value == 1){
      p1.punch2();
    }
  } // end if first controller found
  if (gamepads.length > 1){
    pad2 = gamepads[1];
    // 360 control
    if ( Math.abs(pad2.axes[0]) > 0.2 ){
      p2.mesh.position.x += pad2.axes[0];
      p2pointer.position.set(p2.mesh.position.x + pad2.axes[0]*15, p2.mesh.position.y, p2.mesh.position.z + pad2.axes[1]*15);
    }
    if ( Math.abs(pad2.axes[1]) > 0.2 ){
      p2.mesh.position.z += pad2.axes[1];
      p2pointer.position.set(p2.mesh.position.x + pad2.axes[0]*15, p2.mesh.position.y, p2.mesh.position.z + pad2.axes[1]*15);
    }
    if (pad2.buttons[0] == 1 || pad2.buttons[0].value == 1){
      p2.jump();
      setTimeout(function(){
        p2.fall();
      }, 400);
    }
    if (pad2.buttons[2] == 1 || pad2.buttons[2].value == 1){
      p2.punch1();
    }
    if (pad2.buttons[3] == 1 || pad2.buttons[3].value == 1){
      p2.punch2();
    }
  } // end if second controller found

    //  360 dpad - in case would like to add support
    // if (pad1.axes[5] == 1){
    // } else if (pad1.axes[5] == -1){
    // }
    // if (pad1.axes[6] == 1){
    // } else if (pad1.axes[6] == -1){
    // }
}