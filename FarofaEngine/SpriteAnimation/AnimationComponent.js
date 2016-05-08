/**
 * Created by Felipe on 06/05/2016.
 */

//TODO: TUDO
function AnimationComponent(parent, sprite) {
    this.parent = parent;
    this.sprite = sprite;

    currentanimation = 0;
    this.currentFrame = 0;
    CurrenttimeS = 0;

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
}