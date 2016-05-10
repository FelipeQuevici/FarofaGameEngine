function angleBetweenTwoPoints(position, mousePosition) {
    
}
/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, rotation) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);

        //this.addComponent("damageTrigger", new CollisionBoxComponent(this));
        //this.addComponent("attackTrigger", new CollisionBoxComponent(this));
        //this.addComponent("animation", new AnimationComponent(this));
    }

    onCreate.call(this,scene,  position, rotation);

    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,"c200",
            new Rectangle(position.x,position.y,40,40),
            7,
            "background"));
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("playerMovement", new PlayerMovementComponent(this))
    };
}


PlayerGameObject.inheritsFrom(GameObject);
