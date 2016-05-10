/**
 * Created by Felipe on 09/05/2016.
 */

function CanvasRenderer(canvas) {
    var context = canvas.getContext("2d");
    
    this.drawSprite = function (sprite) {
        var a = sprite.spriteInformation;
        var b = sprite.rectangle;

        context.drawImage(sprite.image, a.x, a.y, a.w, a.h,
            b.x, b.y, b.width, b.height);
    }
}

CanvasRenderer.inheritsFrom(Renderer);