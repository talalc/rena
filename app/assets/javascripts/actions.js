function p1jump(){
  var jumpinterval = setInterval(function() {
    cube.position.y += 1;
    p1pointer.position.set(cube.position.x + pad1.axes[0]*3, cube.position.y, cube.position.z + pad1.axes[1]*3);
  }, 100);
  setTimeout( function(){
    clearInterval(jumpinterval)
  }, 400);
}

function p1fall(){
  var fallinterval = setInterval(function() {
    cube.position.y -= 1;
    p1pointer.position.set(cube.position.x + pad1.axes[0]*3, cube.position.y, cube.position.z + pad1.axes[1]*3);
  }, 100);
  setTimeout( function(){
    clearInterval(fallinterval)
  }, 400);
}

function p1punch(){
  var matrix = new THREE.Matrix4();
  matrix.extractRotation( cube.matrix );
  var direction = new THREE.Vector3( 0, 0, 1 );
  direction.applyMatrix4( matrix );
  var p1punch = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) );
  p1punch.position.set(cube.position.x, cube.position.y, cube.position.z);
  scene.add( p1punch);
  var punchinterval = setInterval(function() {
    p1punch.translateOnAxis(direction, 5);
  }, 100);
  setTimeout( function(){
    clearInterval(punchinterval)
    scene.remove( p1punch );
  }, 1000);
}

function modelpunch(){
  var p1punch = new THREE.Mesh( new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) );
  p1punch.position.setFromMatrixPosition( c1.hands.left.matrixWorld );
  scene.add( p1punch);
  setTimeout( function(){
    scene.remove( p1punch );
  }, 1000);
}

function p1step1(){
  var step1 = setInterval(function() {
    c1.feet.left.position.z += 5;
    c1.feet.right.position.z -= 5;
  }, 100);
  setTimeout( function(){
    clearInterval(step1);
  }, 400);
}

function p1step2(){
  var step2 = setInterval(function() {
    c1.feet.left.position.z -= 5;
    c1.feet.right.position.z += 5;
  }, 100);
  setTimeout( function(){
    clearInterval(step2);
  }, 400);
}

// function modelpunch(){
//   var p1punch = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial( { color: 0x0000FF } ) );
//   p1punch.position.set( mesh.position.x -15 , mesh.position.y - 5, mesh.position.z-10);
//   scene.add( p1punch);
//   setTimeout( function(){
//     scene.remove( p1punch );
//   }, 1000);
// }