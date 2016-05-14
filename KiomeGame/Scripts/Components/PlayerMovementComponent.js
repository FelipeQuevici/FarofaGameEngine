

/**
 * Created by Felipe on 09/05/2016.
 */

function PlayerMovementComponent(parent, target) {
    var playerMoveSpeed;
    var targetToLookAt;
    
    this.onCreate = function (parent, target) {
        this.parent = parent;
        playerMoveSpeed = 120;
        targetToLookAt = target;
        console.log(target + " CRiOu");
    };

    this.onCreate(parent,target);

    this.onUpdate = function (deltaTime) {
        var currentSpeed = new Vector2();            
        var isAnyKeyPressed = false;
        
        if (InputManager.isKeyPressed("arrowLeft") ) {
            currentSpeed.sum(new Vector2(-1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("arrowRight") ) {
            currentSpeed.sum(new Vector2(1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("arrowUp") ) {
            currentSpeed.sum(new Vector2(0,-1));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("arrowDown") ) {
            currentSpeed.sum(new Vector2(0,1));
            isAnyKeyPressed = true;
        }

        if (isAnyKeyPressed) {
            if (currentSpeed.equals(new Vector2(-1, 0))) {
                this.parent.rotation = 180;
            }
            else if (currentSpeed.equals(new Vector2(1, 0))) {
                this.parent.rotation = 0;
            }
            else if (currentSpeed.equals(new Vector2(0, 1))) {
                this.parent.rotation = 90;
            }
            else if (currentSpeed.equals(new Vector2(0, -1))) {
                this.parent.rotation = 270;
            }
            else if (currentSpeed.equals(new Vector2(1, 1))) {
                this.parent.rotation = 45;
            }
            else if (currentSpeed.equals(new Vector2(-1, 1))) {
                this.parent.rotation = 135;
            }
            else if (currentSpeed.equals(new Vector2(-1, -1))) {
                this.parent.rotation = 225;
            }
            else if (currentSpeed.equals(new Vector2(1, -1))) {
                this.parent.rotation = 315;
            }
        }
        else {
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
        }

        currentSpeed.multiplyByScalar(playerMoveSpeed * deltaTime);
        this.parent.getComponent("rigidBody").move(currentSpeed);
    };
}

PlayerMovementComponent.inheritsFrom(Component);