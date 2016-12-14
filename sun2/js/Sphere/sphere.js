function Sphere( scene ) {

  this.radius = 10.0;
  this.regime = 1.0;
  this.time = 0.0;
  this.timec = 0.0;
  this.beta = 0;
  this.gamma = 0;
  this.orbiting = 1;
  /* var prefix = "cubemap";
  var directions = ["Xpos", "Xneg", "Ypos", "Yneg", "Zpos", "Zneg"];
  var _cubemap = [];
  for (var i = 0; i < 6; i++) {
    _cubemap.push(Texture[ prefix + directions[i] ]);
  } */

  var _geometry = new THREE.IcosahedronGeometry( 100, 4 );
  _geometry.scale( - 1, 1, 1 );
  // var _geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
  var _material = new THREE.ShaderMaterial({
    uniforms: {
      cubemap: { type: 't', value: Texture.cubemap },
      shiftSampler: { type: 't', value: Texture.shiftSampler },
      envmap: { type: 't', value: Texture.envMap },

      time: { type: 'f', value: 0.0 },
      radius: { type: 'f', value: this.radius },
      beta: { type: 'f', value: this.beta },
      resolution: { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) },
      gamma: { type: 'f', value: 0.0 },
      viewrot: { type: 'f', value: 0.0 },
    },
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.blackhole.vertex,
    fragmentShader: Shader.blackhole.fragment,
  });
  // _material = new THREE.MeshBasicMaterial( { color: 0xffffff  } );
  var _mesh = new THREE.Mesh( _geometry, _material );

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add( _mesh );

  return this;

}


Sphere.prototype.animate = function () {
  // this.mesh.rotation.x += 0.01;
  // this.mesh.rotation.y += 0.02;
  // console.log(this);
  this.radius = 10.0;// + 2.9 * Math.sin(timec * 0.0031);

  this.regime += 0.01 * (this.orbiting - this.regime);

  var beta_orb = 0.707 * 1.0 / Math.sqrt(this.radius - 1.0);
  var gamma_orb = 1 / Math.sqrt(1.0 - this.beta * this.beta);

  this.beta = this.regime * beta_orb;
  this.gamma = (1. - this.regime) + this.regime * gamma_orb;

  this.material.uniforms['time'].value = this.timec;
  this.material.uniforms['radius'].value = this.radius;
  this.material.uniforms['beta'].value = this.beta;
  this.material.uniforms['gamma'].value = this.gamma;

  // material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  this.timec += this.regime;

};
