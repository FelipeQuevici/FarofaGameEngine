/**
 * Created by Felipe on 23/05/2016.
 */

DrinkingSaleOverlayGameObject.inheritsFrom(GameObject);

function DrinkingSaleOverlayGameObject(parent, position, drink) {
    function onCreate(parent, position, drink) {
        this.onCreateGameObject(parent,position,0);
        this.drink = drink;
    }

    var spriteComponent;
    
    this.onInitialize = function () {
        spriteComponent = this.addComponent("sprite", new SpriteComponent(this, 0, "hud",this.drink.name+"overlay"));
        spriteComponent.enabled = false;
    };

    this.setActive = function (value) {
        spriteComponent.enabled = value;
    };
    
    onCreate.call(this, parent, position, drink);
}