/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(position, rotation) {
    function onCreate(position, rotation) {
        this.parent.onCreateGameObject(position, rotation);
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("damageTrigger", new CollisionBoxComponent(this));
        this.addComponent("attackTrigger", new CollisionBoxComponent(this));
        this.addComponent("sprite", new SpriteComponent(this, "background"));
        this.addComponent("animation", new AnimationComponent(this));
    }

    onCreate.call(this, position, rotation);

    this.update = function () {
        //FAZER COISAS DO PLAYER
        var currentSpeed = new Vector2();

        this.rotation = angle(this.position, InputManager.getMousePosition());


        if (InputManager.isKeyPressed("left") ) {
            currentSpeed = new Vector2(1,0);
        }

        //CALUCLA
        this.components["rigidBody"].move(currentSpeed);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
