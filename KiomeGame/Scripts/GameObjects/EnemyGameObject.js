/**
 * Created by Felipe on 16/05/2016.
 */


function EnemyGameObject(scene, position, rotation) {

    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation , 'enemy');
    }

    onCreate.call(this, scene, position, rotation);

    this.onInitialize = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");

        this.addComponent("rigidBody", new RigidBodyComponent(this));

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "enemy_idle1"
            ));

        this.addComponent("enemyBehaviour", new EnemyBehaviourComponent(this));
        this.addComponent("enemyStats", new EnemyStatsComponent(this));
    };
}

EnemyGameObject.inheritsFrom(GameObject);
