var Character = Backbone.Model.extend({
  // Class constructor
  initialize: function (args){
      // Set the different geometries composing the humanoid
      var head = new THREE.SphereGeometry(32, 8, 8),
          hand = new THREE.SphereGeometry(8, 4, 4),
          foot = new THREE.SphereGeometry(16, 4, 4, 0, Math.PI * 2, 0, Math.PI / 2),
          nose = new THREE.SphereGeometry(4, 4, 4),
          // Set the material, the "skin"
          material = new THREE.MeshLambertMaterial(args);
      // Set the character modelisation object
      this.mesh = new THREE.Object3D();
      this.mesh.position.y = 48;
      // Set and add its head
      this.head = new THREE.Mesh(head, material);
      this.head.position.y = 0;
      this.mesh.add(this.head);
      // Set and add its hands
      this.hands = {
          left: new THREE.Mesh(hand, material),
          right: new THREE.Mesh(hand, material)
      };
      this.hands.left.position.x = -40;
      this.hands.left.position.y = -8;
      this.hands.right.position.x = 40;
      this.hands.right.position.y = -8;
      this.mesh.add(this.hands.left);
      this.mesh.add(this.hands.right);
      // Set and add its feet
      this.feet = {
          left: new THREE.Mesh(foot, material),
          right: new THREE.Mesh(foot, material)
      };
      this.feet.left.position.x = -20;
      this.feet.left.position.y = -48;
      this.feet.left.rotation.y = Math.PI / 4;
      this.feet.right.position.x = 20;
      this.feet.right.position.y = -48;
      this.feet.right.rotation.y = Math.PI / 4;
      this.mesh.add(this.feet.left);
      this.mesh.add(this.feet.right);
      // Set and add its nose
      this.nose = new THREE.Mesh(nose, material);
      this.nose.position.y = 0;
      this.nose.position.z = 32;
      this.mesh.add(this.nose);
      // Set the vector of the current motion
      this.direction = new THREE.Vector3(0, 0, 0);
      // Set the current animation step
      this.step = 0;
      // Added Hp
      this.hp = 100;
  },
  walk: function(){
    this.step1();
    var _this = this;
    setTimeout(function(){
      _this.step2();
    }, 400);
  },
  jump: function(){
    var _this = this;
    var jumpinterval = setInterval(function() {
      _this.mesh.position.y += 1;
      // p1pointer.position.set(p1.mesh.position.x + pad1.axes[0]*15, p1.mesh.position.y, p1.mesh.position.z + pad1.axes[1]*15);
    }, 100, this);
    setTimeout( function(){
      clearInterval(jumpinterval)
    }, 400);
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
    var p1punch = new THREE.Mesh( new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) );
    p1punch.position.setFromMatrixPosition( p1.hands.left.matrixWorld );
    scene.add( p1punch);
    setTimeout( function(){
      scene.remove( p1punch );
    }, 1000);
  },

  punch2: function(){
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( p1.mesh.matrix );
    var direction = new THREE.Vector3( 0, 0, 1 );
    direction.applyMatrix4( matrix );
    var p1punch = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) );
    p1punch.position.set(p1.mesh.position.x, p1.mesh.position.y, p1.mesh.position.z);
    scene.add( p1punch);
    var punchinterval = setInterval(function() {
      p1punch.translateOnAxis(direction, 5);
    }, 100);
    setTimeout( function(){
      clearInterval(punchinterval)
      scene.remove( p1punch );
    }, 1000);
  },

  step1: function(){
    var _this = this;
    var step1 = setInterval(function() {
      _this.feet.left.position.z += 5;
      _this.feet.right.position.z -= 5;
    }, 100);
    setTimeout( function(){
      clearInterval(step1);
    }, 400);
  },

  step2: function(){
    var _this = this;
    var step2 = setInterval(function() {
      _this.feet.left.position.z -= 5;
      _this.feet.right.position.z += 5;
    }, 100);
    setTimeout( function(){
      clearInterval(step2);
    }, 400);
  }
});