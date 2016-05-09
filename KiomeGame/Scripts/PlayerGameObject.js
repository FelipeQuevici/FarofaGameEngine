function angleBetweenTwoPoints(position, mousePosition) {
    
}
/**
 * Created by Felipe on 07/05/2016.
 */


function PlayerGameObject(scene, position, rotation) {
    var playerMoveSpeed;
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);

        //this.addComponent("damageTrigger", new CollisionBoxComponent(this));
        //this.addComponent("attackTrigger", new CollisionBoxComponent(this));
        playerMoveSpeed = 2;


        //this.addComponent("animation", new AnimationComponent(this));
    }

    onCreate.call(this,scene,  position, rotation);

    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,"c200",
            new Rectangle(position.x,position.y,40,40),
            7,
            "background"));
        this.addComponent("rigidBody", new RigidBodyComponent(this));
    };

    this.update = function () {
        //FAZER COISAS DO PLAYER
        var currentSpeed = new Vector2();

        //this.rotation = angleBetweenTwoPoints(this.position, InputManager.getMousePosition());


        if (InputManager.isKeyPressed("arrowLeft") ) {
            currentSpeed.sum(new Vector2(-1,0));
        }
        if (InputManager.isKeyPressed("arrowRight") ) {
            currentSpeed.sum(new Vector2(1,0));
        }
        if (InputManager.isKeyPressed("arrowUp") ) {
            currentSpeed.sum(new Vector2(0,-1));
        }
        if (InputManager.isKeyPressed("arrowDown") ) {
            currentSpeed.sum(new Vector2(0,1));
        }

        if (currentSpeed.equals(new Vector2(-1,0))) {
            this.rotation = 180;
        }
        else if (currentSpeed.equals(new Vector2(1,0))) {
            this.rotation = 0;
        }
        else if (currentSpeed.equals(new Vector2(0,1))) {
            this.rotation = 90;
        }
        else if (currentSpeed.equals(new Vector2(0,-1))) {
            this.rotation = 270;
        }
        else if (currentSpeed.equals(new Vector2(1,1))) {
            this.rotation = 45;
        }
        else if (currentSpeed.equals(new Vector2(-1,1))) {
            this.rotation = 135;
        }
        else if (currentSpeed.equals(new Vector2(-1,-1))) {
            this.rotation = 225;
        }
        else if (currentSpeed.equals(new Vector2(1,-1))) {
            this.rotation = 315;
        }

        currentSpeed.multiplyByScalar(playerMoveSpeed);

        this.components["rigidBody"].move(currentSpeed);
    };
}


PlayerGameObject.inheritsFrom(GameObject);
