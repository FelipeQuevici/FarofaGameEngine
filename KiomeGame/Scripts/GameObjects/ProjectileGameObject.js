/**
 * Created by Felipe on 16/05/2016.
 */

ProjectileGameObject.inheritsFrom(GameObject);

function ProjectileGameObject(scene, position, sprite, direction, tag, damageTag) {

    function onCreate(scene,position,direction, tag) {
        this.onCreateGameObject(scene,position,direction.angle(), tag);
    }

    this.onInitialize = function () {
        this.addComponent("collisionBox", new CollisionBoxComponent(this, new Rectangle()));
        this.addComponent("projectileBehaviour", new ProjectileBehaviourComponent(this, direction, damageTag));
        this.addComponent("sprite", new SpriteComponent(this, 0,"objectsLayer",sprite));
    };
    
    onCreate.call(this, scene,position,direction, tag);
}