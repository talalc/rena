var Character = Backbone.Model.extend({
  // Class constructor
  initialize: function (args){
    // Set the different geometries composing the humanoid
    var head = new THREE.SphereGeometry(8, 12, 12),
        hand = new THREE.SphereGeometry(2, 4, 4),
        foot = new THREE.SphereGeometry(4, 4, 4, 0, Math.PI * 2, 0, Math.PI / 2),
        nose = new THREE.SphereGeometry(1, 4, 4),
        // Set the material, the "skin"
        material = new THREE.MeshLambertMaterial(args);
    this.args = args;
    // Set the character modelization object
    this.mesh = new THREE.Object3D();
    // this.mesh.position.y = 12;
    // Set and add its head
    this.head = new Physijs.SphereMesh(head, material);
    // this.head.position.y = 0;
    this.mesh.add(this.head);
    // Set and add its hands
    this.hands = {
        left: new Physijs.SphereMesh(hand, material),
        right: new Physijs.SphereMesh(hand, material)
    };
    this.hands.left.position.x = -9;
    this.hands.left.position.y = -2;
    this.hands.left.position.z = 3;
    this.hands.right.position.x = 9;
    this.hands.right.position.y = -2;
    this.hands.right.position.z = 3;
    this.mesh.add(this.hands.left);
    this.mesh.add(this.hands.right);
    // Set and add its feet
    this.feet = {
        left: new Physijs.SphereMesh(foot, material),
        right: new Physijs.SphereMesh(foot, material)
    };
    this.feet.left.position.x = -4;
    this.feet.left.position.y = -12;
    this.feet.left.rotation.y = Math.PI / 4;
    this.feet.right.position.x = 4;
    this.feet.right.position.y = -12;
    this.feet.right.rotation.y = Math.PI / 4;
    this.mesh.add(this.feet.left);
    this.mesh.add(this.feet.right);
    // Set and add its nose
    this.nose = new Physijs.SphereMesh(nose, material);
    this.nose.position.y = 0;
    this.nose.position.z = 8;
    this.mesh.add(this.nose);
    // SHEILD
    var sheild = new THREE.BoxGeometry(20,16,1);
    this.sheild = new Physijs.BoxMesh(sheild, new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.0 } ) );
    this.sheild.position.y = 3;
    this.sheild.position.z = 12;
    this.mesh.add(this.sheild);
    // Pointer to set rotation towards
    this.pointer = new THREE.Mesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5 } ) );
    scene.add(this.pointer);
    // Hit meshes array
    this.hitMeshes = [];
    // Physics
    this.physicMesh = new Physijs.SphereMesh(head, new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.1 } ));
    this.physicMesh.setAngularFactor(new THREE.Vector3(0,0,0));
    // Set the vector of the current motion
    this.direction = new THREE.Vector3(0, 0, 0);
    // Alive boolean
    this.isAlive = true;
    // Added Health Points
    this.canMove = true;
    // Attacking boolean
    this.hp = 1000;
    // Walking boolean
    this.isWalking = false;
    // Jumping boolean
    this.isJumping = false;
    // Movement boolean
    this.attacking = false;
    // Collision Events
    var _this = this;
    this.physicMesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      // console.log(other_object);
      // console.log(relative_velocity);
      // console.log(relative_rotation);
      // console.log(contact_normal);
      if (other_object.id == 8){
        _this.isJumping = false;
      }
      if (other_object.id == 11){
        _this.isJumping = false;
      }
      if (other_object.id == 9){
        _this.hp = 0;
      }
    });
  },
  control: function(){
    if ( Math.abs(this.pad.axes[0]) > 0.2 || Math.abs(this.pad.axes[1]) > 0.2 ){
      if (this.canMove){
        this.move(this.pad.axes[0],this.pad.axes[1]);
      }
    } else if (!this.isJumping){
      this.physicMesh.setLinearVelocity(new THREE.Vector3(0,this.physicMesh.getLinearVelocity().y,0));
    }
    if (this.pad.buttons[0] == 1 || this.pad.buttons[0].value == 1){
      // var touches = this.physicMesh._physijs.touches;
      // if (touches[0] == 1){
      if (!this.isJumping){
        this.jump();
      }
        //  || touches[0] == 2 if box collision
      // }
    }
    if (this.pad.buttons[2] == 1 || this.pad.buttons[2].value == 1){
      if (!this.attacking){
        this.attacking = true;
        this.punch1();
      }
    }
    if (this.pad.buttons[3] == 1 || this.pad.buttons[3].value == 1){
      if (!this.attacking){
        this.attacking = true;
        this.energyBall1();
      }
    }
    if (this.pad.buttons[1] == 1 || this.pad.buttons[1].value == 1){
      this.useSheild();
    }
    if (this.pad.buttons[5] == 1 || this.pad.buttons[5].value == 1){
      this.beam();
    }
  },

  move: function(deltaX, deltaZ){
    this.pointer.position.set(this.mesh.position.x + deltaX*1000, this.mesh.position.y, this.mesh.position.z + deltaZ*1000);
    if (!this.isJumping){
      this.walk(deltaX, deltaZ);
      this.direction.set(deltaX*75,this.physicMesh.getLinearVelocity().y,deltaZ*75);
      this.physicMesh.setLinearVelocity(this.direction);
      // this.physicMesh.applyCentralForce(new THREE.Vector3(deltaX*500000,0,deltaZ*500000));
    }
  },

  walk: function(x, z){
    if (!this.isWalking){
      this.isWalking = true;
      var mag = 2;
      // if ( Math.abs(x) > Math.abs(z)) {
      //   mag = Math.abs(x)*2;
      // } else {
      //   mag = Math.abs(z)*2;
      // }
      // console.log(mag);
      this.step1(mag);
      var _this = this;
      setTimeout(function(){
        _this.step2(mag);
      }, 200);
      setTimeout(function(){
        _this.step2(mag);
      }, 400);
      setTimeout(function(){
        _this.step1(mag);
      }, 600);
      setTimeout(function(){
        _this.isWalking = false;
        _this.feet.left.position.z = 0;
        _this.feet.right.position.z = 0;
      }, 800);
    }
  },

  jump: function(){
    this.isJumping = true;
    this.physicMesh.setLinearVelocity(new THREE.Vector3(this.physicMesh.getLinearVelocity().x/1.5,0,this.physicMesh.getLinearVelocity().z/1.5));
    this.physicMesh.applyCentralImpulse(new THREE.Vector3(0,200000,0));
  },

  punch1: function(){
    this.punchanim1();
    var punch1 = new Physijs.SphereMesh( new THREE.SphereGeometry(4), new THREE.MeshBasicMaterial(this.args), 1500 );
    var _this = this;
    setTimeout(function(){
      _this.punchanim2();
      punch1.position.setFromMatrixPosition( _this.hands.left.matrixWorld );
      scene.add( punch1);
      _this.hitMeshes.push(punch1);
    }, 250);
    setTimeout(function(){
      _this.hitMeshes.pop();
      scene.remove( punch1 );
      _this.hands.right.position.z = 3;
      _this.attacking = false;
    }, 500);
  },

  beam: function(){
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( this.mesh.matrix );
    var direction = new THREE.Vector3( 0, 0, 1 );
    direction.applyMatrix4( matrix );
    var punch2 = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial(this.args) );
    punch2.position.setFromMatrixPosition( this.hands.left.matrixWorld );
    this.hitMeshes.push(punch2);
    scene.add( punch2);
    var punchinterval = setInterval(function() {
      punch2.translateOnAxis(direction, 5);
    }, 60);
    var _this = this;
    setTimeout( function(){
      clearInterval(punchinterval);
      _this.hitMeshes.pop();
      scene.remove( punch2 );
    }, 400);
  },

  energyBall1: function(){
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( this.mesh.matrix );
    var direction = new THREE.Vector3( 0, 0, 1 );
    direction.applyMatrix4( matrix );
    var ball = new Physijs.SphereMesh( new THREE.SphereGeometry(8), new THREE.MeshBasicMaterial(this.args) );
    ball.position.setFromMatrixPosition( this.hands.right.matrixWorld );
    this.hitMeshes.push(ball);
    scene.add( ball);
    ball.setAngularVelocity(new THREE.Vector3(0,0,0));
    ball.applyCentralImpulse(direction.multiplyScalar(1000000));
    var _this = this;
    setTimeout( function(){
      _this.hitMeshes.pop();
      scene.remove( ball );
      _this.attacking = false;
    }, 1000);
  },

  step1: function(mag){
    var _this = this;
    var step1 = setInterval(function() {
      _this.feet.left.position.z += mag;
      _this.feet.right.position.z -= mag;
    }, 75);
    setTimeout( function(){
      clearInterval(step1);
    }, 200);
  },

  step2: function(mag){
    var _this = this;
    var step2 = setInterval(function() {
      _this.feet.left.position.z -= mag;
      _this.feet.right.position.z += mag;
    }, 75);
    setTimeout( function(){
      clearInterval(step2);
    }, 200);
  },

  punchanim1: function(){
    var _this = this;
    var step1 = setInterval(function() {
      _this.hands.left.position.z += 4;
    }, 50);
    setTimeout( function(){
      clearInterval(step1);
    }, 250);
  },

  punchanim2: function(){
    var _this = this;
    var step2 = setInterval(function() {
      _this.hands.left.position.z -= 4;
    }, 50);
    setTimeout( function(){
      clearInterval(step2);
    }, 250);
  },

  hit: function(){
    this.canMove = false;
    var _this = this;
    // var b = new Physijs.SphereMesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0xFF1111 } ));
    // b.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    // scene.add(b);
    setTimeout( function(){
      // scene.remove(b);
      _this.canMove = true;
    }, 500);
    this.hp -= 1;
  },

  hitCollisions: function(otherPlayer){
    var originPoint = this.mesh.position.clone();
    for (var vertexIndex = 0; vertexIndex < this.head.geometry.vertices.length; vertexIndex++){
      var localVertex = this.head.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4( this.mesh.matrix );
      var directionVector = globalVertex.sub( this.mesh.position );
      var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
      var collisionResults = ray.intersectObjects( otherPlayer.hitMeshes );
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
        this.hit();
      }
    }
  },

  death: function(){
    var position = this.head.matrixWorld;
    this.isAlive = false;
    // this.mesh.rotateX(90);
    // this.mesh.position(-5);
    var bleedInt = setInterval(function() {
      var b = new Physijs.SphereMesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0xFF1111 } ));
      b.position.setFromMatrixPosition( position );
      scene.add(b);
      b.translateOnAxis(new THREE.Vector3(0,0,0));
    }, 100);
    setTimeout( function(){
      clearInterval(bleedInt);
      scene.remove( b );
    }, 5000);
    this.head.position.setFromMatrixPosition( this.head.matrixWorld );
    this.nose.position.setFromMatrixPosition( this.nose.matrixWorld );
    this.hands.left.position.setFromMatrixPosition( this.hands.left.matrixWorld );
    this.hands.right.position.setFromMatrixPosition( this.hands.right.matrixWorld );
    this.feet.left.position.setFromMatrixPosition( this.feet.left.matrixWorld );
    this.feet.right.position.setFromMatrixPosition( this.feet.right.matrixWorld );
    scene.add(this.head);
    scene.add(this.nose);
    scene.add(this.hands.left);
    scene.add(this.hands.right);
    scene.add(this.feet.left);
    scene.add(this.feet.right);
    scene.remove(this.physicMesh);
  },

  useSheild: function(){
    var sheild = new Physijs.BoxMesh( new THREE.BoxGeometry(20,16,1), new THREE.MeshBasicMaterial({
      // map: THREE.ImageUtils.loadTexture( '<%= asset_path 'cloud.png' %>' ),
      // side: THREE.BackSide,
      color: 0x00FFFF, transparent: true, opacity: 0.2
    }), 0);
    sheild.position.setFromMatrixPosition( this.sheild.matrixWorld );
    sheild.rotation.setFromRotationMatrix( this.sheild.matrixWorld );
    // sheild.matrix.set(this.sheild.matrixWorld);
    var sheildInt = setInterval(function() {
      scene.add(sheild);
    }, 20);
    setTimeout( function(){
      clearInterval(sheildInt);
      scene.remove( sheild );
    }, 100);
  },

  won: function(){
    var _this = this;
    $.ajax({
      url: '/match',
      type: 'post',
      dataType: 'json',
      data: { p1name: p1name, p1color: p1color, p1won: p1.isAlive, p2name: p2name, p2color: p2color, p2won: p2.isAlive}
    }).done(function(data){
      var wonDiv = $("<div>").attr('id','winner').html( _this.playerName + " Won!<br><br>").css({ position:'absolute', height: '115px', bottom: '15px', background: 'rgba(255, 255, 255, 0.8)', width: '200px' , borderRadius: '25px', textAlign: 'center'}).css('left',window.innerWidth/2 -100);
      $("<a>").attr('href','#').attr('id','retry').html('Retry<br><br>').appendTo(wonDiv);
      $("<a>").attr('href','#').attr('id','menu').html('return to Menu').appendTo(wonDiv);
      wonDiv.appendTo("body");
      $("#menu").on('click',function(event){
        window.location.href = '/';
      });
      $("#retry").on('click',function(event){
        window.location.reload();
      });
    });
  }

});