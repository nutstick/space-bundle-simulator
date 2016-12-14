var meshes = {};

function SolarSystem( scene, light ) {
  var au = 1000;         // distance from Earth to Sun
  var eR = 120;            //Earth radius
  var MerR=0.3826*eR;     //Mercury radius
  var VenR=0.9485*eR;     //Venus radius
  var MarR=0.5326*eR;     //Mars radius
  var JupR=11.2*eR;       //Jupiter radius
  var SatR=9.13*eR;       //Saturn radius
  var UraR=3.976*eR;      //Uranus radius
  var NepR=3.88*eR;       //Neptune radius
  var MoonR=0.272*eR;     //Moon radius
  var SunR=42*eR;        //Sun radius

  var SunObj = new THREE.Object3D();

  meshes['fireball'] = new fireball(SunObj, SunR);
  meshes['sun'] = new sun(SunObj,SunR);
  meshes['sprite'] = new sun(SunObj,SunR);
  meshes['SunObj'] = SunObj;

  scene.add(SunObj);

  // pv1.add(meshes['fireball'],meshes['sun'],meshes['sprite'])

  var EarthObj = new THREE.Object3D();

  meshes['earth'] = new Earth( EarthObj, light, eR);
  meshes['atmosphere'] = new Atmosphere( EarthObj, eR);
  meshes['glow'] = new Glow( EarthObj, eR);
  meshes['EarthObj'] = EarthObj;

  scene.add(EarthObj);

  // pv2.add(meshes['earth'],meshes['atmosphere'],meshes['glow']);

  var MarsObj = new THREE.Object3D();
  meshes['mars'] = new Mars( MarsObj, light, MarR );
  meshes['MarsObj'] = MarsObj;
  
  
  scene.add(MarsObj);

  var VenusObj = new THREE.Object3D();
  meshes['venus'] = new venus( VenusObj, light, VenR );
  meshes['VenusObj'] = VenusObj;
  
  scene.add(VenusObj);

  /*
  var _geometry4 = new THREE.SphereBufferGeometry( MoonR, 256, 256 ); // Moon
  var _material4 = new THREE.MeshBasicMaterial( {
    color: 0x00aacc,
    wireframe: true
  } );
  _mesh4 = new THREE.Mesh( _geometry4, _material4 );
  */
  var _geometry5 = new THREE.SphereBufferGeometry( SatR, 256, 256 ); // Saturn
  var _material5 = new THREE.MeshBasicMaterial( {
    color: 0xcc00dd,
    wireframe: true
  } );
  _mesh5 = new THREE.Mesh( _geometry5, _material5 );
  /*
  var VenusObj = new THREE.Object3D();
  meshes['venus'] = new venus( VenusObj, light, VenR );
  meshes['VenusObj'] = VenusObj;
  */
  
  scene.add(MarsObj);

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
  _mesh10 = new THREE.Mesh( _geometry10, _material10 );*/

  // Obj.position.set(0,0,0); //Blank object

  var radians = Math.PI / 180;

  this.p1 = SunObj;
  this.p2 = EarthObj;
  this.p3 = MarsObj;
  /*this.p4 = pivot4;
  this.p5 = pivot5;
  this.p6 = pivot6;
  this.p7 = pivot7;
  this.p8 = pivot8;
  this.p9 = pivot9;
  this.p10 = pivot10;*/

  /*
  this.mesh2 = _mesh2;
  this.mesh3 = _mesh3;
  this.mesh4 = _mesh4;
  this.mesh5 = _mesh5;
  this.mesh6 = _mesh6;
  this.mesh7 = _mesh7;
  this.mesh8 = _mesh8;
  this.mesh9 = _mesh9;
  this.mesh10 = _mesh10;
  */
  meshes['SunObj'].position.set(0,0,0);                     //set Sun position
  meshes['EarthObj'].position.set(au+eR+SunR,0,0);           //set Earth position
  meshes['EarthObj'].rotation.z=-Math.sin(23.5*radians);     //set Earth axis
  meshes['MarsObj'].position.set(1.5*au+MarR+SunR,0,0);     //set Mars position
  meshes['MarsObj'].rotation.z=-Math.sin(1.5424*radians);   //set Mars axis
  //this.mesh4.position.set(0.16125*au+MoonR+eR,0,0);  //set Moon position
                                                     //based on Earth position (linked to the Earth)
  meshes['SaturnObj'].position.set(9.5*au+SatR+SunR,0,0);     //set Saturn position
  meshes['SaturnObj'].rotation.z=-Math.sin(26.7*radians);     //set Saturn axis
  meshes['MercuryObj'].position.set(0.4*au+MerR+SunR,0,0);     //set Mercury position
  meshes['MercuryObj'].rotation.z=-Math.sin(0.01*radians);     //set Mercury axis
  meshes['VenusObj'].position.set(0.7*au+VenR+SunR,0,0);     //set Venus position
  meshes['VenusObj'].rotation.z=-Math.sin(177.4*radians);    //set Venus axis
  meshes['JupiterObj'].position.set(5.2*au+JupR+SunR,0,0);     //set Jupiter position
  meshes['JupiterObj'].rotation.z=-Math.sin(3.13*radians);     //set Jupiter axis
  meshes['UranusObj'].position.set(19*au+UraR+SunR,0,0);      //set Uranus position
  meshes['UranusObj'].rotation.z=-Math.sin(97.77*radians);    //set Uranus axis
  meshes['NeptuneObj'].position.set(30*au+NepR+SunR,0,0);     //set Neptune position
  meshes['NeptuneObj'].rotation.z=-Math.sin(28.32*radians);   //set Neptune axis
}

SolarSystem.prototype.animate = function () {
  /*var axis = new THREE.Vector3(0, 1, 0).normalize();
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

  // this.mesh.rotateOnAxis(axis,0.0005);     //Sun rotate around itself.
  this.mesh2.rotateOnAxis(axis,eT);    //Earth rotate around itself.
  this.mesh3.rotateOnAxis(axis,eT*0.521);   //Mars rotate around itself.
  this.mesh4.rotateOnAxis(axis,2.21*eT);    //Moon rotate around itself.
  this.mesh5.rotateOnAxis(axis,eT*22.1);    //Saturn rotate around itself.
  this.mesh6.rotateOnAxis(axis,eT*0.00659);    //Mercury rotate around itself.
  this.mesh7.rotateOnAxis(axis,eT*0.0039);    //Venus rotate around itself.
  this.mesh8.rotateOnAxis(axis,eT*26.995);   //Jupiter rotate around itself.
  this.mesh9.rotateOnAxis(axis,eT*8.875);    //Uranus rotate around itself.
  this.mesh10.rotateOnAxis(axis,eT*5.83);   //Neptune rotate around itself.*/
}
