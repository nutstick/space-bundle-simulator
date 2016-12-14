function Sphere( scene ) {

  this.radius = 10.0;

  var _geometry = new THREE.IcosahedronGeometry( 600, 4 );
  var _material = new THREE.ShaderMaterial({
    uniforms: {
      shiftSampler: { type: 't', value: Texture.shiftSampler },
      envmap: { type: 't', value: Texture.envMap },

      time: { type: 'f', value: 0.0 },
      radius: { type: 'f', value: this.radius },
      resolution: { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) },
      viewrot: { type: 'f', value: 0.0 },
    },
    defines: {
      M_PI: Math.PI
    },
    side: THREE.BackSide,
    vertexShader: Shader.blackhole.vertex,
    fragmentShader: Shader.blackhole.fragment,
  });
  
  var _mesh = new THREE.Mesh( _geometry, _material );

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add( _mesh );

  return this;

}


Sphere.prototype.animate = function () {
  // this.material.uniforms['resolution'].value = new THREE.Vector2(WIDTH, HEIGHT);
};
