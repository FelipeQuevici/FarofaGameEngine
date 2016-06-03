/**
 * Created by Felipe on 18/05/2016.
 */

PlayerLifeGUIGameObject.inheritsFrom(GameObject);

function PlayerLifeGUIGameObject(scene, player, index) {

   var type;

    var setType = function () {
        var currentLife = player.getComponent("stats").currentHealth;

        if (currentLife >= (index + 1) * 2) {
            type = "Life";
        }
        else if (currentLife > (index) * (2)) {
            type = "Half_Life";
        }
        else {
            type = "Empty_Life";
        }
    };

    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(10+85*index,10),0);
        type = "Life";
    }

    var updateSprite = function () {
        this.getComponent("sprite").setSpriteName(type);
    };


    this.playerLoseHealth = function() {
        setType.call(this);
        updateSprite.call(guihud);
    };

    this.onInitialize = function () {
        setType.call(this, index);
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI",type));
        EventCenterInstance.getInstance().subscribeEvent("playerLoseHealth", this.playerLoseHealth, this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("playerLoseHealth", this.playerLoseHealth, this);
    };
    
    onCreate.call(this, scene);
    var guihud = this;
}

MoneyTextGUIGameObject.inheritsFrom(GameObject);

function MoneyTextGUIGameObject(scene, player) {
    function onCreate(scene, player) {
        this.onCreateGameObject(scene, new Vector2(120,880),0);
        this.player = player;
    }

    this.onInitialize = function () {
        this.addComponent("textComponent", new TextComponent(this, 0,"GUI","black", "100px Arial"));
    };

    this.onUpdate = function (deltaTime) {
        this.getComponent("textComponent").setText("x " + this.player.getComponent("stats").getCurrentMoney());
    };

    onCreate.call(this, scene, player);
}

MoneyImageGUIGameObject.inheritsFrom(GameObject);

function MoneyImageGUIGameObject(scene) {
    function onCreate(scene) {
        this.onCreateGameObject(scene, new Vector2(10,800),0);
    }
    
    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI","Coin"));
    };
    
    
    onCreate.call(this, scene);
}

AdrenalineBorderGUIGameObject.inheritsFrom(GameObject);

function AdrenalineBorderGUIGameObject(scene) {
    function onCreate(scene) {
        this.onCreateGameObject(scene, new Vector2(30,90),0);
    }
    
    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI","Stamina_Empty"));
    };    
    
    onCreate.call(this, scene);
}

AdrenalineBarGUIGameObject.inheritsFrom(GameObject);

function AdrenalineBarGUIGameObject(scene, player) {
	var playerStats;
	var barWidth;
	
    function onCreate(scene, player) {
        this.onCreateGameObject(scene, new Vector2(30,90),0);
        this.player = player;        
    }
    
    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI","Stamina_Bar"));
        playerStats = this.player.getComponent("stats");
        barWidth = this.getComponent("sprite").sprite.spriteInformation.w;
    };
    
    this.onUpdate = function (deltaTime) {
    	this.getComponent("sprite").sprite.spriteInformation.w = (barWidth * playerStats.adrenaline) / playerStats.getMaxAdrenaline();
    };
    
    onCreate.call(this, scene, player);
}

DrinkInventoryDisplayIndex.inheritsFrom(GameObject);

function DrinkInventoryDisplayIndex(scene, player, index) {
    var playerStats;
    var spriteComponent;

    function onCreate(scene, player, index) {
        this.onCreateGameObject(scene, new Vector2(20,160+130*(index-1)),0);
        this.player = player;
        this.index = index;
    }

    function changedDrink() {
        var currentDrink = playerStats.drinkOnSlot(this.index);
        var spriteName = "Selection_Box";
        if (currentDrink)
            spriteName = currentDrink.name;
        
        console.log(spriteName);
        spriteComponent.setSpriteName(spriteName);
    }

    this.onInitialize = function () {
        var spriteName = "Selection_Box";

        spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"GUI",spriteName));
        playerStats = player.getComponent("stats");
        EventCenterInstance.getInstance().subscribeEvent("changedDrink"+this.index,changedDrink, this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("changedDrink"+this.index,changedDrink, this);
    };
    
    onCreate.call(this, scene, player, index);
    
}

BonusBorderGUIGameObject.inheritsFrom(GameObject);

function BonusBorderGUIGameObject(scene) {
    var spriteComponent;


    function onCreate(scene) {
        this.onCreateGameObject(scene, new Vector2(30,120),0);
    }

    function setActive() {
        spriteComponent.enabled = true;
    }

    function setUnactive() {
        spriteComponent.enabled = false;
    }

    this.onInitialize = function () {
        spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"GUI","Stamina_Empty"));
        spriteComponent.enabled = false;
        EventCenterInstance.getInstance().subscribeEvent("playerBonusStarted",setActive,this);
        EventCenterInstance.getInstance().subscribeEvent("playerBonusFinished",setUnactive,this);

    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("playerBonusStarted",setActive,this);
        EventCenterInstance.getInstance().unsubscribeEvent("playerBonusFinished",setUnactive,this);
    };

    onCreate.call(this, scene);
}

BonusBarGUIGameObject.inheritsFrom(GameObject);

function BonusBarGUIGameObject(scene, player) {
    var playerStats;
    var barWidth;
    var spriteComponent;

    function onCreate(scene, player) {
        this.onCreateGameObject(scene, new Vector2(30,120),0);
        this.player = player;
    }

    var isActive = false;

    function setActive() {
        spriteComponent.enabled = true;
        isActive = true;
    }

    function setUnactive() {
        spriteComponent.enabled = false;
        isActive = false;
    }

    this.onInitialize = function () {
        spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"GUI","Power_Bar"));
        spriteComponent.enabled = false;
        EventCenterInstance.getInstance().subscribeEvent("playerBonusStarted",setActive,this);
        EventCenterInstance.getInstance().subscribeEvent("playerBonusFinished",setUnactive,this);
        playerStats = this.player.getComponent("stats");
        barWidth = this.getComponent("sprite").sprite.spriteInformation.w;
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("playerBonusStarted",setActive,this);
        EventCenterInstance.getInstance().unsubscribeEvent("playerBonusFinished",setUnactive,this);
    };


    this.onUpdate = function (deltaTime) {
        if (isActive)
            this.getComponent("sprite").sprite.spriteInformation.w = (barWidth * playerStats.bonusTimeRemaining()) / playerStats.bonusTimeDuration();
    };

    onCreate.call(this, scene, player);
}