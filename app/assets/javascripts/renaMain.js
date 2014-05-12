var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

$("body").append( renderer.domElement );

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

scene.add( cube );

camera.position.z = 5;
camera.position.y = 5;
camera.position.set( 100, 100, 100 );
camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

scene.add(new THREE.AxisHelper(100));
scene.add(new THREE.GridHelper(100,10));

cube.scale.set(4,4,4);

var p1pointer = new THREE.Mesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
p1pointer.position.set(cube.position.x , cube.position.y, cube.position.z );
scene.add( p1pointer);

var p1vector = new THREE.Vector3( 0, 0, 0 );

function p1jump(){
  var jumpinterval = setInterval(function() {
    cube.position.y += 1;
    p1pointer.position.set(cube.position.x + pad1.axes[0]*3 + pad1.axes[1]*3, cube.position.y, cube.position.z - pad1.axes[0]*3 + pad1.axes[1]*3);
  }, 100);
  setTimeout( function(){
    clearInterval(jumpinterval)
  }, 400);
}
function p1fall(){
  var fallinterval = setInterval(function() {
    cube.position.y -= 1;
    p1pointer.position.set(cube.position.x + pad1.axes[0]*3 + pad1.axes[1]*3, cube.position.y, cube.position.z - pad1.axes[0]*3 + pad1.axes[1]*3);
  }, 100);
  setTimeout( function(){
    clearInterval(fallinterval)
  }, 400);
}
function p1punch(){
  var p1punch = new THREE.Mesh( new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial( { color: 0x0000FF } ) );
  p1punch.position.set(cube.position.x, cube.position.y, cube.position.z);
  scene.add( p1punch);
  var punchinterval = setInterval(function() {
    p1punch.translateOnAxis(p1vector, 5);
  }, 100);
  setTimeout( function(){
    clearInterval(punchinterval)
    scene.remove( p1punch );
  }, 1000);
}

// function modelpunch(){
//   var p1punch = new THREE.Mesh( new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial( { color: 0x0000FF } ) );
//   p1punch.position.set( mesh.position.x -15 , mesh.position.y - 5, mesh.position.z-10);
//   scene.add( p1punch);
//   setTimeout( function(){
//     scene.remove( p1punch );
//   }, 1000);
// }


// var loader = new THREE.JSONLoader();
// loader.load('models/fleur.js', function(geometry2){
//   mesh = new THREE.Mesh(geometry2);
//   mesh.scale.set(1,1,1);
//   mesh.position.y= 50;
//   scene.add(mesh);
// });



function render() {
  camera.lookAt( cube.position );
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cube.lookAt(p1pointer.position);
  var isChromium = window.chrome,
    vendorName = window.navigator.vendor;
  if (isChromium !== null && vendorName === "Google Inc.") {
    // chrome
    gamepads = navigator.webkitGetGamepads();
  } else {
    // firefox
    gamepads = navigator.getGamepads();
  }
  if (gamepads.length > 0){
    pad1 = gamepads[0];
    // dpad
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
    if (pad1.axes[0] > 0.2 || pad1.axes[0] < -0.2 ){
      cube.position.x += pad1.axes[0];
      cube.position.z -= pad1.axes[0];
      p1pointer.position.set(cube.position.x + pad1.axes[0]*3 + pad1.axes[1]*3, cube.position.y, cube.position.z - pad1.axes[0]*3 + pad1.axes[1]*3);
      p1vector.set( pad1.axes[0] + pad1.axes[1], 0, pad1.axes[1] - pad1.axes[0] );
    }
    if (pad1.axes[1] > 0.2 || pad1.axes[1] < -0.2 ){
      cube.position.x += pad1.axes[1];
      cube.position.z += pad1.axes[1];
      p1pointer.position.set(cube.position.x + pad1.axes[0]*3 + pad1.axes[1]*3, cube.position.y, cube.position.z - pad1.axes[0]*3 + pad1.axes[1]*3);
      p1vector.set( pad1.axes[0] + pad1.axes[1], 0, pad1.axes[0] + pad1.axes[1] );
    }
    if (pad1.buttons[0] == 1 || pad1.buttons[0].value == 1){
      p1jump();
      setTimeout(function(){
        p1fall();
      }, 400);
    }
    if (pad1.buttons[2] == 1 || pad1.buttons[2].value == 1){
      p1punch();
      // modelpunch();
    }
  }

}
// movement forward
// KeyboardJS.on('w, up', function(event){
//   cube.position.x += 1;

// });

// movement right
// KeyboardJS.on('s, down', function(event){
//   cube.position.x += 0.5;
//   cube.position.z += 0.5;
// });
// // movement left
// KeyboardJS.on('d, right', function(event){
//   cube.position.x += 0.5;
//   cube.position.z -= 0.5;
// });
// // movement right
// KeyboardJS.on('a, left', function(event){
//   cube.position.x -= 0.5;
//   cube.position.z += 0.5;
// });

$(document).ready(function(){
  render();
});
