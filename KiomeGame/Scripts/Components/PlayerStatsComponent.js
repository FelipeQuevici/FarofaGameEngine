/**
 * Created by Felipe on 17/05/2016.
 */

PlayerStatsComponent.inheritsFrom(Component);

function PlayerStatsComponent(parent) {
    var currentMoney = 0;

    this.onCreate = function (parent) {
        this.parent = parent;
        this.maxHealth = 6;
        this.currentHealth = this.maxHealth;
        currentMoney = 0;
        EventCenterInstance.getInstance().subscribeEvent("enemyDied", enemyDied);
    };

    this.getCurrentMoney = function () {
        return currentMoney;
    };

    var enemyDied = function (args) {
        var enemy = args["enemy"];
        var value = enemy.getComponent("enemyStats").money;
        currentMoney += value;
    };

    this.onCreate(parent);
}