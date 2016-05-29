/**
 * Created by Felipe on 09/05/2016.
 */

function PlayerControllerComponent(parent, target) {
    var targetToLookAt;
    var currentState;

    var playerStates = {
        "move": moveState,
        "meleeAttack": meleeAttackState,
        "rangedAttack": rangedAttackState,
        "dashing": dashingState
    };

    var characterController;

    var itemToBuy = null;
    var itemToBuySale = null;

    function drinkOrBuy() {
        var statComponent = this.parent.getComponent("stats");

        console.log("E PRESSED");
        if (itemToBuy && itemToBuySale.isPlayerIn()) {
            statComponent.buyDrink(itemToBuy);
            return;
        }
        if (statComponent.hasDrinkEquiped()) {
            console.log("DRINKING ");
            statComponent.drinkSelectedDrink();
        }
    }

    function updateDrinkToBuy(args) {
        console.log("updateDrink");
        itemToBuy = args["drink"];
        itemToBuySale = args["point"];
    }

    this.onCreate = function (parent, target) {
        this.parent = parent;
        targetToLookAt = target;
        currentState = "move";
        lastDirection = new Vector2(0,0);
        characterController = this.parent.getComponent("characterController");
        EventCenterInstance.getInstance().subscribeEvent("eClicked", drinkOrBuy, this);
        EventCenterInstance.getInstance().subscribeEvent("playerInsideDrinking", updateDrinkToBuy, this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("eClicked", drinkOrBuy, this);
        EventCenterInstance.getInstance().unsubscribeEvent("playerInsideDrinking", updateDrinkToBuy, this);
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

    var dashCoolDown = 100;
    var lastDash = Date.now();

    var lastDirection;

    function moveState(deltaTime) {
        if (InputManager.isKeyPressed("attack1")) {
            currentState = "meleeAttack";
            lastDirection = getCurrentDirection.call(this);
            characterController.enterMeleeAttackState();
            return;
        }

        if (InputManager.isKeyPressed("attack2")) {
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
            currentState = "rangedAttack";
            characterController.enterRangedAttack();
            return;
        }

        if (InputManager.isKeyPressed("dash")) {
            var now = Date.now();
            if (now - lastDash > dashCoolDown) {
                characterController.enterDashSate();
                currentState = "dashing";
                if (lastDirection.x == 0 && lastDirection.y == 0) {
                    var direction = Math.round(this.parent.rotation / (360 / (9) ));
                    if (direction > 8) direction = 0;
                    lastDirection = polarToVector(1, direction * (360 / (9)));
                }
            }
            return;
        }

        lastDirection = getCurrentDirection.call(this);
        characterController.move(lastDirection,deltaTime);
    }

    function goBackToMove() {
        currentState = "move";
    }

    function meleeAttackState(deltaTime) {
        characterController.meleeAttackUpdate(lastDirection,deltaTime,goBackToMove,this);
    }

    function rangedAttackState(deltaTime) {
        characterController.rangedAttack(deltaTime,goBackToMove, this);
    }

    var finishDash = function () {
        currentState = "move";
        lastDash = Date.now();
    };

    function dashingState(deltaTime) {
        characterController.dashUpdate(deltaTime,lastDirection,finishDash,this);
    }
    
    this.setMoveSpeed = function (speed){
    	characterController.setMoveSpeed(speed);
    };
    
    this.onPreUpdate = function (deltaTime) {
        playerStates[currentState].call(this, deltaTime);
    };

    this.onCreate(parent,target);
}

PlayerControllerComponent.inheritsFrom(Component);