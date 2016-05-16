/**
 * Created by Felipe on 09/05/2016.
 */

function PlayerControllerComponent(parent, target) {
    var playerMoveSpeed;
    var targetToLookAt;
    
    this.onCreate = function (parent, target) {
        this.parent = parent;
        playerMoveSpeed = 120;
        targetToLookAt = target;
    };

    this.onCreate(parent,target);

    this.onPreUpdate = function (deltaTime) {
        var currentSpeed = new Vector2();
        var isAnyKeyPressed = false;
        var finalSpeed = playerMoveSpeed;
        
        if (InputManager.isKeyPressed("left") ) {
            currentSpeed.sum(new Vector2(-1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("right") ) {
            currentSpeed.sum(new Vector2(1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("up") ) {
            currentSpeed.sum(new Vector2(0,-1));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("down") ) {
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
            	finalSpeed *= 0.7071;
                this.parent.rotation = 45;
            }
            else if (currentSpeed.equals(new Vector2(-1, 1))) {
            	finalSpeed *= 0.7071;
                this.parent.rotation = 135;
            }
            else if (currentSpeed.equals(new Vector2(-1, -1))) {
            	finalSpeed *= 0.7071;
                this.parent.rotation = 225;
            }
            else if (currentSpeed.equals(new Vector2(1, -1))) {
            	finalSpeed *= 0.7071;
                this.parent.rotation = 315;
            }
        }
        else {
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
        }

        currentSpeed.multiplyByScalar(finalSpeed * deltaTime);
        if(currentSpeed.x != 0 || currentSpeed.y != 0){
        	this.parent.getComponent("rigidBody").move(currentSpeed);
        }
        
    };

    this.onUpdate = function (deltaTime) {
        
    };
}

PlayerControllerComponent.inheritsFrom(Component);