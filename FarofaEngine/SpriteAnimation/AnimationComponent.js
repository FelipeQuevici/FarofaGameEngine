/**
 * Created by Felipe on 06/05/2016.
 */

function AnimationComponent(parent, initialAnimation, spriteComponent) {
    var timer = 0;
    
    function onCreate(parent, initialAnimation, spriteComponent) {
    	this.parent = parent;
        this.spriteComponent = spriteComponent;
        this.currentanimation = initialAnimation;
        this.currentFrame = 0;
    }

    function shouldChangeFrame() {
        
    }

    function nextFrame() {
        var nextSprite = null;//ACHAR NEXT SPRITE NA ANIMACAO
        for (var component in nextSprite.others) {
            for (var property in this.parent.components[component]) {
                this.parent.components[component][property] = nextSprite.others[component][property];
            }
        }
    }

    this.update = function () {
        if (shouldChangeFrame())
            this.sprite = nextFrame.call(this);
        
    };
    
    onCreate.call(this, initialAnimation, spriteComponent);
}

AnimationComponent.inheritsFrom(Component);