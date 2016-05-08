/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    this.onCreateScene();

    this.onPreInitialize = function () {
        this.addLayer("background");
        this.addLayer("lowerEffects");
    };

    var player;

    this.onEnter = function () {
        player = new PlayerGameObject(new Vector2(10,10),0);
        this.addObject(player);
    };
}

GameScene.inheritsFrom(Scene);