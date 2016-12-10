var timec = 3000*Math.random();
var radius = 0.0;
var beta, gamma, lookangle = 0.0;

var orbiting = 1;
var regime = 1.0;

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

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add( _mesh );

  return this;

}

BlackholePlane.prototype.animate = function () {
  radius = 10.0;// + 2.9 * Math.sin(timec * 0.0031);

  regime += 0.01 * (orbiting - regime);

  var beta_orb = 0.707 * 1.0 / Math.sqrt(radius - 1.0);
  var gamma_orb = 1. / Math.sqrt(1.0 - beta * beta);

  beta = regime * beta_orb;
  gamma = (1. - regime) + regime * gamma_orb;

  this.material.uniforms['time'].value = timec;
  this.material.uniforms['radius'].value = radius;
  this.material.uniforms['beta'].value = beta;
  this..material.uniforms['gamma'].value = gamma;

  timec += regime;
};
