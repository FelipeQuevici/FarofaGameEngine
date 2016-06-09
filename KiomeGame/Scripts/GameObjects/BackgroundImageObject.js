/**
 * Created by Felipe on 08/06/2016.
 */

BackgroundImageObject.inheritsFrom(GameObject);

function BackgroundImageObject(scene, spriteName) {
    function onCreate(scene) {
        this.onCreateGameObject(scene,0,0);
    }

    this.onInitialize = function () {
        var s = this.addComponent("sprite", new SpriteComponent(this,0,"GUI",spriteName));
        s.enabled = true;
    };

    onCreate.call(this, scene);
}