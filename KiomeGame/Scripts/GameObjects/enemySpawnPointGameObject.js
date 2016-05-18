/**
 * Created by Felipe on 17/05/2016.
 */

EnemySpawnPointGameObject.inheritsFrom(GameObject);

function EnemySpawnPointGameObject(scene, position, rotation) {
    function onCreate(scene, position) {
        this.scene = scene;
        this.position = position;
        this.rotation = rotation;
    }

    this.onInitialize = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");


        this.addComponent("collisionBox", new CollisionBoxComponent(this));
        this.addComponent("sprite", new SpriteComponent(this,0,"objectsLayer","oldPoo",new Rectangle(position.x, position.y,
                        16,16)));
    };

    this.checkIfIsFree = function () {
        return this.scene.collisionSystem.checkCollision(this.components["collisionBox"]).length == 0;
    };

    onCreate.call(this,scene, position, rotation);
}