import {CST} from "../CST";

var Math = Phaser.Math;

export class PlayScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAY 
        })
    }
    
    loadAnimation(name, referenceKey, prefix, startAt, endAt)
    {
        this.anims.create({
            key: name,
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames(referenceKey, {
                prefix: prefix,
                suffix: ".png",
                start: startAt,
                end: endAt
            })
        });
    }

    preload()
    {
        //  --- ANIMATIONS ---  //

        // Idlethis.facing left
        this.loadAnimation('wizzard_idle_l', 'wizzard', 'wizzard_f_idle_left_0', 1, 4);
        // Idlethis.facing right
        this.loadAnimation('wizzard_idle_r', 'wizzard', 'wizzard_f_idle_right_0', 1, 4);
        // Runthis.facing left
        this.loadAnimation('wizzard_run_l', 'wizzard', 'wizzard_f_run_left_0', 1, 4);
        // Runthis.facing right
        this.loadAnimation('wizzard_run_r', 'wizzard', 'wizzard_f_run_right_0', 1, 4);

        //  --- END OF ANIMATIONS ---  //
    }

    create()
    {
        this.facing = "right";
        this.spawned = false;

        this.floor = this.physics.add.staticGroup();
        this.floor.create(0, 565, 'floor').setScale(8, 1.3).refreshBody();

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        
        this.score = 0;
        this.scoreText = this.add.text((this.game.renderer.width / 2) -50 , 50, "Score: 0");

        this.player = this.physics.add.sprite(Math.Between(20, 780), 520, "wizzard", "wizzard_f_idle_right_01.png").setScale(2);
        this.player.setCollideWorldBounds(true);

        this.knives = this.physics.add.group();

        this.chests = this.physics.add.group();
        if (this.player.x < 400)
        {
            this.chest = this.chests.create(Math.Between(20, 400), 50, "chest");
        } 
        else
        {
            this.chest = this.chests.create(Math.Between(400, 780), 50, "chest");
        }

        this.chest.setCollideWorldBounds(true);
        this.chest.setGravity(this.chest.body.velocity.x, -200);
        this.chest.setBounce(1);


        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.knives, this.floor);
        this.physics.add.collider(this.player, this.chests, this.touchChest, null, this);
        this.physics.add.collider(this.player, this.knives, this.touchKnife, null, this);
        this.physics.add.collider(this.chests, this.floor, this.chestTouchFloor, null, this);
        

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        //  HORIZONTAL MOVIMENT
        if(this.cursors.left.isDown)
        {
            this.player.setVelocityX(-180);
            this.player.anims.play("wizzard_run_l", true);
            this.facing = "left";
        }
        else if(this.cursors.right.isDown)
        {
            this.player.setVelocityX(180);
            this.player.anims.play("wizzard_run_r", true);
            this.facing = "right";
        }
        else
        {
            this.player.setVelocityX(0);
            if (this.facing === "left") this.player.anims.play("wizzard_idle_l", true);
            else this.player.anims.play("wizzard_idle_r", true);
        }
        //  VERTICAL MOVIMENT
        if (this.cursors.up.isDown && this.player.body.touching.down) this.player.setVelocityY(-200);

        if (this.score % 5 == 0 && this.score != 0 && !this.spawned) 
        {
            this.spawnKnives();
            this.spawned = true;
        }

        if (this.score % 5 != 0 || this.score == 0)
        {
            this.spawned = false;
        }

    }

    touchChest(player, chest)
    {
        if (player.x > chest.x) chest.setVelocity(-200, -250 + (player.body.velocity.y - 140));
        else if (player.x < chest.x) chest.setVelocity(200, -250 + (player.body.velocity.y - 140));
        else chest.setVelocity(0, -250 + (player.body.velocity.y - 140));

        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);

    }

    touchKnife(player, knife)
    {
        this.physics.pause();
        player.setTint(0xff0000);
    }

    chestTouchFloor(chest, floor)
    {
        this.physics.pause();
        chest.setTint(0xff0000);
    }

    spawnKnives()
    {
        let numPlayers = 2;
        for (let x = 0; x < numPlayers; x++)
        {
            let knife = this.knives.create(Math.Between(40, 760), 20, 'knife');
            let direction = Math.Between(0,1);
            knife.setBounce(1);
            knife.setCollideWorldBounds(true);
            if (direction == 0) knife.setVelocityX(Math.Between(-200, -250));
            else knife.setVelocityX(Math.Between(200, 250));
        }
        
    }
    
}