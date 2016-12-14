function fireball(scene){
  var start = Date.now();
  var geometry = new THREE.IcosahedronGeometry( 99, 6 );
  Texture.cloud.wrapS = Texture.cloud.wrapT = THREE.RepeatWrapping;
  Texture.lavatile.wrapS = Texture.lavatile.wrapT = THREE.RepeatWrapping;
  var material = new THREE.ShaderMaterial( {
    uniforms: {
        fogDensity: { type: "f", value: 0.45 },
        fogColor:   { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
        time: { // float initialized to 0
            type: "f",
            value: 0.0
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2( WIDTH, HEIGHT )
        },
        texture1: {
            type: "t",
            value: Texture.cloud
        },
        texture2: {
            type: "t",
            value: Texture.lavatile
        }
    },
    vertexShader: Shader.fireball.vertex,
    fragmentShader: Shader.fireball.fragment,
  } );

    // create a sphere and assign the material
  mesh = new THREE.Mesh(
      geometry,
      material
  );
  this.start = start;
  this.mesh = mesh;
  this.material = material;
  this.geometry = geometry;

  scene.add( mesh );

  return this;
}

fireball.prototype.animate = function(){
  var delta = 5 * clock.getDelta();

  this.material.uniforms[ 'time' ].value += 0.2 * delta;
}
