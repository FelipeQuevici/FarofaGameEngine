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
        projectileSpeed = 200;
        direction.multiplyByScalar(projectileSpeed);
        timeCreated = Date.now();
        duration = 5000;
    };

    this.onCollision = function(collisions) {
        for (var collision in collisions) {
            if (collisions[collision].parent.tag != "player") {
                this.parent.scene.destroyObject(this.parent);
                return;
            }

        }
        //this.parent.scene.destroyObject(this.parent);
    };

    this.onPreUpdate = function (deltaTime) {
        if (Date.now() - timeCreated > duration) {
            this.parent.scene.destroyObject(this.parent);
            return;
        }
        var toMove = new Vector2(direction.x, direction.y);
        toMove.multiplyByScalar(deltaTime);
        this.parent.getComponent("collisionBox").move(toMove, this.onCollision, this);
    };


    this.onCreate(parent, direction);
}