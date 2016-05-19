/**
 * Created by Felipe on 17/05/2016.
 */


function EnemySpawnPointGameObject(scene, position, rotation) {
    function onCreate(scene, position) {
        this.onCreateGameObject(scene, position, 0);
    }

    this.onInitialize = function () {
        this.addComponent("collisionBox", new CollisionBoxComponent(this));
        this.addComponent("sprite", new SpriteComponent(this,0,"invisible","sand01"));

        this.components["collisionBox"].updateCollisionInfo(this.components.sprite.sprite.
            spriteInformation.collisions["collisionBox"], this.components.sprite.sprite.spriteInformation);

    };

    this.checkIfIsFree = function () {
        var component = this.getComponent("collisionBox");
        var col = this.scene.collisionSystem.checkCollision(component);
        return col.length == 0;
    };

    onCreate.call(this,scene, position, rotation);
}

EnemySpawnPointGameObject.inheritsFrom(GameObject);
