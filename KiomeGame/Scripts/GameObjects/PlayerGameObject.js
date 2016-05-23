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
        this.addComponent("attackCollisionBox", new CollisionBoxComponent(this));
        this.getComponent("attackCollisionBox").enable = false;
        this.addComponent("damageCollisionBox", new CollisionBoxComponent(this));
        this.getComponent("damageCollisionBox").enable = false;

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "playerIdle1"));
        
        this.addComponent("animation", new AnimationComponent(this, "playerIdle", this.getComponent("sprite")));
        this.addComponent("playerStat", new PlayerStatsComponent(this));
        this.addComponent("characterController", new CharacterControllerComponent(this));
        this.addComponent("playerController", new PlayerControllerComponent(this, target));
        this.addComponent("playerStat", new PlayerStatsComponent(this));
        console.log(this);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
