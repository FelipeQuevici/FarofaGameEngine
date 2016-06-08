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
        "dashing": dashingState,
        "drinking": drinkingState
    };
    
    var characterController;

    var itemToBuy = null;
    var itemToBuySale = null;

    function tryToBuy() {
        var statComponent = this.parent.getComponent("stats");

        if (itemToBuy && itemToBuySale.isPlayerIn()) {
            statComponent.buyDrink(itemToBuy);
            return;
        }
    }

    function number1Pressed() {
        drinkOnIndex.call(this,1);
    }

    function number2Pressed() {
        drinkOnIndex.call(this,2);
    }

    function number3Pressed() {
        drinkOnIndex.call(this,3);
    }

    function number4Pressed() {
        drinkOnIndex.call(this,4);
    }

    function drinkOnIndex(index) {
        var statComponent = this.parent.getComponent("stats");

        if (statComponent.isUnderBonus()) {
            EventCenterInstance.getInstance().callEvent("DialogError",this,{"message":"error_under_effect"});
            return;
        }

        if (statComponent.hasDrinkEquiped(index)) {
            indexToDrink = index;
            startDrinkingTime = Date.now();
            var animationComponent = this.parent.getComponent("animation");

            if(!animationComponent.isAnimationPlaying(drinkingAnimation)) {
                animationComponent.setAnimation(AnimationManager.getAnimation(drinkingAnimation));
            }

            AudioManager.setVolume(FarofaGame.getGlobalVariable("MainMusic"),0.2);
            AudioManager.playAudio("Drinking", false);

            currentState = "drinking";
        }
    }

    var indexToDrink;
    var startDrinkingTime;
    var drinkingDuration = 1000;
    var drinkingAnimation = "playerDrinking";

    function finishedDrinking(animationComponent) {
        //return Date.now() - startDrinkingTime > drinkingDuration;
        return  animationComponent.isAnimationFinished();
    }

    function drinkingState() {
    	var animationComponent = this.parent.getComponent("animation");
        if (finishedDrinking(animationComponent)) {
            currentState = "move";
            animationComponent.setAnimation(AnimationManager.getAnimation("playerIdle"));
            var statComponent = this.parent.getComponent("stats");
            statComponent.drinkSelectedDrink(indexToDrink);
            indexToDrink = -1;
            if (!statComponent.isUnderBonus()) {
                AudioManager.setVolume(FarofaGame.getGlobalVariable("MainMusic"),FarofaGame.getGlobalVariable("MainMusicVolume"));

            }
        }
    }

    function updateDrinkToBuy(args) {
        //console.log("updateDrink");
        itemToBuy = args["drink"];
        itemToBuySale = args["point"];
    }

    this.onCreate = function (parent, target) {
        this.parent = parent;
        this.tag = "player";
        this.attackSequence = 0;        
        targetToLookAt = target;
        currentState = "move";
        lastDirection = new Vector2(0,0);
        characterController = this.parent.getComponent("characterController");
        EventCenterInstance.getInstance().subscribeEvent("eClicked", tryToBuy, this);
        EventCenterInstance.getInstance().subscribeEvent("1Clicked", number1Pressed, this);
        EventCenterInstance.getInstance().subscribeEvent("2Clicked", number2Pressed, this);
        EventCenterInstance.getInstance().subscribeEvent("3Clicked", number3Pressed, this);
        EventCenterInstance.getInstance().subscribeEvent("4Clicked", number4Pressed, this);
        EventCenterInstance.getInstance().subscribeEvent("playerInsideDrinking", updateDrinkToBuy, this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("eClicked", tryToBuy, this);
        EventCenterInstance.getInstance().unsubscribeEvent("1Clicked", number1Pressed, this);
        EventCenterInstance.getInstance().unsubscribeEvent("2Clicked", number2Pressed, this);
        EventCenterInstance.getInstance().unsubscribeEvent("3Clicked", number3Pressed, this);
        EventCenterInstance.getInstance().unsubscribeEvent("4Clicked", number4Pressed, this);
        EventCenterInstance.getInstance().unsubscribeEvent("playerInsideDrinking", updateDrinkToBuy, this);
    };

    this.resetLastDirectionToCurrent = function () {
        lastDirection = getCurrentDirection.call(this);
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

    var canDash = false;

    this.setCanDash = function (value) {
        canDash = value;
    };

    var dashCoolDown = 100;
    var lastDash = Date.now();

    var lastDirection;
    
    var attackSequenceSpeed = 0.3;
    var attackSequenceTimer = 0;

    function moveState(deltaTime) {
        if (InputManager.isKeyPressed("attack1")) {
            currentState = "meleeAttack";
            lastDirection = getCurrentDirection.call(this);
            characterController.enterMeleeAttackState();

            AudioManager.playAudio("MeleeAttack",false, true);
            var a = Math.round(Math.random()+1);
            AudioManager.playAudio("MonkeyAttack"+a);
            return;
        }

        if (InputManager.isKeyPressed("attack2")) {
            this.parent.rotation = angleBetweenTwoPoints(this.parent.position, targetToLookAt.position);
            currentState = "rangedAttack";
            characterController.enterRangedAttack();
            return;
        }

        if (InputManager.isKeyPressed("dash") && canDash) {
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
    	this.attackSequence = 0;
    	attackSequenceTimer = 0;
        currentState = "move";
    }           

    function meleeAttackState(deltaTime) {
    	if(attackSequenceTimer >= attackSequenceSpeed){
    		if (InputManager.isKeyPressed("attack1") && this.attackSequence == 0) {    	        		
        		this.attackSequence = 1;
            }
    	}    	
        characterController.meleeAttackUpdate(lastDirection,deltaTime,goBackToMove,this);
        attackSequenceTimer += deltaTime;
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

    this.setMoveSpeedWhileAttacking = function (speed) {
        characterController.setMoveSpeedWhileAttacking(speed)
    };

    this.setDashSpeed = function (speed) {
        characterController.setDashSpeed(speed);
    }
    
    this.onPreUpdate = function (deltaTime) {
        playerStates[currentState].call(this, deltaTime);
    };

    this.onCreate(parent,target);
}

PlayerControllerComponent.inheritsFrom(Component);