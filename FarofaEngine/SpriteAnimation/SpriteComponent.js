/**
 * Created by Felipe on 06/05/2016.
 */

function SpriteComponent(parent, spriteName, rectangle, totalDirections, layer) {

    function onCreate(parent, spriteName, rectangle, totalDirections, layer) {
        var currentScene = parent.scene;
        this.totalDirections = totalDirections;
        this.parent = parent;
        this.spriteName = spriteName;
        this.rectangle = rectangle;
        if (totalDirections > 0) {
            this.currentDirection = 0;
        }
        else {
            this.currentDirection = null;
        }
        this.sprite = SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection);
        currentScene.addSpriteToLayer(this, layer);
    }
    
    onCreate.call(this, parent, spriteName, rectangle, totalDirections, layer);

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        /* for (var collisionComponent in this.sprite.spriteInformation.collision) {
         this.parent.getComponent(collisionComponent).updateBox(this.sprite.spriteInformation.collision[collisionComponent]);
         }*/
    };

    // TODO: Calculate direction based on angle
    function angleToDirection(angle) {
        return angle / (360 / (totalDirections+1) );
    }


    this.onPostUpdate = function () {
        this.setPosition(this.parent.position);
        this.setAngle(this.parent.rotation);
    };

    this.setPosition = function (position) {
        this.sprite.rectangle.x = position.x;
        this.sprite.rectangle.y = position.y;
    };
    
    this.setAngle = function (angle) {
        if (this.totalDirections > 0) {
            this.currentDirection = angleToDirection(angle);
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection));
        }
    };

    this.draw = function (context) {
        this.sprite.draw(context);
    }
}

SpriteComponent.inheritsFrom(Component);