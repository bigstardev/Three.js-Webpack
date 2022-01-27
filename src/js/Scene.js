import * as THREE from "three";
import $ from 'jquery'
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls";
import gsap from "gsap"
import { loadModel } from "./loadModel";
import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader';

export default class Scene3d {
    constructor(canvas) {

        
        this.startApp(canvas)
    }
    startApp(canvas) {

     
        this.intersection = null
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight("#f2ead0", 0.8));
        this.renderer = new THREE.WebGLRenderer({
            // canvas: canvas,
            antialias: true,
            alpha: true,
        });
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        new RGBELoader()

            .setDataType(THREE.UnsignedByteType)
            .setPath('src/textures/')
            .load('venice_sunset_1k.hdr', (texture) => {
                const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                this.scene.background = new THREE.Color("#1b042e");
                this.scene.environment = envMap;
                texture.dispose();
                pmremGenerator.dispose();

                loadModel((model) => {
                    this.scene.add(model);
                    


                });
            })

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(44,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        );
        this.camera.position.set(0, 130, 0);

        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
      
        this.orbit.maxPolarAngle = Math.PI / 2;
        this.mouse = new THREE.Vector2();
      

        // ENTER OFFICES,SHED
      
        this.rayCaster = new THREE.Raycaster()
        window.addEventListener("resize", (e) => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })
       
        this.render();




    }

    render() {

        this.renderer.render(this.scene, this.camera);
        this.orbit.update();
        requestAnimationFrame(() => {
            this.render();
        });
       


    };

    onPointerMove(event) {

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }


    
    ggg(rayCaster, mouse) {

        rayCaster.setFromCamera(mouse, this.camera)
        const intersects = rayCaster.intersectObjects(this.scene.children, true)
        console.log("intersection", intersects[0].point)
        console.log("camera", this.camera.position)
    }
    
    
    

}