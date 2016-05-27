/**
 * Created by Felipe on 26/05/2016.
 */

MenuScene.inheritsFrom(Scene);

function MenuScene() {
    var menu;
    var item1;
    var item2;
    var item3;

    this.declareObjects = function () {
        this.addLayer("GUI",false,true);
    };

    this.onEnter = function () {
        menu = new MenuGameObject(this);
        this.addObject(menu);
        item1 = new ItemGameObject(this, menu,"New Game", startGame, this);
        this.addObject(item1);
        item2 = new ItemGameObject(this,menu,"Credits", clicouItem2, this);
        this.addObject(item2);
        item3 = new ItemGameObject(this,menu,"Do nothing", clicouItem2, this);
        this.addObject(item3);
        this.initializeObjects();
        menu.selectItem(0);
    };

    this.onUpdate = function () {
    };

    function startGame() {
        SceneManager.changeScene("GameScene");
    }

    function clicouItem2() {
        console.log("Did Nothing");
    }
}