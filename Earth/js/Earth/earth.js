
function Earth( scene, light ) {
  var radians = 23.5 * Math.PI / 180;
  this.time = 0;
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      THREE.UniformsLib['normalmap'],
      {
        lightPosition: { type: 'v3', value: light.position },
        textureMap: { type: 't', value: Texture.map },
        normalMap: { type: 't', value: Texture.normalmap }
      }
  );
  var _geometry = new THREE.SphereBufferGeometry( 140, 256, 256 );
  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.earth.vertex,
    fragmentShader: Shader.earth.fragment,
    lights: true,
    fog: false
  });

  var _mesh = new THREE.Mesh(_geometry, _material);

  _mesh.castShadow = true;
  _mesh.receiveShadow = true;
  THREE.BufferGeometryUtils.computeTangents( _mesh.geometry );
  
  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;
  this.mesh.rotation.z = -Math.sin(radians);

  scene.add(_mesh);

  return this;

}


Earth.prototype.animate = function () {
  /*
  var axis = new THREE.Vector3(0, 1, 0).normalize();
  this.mesh.rotateOnAxis(axis, 0.001);
  this.time += 0.05;
  */
  // // this.mesh.rotation.x += 0.01;
  // // this.mesh.rotation.y += 0.02;
  // // console.log(this);
  // this.radius = 10.0;// + 2.9 * Math.sin(timec * 0.0031);
  //
  // this.regime += 0.01 * (this.orbiting - this.regime);
  //
  // var beta_orb = 0.707 * 1.0 / Math.sqrt(this.radius - 1.0);
  // var gamma_orb = 1 / Math.sqrt(1.0 - this.beta * this.beta);
  //
  // this.beta = this.regime * beta_orb;
  // this.gamma = (1. - this.regime) + this.regime * gamma_orb;
  //
  // this.material.uniforms['time'].value = this.timec;
  // this.material.uniforms['radius'].value = this.radius;
  // this.material.uniforms['beta'].value = this.beta;
  // this.material.uniforms['gamma'].value = this.gamma;
  //
  // // material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  // this.timec += this.regime;

};
