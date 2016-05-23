/**
 * Created by Felipe on 16/05/2016.
 */


function EnemyGameObject(scene, position, rotation) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation , 'enemy');
    }

    onCreate.call(this, scene, position, rotation);

    this.onInitialize = function () {
        this.addComponent("rigidBody", new RigidBodyComponent(this));

        this.addComponent("sprite", new SpriteComponent(this,
            7,
            "objectsLayer",
            "enemyIdle1"
            ));

        this.addComponent("animation", new AnimationComponent(this, "enemyIdle", this.getComponent("sprite")));
        var character = this.addComponent("characterController", new CharacterControllerComponent(this));
        character.setWalkAnimation("enemyWalking");
        character.setIdleAnimation("enemyIdle");
        character.setMeleeAttackAnimation("enemyAttack");

        this.addComponent("enemyBehaviour", new EnemyBehaviourComponent(this));
        this.addComponent("enemyStats", new EnemyStatsComponent(this));
    };
}

EnemyGameObject.inheritsFrom(GameObject);
