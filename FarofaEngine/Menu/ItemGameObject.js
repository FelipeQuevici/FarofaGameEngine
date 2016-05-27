/**
 * Created by Felipe on 26/05/2016.
 */

ItemGameObject.inheritsFrom(GameObject);

function ItemGameObject(scene, menu, name, functionToCall, caller) {
    var textComponent;
    function onCreate(scene, menu, name, functionToCall, caller) {
        this.onCreateGameObject(scene, new Vector2(), 0);
        this.menu = menu;
        this.name = name;
        this.functionToCall = functionToCall;
        this.caller = caller;
        this.menu.addItem(this);
    }

    this.onInitialize = function () {
        textComponent = this.addComponent("text", new TextComponent(this, this.name,"GUI","gray","30pt Arial"));
        this.position = new Vector2(canvas.width/2, this.menu.positionOf(this));
    };

    this.select = function () {
        textComponent.color = "yellow";
    };

    this.unselect = function () {
        textComponent.color = "gray";
    };

    this.click = function () {
        this.functionToCall.call(caller);
    };

    onCreate.call(this, scene, menu, name, functionToCall, caller);
}