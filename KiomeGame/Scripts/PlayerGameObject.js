function angleBetweenTwoPoints(position, mousePosition) {
    
}
/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, rotation) {
    var playerMoveSpeed;
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        //this.addComponent("damageTrigger", new CollisionBoxComponent(this));
        //this.addComponent("attackTrigger", new CollisionBoxComponent(this));
        playerMoveSpeed = 2;


        //this.addComponent("animation", new AnimationComponent(this));
    }

    onCreate.call(this,scene,  position, rotation);

    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,"witchWalk00",
            new Rectangle(position.x,position.y,40,40),
            3,
            "background"));
    };

    this.update = function () {
        //FAZER COISAS DO PLAYER
        var currentSpeed = new Vector2();

        //this.rotation = angleBetweenTwoPoints(this.position, InputManager.getMousePosition());


        if (InputManager.isKeyPressed("arrowLeft") ) {
            currentSpeed.sum(new Vector2(-1,0));
            this.rotation = 1;
        }
        if (InputManager.isKeyPressed("arrowRight") ) {
            currentSpeed.sum(new Vector2(1,0));
            this.rotation = 2;
        }
        if (InputManager.isKeyPressed("arrowUp") ) {
            currentSpeed.sum(new Vector2(0,-1));
            this.rotation = 3;
        }
        if (InputManager.isKeyPressed("arrowDown") ) {
            currentSpeed.sum(new Vector2(0,1));
            this.rotation = 0;
        }

        currentSpeed.multiplyByScalar(playerMoveSpeed);

        this.components["rigidBody"].move(currentSpeed);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
