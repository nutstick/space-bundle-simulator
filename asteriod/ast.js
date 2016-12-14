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
  camera.position.z = 5;
  camera.position.y = 5;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  //scene.add(new THREE.AmbientLight(0xaa9999));
  light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(5, 3, 5);
  scene.add(light);
  //sphere = createSphere(radius, segments);
  //scene.add(sphere);
  stars = createStars(90, 64);
  scene.add(stars);

  asteroidlist = createAsteroid();
  setTimeout(function () {
    for(var i = 0 ; i < 1 ; i++)
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
  for(var i = 0 ; i < 1 ; i++){
    asteroidlist[i].rotation.x += (0.2*(Math.PI / 180));
    asteroidlist[i].rotation.x %= 360;
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

function createStars(radius, segments) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('https://cdn.rawgit.com/bubblin/The-Solar-System/master/images/shared/galaxy_starfield.jpg'),
    side: THREE.BackSide
  }));
}

function createAsteroid(){
  var list = [];
  var mesh;
  var loader = new THREE.OBJLoader();
  for(var i = 0 ; i < 1 ; i++){
    loader.load('ast.obj',	function ( object ) {
      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          material = new THREE.MeshPhongMaterial({color: 0x616A6B, shading: THREE.SmoothShading});
          material.map = THREE.ImageUtils.loadTexture('asteroid.png');
          material.specularMap = THREE.ImageUtils.loadTexture('spec.jpg');
          material.normalMap = THREE.ImageUtils.loadTexture('normal.jpg');
          var geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );

          /*geometry.computeBoundingBox();

          var max = geometry.boundingBox.max,
          min = geometry.boundingBox.min;
          var offset = new THREE.Vector3(0 - min.x, 0 - min.y, 0 - min.z);
          var range = new THREE.Vector3(max.x - min.x, max.y - min.y, max.z - min.z);
          var faces = geometry.faces;
          geometry.computeFaceNormals();
          geometry.mergeVertices();
          geometry.faceVertexUvs[0] = [];

          for (var i = 0; i < faces.length ; i++) {
            var nx = Math.abs(geometry.faces[i].normal.x),
                ny = Math.abs(geometry.faces[i].normal.y),
                nz = Math.abs(geometry.faces[i].normal.z);

            var v1 = geometry.vertices[faces[i].a],
            v2 = geometry.vertices[faces[i].b],
            v3 = geometry.vertices[faces[i].c];

            if(nx >= ny && ny >= nz);
            geometry.faceVertexUvs[0].push([
              new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
              new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
              new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y),

            ]);
          }

          geometry.computeVertexNormals();

          geometry.uvsNeedUpdate = true;*/
          mesh = new THREE.Mesh(geometry,material);
          mesh.scale.set(0.01,0.01,0.01);
        }});
        list.push(mesh);
      });
    }
    return list;
  }
