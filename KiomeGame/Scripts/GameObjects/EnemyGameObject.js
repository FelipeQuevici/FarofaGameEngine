/**
 * Created by Felipe on 16/05/2016.
 */


function EnemyGameObject(scene, position, rotation, target) {
    function onCreate(scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation , 'enemy');
    }

    this.onInitialize = function () {
        this.addComponent("rigidBody", new RigidBodyComponent(this));
        var attackCollisionBox = this.addComponent("attackCollisionBox", new CollisionBoxComponent(this));
        attackCollisionBox.enable = false;
        attackCollisionBox.collisionInfo = new Circle(0,0);

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
        character.setKnockBackAnimation("enemyIdle");
        character.setStunedAnumation("enemyIdle");
        character.setHitTag("player");
        character.setRangedAttackDuration(1000);

        var e = this.addComponent("enemyBehaviour", new EnemyBehaviourComponent(this, target));
        e.setIsMelee(false);
        this.addComponent("stats", new EnemyStatsComponent(this));
    };

    onCreate.call(this, scene, position, rotation, target);

}

EnemyGameObject.inheritsFrom(GameObject);
