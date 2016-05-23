/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyBehaviourComponent(parent) {
    var lastChangedDirection;
    var timeNextChangeDirection;
    var direction;
    var enemySpeed = 150;

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

    this.onPreUpdate = function (deltaTime) {
        if (shouldChangeDirection())
        {
            this.changeDirection();
        }

        var toMove = new Vector2(direction.x, direction.y);
        this.parent.rotation = toMove.angle();

        characterController.move(toMove, deltaTime);
        /*toMove.multiplyByScalar(deltaTime * enemySpeed);
        this.parent.getComponent("rigidBody").move(toMove, this.onCollision, this);*/
    };

    this.onCreate(parent);


}

EnemyBehaviourComponent.inheritsFrom(Component);