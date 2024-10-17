import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create dodecahedron
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);

// Create box
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);  // Use positional arguments for dimensions
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// Add light
const light = new THREE.SpotLight(0x9CDBA6, 100);
light.position.set(1, 1, 1);
scene.add(light);

// Create renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// Animation loop to render scene continuously
function animate() {
    requestAnimationFrame(animate);

    // Rotate objects
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    box.rotation.y += 0.01;

    // Update controls with damping
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

//for responsive oneu
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
