/**
 * Created by Felipe on 23/05/2016.
 */

DrinkingSalesGameObject.inheritsFrom(GameObject);

function DrinkingSalesGameObject(scene, position, drink, overlay) {
    var collisionBox;
    var isActive = true;

    function onCreate(scene, position) {
        this.onCreateGameObject(scene,position,0,"sale");
    }

    function waveStarted() {
        isActive = false;
        spriteComponent.enabled = false;
    }

    function waveEnded() {
        isActive = true;
        spriteComponent.enabled = true;
    }

    var spriteComponent;

    this.onInitialize = function () {
        //collisionBox = this.addComponent("collisionBox", new CollisionBoxComponent(this, new Circle(0,0)));
    	collisionBox = this.addComponent("collisionBox", new CollisionBoxComponent(this, new Circle(0,0)));
    	spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"background","sand01"));
        EventCenterInstance.getInstance().subscribeEvent("waveStarted", waveStarted, this);
        EventCenterInstance.getInstance().subscribeEvent("waveEnded", waveEnded, this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("waveStarted", waveStarted, this);
        EventCenterInstance.getInstance().unsubscribeEvent("waveEnded", waveEnded, this);
    };

    var isPlayerInside = false;

    this.onUpdate = function () {
        var playerIn = this.isPlayerIn();
        if (!isPlayerInside && playerIn) {
            EventCenterInstance.getInstance().callEvent("playerInsideDrinking",this,{"drink":drink, "point": this});
        }
        if (playerIn) {
            overlay.setActive(true);
        }
        else {
            overlay.setActive(false);
        }
        isPlayerInside = playerIn;
    };

    this.isPlayerIn = function () {
        if (!isActive) return false;
        var colList = this.scene.collisionSystem.checkCollision(collisionBox);
        for (var i = 0; i < colList.length; i++) {
            if (colList[i].parent.tag == "player") {
                return true;
            }
        }
        return false;
    };

    onCreate.call(this,scene,position);
}