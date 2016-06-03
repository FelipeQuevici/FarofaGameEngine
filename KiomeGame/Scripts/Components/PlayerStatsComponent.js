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
    var drinksInventory = {};
    var selectedDrink = null;
    var drinkInventory = {};
    
    this.reset = function () {
        this.currentHealth = this.maxHealth;
        currentMoney = 0;
        this.moveSpeed = 300;
        playerController.setMoveSpeed(this.moveSpeed);
    };

    this.restoreHealth = function (value) {
        this.currentHealth = clamp(this.currentHealth+value,0,this.maxHealth);
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
        drinksInventory = [];
        this.reset();
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("enemyDied", enemyDied, this);
        EventCenterInstance.getInstance().unsubscribeEvent("waveStarted", waveStarted, this);
        EventCenterInstance.getInstance().unsubscribeEvent("waveEnded", waveEnded, this);
    };

    this.hasDrinkEquiped = function (index) {
        return drinkInventory[index] != null;
        //return selectedDrink != null;
    };

    this.drinkOnSlot = function (index) {
        return drinkInventory[index];
    };

    var lastIndex = 2;

    this.addMaximumHealth = function () {
        lastIndex += 1;
        var newMaxHealth = clamp(this.maxHealth+2,0,18);
        if (this.maxHealth != newMaxHealth) {
            this.maxHealth = newMaxHealth;
            this.parent.scene.createObject(new PlayerLifeGUIGameObject(this.parent.scene, this.parent, lastIndex));
        }
    };

    this.buyDrink = function (drink) {
        if (currentMoney >= drink.price) {
            selectedDrink = drink;
            drinkInventory[drink.index] = drink;
            currentMoney -= drink.price;
            EventCenterInstance.getInstance().callEvent("changedDrink"+drink.index,this);
        }
    };

    this.getCurrentDrink = function () {
        return selectedDrink;
    };

    this.isUnderBonus = function () {
        return isUnderBonus;
    };

    this.drinkSelectedDrink = function (index) {
        if (isUnderBonus) return;

        if (drinkInventory[index]) {
            drinkInventory[index].drinkEffect();
            drinkInventory[index] = null;
            console.log(index);
            EventCenterInstance.getInstance().callEvent("changedDrink"+index,this);
        }

        /*if (selectedDrink) {
            selectedDrink.drinkEffect();
            bool = true;
        }
        selectedDrink = null;
        if (bool) {
            EventCenterInstance.getInstance().callEvent("changedDrink",this);
        }*/
    };

    this.removeLife = function (amount) {
        if (isInvincible) return;

        var a = Math.round(Math.random()+1);
        AudioManager.playAudio("MonkeyHit"+a);

        this.currentHealth -= amount;
        addAdrenaline += 2;  
        EventCenterInstance.getInstance().callEvent("playerLoseHealth", this);
        
        if (this.currentHealth <= 0) {
            this.parent.scene.gameOver();
        }
    };

    this.getCurrentMoney = function () {
        return currentMoney;
    };
    
    this.getMaxAdrenaline = function () {
    	return maxAdrenaline;
    };

    var enemyDied = function (args) {
        var enemy = args["enemy"];
        var value = enemy.getComponent("stats").money;
        currentMoney += value;
        addAdrenaline += 2;        
    };
    
    var waveStarted = function (){
    	waveState = true;
    };
    
    var waveEnded = function (){
    	waveState = false;
    	addAdrenaline = maxAdrenaline;
    	playerController.setMoveSpeed(this.moveSpeed);
    };

    var speedMultiplier = 1;
    var isUnderBonus = false;
    var timeWhenBonusStarted;
    var bonusDuration;
    var isInvincible = false;

    this.startBonus = function (duration) {
        isUnderBonus = true;
        timeWhenBonusStarted = Date.now();
        bonusDuration = duration;
    };

    this.giveSpeedBonus = function (duration, newSpeedMultiplier) {
        speedMultiplier = newSpeedMultiplier;
        EventCenterInstance.getInstance().callEvent("playerBonusStarted",this,{"bonus": "speed"});
        playerController.setMoveSpeed(this.moveSpeed * speedMultiplier);

        this.startBonus(duration);
    };

    this.invincibleBonus = function (duration) {
        isInvincible = true;
        EventCenterInstance.getInstance().callEvent("playerBonusStarted",this,{"bonus": "invincible"});
        this.startBonus(duration);
    };

    function bonusFinished() {
        return Date.now() - timeWhenBonusStarted > bonusDuration;
    }

    this.bonusTimeDuration = function () {
        return bonusDuration;
    };

    this.bonusTimeRemaining = function () {
        return bonusDuration - (Date.now() - timeWhenBonusStarted);
    };

    function finishBonus() {
        speedMultiplier = 1;
        isInvincible = false;
        isUnderBonus = false;
        EventCenterInstance.getInstance().callEvent("playerBonusFinished",this);
    }

    this.onUpdate = function (deltaTime) {
    	if(waveState){    		
    		this.adrenaline -= this.adrenalineReductionSpeed * deltaTime;    
        	if(this.adrenaline <= 0){
        		this.adrenaline = 0;
        		playerController.setMoveSpeed(this.moveSpeed / 2 * speedMultiplier);
        	}else{
        		playerController.setMoveSpeed(this.moveSpeed * speedMultiplier);
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


        if (isUnderBonus) {
            if (bonusFinished())
                finishBonus();
        }
    };    
        
    this.onCreate(parent);
}