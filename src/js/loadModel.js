import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader";

export function loadModel(callback) {
    new GLTFLoader().load("src/model/ShipPrecinct_SceneV1.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.2, 0.2, 0.2)
        callback(model);

    });

}
