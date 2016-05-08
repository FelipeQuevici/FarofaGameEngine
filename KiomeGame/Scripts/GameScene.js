/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;

    this.onPreInitialize = function () {
        this.addLayer("background");
        this.addLayer("lowerEffects");
        player = new PlayerGameObject(this, new Vector2(10,10),0);
        this.addObject(player);
        player.onInitialize();
        console.log("GameScenePreInitialized");
    };



    this.onEnter = function () {
    };
}

GameScene.inheritsFrom(Scene);