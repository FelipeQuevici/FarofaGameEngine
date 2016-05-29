/**
 * Created by Felipe on 23/05/2016.
 */

DrinkingSalesGameObject.inheritsFrom(GameObject);

function DrinkingSalesGameObject(scene, position, drink) {
    var collisionBox;
    var isActive = true;

    function onCreate(scene, position) {
        this.onCreateGameObject(scene,position,0,"sale");
    }

    this.onInitialize = function () {
        collisionBox = this.addComponent("collisionBox", new CollisionBoxComponent(this, new Circle(0,0)));
        this.addComponent("sprite", new SpriteComponent(this,0,"background","sand01"));
    };

    var isPlayerInside = false;

    this.onUpdate = function (deltaTime) {
        var playerIn = this.isPlayerIn();
        if (!isPlayerInside && playerIn) {
            EventCenterInstance.getInstance().callEvent("playerInsideDrinking",this,{"drink":drink, "point": this});
        }
        isPlayerInside = playerIn;
    };

    this.isPlayerIn = function () {
        if (!isActive) return false;
        var colList = this.scene.collisionSystem.checkCollision(collisionBox);
        for (var i = 0; i < colList.length; i++) {
            if (colList[i].parent.tag == "player") {
                console.log("PlayerDentro");
                return true;
            }
        }
        return false;
    };

    onCreate.call(this,scene,position);
}