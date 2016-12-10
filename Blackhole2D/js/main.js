var WIDTH = 800;
var HEIGHT = 600;

var VIEW_ANGLE = 45/* 75 */;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 10000;

var mouse = new THREE.Vector2();
var scene, camera, renderer, raycaster;
var meshes = {};
var clock = new THREE.Clock();

var time = 0.0;
var timec = 3000*Math.random();
var radius = 0.0;
var beta, gamma, lookangle = 0.0;

var orbiting = 1;
var regime = 1.0;

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function LarvaBall() {

  var _geometry = new THREE.IcosahedronGeometry( 20, 4 );
  var _material = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: 't',
        value: Texture.explosion
      },
      time: {
        type: "f",
        value: 0.0
      }
    },
    vertexShader: Shader.larva.vertex,
    fragmentShader: Shader.larva.fragment
  });

  var _mesh = new THREE.Mesh( _geometry, _material );
  meshes['larvaball'] = {
    mesh: _mesh,
    material: _material,
    geometry: _geometry
  };
  scene.add( _mesh );

}

function BlackholePlane() {

  Texture.background.wrapT = THREE.RepeatWrapping;
  Texture.background.wrapS = THREE.RepeatWrapping;
  Texture.background.repeat.set( 1, 1 );

  var _geometry = new THREE.PlaneBufferGeometry(WIDTH, HEIGHT);
  var _material = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: 0.0 },
      radius: { type: 'f', value: radius },
      beta: { type: 'f', value: beta },
      gamma: { type: 'f', value: 0.0 },
      resolution: { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) },
      viewrot: { type: 'f', value: 0.0 },
      shiftSampler: {
        type: 't',
        value: Texture.deflection
      },
      backgroudSampler: {
        type: 't',
        value:  Texture.background
      }
    },
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.blackhole.vertex,
    fragmentShader: Shader.blackhole.fragment
  });

  var _mesh = new THREE.Mesh( _geometry, _material );
  _mesh.position.set(0, 0, -100);

  meshes['blackhole'] = {
    mesh: _mesh,
    material: _material,
    geometry: _geometry
  };
  scene.add( _mesh );

}

function Sphere() {
  var _geometry = new THREE.SphereBufferGeometry( 20, 12, 12 );
  var _material = new THREE.MeshBasicMaterial({
    color: 0xeeaa00,
    wireframe: true
  });
  var _mesh = new THREE.Mesh( _geometry, _material );

  meshes['sphere'] = {
    mesh: _mesh,
    material: _material,
    geometry: _geometry
  };
  scene.add( _mesh );

}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
  camera.position.z = 100;
  camera.lookAt(scene.position);

  raycaster = new THREE.Raycaster();

  // Setup renderer
  //if ( Detector.webgl )
    renderer = new THREE.WebGLRenderer({ antialiasing: true });
  //else
  //renderer = new THREE.CanvasRenderer();
  renderer.setSize( WIDTH, HEIGHT );
  container = $('#container');
  container.append( renderer.domElement );

  // Setup Light
  // var light = new THREE.PointLight(0xffffff);
  // light.position.set(0,250,0);
  // scene.add(light);

  // LarvaBall();
  BlackholePlane();
  // Sphere();

  // var radian = Math.PI * 23.5 / 180;
  // meshes.sphere.mesh.rotation.z = -Math.sin(radian);

  // One frame rendering
  // renderer.render( scene, camera );
}

function animate() {

    requestAnimationFrame( animate );

    /* meshes.larvaball.mesh.rotation.x += 0.01;
    meshes.larvaball.mesh.rotation.y += 0.02;*/

    radius = 10.0;// + 2.9 * Math.sin(timec * 0.0031);

    regime += 0.01 * (orbiting - regime);

    var beta_orb = 0.707 * 1.0 / Math.sqrt(radius - 1.0);
    var gamma_orb = 1 / Math.sqrt(1.0 - beta * beta);

    beta = regime * beta_orb;
    gamma = (1. - regime) + regime * gamma_orb;

    meshes.blackhole.material.uniforms['time'].value = timec;
    meshes.blackhole.material.uniforms['radius'].value = radius;
    meshes.blackhole.material.uniforms['beta'].value = beta;
    meshes.blackhole.material.uniforms['gamma'].value = gamma;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    for ( var i = 0; i < intersects.length; i++ ) {
      // console.log(intersects[ i ].object.material.color);
  		intersects[ i ].object.material.color = 0xff0000 ;
  	}
    material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    timec += regime;

    /* var axisOfRotation = new THREE.Vector3( 0, 1, 0 ).normalize();
    var angleRotation = 0.05;

    var quaternion = new THREE.Quaternion().setFromAxisAngle( axisOfRotation, angleRotation );

    meshes.sphere.mesh.rotateOnAxis(axisOfRotation, angleRotation); */

    renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );
