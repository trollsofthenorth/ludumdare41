///<reference path="babylon.d.ts" />

export class Actor {

    game: any;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    position: BABYLON.Vector3;
    facing: BABYLON.Vector3;

    fieldOfViewAngle: number = 110;

    sightDistance: number = 50;

    constructor(game: any) {
        // Create canvas and engine.
        this.game = game;
        this.scene = game.scene;
        this.engine = game.engine;

        this.position = new BABYLON.Vector3(0,0,0);

        console.log("Actor created");
    }

    get_position() {
        return this.position;
    }

    teleport_to(target: Actor) {
        this.position.x = target.position.x;
        this.position.y = target.position.y;
        this.position.z = target.position.z;
    }

    walk_to(target: BABYLON.Vector3) {
        // Find a path to the target, and move toward it
    }

    can_see(target: Actor) {

        // Check distance - player must be nearby
        if (BABYLON.Vector3.Distance(this.position, target.position) > this.sightDistance) {
            console.log("Too far away to see");
            return false;
        }

        // Check angle of vision - player must be in front

        // Check line of sight - player must not be behind stuff
    }




}
