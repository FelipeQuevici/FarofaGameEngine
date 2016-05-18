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
        }else {
            this.currentDirection = null;
        }

        if (spriteName instanceof Sprite) {
            this.rectangle = spriteName.rectangle;
            this.setSprite(spriteName);
        }else {
            this.spriteName = spriteName;
            this.rectangle = rectangle;
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,rectangle,this.currentDirection));        
        }

        this.layer = layer;
        currentScene.addSpriteToLayer(this, layer);
    }

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        
        for (var collisionComponent in sprite.spriteInformation.collisions) {        	
        	if(collisionComponent == "rigidBody"){
        		this.parent.getComponent(collisionComponent).updateCollisionInfo(this.sprite.spriteInformation.collisions[collisionComponent]);
        	}
            if (collisionComponent == "collisionBox") {
                this.parent.getComponent(collisionComponent).updateCollisionInfo(this.sprite.spriteInformation.collisions[collisionComponent]);
            }
        }
    };

    function angleToDirection(angle) {
        var direction = Math.round(angle / (360 / (totalDirections+1) ));
        if (direction > totalDirections) direction = 0;
        return direction;
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

    this.draw = function (renreder) {
        //renreder.drawSpriteComponent(this);
        
        this.sprite.draw(renreder);
    };

    onCreate.call(this, parent, totalDirections, layer, spriteName, rectangle);
}

SpriteComponent.inheritsFrom(Component);