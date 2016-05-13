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
        var d = new Vector2(b.x - c.x + canvas.width/2,b.y - c.y + canvas.height/2);
        var e = new Vector2(a.pivot.x/a.w*b.width, a.pivot.y/a.h*b.height);

        context.drawImage(sprite.image, a.x, a.y, a.w, a.h,
            d.x - e.x, d.y - e.y, b.width, b.height);

        /*context.fillStyle = "black";
        context.fillRect(d.x,d.y,1,1);
        context.fill();*/
    };

    this.refreshCanvas = function () {
        this.parent.refreshCanvas();

        context.fillStyle = "#5F61C2";
        context.fillRect(-40,-40,580,580);
        context.fill();
    };

    this.getContext = function () {
        return context;
    };
}

CanvasRenderer.inheritsFrom(Renderer);