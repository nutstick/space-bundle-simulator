
function Atmosphere( scene ) {
  var radians = 23.5 * Math.PI / 180;
  this.time = 0;
  var uniforms = {
    coeficient	: { type	: "f", value	: 0.8 },
    power		: { type	: "f", value	: 2 },
    glowColor	: { type	: "c", value	: new THREE.Color( 0x00b3ff ) }
  };
  var _geometry = new THREE.IcosahedronGeometry( 140, 4 );
  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.atmosphere.vertex,
    fragmentShader: Shader.atmosphere.fragment,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: true
  });

  var _mesh = new THREE.Mesh(_geometry, _material);
  _mesh.scale.multiplyScalar(1.01);

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add(_mesh);

  return this;

}


Atmosphere.prototype.animate = function () {
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
