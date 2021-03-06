/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyStatsComponent(parent) {
    var currentLife;
    var maxLife;    

    this.onCreate = function (parent) {
        this.parent = parent;
        maxLife = 2;
        currentLife = maxLife;
        this.money = Math.floor(Math.random()*7+3);
    };

    this.removeLife = function (amount) {
        currentLife -= amount;
        AudioManager.playAudio("EnemyHit", false, true);
        //console.log(currentLife);
        if (currentLife <= 0) {
            this.parent.scene.destroyObject(this.parent);
        }
    };

    this.onCreate(parent);
}

EnemyStatsComponent.inheritsFrom(Component);
