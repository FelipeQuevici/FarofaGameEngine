/**
 * Created by Felipe on 06/05/2016.
 */

function AnimationComponent(parent, initialAnimation, spriteComponent) {
    var timer = 0;
    var timePerFrame = 0;
    
    function onCreate(parent, initialAnimation, spriteComponent) {
    	this.parent = parent;
        this.spriteComponent = spriteComponent;        
        this.currentFrame = 1; 
        this.animationFinished = false;
        
        if (initialAnimation instanceof Animation) {
        	this.setAnimation(initialAnimation);            
        }else {
            this.setAnimation(AnimationManager.getAnimation(initialAnimation));        
        }        
    }
    
    this.setAnimation = function (animation) {    	
        this.currentAnimation = animation;    
        this.currentFrame = 0;
        this.nextFrame();
        this.animationFinished = false;
        setTimePerFrame(this.currentAnimation["speed"],this.currentAnimation["frames"].length);
        timer = 0;
    };
    
    this.isAnimationPlaying = function (animation){
    	return this.currentAnimation.name == animation;
    };
    
    this.isAnimationFinished = function (){
    	return this.animationFinished;
    };
    
    function setTimePerFrame(animationSpeed, framesLength){
    	timePerFrame = animationSpeed / framesLength;
    }

    this.nextFrame = function () {    	    	
    	if(this.currentFrame == this.currentAnimation["frames"].length){    
    		if(this.currentAnimation.loop == 0){    
    			this.animationFinished = true;
    			return;
    		}else{
    			this.currentFrame = 1;
    		}
    	}else{
    		this.currentFrame += 1;
    	}
    	var frameName = this.currentAnimation["frames"][this.currentFrame - 1];
    	this.spriteComponent.setSpriteName(frameName);
    };

    this.onUpdate = function (deltaTime) {
    	
    	timer += deltaTime * this.spriteComponent.sprite.spriteInformation.frameSpeed; 
        if (timer >= timePerFrame){
        	timer = 0;
        	this.nextFrame();
        }               
    };
    
    onCreate.call(this, parent, initialAnimation, spriteComponent);
}

AnimationComponent.inheritsFrom(Component);