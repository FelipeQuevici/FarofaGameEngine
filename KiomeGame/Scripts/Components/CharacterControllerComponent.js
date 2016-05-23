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

    this.enterMeleeAttackState = function () {
        attackAnimationStartTime = Date.now();
        if(!animationComponent.isAnimationPlaying(meleeAttackAnimation)){
            animationComponent.setAnimation(AnimationManager.getAnimation(meleeAttackAnimation));
        }
        attackCollisionComponent.enable = true;
    };

    var attackAnimationStartTime;
    var attack1AnimationDuration = 500;
    var attack2AnimationDuration = 500;
    var dashAnimationDuration = 100;

    var dashCoolDown = 100;
    var lastDash = Date.now();


    function isMeleeAttackAnimationOver() {
        return Date.now() - attackAnimationStartTime > attack1AnimationDuration;
    }

    this.meleeAttackUpdate = function (direction, deltaTime, functionOnOver, caller) {
        if (isMeleeAttackAnimationOver()) {
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

    this.onAttackHit = function (collisions) {
        for (var collision in collisions) {
            var collidedObject = collisions[collision].parent;
            if (collidedObject.tag == attackHitTag && hitList.indexOf(collidedObject) == -1) {
                collidedObject.getComponent("enemyStats").removeLife(1);
                hitList.push(collidedObject);
            }
        }
    };

    function isDashingAnimationOver() {
        return Date.now() - attackAnimationStartTime > dashAnimationDuration
    }

    this.enterDashSate = function () {
        attackAnimationStartTime = Date.now();
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
        return Date.now() - attackAnimationStartTime > attack2AnimationDuration;
    }

    this.enterRangedAttack = function () {
        attackAnimationStartTime = Date.now();
    };

    this.rangedAttack = function(deltaTime, functionOnOver, caller) {
        if (isRangedAttackAnimationOver()) {
            this.throwProjectile();
            functionOnOver.call(caller);
        }
    };

    this.throwProjectile = function () {
        var bulletTest = new ProjectileGameObject(this.parent.scene,new Vector2(this.parent.position.x,this.parent.position.y+40),
            "poo", polarToVector(1,this.parent.rotation));
        this.parent.scene.createObject(bulletTest);
    };

    this.onCreate(parent);
}