/**
 * Created by Felipe on 16/05/2016.
 */

function EnemyStatsComponent(parent) {
    var currentLife;
    var maxLife;    

    this.onCreate = function (parent) {
        this.parent = parent;
        maxLife = 3;
        currentLife = maxLife;
        this.money = Math.floor(Math.random()*5+5);
    };

    this.removeLife = function (amount) {
        currentLife -= amount;
        console.log(currentLife);
        if (currentLife <= 0) {
            this.parent.scene.destroyObject(this.parent);
        }
    };

    this.onCreate(parent);
}

EnemyStatsComponent.inheritsFrom(Component);
