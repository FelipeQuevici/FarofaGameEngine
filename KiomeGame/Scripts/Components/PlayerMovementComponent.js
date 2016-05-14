/**
 * Created by Felipe on 09/05/2016.
 */

function PlayerMovementComponent(parent) {
    var playerMoveSpeed;

    this.onCreate = function (parent) {
        this.parent = parent;
        playerMoveSpeed = 120;
    };

    this.onCreate(parent);
    
    this.onPreUpdate = function (deltaTime) {
    	var currentSpeed = new Vector2();            

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
            this.parent.rotation = 180;
        }
        else if (currentSpeed.equals(new Vector2(1,0))) {
            this.parent.rotation = 0;
        }
        else if (currentSpeed.equals(new Vector2(0,1))) {
            this.parent.rotation = 90;
        }
        else if (currentSpeed.equals(new Vector2(0,-1))) {
            this.parent.rotation = 270;
        }
        else if (currentSpeed.equals(new Vector2(1,1))) {
            this.parent.rotation = 45;
        }
        else if (currentSpeed.equals(new Vector2(-1,1))) {
            this.parent.rotation = 135;
        }
        else if (currentSpeed.equals(new Vector2(-1,-1))) {
            this.parent.rotation = 225;
        }
        else if (currentSpeed.equals(new Vector2(1,-1))) {
            this.parent.rotation = 315;
        }

        currentSpeed.multiplyByScalar(playerMoveSpeed * deltaTime);
        this.parent.getComponent("rigidBody").move(currentSpeed);
    };

    this.onUpdate = function (deltaTime) {
        
    };
}

PlayerMovementComponent.inheritsFrom(Component);