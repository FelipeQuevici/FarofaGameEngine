/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyBehaviourComponent(parent, target) {
    var lastChangedDirection;
    var timeNextChangeDirection;
    var direction;
    var isMelee = true;

    var attackMeleeDistance = 30;
    var attackRangedDistance = 300;

    var characterController;

    this.changeDirection = function () {
        lastChangedDirection = Date.now();
        timeNextChangeDirection = Math.random() * 2000 + 2000;
        direction = polarToVector(1, 45 * Math.floor(Math.random() * 7));
    };

    this.onCreate = function (parent) {
        this.parent = parent;
        this.tag = "enemy";
        characterController = this.parent.getComponent("characterController");
        this.changeDirection();
    };

    this.setIsMelee = function (value) {
        isMelee = value;
    };

    var isMoving = true;
    var lastToMove;

    function goBackToMove() {
        isMoving = true;
    }

    this.onPreUpdate = function (deltaTime) {
        if (characterController.isBeingKnockedBack()) {
            characterController.knockBackState(deltaTime, goBackToMove, this);
        }
        else if (characterController.isStuned()) {
            characterController.stunUpdate(deltaTime, goBackToMove, this);
        }
        else {
            if (isMoving) {
                this.parent.rotation =  angleBetweenTwoPoints(this.parent.position, target.position);
                var toMove = polarToVector(1, this.parent.rotation);
                lastToMove = toMove.copy();
                var distance = distanceBetweenTwoPoints(this.parent.position, target.position);
                if (isMelee) {
                    if (distance < attackMeleeDistance) {
                        characterController.enterMeleeAttackState();
                        isMoving = false;
                        return;
                    }
                }
                else {
                    if (distance < attackRangedDistance) {
                        characterController.enterRangedAttack();
                        isMoving = false;
                        return;
                    }
                }
                characterController.move(toMove, deltaTime);
            }
            else {
                if (isMelee) {
                    characterController.meleeAttackUpdate(lastToMove, deltaTime, goBackToMove, this);
                }
                else {
                    characterController.rangedAttack(deltaTime, goBackToMove, this);
                }
            }
        }

    };

    this.onCreate(parent);


}

EnemyBehaviourComponent.inheritsFrom(Component);