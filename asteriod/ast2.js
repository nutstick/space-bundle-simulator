var camera;
var controls;
var scene;
var renderer;
var loadedObject;


setup();
animate();


function createNormalmapShaderMaterial(diffuseMap, normalMap)
{
    var shader = THREE.ShaderLib[ "normalmap" ];
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

    console.log("making shader");

    uniforms["uShininess"].value    = 150;
    uniforms["enableDiffuse"].value = true;
    uniforms["uDiffuseColor"].value.setHex(0xffffff);
    uniforms["tDiffuse"].value      = THREE.ImageUtils.loadTexture(diffuseMap);
    uniforms["tNormal"].value       = THREE.ImageUtils.loadTexture(normalMap);

    uniforms["uNormalScale" ].value.set(-1, -1);
    uniforms["uSpecularColor"].value.setHex(0xffffff);
    //uniforms["enableSpecular"].value = true;

    return new THREE.ShaderMaterial(
    {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        lights: true
    });
}


function setup()
{
    /*renderer = new THREE.WebGLRenderer({ antialias: false });*/
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 400;

    controls = new THREE.SmoothOrbitControls(camera);
    controls.smoothing = 0.9;
    controls.userRotateSpeed = 0.4;

    scene = new THREE.Scene();

    var material = createNormalmapShaderMaterial("asteroid_d.png", "asteroid_n.png");

    var loader = new THREE.OBJLoader();

    loader.load("asteroid.obj", addLoadedObjectToScene);

    function addLoadedObjectToScene(object, doFix)
    {
        loadedObject = object;

        for (var i = 0, l = object.children.length; i < l; i++)
        {
            var obj = object.children[i];

            obj.scale.set(100, 100, 100);
            obj.material = material;

            // Apply fix depending on global var
            if (doFixGeometry)
                fixNormalGeometry(obj.geometry);

            obj.geometry.computeTangents();
        }

        scene.add(object);
    }

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    scene.add(light);

    /*light = new THREE.DirectionalLight(0xff0000, 1);
    light.position.set(-1, 0, 0);
    scene.add(light);*/

    window.addEventListener('resize', updateViewport, false);

    function updateViewport()
    {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


function animate()
{
    if (loadedObject)
        loadedObject.rotation.z += 0.0025;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
