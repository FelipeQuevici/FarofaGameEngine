function angleBetweenTwoPoints(position, mousePosition) {
    
}
/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, rotation) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);
        //this.addComponent("rigidBody", new RigidBodyComponent(this));
        //this.addComponent("damageTrigger", new CollisionBoxComponent(this));
        //this.addComponent("attackTrigger", new CollisionBoxComponent(this));


        //this.addComponent("animation", new AnimationComponent(this));
    }

    onCreate.call(this,scene,  position, rotation);

    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,"witchWalk00",
            new Rectangle(position.x,position.y,40,40),
            1,
            "background"));
    };

    this.update = function () {
        //FAZER COISAS DO PLAYER
        var currentSpeed = new Vector2();

        this.rotation = angleBetweenTwoPoints(this.position, InputManager.getMousePosition());


        if (InputManager.isKeyPressed("left") ) {
            currentSpeed = new Vector2(1,0);
        }

        //CALUCLA
        //this.components["rigidBody"].move(currentSpeed);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
