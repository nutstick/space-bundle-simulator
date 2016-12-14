function EnvMap(scene) {

  var _geometry = new THREE.IcosahedronGeometry( 8000, 2 );
  var _material = new THREE.ShaderMaterial({
    uniforms: {
      envmap: { type: 't', value: Texture.envMap },
    },
    defines: {
      M_PI: Math.PI
    },
    side: THREE.BackSide,
    vertexShader: Shader.envmap.vertex,
    fragmentShader: Shader.envmap.fragment,
  });
  var _mesh = new THREE.Mesh( _geometry, _material );

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add( _mesh );

  return this;

}

EnvMap.prototype.animate = function () {};
