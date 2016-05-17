/**
 * Created by Felipe on 16/05/2016.
 */

ProjectileBehaviourComponent.inheritsFrom(Component);

function ProjectileBehaviourComponent(parent, direction) {
    var timeCreated;
    var duration;
    var projectileSpeed;

    this.onCreate = function (parent, direction) {
        this.parent = parent;
        direction.normalize();
        projectileSpeed = 400;
        direction.multiplyByScalar(projectileSpeed);
        timeCreated = Date.now();
        duration = 2000;
    };

    this.onPreUpdate = function (deltaTime) {
        if (Date.now() - timeCreated > duration) {
        }
        var toMove = new Vector2(direction.x, direction.y);
        toMove.multiplyByScalar(deltaTime);
        this.parent.getComponent("rigidBody").move(toMove);
    };


    this.onCreate(parent, direction);
}