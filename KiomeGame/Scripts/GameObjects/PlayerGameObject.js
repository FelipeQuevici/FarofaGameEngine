/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, target) {
    function onCreate(scene, position) {
        this.onCreateGameObject(scene, position, 0);
    }

    onCreate.call(this,scene,  position);

    this.onInitialize = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");
        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "c200",
            new Rectangle(position.x,position.y,tileSize,tileSize)));
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("playerMovement", new PlayerMovementComponent(this, target));
    };
}


PlayerGameObject.inheritsFrom(GameObject);
