/**
 * Created by Felipe on 06/05/2016.
 */

function SpriteComponent(parent, totalDirections, layer, spriteName) {

    function onCreate(parent, totalDirections, layer, spriteName) {
        var currentScene = parent.scene;
        this.totalDirections = totalDirections;
        this.parent = parent;

        if (totalDirections > 0) {
            this.currentDirection = 0;
        }else {
            this.currentDirection = null;
        }

        if (spriteName instanceof Sprite) {
            this.setSprite(spriteName);
        }else {
            this.spriteName = spriteName;
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,this.currentDirection));
        }

        this.layer = layer;
        currentScene.addSpriteToLayer(this, layer);
    }

    this.setSprite = function (sprite) {
        this.sprite = sprite;
        
        for (var collisionComponentName in sprite.spriteInformation.collisions) {   
        	var collisionComponent = this.parent.getComponent(collisionComponentName);
        	if(collisionComponent){
        		if(collisionComponent.enable){        			
        			if(collisionComponent.type == "rigidBody" || collisionComponent.type == "collisionBox"){
        				collisionComponent.updateCollisionInfo(this.sprite.spriteInformation.collisions[collisionComponentName],
                                sprite.spriteInformation);
        			}
        		}
        	}
        }
    };
    
    this.setSpriteName = function (name) {
    	this.spriteName = name;
    	this.setSprite(SpriteSheetManager.getSprite(this.spriteName,this.currentDirection));
    };

    function angleToDirection(angle) {
        var direction = Math.round(angle / (360 / (totalDirections+1) ));
        if (direction > totalDirections) direction = 0;
        return direction;
    }


    this.onPostUpdate = function () {
        this.setAngle(this.parent.rotation);
    };

    this.setAngle = function (angle) {
        if (this.totalDirections > 0) {
            this.currentDirection = angleToDirection(angle);
            this.setSprite(SpriteSheetManager.getSprite(this.spriteName,this.currentDirection));
        }
    };

    this.setSpriteName = function (name) {
        this.spriteName = name;
        this.setSprite(SpriteSheetManager.getSprite(this.spriteName,this.currentDirection));
    };
    
    this.draw = function (renderer, isUsingCamera) {
        renderer.drawSpriteComponent(this, isUsingCamera);
        
        //this.sprite.draw(renderer);
    };

    onCreate.call(this, parent, totalDirections, layer, spriteName);
}

SpriteComponent.inheritsFrom(Component);