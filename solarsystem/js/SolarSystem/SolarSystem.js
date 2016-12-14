var meshes = {};

function SolarSystem( scene, light ) {
  var Obj = new THREE.Object3D();
  var au = 10000;         // distance from Earth to Sun
  var eR=1000;            //Earth radius
  var MerR=0.3826*eR;     //Mercury radius
  var VenR=0.9485*eR;     //Venus radius
  var MarR=0.5326*eR;     //Mars radius
  var JupR=11.2*eR;       //Jupiter radius
  var SatR=9.13*eR;       //Saturn radius
  var UraR=3.976*eR;      //Uranus radius
  var NepR=3.88*eR;       //Neptune radius
  var MoonR=0.272*eR;     //Moon radius
  var SunR=109*eR;        //Sun radius

  meshes['fireball'] = new fireball(scene, SunR);
  meshes['sun'] = new sun(scene,SunR);
  meshes['sprite'] = new sun(scene,SunR);

  var pv1 = new THREE.Object3D();
  pv1.add(meshes['fireball'],meshes['sun'],meshes['sprite'])

  meshes['earth'] = new Earth( scene, light, eR);
  meshes['atmosphere'] = new Atmosphere( scene, eR);
  meshes['glow'] = new Glow( scene, eR);

  var pv2 = new THREE.Object3D();
  pv2.add(meshes['earth'],meshes['atmosphere'],meshes['glow']);

  meshes['mars'] = new Mars( scene, light );
  var pv3 = new THREE.Object3D();
  pv3.add(meshes['mars']);

  var _geometry = new THREE.SphereBufferGeometry( SunR, 256, 256 ); // Sun
  var _material = new THREE.MeshBasicMaterial( {
    color: 0xff0000,
    wireframe: true
  } );
  var _mesh = new THREE.Mesh( _geometry, _material );


  var _geometry2 = new THREE.SphereBufferGeometry( eR, 256, 256 ); // earth
  var _material2 = new THREE.MeshBasicMaterial( {
    color: 0x0000ff,
    wireframe: true
  } );
  _mesh2 = new THREE.Mesh( _geometry2, _material2 );

  var _geometry3 = new THREE.SphereBufferGeometry( MarR, 256, 256 ); // Mars
  var _material3 = new THREE.MeshBasicMaterial( {
    color: 0xeeaa00,
    wireframe: true
  } );
  _mesh3 = new THREE.Mesh( _geometry3, _material3 );

  var _geometry4 = new THREE.SphereBufferGeometry( MoonR, 256, 256 ); // Moon
  var _material4 = new THREE.MeshBasicMaterial( {
    color: 0x00aacc,
    wireframe: true
  } );
  _mesh4 = new THREE.Mesh( _geometry4, _material4 );

  var _geometry5 = new THREE.SphereBufferGeometry( SatR, 256, 256 ); // Saturn
  var _material5 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh5 = new THREE.Mesh( _geometry5, _material5 );

  var _geometry6 = new THREE.SphereBufferGeometry( MerR, 256, 256 ); // Mercury
  var _material6 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh6 = new THREE.Mesh( _geometry6, _material6 );

  var _geometry7 = new THREE.SphereBufferGeometry( VenR, 256, 256 ); // Venus
  var _material7 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh7 = new THREE.Mesh( _geometry7, _material7 );

  var _geometry8 = new THREE.SphereBufferGeometry( JupR, 256, 256 ); // Jupiter
  var _material8 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh8 = new THREE.Mesh( _geometry8, _material8 );

  var _geometry9 = new THREE.SphereBufferGeometry( UraR, 256, 256 ); // Uranus
  var _material9 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh9 = new THREE.Mesh( _geometry9, _material9 );

  var _geometry10 = new THREE.SphereBufferGeometry( NepR, 256, 256 ); // Neptune
  var _material10 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh10 = new THREE.Mesh( _geometry10, _material10 );

  Obj.position.set(0,0,0); //Blank object

  var pivot1 = new THREE.Object3D();
  var pivot2 = new THREE.Object3D();
  var pivot3 = new THREE.Object3D();
  var pivot4 = new THREE.Object3D();
  var pivot5 = new THREE.Object3D();
  var pivot6 = new THREE.Object3D();
  var pivot7 = new THREE.Object3D();
  var pivot8 = new THREE.Object3D();
  var pivot9 = new THREE.Object3D();
  var pivot10 = new THREE.Object3D();
  var radians = Math.PI / 180;

  this.p1 = pivot1;
  this.p2 = pivot2;
  this.p3 = pivot3;
  this.p4 = pivot4;
  this.p5 = pivot5;
  this.p6 = pivot6;
  this.p7 = pivot7;
  this.p8 = pivot8;
  this.p9 = pivot9;
  this.p10 = pivot10;

  this.mesh = _mesh;
  this.mesh2 = _mesh2;
  this.mesh3 = _mesh3;
  this.mesh4 = _mesh4;
  this.mesh5 = _mesh5;
  this.mesh6 = _mesh6;
  this.mesh7 = _mesh7;
  this.mesh8 = _mesh8;
  this.mesh9 = _mesh9;
  this.mesh10 = _mesh10;

  console.log(this.mesh2);
  console.log(pv2);
  meshes['earth'].mesh.position.set(au+eR+SunR,0,0);
  this.mesh.position.set(0,0,0);                     //set Sun position
  this.mesh2.position.set(au+eR+SunR,0,0);           //set Earth position
  this.mesh2.rotation.z=-Math.sin(23.5*radians);     //set Earth axis
  this.mesh3.position.set(1.5*au+MarR+SunR,0,0);     //set Mars position
  this.mesh5.rotation.z=-Math.sin(1.5424*radians);   //set Mars axis
  this.mesh4.position.set(0.16125*au+MoonR+eR,0,0);  //set Moon position
                                                     //based on Earth position (linked to the Earth)
  this.mesh5.position.set(9.5*au+SatR+SunR,0,0);     //set Saturn position
  this.mesh5.rotation.z=-Math.sin(26.7*radians);     //set Saturn axis
  this.mesh6.position.set(0.4*au+MerR+SunR,0,0);     //set Mercury position
  this.mesh6.rotation.z=-Math.sin(0.01*radians);     //set Mercury axis
  this.mesh7.position.set(0.7*au+VenR+SunR,0,0);     //set Venus position
  this.mesh7.rotation.z=-Math.sin(177.4*radians);    //set Venus axis
  this.mesh8.position.set(5.2*au+JupR+SunR,0,0);     //set Jupiter position
  this.mesh8.rotation.z=-Math.sin(3.13*radians);     //set Jupiter axis
  this.mesh9.position.set(19*au+UraR+SunR,0,0);      //set Uranus position
  this.mesh9.rotation.z=-Math.sin(97.77*radians);    //set Uranus axis
  this.mesh10.position.set(30*au+NepR+SunR,0,0);     //set Neptune position
  this.mesh10.rotation.z=-Math.sin(28.32*radians);   //set Neptune axis
  this.p4.position.set(               //set blank obj to earth position
    this.mesh2.position.x,
    this.mesh2.position.y,
    this.mesh2.position.z
  );

  pivot1.add(pv1);            //Sun link with pivot1.
  pivot2.add(pv2,pivot4);    //Earth and pivot4(Moon)
                                // link with pivot2 to rotate around Sun.
  pivot3.add(pv3);           //Mars link with pivot3  to rotate around Sun
  pivot4.add(_mesh4);           //Moon link with pivot4 to rotate around pivot4.
  pivot5.add(_mesh5);           //Saturn link with pivot5 to rotate around Sun.
  pivot6.add(_mesh6);           //Mercury link with pivot6  to rotate around Sun
  pivot7.add(_mesh7);           //Venus link with pivot7 to rotate around Sun.
  pivot8.add(_mesh8);           //Jupiter link with pivot8 to rotate around Sun.
  pivot9.add(_mesh9);           //Uranus link with pivot9  to rotate around Sun
  pivot10.add(_mesh10);         //Neptune link with pivot10 to rotate around Sun.

  Obj.add(pivot1,pivot2,pivot3,pivot5,pivot6,pivot7,pivot8,pivot9,pivot10);   //pack all pivot

  scene.add(Obj);
}

SolarSystem.prototype.animate = function () {
  var axis = new THREE.Vector3(0, 1, 0).normalize();
  var eT = 0.0002;
  this.p2.rotateOnAxis(axis,64.19*eT);       //Earth rotate around Sun.
  this.p3.rotateOnAxis(axis,52.11*eT);      //Mars rotate around Sun.
  this.p4.rotateOnAxis(axis,2.21*eT);        //Moon rotate around Earth.
  this.p5.rotateOnAxis(axis,20.82*eT);        //Saturn rotate around Sun.
  this.p6.rotateOnAxis(axis,103.6*eT);       //Mercury rotate around Sun.
  this.p7.rotateOnAxis(axis,-75.645*eT);      //Venus rotate around Sun.
  this.p8.rotateOnAxis(axis,28.204*eT);        //Jupiter rotate around Sun.
  this.p9.rotateOnAxis(axis,14.7*eT);        //Uranus rotate around Sun.
  this.p10.rotateOnAxis(axis,11.73*eT);       //Neptune rotate around Sun.

  this.mesh.rotateOnAxis(axis,0.0005);     //Sun rotate around itself.
  this.mesh2.rotateOnAxis(axis,eT);    //Earth rotate around itself.
  this.mesh3.rotateOnAxis(axis,eT*0.521);   //Mars rotate around itself.
  this.mesh4.rotateOnAxis(axis,2.21*eT);    //Moon rotate around itself.
  this.mesh5.rotateOnAxis(axis,eT*22.1);    //Saturn rotate around itself.
  this.mesh6.rotateOnAxis(axis,eT*0.00659);    //Mercury rotate around itself.
  this.mesh7.rotateOnAxis(axis,eT*0.0039);    //Venus rotate around itself.
  this.mesh8.rotateOnAxis(axis,eT*26.995);   //Jupiter rotate around itself.
  this.mesh9.rotateOnAxis(axis,eT*8.875);    //Uranus rotate around itself.
  this.mesh10.rotateOnAxis(axis,eT*5.83);   //Neptune rotate around itself.
}
