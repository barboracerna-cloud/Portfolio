import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// 1. Vytvoření scény a kamery
const scene = new THREE.Scene();
const container = document.getElementById('container3D');
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

// Kamera je posunutá pro obsáhnutí všech tří kostek
camera.position.z = 150;

// Globální proměnné pro ovládání
let controls;

// 2. Inicializace rendereru
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 3. Aktivace OrbitControls (ovládání myší na kliknutí a tažení)
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 4. Načtení 3D modelu a jeho rozmístění
const loader = new GLTFLoader();
loader.load(
    './kostka.glb', // Kostka umístěná vedle index.html
    function (gltf) {
        const baseCube = gltf.scene;

        // Nastavení měřítka z Blenderu
        baseCube.scale.set(30, 30, 30);

        // --- STŘEDOVÁ KOSTKA ---
        const cube1 = baseCube;
        cube1.position.set(0, 0, 0);
        scene.add(cube1);

        console.log("Kostka byla úspěšně načtena a rozmístěna!");
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error("Chyba při načítání modelu:", error);
    }
);

// 5. Osvětlení scény
// DirectionalLight funguje jako slunce (paralelní paprsky), pozice určuje směr, odkud svítí
const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(100, 100, 100);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 6. Animační smyčka (vykreslování)
function animate() {
    requestAnimationFrame(animate);

    // Aktualizace OrbitControls pro plynulý pohyb
    if (controls) {
        controls.update();
    }

    renderer.render(scene, camera);
}

// 7. Responzivita při změně velikosti okna prohlížeče
window.addEventListener("resize", function () {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Spuštění celé aplikace
animate();
