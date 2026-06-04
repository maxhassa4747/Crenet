// scene.js

const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles / Bubbles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 400;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles over a large area
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create a simple circular texture programmatically for the bubbles
const circleCanvas = document.createElement('canvas');
circleCanvas.width = 32;
circleCanvas.height = 32;
const ctx = circleCanvas.getContext('2d');
ctx.beginPath();
ctx.arc(16, 16, 14, 0, Math.PI * 2);
ctx.fillStyle = 'white';
ctx.fill();
const particleTexture = new THREE.CanvasTexture(circleCanvas);

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    map: particleTexture,
    transparent: true,
    opacity: 0.6,
    color: 0x9d2b82, // Purple tint matching brand
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse interaction for parallax effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Scroll interaction
let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Slowly rotate the particle system
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    
    // Animate individual particles to float up like effervescent bubbles
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 1; i < particlesCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.02 + 0.02; // Move up slowly
        if (positions[i] > 50) {
            positions[i] = -50; // Reset to bottom
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Parallax effect based on mouse and scroll
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
    
    // Move camera slightly based on scroll
    camera.position.y = -scrollY * 0.01;

    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
