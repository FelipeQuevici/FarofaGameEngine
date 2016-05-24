/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyBehaviourComponent(parent, target) {
    var lastChangedDirection;
    var timeNextChangeDirection;
    var direction;
    var enemySpeed = 150;


    var attackDistance = 30;

    var characterController;

    this.changeDirection = function () {
        lastChangedDirection = Date.now();
        timeNextChangeDirection = Math.random() * 2000 + 2000;
        direction = polarToVector(1, 45 * Math.floor(Math.random() * 7));
    };

    this.onCreate = function (parent) {
        this.parent = parent;
        characterController = this.parent.getComponent("characterController");
        this.changeDirection();
    };

    function shouldChangeDirection() {
        return Date.now() - lastChangedDirection > timeNextChangeDirection;
    }

    var isMoving = true;
    var lastToMove;

    function goBackToMove() {
        isMoving = true;
    }

    this.onPreUpdate = function (deltaTime) {

        if (isMoving) {
            this.parent.rotation =  angleBetweenTwoPoints(this.parent.position, target.position);
            var toMove = polarToVector(1, this.parent.rotation);
            lastToMove = toMove.copy();
            var distance = distanceBetweenTwoPoints(this.parent.position, target.position);
            console.log(distance);
            if (distance < attackDistance) {
                console.log("Deve atacar");
                characterController.enterMeleeAttackState();
                isMoving = false;
            }
            characterController.move(toMove, deltaTime);
        }
        else {
            characterController.meleeAttackUpdate(lastToMove,deltaTime,goBackToMove, this);
        }

        /*toMove.multiplyByScalar(deltaTime * enemySpeed);
        this.parent.getComponent("rigidBody").move(toMove, this.onCollision, this);*/
    };

    this.onCreate(parent);


}

EnemyBehaviourComponent.inheritsFrom(Component);