/**
 * Created by Felipe on 17/05/2016.
 */

PlayerStatsComponent.inheritsFrom(Component);

function PlayerStatsComponent(parent) {
    var currentMoney = 0;
    var playerController;
    var waveState = false;
    var addAdrenaline = 0;
    var maxAdrenaline = 10;

    this.reset = function () {
        this.currentHealth = this.maxHealth;
        currentMoney = 0;
        this.moveSpeed = 200;
        playerController.setMoveSpeed(this.moveSpeed);
    };

    this.onCreate = function (parent) {
        this.parent = parent;
        this.maxHealth = 6;
        this.adrenaline = maxAdrenaline;
        this.adrenalineReductionSpeed = 0.7;
        playerController = this.parent.getComponent("playerController");
        EventCenterInstance.getInstance().subscribeEvent("enemyDied", enemyDied, this);
        EventCenterInstance.getInstance().subscribeEvent("waveStarted", waveStarted, this);
        EventCenterInstance.getInstance().subscribeEvent("waveEnded", waveEnded, this);
        this.reset();
    };

    this.removeLife = function (amount) {
        this.currentHealth -= amount;
        EventCenterInstance.getInstance().callEvent("playerLoseHealth", this);

        if (this.currentHealth <= 0) {
            this.parent.scene.gameOver();
        }
    };

    this.getCurrentMoney = function () {
        return currentMoney;
    };

    var enemyDied = function (args) {
        var enemy = args["enemy"];
        var value = enemy.getComponent("stats").money;
        currentMoney += value;
        addAdrenaline += 1;        
    };
    
    var waveStarted = function (){
    	waveState = true;
    };
    
    var waveEnded = function (){
    	waveState = false;
    	addAdrenaline = maxAdrenaline;
    	playerController.setMoveSpeed(this.moveSpeed);
    };
    
    this.onUpdate = function (deltaTime) {    	
    	if(waveState){    		
    		this.adrenaline -= this.adrenalineReductionSpeed * deltaTime;    
        	if(this.adrenaline <= 0){
        		this.adrenaline = 0;
        		playerController.setMoveSpeed(this.moveSpeed / 4);
        	}else{
        		playerController.setMoveSpeed(this.moveSpeed);
        	}
    	}  
    	
    	if(addAdrenaline > 0){
    		this.adrenaline += this.adrenalineReductionSpeed * deltaTime * 3;    
    		addAdrenaline -= this.adrenalineReductionSpeed * deltaTime * 3;
    		if(this.adrenaline >= maxAdrenaline){
        		this.adrenaline = maxAdrenaline;
        		addAdrenaline = 0;
        	}
    	}
    };    
        
    this.onCreate(parent);
}