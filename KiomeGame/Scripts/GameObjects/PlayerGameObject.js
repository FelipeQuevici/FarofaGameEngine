/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, target) {
    function onCreate(scene, position) {
        this.onCreateGameObject(scene, position, 0, "player");
    }

    onCreate.call(this, scene, position);

    this.onInitialize = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");

        this.addComponent("rigidBody", new RigidBodyComponent(this));

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "player_idle1",
            new Rectangle(position.x,position.y,tileSize,tileSize)));
        
        this.addComponent("animation", new AnimationComponent(this, "player_idle", this.getComponent("sprite")));
        
        this.addComponent("playerMovement", new PlayerControllerComponent(this, target));
    };
}


PlayerGameObject.inheritsFrom(GameObject);
