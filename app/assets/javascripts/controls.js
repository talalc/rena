(function() {
  'use strict';

  // @FIXME where is p1, p2 coming from? run all JS against eslint ..
  function p1kbControls() {
    if ( KeyboardJS.activeKeys().indexOf('w') > -1 || KeyboardJS.activeKeys().indexOf('s') > -1 || KeyboardJS.activeKeys().indexOf('a') > -1 || KeyboardJS.activeKeys().indexOf('d') > -1){
      if (p1.canMove){
        var x = 0;
        var z = 0;
        if (KeyboardJS.activeKeys().indexOf('w') > -1){
          z = -0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('s') > -1){
          z = 0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('d') > -1){
          x = 0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('a') > -1){
          x = -0.8;
        }
        p1.move(x,z);
      }
    } else if (!p1.isJumping) {
      p1.physicMesh.setLinearVelocity(new THREE.Vector3(0,p1.physicMesh.getLinearVelocity().y,0));
    }

    if (KeyboardJS.activeKeys().indexOf('space') > -1){
      var touches = p1.physicMesh._physijs.touches;
      if (touches[0] == 1){
        p1.jump();
      }
    }
    if (KeyboardJS.activeKeys().indexOf('r') > -1){
      if (!p1.attacking){
        p1.attacking = true;
        p1.punch1();
      }
    }

    if (KeyboardJS.activeKeys().indexOf('t') > -1){
      if (!p1.attacking){
        p1.attacking = true;
        p1.energyBall1();
      }
    }

    if (KeyboardJS.activeKeys().indexOf('u') > -1){
      p1.useSheild();
    }

    if (KeyboardJS.activeKeys().indexOf('y') > -1){
      p1.beam();
    }
  }

  function p2kbControls(){
    if ( KeyboardJS.activeKeys().indexOf('up') > -1 || KeyboardJS.activeKeys().indexOf('down') > -1 || KeyboardJS.activeKeys().indexOf('right') > -1 || KeyboardJS.activeKeys().indexOf('left') > -1){
      if (p2.canMove){
        var x = 0;
        var z = 0;
        if (KeyboardJS.activeKeys().indexOf('up') > -1){
          z = -0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('down') > -1){
          z = 0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('right') > -1){
          x = 0.8;
        }
        if (KeyboardJS.activeKeys().indexOf('left') > -1){
          x = -0.8;
        }
        p2.move(x,z);
      }
    } else if (!p2.isJumping) {
      p2.physicMesh.setLinearVelocity(new THREE.Vector3(0,p2.physicMesh.getLinearVelocity().y,0));
    }

    if (KeyboardJS.activeKeys().indexOf('num0') > -1){
      var touches = p2.physicMesh._physijs.touches;
      if (touches[0] == 1){
        p2.jump();
      }
    }

    if (KeyboardJS.activeKeys().indexOf('num1') > -1){
      if (!p2.attacking){
        p2.attacking = true;
        p2.punch1();
      }
    }

    if (KeyboardJS.activeKeys().indexOf('num2') > -1){
      if (!p2.attacking){
        p2.attacking = true;
        p2.energyBall1();
      }
    }

    if (KeyboardJS.activeKeys().indexOf('num5') > -1){
      p2.useSheild();
    }

    if (KeyboardJS.activeKeys().indexOf('num3') > -1){
      p2.beam();
    }
  }

  // git keeps track of history. never check in commented out
}());
