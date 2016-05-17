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
        
        if (initialAnimation instanceof Animation) {
        	this.setAnimation(initialAnimation);            
        }else {
            this.setAnimation(AnimationManager.getAnimation(initialAnimation));        
        }        
    }
    
    this.setAnimation = function (animation) {
        this.currentAnimation = animation;    
        setTimePerFrame(this.currentAnimation["speed"],this.currentAnimation["frames"].length);
        timer = 0;
    };
    
    function setTimePerFrame(animationSpeed, framesLength){
    	timePerFrame = animationSpeed / framesLength;
    }

    this.nextFrame = function () {    	
    	
    	if(this.currentFrame == this.currentAnimation["frames"].length){
    		this.currentFrame = 1;
    	}else{
    		this.currentFrame += 1;
    	}
    	this.spriteComponent.spriteName = this.currentAnimation["name"] + this.currentFrame;
    }

    this.onUpdate = function (deltaTime) {
    	timer += deltaTime; 
        if (timer >= timePerFrame){
        	timer = 0;
        	this.nextFrame();
        }               
    };
    
    onCreate.call(this, parent, initialAnimation, spriteComponent);
}

AnimationComponent.inheritsFrom(Component);