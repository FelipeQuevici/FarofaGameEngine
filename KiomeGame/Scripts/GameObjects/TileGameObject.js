/**
 * Created by Felipe on 09/05/2016.
 */

function TileGameObject(scene, position, rotation, type) {
    var sprite;
    var shouldAddRigidBody = false;

    function onCreate(scene, position, rotation, type) {    	
        const tileSize = FarofaGame.getGlobalVariable("tileSize");
        this.onCreateGameObject(scene,position,rotation);
        sprite = SpriteSheetManager.getSprite(type,new Rectangle(position.x, position.y,tileSize,tileSize));        
        this.setTag(sprite.spriteInformation.tag);
        if (sprite.spriteInformation.hasOwnProperty("collisions")) {
            shouldAddRigidBody = true;
        }
    }
    
    onCreate.call(this,scene,position,rotation,type);

    this.onInitialize = function () {
        if (shouldAddRigidBody) {
            this.addComponent("rigidBody", new RigidBodyComponent(this, sprite.spriteInformation.collisions['rigidBody']));
        }
        this.addComponent("sprite", new SpriteComponent(this, 0, "background", sprite));
    };
}

TileGameObject.inheritsFrom(GameObject);