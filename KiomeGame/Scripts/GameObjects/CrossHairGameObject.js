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
        const crossHairSize = FarofaGame.getGlobalVariable("tileSize")/2;
        this.addComponent("sprite", new SpriteComponent(this,
            0, "hud", "crossHair", new Rectangle(0,0,crossHairSize,crossHairSize)));
        this.addComponent("followMouse", new FollowMouseComponent(this,this.scene.camera));
    }
}