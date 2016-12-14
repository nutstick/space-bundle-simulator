function sun( scene ){
  //this.delta = 0.1
  console.log(Shader.sun.fragment);
  var geometry = new THREE.IcosahedronGeometry( 99, 6 );
  var material  = new THREE.ShaderMaterial({
    uniforms: {
        sunmap: {
            type: "t",
            value: Texture.sunmap
        },
        opacity: {
            type: "f",
            value: 0.4
        },
        transparent: {
            type: "b",
            value: true
        },
        depthWrite: {
            type: "b",
            value: false
        }
    },
    vertexShader: Shader.sun.vertex,
    fragmentShader: Shader.sun.fragment,
    side: THREE.Doubleside
  })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.material.transparent = true;
  this.mesh = mesh;
  this.material = material;
  this.geometry = geometry;

  scene.add(mesh)
  return this;
}

sun.prototype.animate = function(){
  //onRenderFcts.push(function(delta, now){
  this.mesh.rotation.y  -= 1/32 * 0.05;
	//})s
}
// cloud.prototype.animate = function(){
//   this.mesh.rotation.y  += 1/16 * this.delta;
// }
