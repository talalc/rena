var Character = Backbone.Model.extend({
  // Class constructor
  initialize: function (args){
    // Set the different geometries composing the humanoid
    var head = new THREE.SphereGeometry(8, 8, 8),
        hand = new THREE.SphereGeometry(2, 4, 4),
        foot = new THREE.SphereGeometry(4, 4, 4, 0, Math.PI * 2, 0, Math.PI / 2),
        nose = new THREE.SphereGeometry(1, 4, 4),
        // Set the material, the "skin"
        material = new THREE.MeshLambertMaterial(args);
    this.args = args;
    // Set the character modelisation object
    this.mesh = new THREE.Object3D();
    this.mesh.position.y = 12;
    // Set and add its head
    this.head = new Physijs.SphereMesh(head, material);
    this.head.position.y = 0;
    this.mesh.add(this.head);
    // Set and add its hands
    this.hands = {
        left: new Physijs.SphereMesh(hand, material),
        right: new Physijs.SphereMesh(hand, material)
    };
    this.hands.left.position.x = -10;
    this.hands.left.position.y = -2;
    this.hands.right.position.x = 10;
    this.hands.right.position.y = -2;
    this.mesh.add(this.hands.left);
    this.mesh.add(this.hands.right);
    // Set and add its feet
    this.feet = {
        left: new Physijs.SphereMesh(foot, material),
        right: new Physijs.SphereMesh(foot, material)
    };
    this.feet.left.position.x = -5;
    this.feet.left.position.y = -12;
    this.feet.left.rotation.y = Math.PI / 4;
    this.feet.right.position.x = 5;
    this.feet.right.position.y = -12;
    this.feet.right.rotation.y = Math.PI / 4;
    this.mesh.add(this.feet.left);
    this.mesh.add(this.feet.right);
    // Set and add its nose
    this.nose = new Physijs.SphereMesh(nose, material);
    this.nose.position.y = 0;
    this.nose.position.z = 8;
    this.mesh.add(this.nose);
    // Set the vector of the current motion
    this.direction = new THREE.Vector3(0, 0, 0);
    // Set the current animation step
    this.step = 0;
    // Added Health Points
    this.hp = 1000;
    // Pointer to set rotation towards
    this.pointer = new THREE.Mesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5 } ) );
    this.pointer.position.set(this.mesh.position.x , this.mesh.position.y, this.mesh.position.z );
    scene.add(this.pointer);
    // Walking boolean
    this.isWalking = false;
    // Hit meshes array
    this.hitMeshes = [];
    // Physics
    this.physicMesh = new Physijs.SphereMesh(head, material);
    // Movement boolean
    this.canMove = true;
    // Direction
    this.direction = new THREE.Vector3(0,0,0);
  },
  control: function(){
    if ( Math.abs(this.pad.axes[0]) > 0.2 || Math.abs(this.pad.axes[1]) > 0.2 ){
      this.move(this.pad.axes[0],this.pad.axes[1]);
    } else {
      this.physicMesh.setLinearVelocity(new THREE.Vector3(0,-100,0));
    }
    if (this.pad.buttons[0] == 1 || this.pad.buttons[0].value == 1){
      this.jump();
      // var _this = this;
      // setTimeout(function(){
      //   _this.fall();
      // }, 400);
    }
    if (this.pad.buttons[2] == 1 || this.pad.buttons[2].value == 1){
      this.punch1();
    }
    if (this.pad.buttons[3] == 1 || this.pad.buttons[3].value == 1){
      this.punch2();
    }
  },
  move: function(deltaX, deltaZ){
    if (this.canMove){
      this.walk();
      this.direction.set(deltaX*50,-100,deltaZ*50);
      this.physicMesh.setLinearVelocity(this.direction);
      this.pointer.position.set(this.mesh.position.x + deltaX*15, this.mesh.position.y, this.mesh.position.z + deltaZ*15);
    }
  },
  walk: function(){
    if (!this.isWalking){
      this.isWalking = true;
      this.step1();
      var _this = this;
      setTimeout(function(){
        _this.step2();
        _this.isWalking = false;
      }, 400);
    }
  },
  jump: function(){
    this.physicMesh.setAngularVelocity(new THREE.Vector3(0,0,0));
    this.physicMesh.applyCentralImpulse(new THREE.Vector3(0,500000,0));
    // var _this = this;
    // var jumpinterval = setInterval(function() {
    //   _this.mesh.position.y += 1;
    //   // p1pointer.position.set(p1.mesh.position.x + pad1.axes[0]*15, p1.mesh.position.y, p1.mesh.position.z + pad1.axes[1]*15);
    // }, 100, this);
    // setTimeout( function(){
    //   clearInterval(jumpinterval)
    // }, 400);
  },

  fall: function(){
    var _this = this;
    var fallinterval = setInterval(function() {
      _this.mesh.position.y -= 1;
      // p1pointer.position.set(p1.mesh.position.x + pad1.axes[0]*15, p1.mesh.position.y, p1.mesh.position.z + pad1.axes[1]*15);
    }, 100);
    setTimeout( function(){
      clearInterval(fallinterval)
    }, 400);
  },

  punch1: function(){
    this.punchanim1();
    var punch1 = new THREE.Mesh( new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial(this.args) );
    punch1.position.setFromMatrixPosition( this.hands.left.matrixWorld );
    this.hitMeshes.push(punch1);
    scene.add( punch1);
    var _this = this;
    setTimeout(function(){
      _this.punchanim2();
      _this.hitMeshes.pop();
      scene.remove( punch1 );
    }, 800);
  },

  punch2: function(){
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( this.mesh.matrix );
    var direction = new THREE.Vector3( 0, 0, 1 );
    direction.applyMatrix4( matrix );
    var punch2 = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial(this.args) );
    punch2.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    this.hitMeshes.push(punch2);
    scene.add( punch2);
    var punchinterval = setInterval(function() {
      punch2.translateOnAxis(direction, 5);
    }, 100);
    var _this = this;
    setTimeout( function(){
      clearInterval(punchinterval);
      _this.hitMeshes.pop();
      scene.remove( punch2 );
    }, 1000);
  },

  step1: function(){
    var _this = this;
    var step1 = setInterval(function() {
      _this.feet.left.position.z += 2;
      _this.feet.right.position.z -= 2;
    }, 100);
    setTimeout( function(){
      clearInterval(step1);
    }, 400);
  },

  step2: function(){
    var _this = this;
    var step2 = setInterval(function() {
      _this.feet.left.position.z -= 2;
      _this.feet.right.position.z += 2;
    }, 100);
    setTimeout( function(){
      clearInterval(step2);
    }, 400);
  },

  punchanim1: function(){
    var _this = this;
    var step1 = setInterval(function() {
      _this.hands.left.position.z += 1.5;
    }, 100);
    setTimeout( function(){
      clearInterval(step1);
    }, 400);
  },

  punchanim2: function(){
    var _this = this;
    var step2 = setInterval(function() {
      _this.hands.left.position.z -= 1.5;
    }, 100);
    setTimeout( function(){
      clearInterval(step2);
    }, 400);
  },
  hit: function(){
    this.canMove = false;
    var _this = this;
    setTimeout( function(){
      _this.canMove = true;
    }, 1000);
    this.hp -= 0.5;
    // this.mesh.position.set(this.mesh.position.x,this.mesh.position.y, this.mesh.position.z);
    // var b = new Physijs.SphereMesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0xFF1111 } ));
    // b.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    // bl.push(b);
    // scene.add(b);
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
  }

});