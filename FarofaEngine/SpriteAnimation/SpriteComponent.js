/**
 * Created by Felipe on 06/05/2016.
 */

function SpriteComponent(parent, sprite) {

    function onCreate(parent, sprite, rectangle, totalDirections, layer) {
        var currentScene = SceneManager.getCurrentScene();
        this.totalDirections = totalDirections;
        this.parent = parent;
        this.spriteName = sprite;
        this.rectangle = rectangle;
        if (totalDirections > 0) {
            this.currentDirection = 0;
        }
        else {
            this.currentDirection = "";
        }
        this.sprite = SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection);
        currentScene.addSprite(this, layer);
    }
    
    onCreate.call(this, parent, sprite);

    // TODO: Calculate direction based on angle
    function angleToDirection() {
        return 0;
    }
    
    this.onPostUpdate = function () {
        this.setAngle(this.parent.rotation);
    };

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        for (var collisionComponent in this.sprite.spriteInformation.collision) {
            this.parent.getComponent(collisionComponent).updateBox(this.sprite.spriteInformation.collision[collisionComponent]);
        }
    };
    
    this.setAngle = function (angle) {
        if (this.totalDirections > 0) {
            this.currentDirection = angleToDirection.(angle);
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection));
        }
    };

    this.draw = function (context) {
        this.sprite.draw(context);
    }
}