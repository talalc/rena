function p1kbControls(){
  if ( KeyboardJS.activeKeys().indexOf("w") > -1 || KeyboardJS.activeKeys().indexOf("s") > -1 || KeyboardJS.activeKeys().indexOf("a") > -1 || KeyboardJS.activeKeys().indexOf("d") > -1){
    if (p1.canMove){
      var x = 0;
      var z = 0;
      if (KeyboardJS.activeKeys().indexOf("w") > -1){
        z = -0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("s") > -1){
        z = 0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("d") > -1){
        x = 0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("a") > -1){
        x = -0.8;
      }
      p1.move(x,z);
    }
  } else if (!p1.isJumping) {
    p1.physicMesh.setLinearVelocity(new THREE.Vector3(0,p1.physicMesh.getLinearVelocity().y,0));
  }
  if (KeyboardJS.activeKeys().indexOf("space") > -1){
    var touches = p1.physicMesh._physijs.touches;
    if (touches[0] == 1){
      p1.jump();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("r") > -1){
    if (!p1.attacking){
      p1.attacking = true;
      p1.punch1();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("t") > -1){
    if (!p1.attacking){
      p1.attacking = true;
      p1.energyBall1();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("u") > -1){
    p1.useSheild();
  }
  if (KeyboardJS.activeKeys().indexOf("y") > -1){
    p1.beam();
  }
}

function p2kbControls(){
  if ( KeyboardJS.activeKeys().indexOf("up") > -1 || KeyboardJS.activeKeys().indexOf("down") > -1 || KeyboardJS.activeKeys().indexOf("right") > -1 || KeyboardJS.activeKeys().indexOf("left") > -1){
    if (p2.canMove){
      var x = 0;
      var z = 0;
      if (KeyboardJS.activeKeys().indexOf("up") > -1){
        z = -0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("down") > -1){
        z = 0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("right") > -1){
        x = 0.8;
      }
      if (KeyboardJS.activeKeys().indexOf("left") > -1){
        x = -0.8;
      }
      p2.move(x,z);
    }
  } else if (!p2.isJumping) {
    p2.physicMesh.setLinearVelocity(new THREE.Vector3(0,p2.physicMesh.getLinearVelocity().y,0));
  }
  if (KeyboardJS.activeKeys().indexOf("num0") > -1){
    var touches = p2.physicMesh._physijs.touches;
    if (touches[0] == 1){
      p2.jump();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("num1") > -1){
    if (!p2.attacking){
      p2.attacking = true;
      p2.punch1();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("num2") > -1){
    if (!p2.attacking){
      p2.attacking = true;
      p2.energyBall1();
    }
  }
  if (KeyboardJS.activeKeys().indexOf("num5") > -1){
    p2.useSheild();
  }
  if (KeyboardJS.activeKeys().indexOf("num3") > -1){
    p2.beam();
  }
}

// function controls(){
//   gamepads = navigator.webkitGetGamepads() || navigator.getGamepads();
//   if (gamepads.length > 0){
//     p1.pad = gamepads[0];
//   }
//   if (gamepads.length > 1){
//     p2.pad = gamepads[1];
//   }
// }

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
// var keyboard = new THREEx.KeyboardState();
// if ( keyboard.pressed("up") ){
//   p1.move(1,1);
// }

// $( window ).keydown( function(event){
//   if (event.keyCode == 68 || event.which == 68){
//     p1.move(1,0);
//   }
//   if (event.keyCode == 65 || event.which == 65){
//     p1.move(-1,0);
//   }
// });

// $( window ).keyup( function(event){
//   if (event.keyCode == 68 || event.which == 68){
//     p1.physicMesh.setLinearVelocity(new THREE.Vector3(0,0,0));
//   }
// });

// $( window ).keyup( function(event){
//   if (event.keyCode == 65 || event.which == 65){
//     p1.physicMesh.setLinearVelocity(new THREE.Vector3(0,0,0));
//   }
// });