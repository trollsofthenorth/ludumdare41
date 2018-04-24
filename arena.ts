///<reference path="babylon.d.ts" />
///<reference path="game.ts" />

/* An Arena is the collection of visible and physics geometry the player interacts with.
*  It plays host to Enemies. */

export class Arena {

    // The player is looking through the camera
    private game: any;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    constructor(game: any) {
        // Create canvas and engine.

        this.game = game;
        this.scene = game.scene;
        this.engine = game.engine;


        console.log("Arena loaded");

        let map = this.generate_tilemap(10, 20);
    }


    generate_tilemap(height: number, width: number) {
        let map:Array<Array<boolean>> = [];

        // Fill grid with false
        for(let i: number = 0; i < height; i++) {
            map[i] = new Array(width);
            for(let j: number = 0; j < width; j++) {
                map[i][j] = false;
            }
        }

        console.log(this.as_string(map));

    }

    as_string(map: Array<Array<boolean>>) {
        let s = "";
        map.forEach(function (row) {
            row.forEach(function (cell) {
                if (cell) {
                    s += ".";
                } else {
                    s += "X";
                }
            });
            s += "\n";
        });
        return s;
    }

}
