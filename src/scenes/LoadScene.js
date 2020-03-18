import {CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD 
        })
    }

    init(){}

    preload()
    {
        this.load.image(
            'floor', './assets/map/floor.png');
        this.load.image(
            'chest', './assets/items/chest.png');
        this.load.image(
            'knife', './assets/items/knife.png');
        this.load.image(
            'background', './assets/map/background.png');
        this.load.atlas(
            'wizzard', './assets/chars/wizzard/wizzard_animation.png', './assets/chars/wizzard/wizzard_animation.json');
    }
    create()
    {
        this.scene.start(CST.SCENES.PLAY);
    }
}