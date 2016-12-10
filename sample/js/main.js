"use strict"
/*global THREE, SHADER_LOADER, Mustache, Stats, Detector, $, dat:false */
/*global document, window, setTimeout, requestAnimationFrame:false */
/*global ProceduralTextures:false */

// set the scene size
var WIDTH = 400;
var HEIGHT = 300;
// set some camera attributes
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 1000;

var scene, renderer, camera, cameraControls, shader = null;
var observer = new Observer();

// loading vertex and fragment
var vertexShaders = $('script[type="x-shader/x-vertex"]');
var fragmentShaders     = $('script[type="x-shader/x-fragment"]');
var shadersLoaderCount  = vertexShaders.length + fragmentShaders.length;
var shadersHolder = { vertex: '', fragment: '' };

function loadShader (shader, type) {
  var $shader = $(shader);

  $.ajax({
    url: $shader.data('src'),
    dataType: 'text',
    context: {
      name: $shader.data('name'),
      type: type
    },
    complete: processShader
  });
}

function processShader (jqXHR, textStatus ) {
    shadersLoaderCount--;
    shadersHolder[this.type] = jqXHR.responseText;

    if (!shadersLoaderCount) {
        shadersLoadComplete();
    }
}

function shadersLoadComplete () {
    init();
}

function init (texture) {
  container = $('#container');

  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
  );
  scene = new THREE.Scene();

  camera.position.z = 300;

  renderer.setSize(WIDTH, HEIGHT);

  $container.append(renderer.domElement);

  var meterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
  })

  scene.updateShader = function () {
    meterial.fragmentShader = shader.compile();
    meterial.vertexShader = shader.compile();
    material.needUpdate = true;
    shader.needUpdate = true;
  }

  scene.updateShader();

  // set up the sphere vars
  var radius = 50, segments = 16, rings = 16;

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    shaderMaterial
  );

  scene.add(sphere);
  scene.add(camera);

  renderer.render(scene, camera);
}