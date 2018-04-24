///<reference path="babylon.d.ts" />
///<reference path="game.ts" />


export class Monster {

    // The player is looking through the camera
    private game: any;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private can_see_player: boolean;
    private last_saw_player_at: BABYLON.Vector3;

    box: BABYLON.Mesh;
    sprite: BABYLON.Sprite;
    spriteManager: BABYLON.SpriteManager;

    constructor(game: any) {



        // Create canvas and engine.

        this.game = game;
        this.scene = game.scene;
        this.engine = game.engine;

        this.spriteManager = new BABYLON.SpriteManager("zombieManager","assets/profile-walk-1.png", 200, 800, this.scene);

        this.box = this.create_box();
        this.sprite = this.create_sprite("monster");

    }

    get_position() {
        return this.box.position;
    }

    create_box() {
        // Create a built-in "zombieBox" shape and add texture from a skin.
        let zombieMaterial = new BABYLON.StandardMaterial("zombieMaterial", this.scene);
        let zombieTexture = new BABYLON.Texture("assets/profile-walk-1.png", this.scene);
        zombieMaterial.diffuseTexture = zombieTexture;
        zombieMaterial.diffuseTexture.hasAlpha = true;
        let zombieBox = BABYLON.MeshBuilder.CreateBox('zombieBox', {size: 3}, this.scene);
        zombieBox.material = zombieMaterial;
        zombieBox.position.z = 3;
        zombieBox.position.y = 3;

        // Here is an attempt to animate the contents of the box, but shifting the offset of the material.
        let zombieBoxAnimation = new BABYLON.Animation("zombieBoxAnimation",
            "position.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let animationKeys = [];
        animationKeys.push({frame: 0, value:1});
        animationKeys.push({frame: 50, value:10});
        animationKeys.push({frame: 100, value:1});
        zombieBoxAnimation.setKeys(animationKeys);
        zombieBox.animations = [];
        zombieBox.animations.push(zombieBoxAnimation);
        this.scene.beginAnimation(zombieBox, 0, 100, true);

        return zombieBox;
    }

    create_sprite(name: string) {
        let sprite = new BABYLON.Sprite(name, this.spriteManager);
        return sprite;
    }

    teleport_to(target: BABYLON.Vector3) {
        this.box.position = target;

    }

    walk_to(target: BABYLON.Vector3) {
        // Find a path to the target, and move toward it
    }


}


