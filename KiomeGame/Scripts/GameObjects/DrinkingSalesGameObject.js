/**
 * Created by Felipe on 23/05/2016.
 */

DrinkingSalesGameObject.inheritsFrom(GameObject);

function DrinkingSalesGameObject(scene, position) {
    function onCreate(scene, position) {
        this.onCreateGameObject(scene,position,0,"sale");
    }

    this.onInitialize = function () {
        this.addComponent("collisionBox", new CollisionBoxComponent(this, new Circle(0,0)));
        this.addComponent("sprite", new SpriteComponent(this,0,"background","sand01"));
    };

    this.playerEntered = function () {

    };

    onCreate.call(this,scene,position);
}