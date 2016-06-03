/**
 * Created by Felipe on 21/05/2016.
 */

CharacterControllerComponent.inheritsFrom(Component);

function CharacterControllerComponent(parent) {
    var animationComponent;
    var attackCollisionComponent;
    var rigidBodyComponent;

    this.onCreate = function (parent) {
        this.onCreateComponent(parent);
        animationComponent = this.parent.getComponent("animation");
        attackCollisionComponent = this.parent.getComponent("attackCollisionBox");
        rigidBodyComponent = this.parent.getComponent("rigidBody");
        hitList = [];
    };

    var moveSpeed = 200;
    var moveSpeedWhileAttacking = 50;
    var dashSpeed = 400;
    var hitList = [];

    var walkAnimation = "playerWalking";
    var idleAnimation = "playerIdle";
    var meleeAttackAnimation = "playerAttack";
    var knockBackAnimation = "playerIdle";
    var rangedAttackanimation = "playerIdle";
    var stunedAnimation = "playerIdle";

    this.setKnockBackAnimation = function (value) {
        knockBackAnimation = value;
    };

    this.setStunedAnumation = function (value) {
        stunedAnimation = value;
    };

    this.setRangedAttackAnimation = function (value) {
        rangedAttackanimation = value;
    };

    var animationStartTime;

    var attack2AnimationDuration = 500;

    this.setRangedAttackDuration = function (value) {
        attack2AnimationDuration = value;
    };

    var dashAnimationDuration = 100;

    var knockBackSpeed = 200;
    var knowBackDuration = 200;


    this.setMoveSpeed = function(speed){
    	moveSpeed = speed;
    };

    this.setWalkAnimation = function (value) {
        walkAnimation = value;
    };

    this.setIdleAnimation = function (value) {
        idleAnimation = value;
    };

    this.setMeleeAttackAnimation = function (value) {
        meleeAttackAnimation = value;
    };

    this.move = function (amount,  deltaTime) {    	    	
        var moveDirection = amount.copy();
        if(moveDirection.x != 0 || moveDirection.y != 0){
            moveDirection.multiplyByScalar(moveSpeed * deltaTime);
            rigidBodyComponent.move(moveDirection);
            if(!animationComponent.isAnimationPlaying(walkAnimation)){
                animationComponent.setAnimation(AnimationManager.getAnimation(walkAnimation));
            }
        }
        else {
            if(!animationComponent.isAnimationPlaying(idleAnimation)){
                animationComponent.setAnimation(AnimationManager.getAnimation(idleAnimation));
            }
        }
   };

    var knockBackDirection;
    var isKnockingBack = false;

    this.isBeingKnockedBack = function () {
        return isKnockingBack;
    };

    function isKnockBackOver() {
        return Date.now() - animationStartTime > knowBackDuration;
    }

    this.enterKnockBackState = function (direction) {
        animationStartTime = Date.now();
        if(!animationComponent.isAnimationPlaying(knockBackAnimation)){
            animationComponent.setAnimation(AnimationManager.getAnimation(knockBackAnimation));
        }
        isKnockingBack = true;
        knockBackDirection = direction;
    };

    var shouldKnockBack = false;

    this.setShouldKnockBack = function (value) {
        shouldKnockBack = value;
    };

    this.knockBackState = function (deltaTime, functionOver, caller) {
        if (isKnockBackOver()) {
            animationComponent.setAnimation(AnimationManager.getAnimation(idleAnimation));
            functionOver.call(caller);
            isKnockingBack = false;
            return;
        }

        var moveDirection = knockBackDirection.copy();
        moveDirection.multiplyByScalar(knockBackSpeed * deltaTime);
        if(moveDirection.x != 0 || moveDirection.y != 0){
            rigidBodyComponent.move(moveDirection);
        }
    };

    var stunDuration;

    function isStunOver() {
        return Date.now() - animationStartTime > stunDuration;
    }

    this.stun = function (duration) {
        stunDuration = duration;
        isStuned = true;
        if(!animationComponent.isAnimationPlaying(stunedAnimation)){
            animationComponent.setAnimation(AnimationManager.getAnimation(stunedAnimation));
        }
        animationStartTime = Date.now();
    };

    var isStuned = false;

    this.isStuned = function () {
        return isStuned;
    };

    this.stunUpdate = function (deltaTime, functionOver, caller) {
        if (isStunOver()) {
            animationComponent.setAnimation(AnimationManager.getAnimation(idleAnimation));
            functionOver.call(caller);
            isStuned = false;
            return;
        }
    };


    this.enterMeleeAttackState = function () {        
        if(!animationComponent.isAnimationPlaying(meleeAttackAnimation)){
            animationComponent.setAnimation(AnimationManager.getAnimation(meleeAttackAnimation));
        }
        attackCollisionComponent.enable = true;
    };

    function isMeleeAttackAnimationOver(caller) {
    	if(caller.tag == "player"){
    		if(animationComponent.currentFrame >= 15){
    			if(caller.attackSequence == 0){    				
    				return true;
    			}else if(caller.attackSequence == 1){
    				caller.attackSequence = 2;
    				hitList = [];
    			}    			
    		}
    	}
    	return animationComponent.isAnimationFinished();
    }

    this.meleeAttackUpdate = function (direction, deltaTime, functionOnOver, caller) {    	
        if (isMeleeAttackAnimationOver(caller)) {
            animationComponent.setAnimation(AnimationManager.getAnimation(idleAnimation));
            attackCollisionComponent.enable = false;
            hitList = [];
            functionOnOver.call(caller);
            return;
        }

        attackCollisionComponent.move(new Vector2(0,0), this.onAttackHit, this);

        var moveDirection = direction.copy();
        moveDirection.multiplyByScalar(moveSpeedWhileAttacking * deltaTime);
        if(moveDirection.x != 0 || moveDirection.y != 0){
            rigidBodyComponent.move(moveDirection);
        }
    };

    var attackHitTag = "enemy";

    this.setHitTag = function (value) {
        attackHitTag = value;
    };

    this.onAttackHit = function (collisions) {
        for (var collision in collisions) {
            var collidedObject = collisions[collision].parent;
            if (collidedObject.tag == attackHitTag && !collidedObject.wasDestroyed && hitList.indexOf(collidedObject) == -1) {
                collidedObject.getComponent("stats").removeLife(1);
                if (shouldKnockBack) {
                    var angle = angleBetweenTwoPoints(collidedObject.position, this.parent.position);

                    var direction = polarToVector(1, -angle);
                    direction.x = -direction.x;
                    collidedObject.getComponent("characterController").enterKnockBackState(direction);
                }
                hitList.push(collidedObject);
            }
        }
    };

    function isDashingAnimationOver() {
        return Date.now() - animationStartTime > dashAnimationDuration;
    }

    this.enterDashSate = function () {
        animationStartTime = Date.now();
    };

    this.dashUpdate = function(deltaTime, direction, functionOnOver, caller) {
        if (isDashingAnimationOver()) {
            functionOnOver.call(caller);
            return;
        }

        var moveDirection = direction.copy();
        moveDirection.multiplyByScalar(dashSpeed * deltaTime);
        rigidBodyComponent.move(moveDirection);
    };

    function isRangedAttackAnimationOver() {
        return Date.now() - animationStartTime > attack2AnimationDuration;
    }

    this.enterRangedAttack = function () {
        animationStartTime = Date.now();
        if(!animationComponent.isAnimationPlaying(meleeAttackAnimation)){
            animationComponent.setAnimation(AnimationManager.getAnimation(meleeAttackAnimation));
        }
    };

    this.rangedAttack = function(deltaTime, functionOnOver, caller) {
        if (isRangedAttackAnimationOver()) {
            this.throwProjectile();
            functionOnOver.call(caller);
        }
    };

    this.throwProjectile = function () {
        var bulletTest = new ProjectileGameObject(this.parent.scene,new Vector2(this.parent.position.x,this.parent.position.y+40),
            "poo", polarToVector(1,this.parent.rotation), "projectile", attackHitTag);
        this.parent.scene.createObject(bulletTest);
    };

    this.onCreate(parent);
}