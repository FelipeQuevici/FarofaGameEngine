/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyBehaviourComponent(parent) {
    var lastChangedDirection;
    var timeNextChangeDirection;
    var direction;
    var enemySpeed = 150;

    this.changeDirection = function () {
        lastChangedDirection = Date.now();
        timeNextChangeDirection = Math.random() * 2000 + 2000;
        direction = polarToVector(1, 45 * Math.floor(Math.random() * 7));
    };

    this.onCreate = function (parent) {
        this.parent = parent;
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
        toMove.multiplyByScalar(deltaTime * enemySpeed);
        this.parent.rotation = toMove.angle();
        this.parent.getComponent("rigidBody").move(toMove, this.onCollision, this);
    };

    this.onCreate(parent);


}

EnemyBehaviourComponent.inheritsFrom(Component);