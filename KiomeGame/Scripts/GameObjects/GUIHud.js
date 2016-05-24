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
        EventCenterInstance.getInstance().subscribeEvent("playerLoseHealth", this.playerLoseHealth);
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
        //console.log(this.player.getComponent("playerStat"));
        //console.log(this.player.getComponent("playerStat").getCurrentMoney());
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