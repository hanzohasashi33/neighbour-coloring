import "./style/main.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRMLLoader } from "three/examples/jsm/loaders/VRMLLoader.js";
import * as dat from "dat.gui";

var camera, scene, renderer, stats, controls, loader;
var hemiLight, dirLight;
var gui;
var firstTime;
var vrmlScene;
var boxDiag;

const params = {
	asset: "example01",
};



const assets = [
	"example01",
	"comps-ecs01",
	"assm-ecs11",
	"part003-3",
	"part003-4",
	"mybox",
	"mybox2",
];

vrmlScene = new THREE.Object3D();

firstTime = 1;

init();
animate();

function init() {
	//camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1e10 );
	camera = new THREE.OrthographicCamera(
		-window.innerWidth / 2,
		window.innerWidth / 2,
		window.innerHeight / 2,
		-window.innerHeight / 2,
		0.1,
		1e10
	);
	camera.aspect = window.innerWidth / window.innerHeight;

	scene = new THREE.Scene();
	scene.add(camera);

	// light

	hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
	scene.add(hemiLight);

	dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
	scene.add(dirLight);

	loader = new VRMLLoader();
	loadAsset(params.asset);
	firstTime = 0;

	// renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// controls

	//controls = new OrbitControls( camera, renderer.domElement );
	//controls.minDistance = 1;
	//controls.maxDistance = 200;
	//controls.enableDamping = true;

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enableZoom = true;
	controls.update();

	

	//

	window.addEventListener("resize", onWindowResize);

	//

	gui = new dat.GUI();
	gui.add(params, "asset", assets).onChange(function (value) {
		if (firstTime == 0) {
			vrmlScene.traverse(function (object) {
				if (object.material) object.material.dispose();
				if (object.material && object.material.map)
					object.material.map.dispose();
				if (object.geometry) object.geometry.dispose();
			});

			scene.remove(vrmlScene);
			console.log("unloaded previous model");
		}

		loadAsset(value);
	});
}

function loadAsset(asset) {
	loader.load(
		"./" + asset + ".wrl",
		function (object) {
			var box = new THREE.Box3();

			var center = new THREE.Vector3();

			var worldPosition = new THREE.Vector3();

			vrmlScene = object;
			scene.add(vrmlScene);

			scene.traverse(function (node) {
				if (node.isMesh) {
					console.log("node isMesh");
					if (node.geometry) console.log("  node has geometry");
					if (node.material) console.log("  node has material");
				} else if (node.isMaterial) {
					console.log("node isMaterial");
				} else if (node.isLight) {
					console.log("node isLight");
					if (node.isDirectionalLight) {
						console.log("  node isDirectionalLight");
					} else if (node.isHemisphereLight) {
						console.log("  node isHemisphereLight");
					}
				} else if (node.isCamera) {
					console.log("node isCamera");
					if (node.isOrthographicCamera) {
						console.log("  node isOrthographicCamera");
					} else if (node.isPerspectiveCamera) {
						console.log("  node isPerspectiveCamera");
					}
				} else if (node.isBufferGeometry) {
					console.log("node isBufferGeometry");
				} else if (node.isObject3D) {
					console.log("node isObject3D");
				} else {
					console.log("node unidentified");
				}
			});

			box.setFromObject(vrmlScene);

			var boxDiagX = box.max.x - box.min.x;
			var boxDiagY = box.max.y - box.min.y;
			var boxDiagZ = box.max.z - box.min.z;

			boxDiag = Math.sqrt(
				boxDiagX * boxDiagX + boxDiagY * boxDiagY + boxDiagZ * boxDiagZ
			);

			center.x = box.min.x + boxDiagX / 2;
			center.y = box.min.y + boxDiagY / 2;
			center.z = box.min.z + boxDiagZ / 2;

			var cameraPosX = center.x;
			var cameraPosY = center.y;
			var cameraPosZ = center.z + 2 * boxDiag;

			var lightPosX = center.x - 0.5 * boxDiag;
			var lightPosY = center.y + 0.5 * boxDiag;
			var lightPosZ = center.z + 2 * boxDiag;

			camera.left = -boxDiag * camera.aspect;
			camera.right = boxDiag * camera.aspect;
			camera.top = boxDiag;
			camera.bottom = -boxDiag;
			camera.near = boxDiag * 0.25;
			camera.far = boxDiag * 5;

			camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
			camera.lookAt(center.x, center.y, center.z);

			//dirLight.position.copy( camera.position );
			dirLight.position.set(lightPosX, lightPosY, lightPosZ);
			dirLight.target.position.copy(camera.lookAt);

			controls.target.set(center.x, center.y, center.z);

			camera.updateProjectionMatrix();

			//controls.reset();
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		},
		function (error) {
			console.log("An error happened");
		}
	);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.left = -boxDiag * camera.aspect;
	camera.right = boxDiag * camera.aspect;
	camera.top = boxDiag;
	camera.bottom = -boxDiag;
	camera.near = boxDiag * 0.25;
	camera.far = boxDiag * 5;

	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);

	controls.update(); // to support damping

	renderer.render(scene, camera);

}
