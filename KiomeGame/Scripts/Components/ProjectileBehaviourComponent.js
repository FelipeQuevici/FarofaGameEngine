/**
 * Created by Felipe on 16/05/2016.
 */

ProjectileBehaviourComponent.inheritsFrom(Component);

function ProjectileBehaviourComponent(parent, direction, collideTag) {
    var timeCreated;
    var duration;
    var projectileSpeed;

    this.onCreate = function (parent, direction, collideTag) {
        this.parent = parent;
        direction.normalize();
        projectileSpeed = 1000;
        direction.multiplyByScalar(projectileSpeed);
        timeCreated = Date.now();
        duration = 5000;
        this.collideTag = collideTag || "enemy";
    };

    this.onCollision = function(collisions) {
        for (var collision in collisions) {
            var collidedObject = collisions[collision].parent;
            if (collidedObject.tag == this.collideTag && !collidedObject.wasDestroyed) {
                var enemyBehaviour = collidedObject.getComponent("enemyBehaviour");
                if (enemyBehaviour) {
                    collidedObject.getComponent("characterController").stun(1000);
                    enemyBehaviour.setIsMelee(true);
                }
                var playerController = collidedObject.getComponent("playerController");
                if (playerController) {
                    collidedObject.getComponent("stats").removeLife(1);
                }
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


    this.onCreate(parent, direction, collideTag);
}