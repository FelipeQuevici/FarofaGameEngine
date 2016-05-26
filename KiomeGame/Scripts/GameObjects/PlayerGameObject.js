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
        var attackCollision = this.addComponent("attackCollisionBox", new CollisionBoxComponent(this));
        attackCollision.enable = false;
        attackCollision.collisionInfo = new Circle(0,0);
        //this.addComponent("damageCollisionBox", new CollisionBoxComponent(this));
       // this.getComponent("damageCollisionBox").enable = false;

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "playerIdle1"));
        
        this.addComponent("animation", new AnimationComponent(this, "playerIdle", this.getComponent("sprite")));
        var cc = this.addComponent("characterController", new CharacterControllerComponent(this));
        cc.setShouldKnockBack(true);

        this.addComponent("playerController", new PlayerControllerComponent(this, target));
        this.addComponent("stats", new PlayerStatsComponent(this));
    };
}


PlayerGameObject.inheritsFrom(GameObject);
