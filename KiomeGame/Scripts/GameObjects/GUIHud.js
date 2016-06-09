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
        
        //  console.log(spriteName);
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

HelperDialogGUIGameObject.inheritsFrom(GameObject);

function HelperDialogGUIGameObject(scene) {
    var spriteComponent;
    var isActive;

    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(canvas.width-230,50),0);
    }

    var dialogDuration = 2;
    var dialogTimeSoFar;

    function showErrorDialog(args) {
        isActive = true;
        dialogTimeSoFar = 0;
        AudioManager.playAudio("Wrong");
        spriteComponent.setSpriteName(args["message"]);
        spriteComponent.enabled = true;
        dialogDuration = 2;
    }

    function hideDialog() {
        isActive = false;
        spriteComponent.enabled = false;
    }

    this.onInitialize = function () {
        spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"GUI","error_no_money"));
        spriteComponent.enabled = false;
        isActive = false;
        EventCenterInstance.getInstance().subscribeEvent("DialogError",showErrorDialog,this);
        EventCenterInstance.getInstance().subscribeEvent("DialogWarning",showWarningDialog,this);
    };

    function showWarningDialog(args) {
        isActive = true;
        dialogTimeSoFar = 0;
        spriteComponent.setSpriteName(args["message"]);
        spriteComponent.enabled = true;
        dialogDuration = 4;
    }

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("DialogError",showErrorDialog,this);
        EventCenterInstance.getInstance().unsubscribeEvent("DialogWarning",showWarningDialog,this);
    };

    this.onUpdate = function (deltaTime) {
        if (!isActive) return;

        dialogTimeSoFar += deltaTime;
        //console.log(dialogTimeSoFar + " " + deltaTime + " " + dialogDuration);
        if (dialogTimeSoFar > dialogDuration) {
            hideDialog();
        }
    };


    onCreate.call(this, scene);
}

NextWaveDialog.inheritsFrom(GameObject);

function NextWaveDialog(scene) {
    var spriteComponent;
    var textComponent;
    var isActive;

    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(canvas.width/2,canvas.height-55),0);
    }

    var timeToNextWave = 10;
    var timeLeft;
    var text = "\t" + timeToNextWave;

    function waveStarted(args) {
        timeToNextWave = args["time"];
        timeLeft = timeToNextWave;
        isActive = true;
        spriteComponent.enabled = true;
        textComponent.enabled = true;
    }

    function waveEnded() {
        isActive = false;
        spriteComponent.enabled = false;
        textComponent.enabled = false;
    }

    this.onInitialize = function () {
        var text = "\t" + 10;
        timeLeft = timeToNextWave;
        spriteComponent = this.addComponent("sprite", new SpriteComponent(this,0,"GUI","next_wave_display"));
        textComponent = this.addComponent("text", new TextComponent(this,text,"GUI","black","40px Arial"));
        textComponent.setOffset(new Vector2(-90,10));
        isActive = true;
        EventCenterInstance.getInstance().subscribeEvent("waveStarted",waveEnded,this);
        EventCenterInstance.getInstance().subscribeEvent("waveEnded",waveStarted,this);
    };

    this.unsubscribeEvents = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("waveStarted",waveEnded,this);
        EventCenterInstance.getInstance().unsubscribeEvent("waveEnded",waveStarted,this);
    };

    this.onUpdate = function (deltaTime) {
        if (!isActive) return;

        timeLeft -= deltaTime;
        text = "Next Wave:" + Math.ceil(timeLeft);
        textComponent.setText(text);
    };


    onCreate.call(this, scene);
}