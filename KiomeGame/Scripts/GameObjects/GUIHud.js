/**
 * Created by Felipe on 18/05/2016.
 */

GUIHud.inheritsFrom(GameObject);

function GUIHud(scene) {

    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(100,100),0);
    }


    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,0,"GUI","crossHair"));
    };

    onCreate.call(this, scene);
}