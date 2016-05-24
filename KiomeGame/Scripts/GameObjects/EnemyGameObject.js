/**
 * Created by Felipe on 16/05/2016.
 */


function EnemyGameObject(scene, position, rotation, target) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation , 'enemy');
    }

    this.onInitialize = function () {
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("attackCollisionBox", new CollisionBoxComponent(this));
        this.getComponent("attackCollisionBox").enable = false;
        
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

        this.addComponent("enemyBehaviour", new EnemyBehaviourComponent(this, target));
        this.addComponent("enemyStats", new EnemyStatsComponent(this));
    };

    onCreate.call(this, scene, position, rotation, target);

}

EnemyGameObject.inheritsFrom(GameObject);
