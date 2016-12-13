var WIDTH;
var HEIGHT;

var VIEW_ANGLE = 45/* 75 */;
var ASPECT;
var NEAR = 0.1;
var FAR = 20000;

var mouse = new THREE.Vector2();
var scene, camera, renderer, controls, raycaster;
var meshes = {};
var clock = new THREE.Clock();

var time = 0.0;

function onWindowResize( event ) {
  
  camera.aspect = $( '#container' ).innerWidth() / $( '#container' ).innerHeight();
  camera.updateProjectionMatrix();

  renderer.setSize( $( '#container' ).innerWidth(), $( '#container' ).innerHeight() );

}

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function init() {
  scene = new THREE.Scene();
  WIDTH = $( '#container' ).innerWidth();
  HEIGHT = $( '#container' ).innerHeight();
  ASPECT = WIDTH / HEIGHT;

  scene.background = Texture.cubemap;

  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);

  raycaster = new THREE.Raycaster();

  // Setup renderer
  if ( Detector.webgl )
    renderer = new THREE.WebGLRenderer({ antialiasing: true });
  else
    renderer = new THREE.CanvasRenderer();
  renderer.setSize( WIDTH, HEIGHT );

  container = $('#container');
  container.append( renderer.domElement );

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  // Setup Light
  var light = new THREE.PointLight( 0xffffff );
  light.position.set(6500, 0, 650);
	scene.add(light);

  // LarvaBall();
  // BlackholePlane();
  // meshes['cubemap'] = new Cubemap( scene );
  meshes['mars'] = new Mars( scene, light );

  // One frame rendering
  // renderer.render( scene, camera );
}

function animate() {

    requestAnimationFrame( animate );

    // update control
    meshes['mars'].animate();
    // meshes['cubemap'].animate();

    controls.update();

    renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );

window.addEventListener( 'resize', onWindowResize, false );