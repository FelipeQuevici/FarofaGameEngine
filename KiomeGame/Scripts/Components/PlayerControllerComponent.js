/**
 * Created by Felipe on 09/05/2016.
 */

function PlayerControllerComponent(parent, target) {
    var targetToLookAt;

    var currentState;

    var playerStates = {
        "move": moveState,
        "meleeAttack": meleeAttackState,
        "rangedAttack": rangedAttackState
    };

    var moveSpeed = 120;
    var moveSpeedWhileAttacking = 20;

    this.onCreate = function (parent, target) {
        this.parent = parent;
        targetToLookAt = target;
        currentState = "move";

        /*playerMoveSpeed = 120;
         playerMoveSpeedWhileAttacking = 30;
         isAttacking = false;
         attackType = 0;
         attack1TimeDuration = 30;
         attack2TimeDuration = 70;*/
    };

    function getCurrentDirection() {
        var currentDirection = new Vector2();
        var isAnyKeyPressed = false;

        if (InputManager.isKeyPressed("left") ) {
            currentDirection.sum(new Vector2(-1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("right") ) {
            currentDirection.sum(new Vector2(1,0));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("up") ) {
            currentDirection.sum(new Vector2(0,-1));
            isAnyKeyPressed = true;
        }
        if (InputManager.isKeyPressed("down") ) {
            currentDirection.sum(new Vector2(0,1));
            isAnyKeyPressed = true;
        }

        if (isAnyKeyPressed) {
            this.parent.rotation = currentDirection.angle();
        }
        else {
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
        }

        currentDirection.normalize();
        return currentDirection;

    }

    var attackAnimationStartTime;
    var attack1AnimationDuration = 300;
    var attack2AnimationDuration = 600;
    var lastDirection;

    this.throwPoo = function () {
        var sprite = SpriteSheetManager.getSprite("poo",new Rectangle(0,0,16,16));
        var bulletTest = new ProjectileGameObject(this.parent.scene,new Vector2(this.parent.position.x,this.parent.position.y),
            sprite, polarToVector(1,this.parent.rotation));
        this.parent.scene.createObject(bulletTest);
    }
    
    function moveState(deltaTime) {
        if (InputManager.isKeyPressed("attack1")) {
            attackAnimationStartTime = Date.now();
            currentState = "meleeAttack";
            return;
        }

        if (InputManager.isKeyPressed("attack2")) {
            attackAnimationStartTime = Date.now();
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
            this.throwPoo();
            currentState = "rangedAttack";
            return;
        }


        var moveDirection = getCurrentDirection.call(this, moveSpeed);
        lastDirection = moveDirection;
        
        if(moveDirection.x != 0 || moveDirection.y != 0){
            moveDirection.multiplyByScalar(moveSpeed * deltaTime);
            this.parent.getComponent("rigidBody").move(moveDirection);

            //Walk animation
        }
        else {
            //Idle animation
        }
    }

    function isMeleeAttackAnimationOver() {
        return Date.now() - attackAnimationStartTime > attack1AnimationDuration;

    }

    function meleeAttackState(deltaTime) {
        if (isMeleeAttackAnimationOver()) {
            currentState = "move";
            return;
        }

        var moveDirection = new Vector2(lastDirection.x , lastDirection.y);
        moveDirection.multiplyByScalar(moveSpeedWhileAttacking * deltaTime);
        if(moveDirection.x != 0 || moveDirection.y != 0){
            this.parent.getComponent("rigidBody").move(moveDirection);
        }
    }

    function isRangedAttackAnimationOver() {
        return Date.now() - attackAnimationStartTime > attack2AnimationDuration;
    }

    function rangedAttackState() {
        if (isRangedAttackAnimationOver()) {
            currentState = "move";
            return;
        }
        
        
    }

    this.onPreUpdate = function (deltaTime) {
        playerStates[currentState].call(this, deltaTime);
    };

    this.onCreate(parent,target);
}

PlayerControllerComponent.inheritsFrom(Component);