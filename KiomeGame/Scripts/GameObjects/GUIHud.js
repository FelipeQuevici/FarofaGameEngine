/**
 * Created by Felipe on 18/05/2016.
 */

PlayerLifeGUIGameObject.inheritsFrom(GameObject);

function PlayerLifeGUIGameObject(scene, player, index) {

    var setType = function () {
        var currentLife = this.player.getComponent("playerStat").currentHealth;

        if (currentLife >= (this.index + 1) * 2) {
            this.type = "Life";
        }
        else if (currentLife > (this.index)(2)) {
            this.type = "Half_life";
        }
        else {
            this.type = "Empty_Life";
        }
    };

    function onCreate(scene, player, index) {
        this.onCreateGameObject(scene,new Vector2(10+85*index,10),0);
        this.index = index;
        this.player = player;
    }

    this.updateSprite = function () {
        this.parent.getComponent("sprite").setSpriteName(this.type);
    };

    this.playerLoseHealth = function() {
        setType.call(this);
        this.updateSprite();
    };

    this.onInitialize = function () {
        setType.call(this, index);
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI",this.type));
        EventCenterInstance.getInstance().subscribeEvent("playerLoseHealth", this.playerLoseHealth);
    };

    onCreate.call(this, scene, player, index);
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
        this.getComponent("textComponent").setText("x " + this.player.getComponent("playerStat").getCurrentMoney());
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