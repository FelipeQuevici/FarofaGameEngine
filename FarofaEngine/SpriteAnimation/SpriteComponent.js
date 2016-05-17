/**
 * Created by Felipe on 06/05/2016.
 */

function SpriteComponent(parent, totalDirections, layer, animationName, rectangle) {

    function onCreate(parent, totalDirections, layer, animationName, rectangle) {
        var currentScene = parent.scene;
        this.totalDirections = totalDirections;
        this.parent = parent;

        if (totalDirections > 0) {
            this.currentDirection = 0;
        }
        else {
            this.currentDirection = null;
        }

        if (animationName instanceof Sprite) {
            this.setSprite(animationName);
        }
        else {
            this.animationName = animationName;
            this.rectangle = rectangle;
            this.setSprite(SpriteSheetManager.getSprite(this.animationName,rectangle,this.currentDirection));        }


        currentScene.addSpriteToLayer(this, layer);
    }

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        
        for (var collisionComponent in sprite.spriteInformation.collisions) {        	
        	if(collisionComponent == "rigidBody"){
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
            this.setSprite(SpriteSheetManager.getSprite(this.animationName,rectangle,this.currentDirection));
        }
    };

    this.draw = function (context) {
        this.sprite.draw(context);
    };

    onCreate.call(this, parent, totalDirections, layer, animationName, rectangle);
}

SpriteComponent.inheritsFrom(Component);