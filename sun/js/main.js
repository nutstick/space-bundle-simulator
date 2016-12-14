var WIDTH;
var HEIGHT;

var VIEW_ANGLE = 45/* 75 */;
var ASPECT = WIDTH / HEIGHT;
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
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,0,250);
  scene.add(light);





  meshes['envmap'] = new EnvMap( scene );
	meshes['fireball'] = new fireball(scene);
	meshes['sun'] = new sun(scene);
  meshes['sprite'] = new sprite(scene);
	// meshes['cloud'] = new cloud();
	// var geometry = new THREE.SphereGeometry( 30, 0, 0 );
	// var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	// mesh = new THREE.Mesh( geometry, material );
	// mesh.position.set(0,0,0);
	// scene.add(mesh);
	// // use sprite because it appears the same from all angles
	// var spriteMaterial = new THREE.SpriteMaterial(
	// {
	// 	map: Texture.glow,
	// 	color: 0xffffff, blending: THREE.AdditiveBlending
	// });
	// var sprite = new THREE.Sprite( spriteMaterial );
	// sprite.scale.set(250, 250, 1.0);
	// mesh.add(sprite); // this centers the glow at the mesh
}

function animate() {

    requestAnimationFrame( animate );

    // update control
		meshes['sun'].animate();
		meshes['fireball'].animate();

    controls.update();

    renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );
