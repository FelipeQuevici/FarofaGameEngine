/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, rotation) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);
    }

    onCreate.call(this,scene,  position, rotation);

    this.onInitialize = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "c200",
            new Rectangle(position.x,position.y,tileSize,tileSize)));
        
        this.addComponent("playerMovement", new PlayerMovementComponent(this));
    };
}


PlayerGameObject.inheritsFrom(GameObject);
