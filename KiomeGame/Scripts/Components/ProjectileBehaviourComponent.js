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
        projectileSpeed = 300;
        direction.multiplyByScalar(projectileSpeed);
        timeCreated = Date.now();
        duration = 5000;
    };

    this.onCollision = function(collisions) {
        for (var collision in collisions) {
            var collidedObject = collisions[collision].parent;
            if (collidedObject.tag == "enemy" && !collidedObject.wasDestroyed) {
                collidedObject.getComponent("stats").removeLife(1);
                this.parent.scene.destroyObject(this.parent);
                return;
            }
            else if (collidedObject.tag == "solid") {
                this.parent.scene.destroyObject(this.parent);
                return;
            }
        }   
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