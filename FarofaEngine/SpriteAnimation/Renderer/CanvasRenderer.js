/**
 * Created by Felipe on 09/05/2016.
 */

function CanvasRenderer(canvas) {
    var context = canvas.getContext("2d");

    this.camera = null;

    this.drawSprite = function (sprite) {
        var a = sprite.spriteInformation;
        var b = sprite.rectangle;
        var c = this.camera.position;
        var d = new Vector2(c.x - canvas.width/2,c.y - canvas.height/2);
        context.drawImage(sprite.image, a.x, a.y, a.w, a.h,
            b.x - d.x, b.y - d.y, b.width, b.height);
    };

    this.getContext = function () {
        return context;
    };
}

CanvasRenderer.inheritsFrom(Renderer);