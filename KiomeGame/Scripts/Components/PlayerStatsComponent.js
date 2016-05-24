/**
 * Created by Felipe on 17/05/2016.
 */

PlayerStatsComponent.inheritsFrom(Component);

function PlayerStatsComponent(parent) {
    var currentMoney = 0;
    var playerController;
    var waveState = false;
    
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
        EventCenterInstance.getInstance().subscribeEvent("waveStarted", waveStarted, this);
        EventCenterInstance.getInstance().subscribeEvent("waveEnded", waveEnded, this);
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
        this.adrenaline += 1;        
    };
    
    var waveStarted = function (){
    	var waveState = true;
    };
    
    var waveEnded = function (){
    	var waveState = false;
    	this.adrenaline = 10;
    };
    
    this.onUpdate = function (deltaTime) {
    	console.log("adrenaline: "+this.adrenaline);
    	if(waveState){
    		this.adrenaline -= this.adrenalineReductionSpeed * deltaTime;    
        	if(this.adrenaline <= 0){
        		this.adrenaline = 0;
        		playerController.setMoveSpeed(this.moveSpeed / 4);
        	}else{
        		playerController.setMoveSpeed(this.moveSpeed);
        	}
    	}    	    
    };    
        
    this.onCreate(parent);
}