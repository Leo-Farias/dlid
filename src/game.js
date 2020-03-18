/** @type {import("../typings/phaser")} */
import {LoadScene} from "./scenes/LoadScene";
import {PlayScene} from "./scenes/PlayScene"; 

var game = new Phaser.Game({
    width: 800,
    height: 600,
    physics:{
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [LoadScene, PlayScene],
    render:{
        pixelArt: true
    }
});