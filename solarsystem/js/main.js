var WIDTH;
var HEIGHT;

var VIEW_ANGLE = 45/* 75 */;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 20000000;

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

  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
  camera.position.set(0, 2000000, 0);
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
  light.position.set(0, 100000, 0);
	scene.add(light);

  var packingObject	= new THREE.Object3D();
  scene.add( packingObject );

  meshes['env'] = new EnvMap( scene );
  meshes['SolarSystem'] = new SolarSystem( packingObject , light );
  // meshes['earth'] = new Earth( packingObject, light );
  // meshes['atmosphere'] = new Atmosphere( packingObject );
  // meshes['glow'] = new Glow( packingObject );

  // One frame rendering
  // renderer.render( scene, camera );
}

function animate() {

    requestAnimationFrame( animate );

    // update control
    // meshes['SolarSystem'].animate();
    // meshes['earth'].animate();

    controls.update();

    renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );
