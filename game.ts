///<reference path="babylon.d.ts" />


import { Player } from "./player";
import { Arena } from "./arena";
import { Monster } from "./monster";
import { Actor } from "./actor";

class GameX {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;

    scene: BABYLON.Scene;
    player: Player;
    arena: Arena;

    private _light: BABYLON.Light; // Light up the sky

    constructor(canvasElement : string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene() : void {
        // Create a basic BJS Scene object.
        this.scene = new BABYLON.Scene(this._engine);

        var dummyActor = new Actor(this);

        this.arena = new Arena(this);

        // Coordinate Arrows
        CreateAxis(10, this.scene);


        // Create a stark light right outside the doorway.
        var startingHallwayLight = new BABYLON.PointLight("startingHallwayLight", new BABYLON.Vector3(6+1.5, 9, 3), this.scene);

        startingHallwayLight.diffuse = new BABYLON.Color3(1, 1, 0);
        startingHallwayLight.specular = new BABYLON.Color3(1, 1, 0);

        this.player = new Player(this, null, startingHallwayLight.position);




        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);

        let CreateWallWithDoorwayMesh = function(wallHeight: number, wallWidth: number, doorHeight: number, doorWidth: number, scene: BABYLON.Scene) {
            let customMesh2 = new BABYLON.Mesh("custom", scene);

            let vertexData2 = new BABYLON.VertexData();
            // right, up, 0
            vertexData2.positions = [
                0, 0, 0,   0, wallHeight, 0,   wallWidth, wallHeight, 0,  // 0
                0, 0, 0,   wallWidth,  0, 0,   wallWidth, wallHeight, 0,  // 1

                wallWidth, doorHeight, 0,  wallWidth, wallHeight, 0,  wallWidth + doorWidth, wallHeight, 0,
                wallWidth, doorHeight, 0,  wallWidth + doorWidth, wallHeight, 0,  wallWidth + doorWidth, doorHeight, 0,

                wallWidth + doorWidth, 0, 0,  wallWidth + doorWidth, wallHeight, 0,  wallWidth + doorWidth + wallWidth, wallHeight, 0,
                wallWidth + doorWidth, 0, 0,  wallWidth + doorWidth + wallWidth, wallHeight, 0,  wallWidth + doorWidth + wallWidth, 0, 0,


            ];
            vertexData2.indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
            vertexData2.applyToMesh(customMesh2);
            return customMesh2
        };

        let CreateWallWithDoorway = function(position: BABYLON.Vector3, scene: BABYLON.Scene) {
            let mesh = CreateWallWithDoorwayMesh(10, 6, 6, 3, scene);
            mesh.position.set(10, 0, 0);
            return mesh;
        };

        let startingWall = CreateWallWithDoorwayMesh(10, 6, 6, 3, this.scene);
        startingWall.enableEdgesRendering();

        // Make a Wireframe Material for our
        var wireframeMaterial = new BABYLON.StandardMaterial("mat", this.scene);
        wireframeMaterial.wireframe = false;
        wireframeMaterial.backFaceCulling = false;
        startingWall.material = wireframeMaterial;

        let zombieBox = new Monster(this);


        // Move the sphere upward 1/2 of its height.
        //sphere.position.y = 1;

        // Create a built-in "ground" shape.

        let ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 100, height: 100, subdivisions: 2}, this.scene);
        var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
        groundMaterial.diffuseColor =  new BABYLON.Color3(0.8, 0.8, 1);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0.5, 0);
        ground.material = groundMaterial;

        var startingHallwayShadowGenerator = new BABYLON.ShadowGenerator(1024, startingHallwayLight);
        startingHallwayShadowGenerator.getShadowMap().renderList.push(startingWall, zombieBox.box);

        ground.receiveShadows = true;


        // Let the bodies hit the floor
        this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        this.scene.collisionsEnabled = true;

        ground.checkCollisions = true;
        startingWall.checkCollisions = true;




    }


    doRender() : void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this.scene.render();
        });

        // The canvas/window resize event handler.
        (<any>window).addEventListener('resize', () => {
            this._engine.resize();
        });
    }


}

(<any>window).addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new GameX('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});


// create axis
let CreateAxis = function(size: number, scene: BABYLON.Scene) {
    var makeTextPlane = function(text: string, color: string, size: number) {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
        var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);

        var textLabelMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        textLabelMaterial.backFaceCulling = false;

        textLabelMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        textLabelMaterial.diffuseTexture = dynamicTexture;

        plane.material = textLabelMaterial;
        return plane;
    };

    var axisX = BABYLON.Mesh.CreateLines("axisX", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};
