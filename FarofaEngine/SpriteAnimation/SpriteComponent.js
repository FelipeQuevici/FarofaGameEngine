/**
 * Created by Felipe on 06/05/2016.
 */

function SpriteComponent(parent, totalDirections, layer, spriteName, rectangle) {

    function onCreate(parent, totalDirections, layer, spriteName, rectangle) {
        var currentScene = parent.scene;
        this.totalDirections = totalDirections;
        this.parent = parent;

        if (totalDirections > 0) {
            this.currentDirection = 0;
        }
        else {
            this.currentDirection = null;
        }

        if (spriteName instanceof Sprite) {
            this.setSprite(spriteName);
        }
        else {
            this.spriteName = spriteName;
            this.rectangle = rectangle;
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection));        }


        currentScene.addSpriteToLayer(this, layer);
    }

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        /* for (var collisionComponent in this.sprite.spriteInformation.collision) {
         this.parent.getComponent(collisionComponent).updateBox(this.sprite.spriteInformation.collision[collisionComponent]);
         }*/
    };

    // TODO: Calculate direction based on angle
    function angleToDirection(angle) {
        return Math.round(angle / (360 / (totalDirections+1) ));
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

    onCreate.call(this, parent, totalDirections, layer, spriteName, rectangle);
}

SpriteComponent.inheritsFrom(Component);