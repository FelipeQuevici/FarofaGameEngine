/**
 * Created by Felipe on 17/05/2016.
 */

PlayerStatsComponent.inheritsFrom(Component);

function PlayerStatsComponent(parent) {
    var currentMoney = 0;
    var playerController;
    
    this.onCreate = function (parent) {
        this.parent = parent;
        this.maxHealth = 6;
        this.currentHealth = this.maxHealth;
        this.adrenaline = 10;
        this.adrenalineReductionSpeed = 2;
        this.moveSpeed = 200;
        currentMoney = 0;
        playerController = this.parent.getComponent("playerController");
        playerController.setMoveSpeed(this.moveSpeed);
        EventCenterInstance.getInstance().subscribeEvent("enemyDied", enemyDied, this);
    };

    this.removeLife = function (amount) {
        this.currentHealth -= amount;
        EventCenterInstance.getInstance().callEvent("playerLoseHealth", this);
    };

    this.getCurrentMoney = function () {
        return currentMoney;
    };

    var enemyDied = function (args) {
        var enemy = args["enemy"];
        var value = enemy.getComponent("stats").money;
        currentMoney += value;
        this.adrenaline += 20;
        //console.log("adrenaline: "+this.adrenaline);
    };
    
    this.onUpdate = function (deltaTime) {
    	this.adrenaline -= this.adrenalineReductionSpeed * deltaTime;    
    	if(this.adrenaline <= 0){
    		//console.log("adrenaline: "+this.adrenaline);
    		this.adrenaline = 0;
    		playerController.setMoveSpeed(this.moveSpeed / 4);
    	}else{
    		playerController.setMoveSpeed(this.moveSpeed);
    	}
    	
    };    
        
    this.onCreate(parent);
}