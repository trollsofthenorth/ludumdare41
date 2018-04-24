///<reference path="babylon.d.ts" />
///<reference path="game.ts" />

/* A player is a POV camera w/ Input controls, plus Collisions. */

export class Player {

    // The player is looking through the camera
    private game: any;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private startingLocation: BABYLON.Vector3;
    private startingLocationTarget: BABYLON.Vector3;
    private camera: BABYLON.FreeCamera;


    speed: number;
    height: number;
    inertia: number;

    constructor(game: any, startingLocation?: BABYLON.Vector3, startingLocationTarget?: BABYLON.Vector3) {
        // Create canvas and engine.

        this.game = game;
        this.scene = game.scene;
        this.engine = game.engine;

        // Where is the player, and what are they looking at? This is expressed in Scene coordinates (feet).
        if (!startingLocation) {
            startingLocation = new BABYLON.Vector3(6 + 1.5, 4,-15);
        }
        this.startingLocation = startingLocation;

        if (!startingLocationTarget) {
            startingLocationTarget = new BABYLON.Vector3(6 + 1.5, 4,0);
        }
        this.startingLocationTarget = startingLocationTarget;





        this.speed = 2;
        this.height = 4;
        this.inertia = 0.9;

        this.camera = this._initCamera();

        console.log("Player created");






    }

    _initCamera() {

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(6 + 1.5, 4,-15), this.scene);
        camera.setTarget(this.startingLocationTarget);

        // Attach the camera to the canvas.
        // The player must click on the canvas to activate control.

        camera.attachControl(this.game._canvas, false);


        // Bumping into things
        camera.applyGravity = true;
        camera.checkCollisions = true;

        // This collision bubble breaks arrow key movement.
        // camera.ellipsoid = new BABYLON.Vector3(2, this.height, 2);

        // Movement doens't work either;
        // camera.speed = this.speed;
        // camera.inertia = this.inertia;

        // Directions
        camera.keysUp = [87]; // W
        camera.keysLeft = [65]; // A
        camera.keysDown = [83]; // S
        camera.keysRight = [68]; // D

        return camera;

    }


}
