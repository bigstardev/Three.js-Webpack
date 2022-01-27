
import '../sass/main.scss';
import $ from 'jquery'
import Scene3d from "./Scene";

window.addEventListener("DOMContentLoaded", (event) => {
    const canvas = document.getElementById("canvas");
    new Scene3d(canvas)
   
})


