/**
 * Created by Felipe on 12/05/2016.
 */

CrossHairGameObject.inheritsFrom(GameObject);

function CrossHairGameObject(scene) {
    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(),0);
    }

    onCreate.call(this,scene);

    this.onInitialize = function () {
        this.addComponent("sprite", new SpriteComponent(this,
            0, "hud", "crossHair"));
        this.addComponent("followMouse", new FollowMouseComponent(this,this.scene.camera));
    }
}