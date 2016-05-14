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
    
    this.drawRectangle = function (rectangle, color) {    	
    	var c = this.camera.position;
    	context.fillStyle = color;
        context.fillRect(rectangle.x - (c.x - canvas.width/2),rectangle.y - (c.y - canvas.height/2),rectangle.width,rectangle.height);
        context.fill();
    };

    this.refreshCanvas = function () {
        this.parent.refreshCanvas();

        context.fillStyle = "#5F61C2";
        context.fillRect(0,0,500,500);
        context.fill();
    };

    this.getContext = function () {
        return context;
    };
}

CanvasRenderer.inheritsFrom(Renderer);