import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CubeRoom } from '../Cube.js';

export class Scene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.cubeRoom = null;
        this.character = null;
        this.animationState = {
            walkProgress: 0,
            walkSpeed: 0.01
        };

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();
        this.setupCubeRoom();
        this.setupCharacter();
        this.setupEventListeners();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        this.camera.position.set(8, 6, 8);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 30;
        this.controls.enableZoom = true;
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }

    setupCubeRoom() {
        // Create cube room with transparent walls
        this.cubeRoom = new CubeRoom({
            size: 10,
            wallOpacity: 0.2,
            wallColor: 0x808080,
            floorColor: 0x606060
        });

        this.scene.add(this.cubeRoom.getGroup());
    }

    setupCharacter() {
        this.character = this.createCharacter();
        this.character.position.set(-3, -4, 0);
        this.scene.add(this.character);
    }

    createCharacter() {
        const characterGroup = new THREE.Group();

        // Body (capsule)
        const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4466ff });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        characterGroup.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.9;
        head.castShadow = true;
        characterGroup.add(head);

        return characterGroup;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.updateCharacterAnimation();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    updateCharacterAnimation() {
        // Walk across room (left to right)
        if (this.animationState.walkProgress < 1) {
            this.animationState.walkProgress += this.animationState.walkSpeed;

            // Move from x=-3 to x=3
            this.character.position.x = -3 + (this.animationState.walkProgress * 6);

            // Walking bob animation
            const bobAmount = 0.1;
            this.character.position.y = -4 + Math.abs(Math.sin(this.animationState.walkProgress * 50)) * bobAmount;

            // Slight rotation bob
            this.character.rotation.z = Math.sin(this.animationState.walkProgress * 50) * 0.05;
        }
    }

    start() {
        this.animate();
    }
}
