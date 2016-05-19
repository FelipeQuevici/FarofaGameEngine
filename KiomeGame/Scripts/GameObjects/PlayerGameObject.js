/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, target) {
    function onCreate(scene, position) {
        this.onCreateGameObject(scene, position, 0, "player");
    }

    onCreate.call(this, scene, position);

    this.onInitialize = function () {
        this.addComponent("rigidBody", new RigidBodyComponent(this));

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "playerIdle1"));
        
        this.addComponent("animation", new AnimationComponent(this, "playerIdle", this.getComponent("sprite")));
        this.addComponent("playerStat", new PlayerStatsComponent(this));
        this.addComponent("playerMovement", new PlayerControllerComponent(this, target));
        console.log(this);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
