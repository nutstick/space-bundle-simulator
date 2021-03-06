var container,
renderer,
scene,
camera,
light,
controls,
sphere,
rings,
asteroidlist = [];

window.addEventListener( 'load', function() {

  container = document.getElementById( "container" );
  THREE.ImageUtils.crossOrigin = '';
  var width = window.innerWidth,
  height = window.innerHeight;
  var radius = 0.45,
  segments = 32,
  rotation = 5;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 1000);
  camera.position.z = 3;
  camera.position.y = 1;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  //scene.add(new THREE.AmbientLight(0xaa9999));
  light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(5, 3, 5);
  scene.add(light);
  sphere = createSphere(radius, segments);
  scene.add(sphere);
  rings = createRings(radius, segments);

  scene.add(rings);
  stars = createStars(90, 64);
  scene.add(stars);

  asteroidlist = createAsteroid();
  setTimeout(function () {
    for(var i = 0 ; i < 300 ; i++)
      scene.add(asteroidlist[i])
  }, 2000);

  controls = new THREE.TrackballControls(camera);
  container.appendChild( renderer.domElement );

  setTimeout(function () {
    render();
  }, 2000);

} );

function render() {
  controls.update();
  sphere.rotation.y += 0.005;
  rings.rotation.y += 0.005;
  for(var i = 0 ; i < 300 ; i++){
      asteroidlist[i].rotation.y += (0.2*(Math.PI / 180));
      asteroidlist[i].rotation.y %= 360;
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function createSphere(radius, segments) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('saturnmap.jpg'),
    bumpScale: 0.05,
    specular: new THREE.Color('#000000')
  }));
}

function createRings(radius, segments) {
  return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('saturn-rings.png'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  }));
}

function createStars(radius, segments) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('https://cdn.rawgit.com/bubblin/The-Solar-System/master/images/shared/galaxy_starfield.jpg'),
    side: THREE.BackSide
  }));
}

function createAsteroid(){
  var list = [];
  var loader = new THREE.OBJLoader();
  for(var i = 0 ; i < 300 ; i++){
    var typast = Math.floor((Math.random(38) * 4) + 1);;
    loader.load('ast/'+ typast +'.txt',	function ( object ) {
      object.traverse( function ( child ) {
  						if ( child instanceof THREE.Mesh ) {
  							child.material.map = THREE.ImageUtils.loadTexture('asteroid_texture.jpg');
                var r = 0.58 + Math.random(50)*0.3;
                var x = Math.random(100)*r;
                var y = Math.sqrt(r*r-x*x);
                if(Math.random(70) < 0.5) x = -x;
                if(Math.random(30) < 0.5) y = -y;
                z = 0.015 + Math.random()*0.03;
                if(Math.random(99) < 0.5) z = -z;
                child.position.set(x,z,y);
                var size = Math.random(22) * 0.015;
                if(Math.random(101) < 0.5) size += 0.01
                child.scale.set(size,size,size);
            }});
        list.push(object);
    });
  }
  return list;
}
