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
        var e = new Vector2(a.pivot.x, a.pivot.y);

        context.save();
        context.translate(b.x - a.pivot.x, b.y - a.pivot.y);            
        context.drawImage(sprite.image, a.x, a.y, a.w, a.h, -c.x + canvas.width/2, -c.y + canvas.height/2, a.w, a.h);
        context.restore();
    };


    this.drawSpriteComponent = function (spriteComponent, isHud) {
        if (!spriteComponent.enabled) return;

        var sprite = spriteComponent.sprite;
        var a = sprite.spriteInformation;
        var b = new Rectangle(spriteComponent.parent.position.x, spriteComponent.parent.position.y,
            a.w, a.h);
        var c = this.camera.position;
        var d;
        if (!isHud)
            d = new Vector2(b.x - c.x + canvas.width/2,b.y - c.y + canvas.height/2);
        else
            d = new Vector2(b.x,b.y);

        var e = new Vector2(a.pivot.x, a.pivot.y);
        
        context.drawImage(sprite.image, a.x, a.y, a.w, a.h,
            d.x - e.x, d.y - e.y, b.width, b.height);
         
    };

    this.drawText = function (textComponent, isHud) {
        if (textComponent.hasOwnProperty("color")) {
            context.fillStyle = textComponent.color;
        }
        else {
            context.fillStyle = "black";
        }

        if (textComponent.hasOwnProperty("font")) {
            //console.log(textComponent.font);
            context.font = textComponent.font;
        }

        var b = new Vector2(textComponent.parent.position.x, textComponent.parent.position.y);
        var c = this.camera.position;
        var d;
        if (!isHud)
            d = new Vector2(b.x - c.x + canvas.width/2,b.y - c.y + canvas.height/2);
        else
            d = new Vector2(b.x,b.y);

        //console.log("X " + textComponent.text);

        context.fillText(textComponent.text, d.x, d.y);
        context.fill();

    };

    this.drawRectangle = function (rectangle, color) {
    	var c = this.camera.position;
    	context.save();
    	context.translate(rectangle.x, rectangle.y);  
    	context.fillStyle = color;
        context.fillRect(-c.x + canvas.width/2,-c.y + canvas.height/2,rectangle.width,rectangle.height);
        context.fill();
        context.restore();
    };
    
    this.drawCircle = function (circle, color) {        	
    	var c = this.camera.position;    	
    	context.beginPath();
    	context.arc(circle.center.x - (c.x - canvas.width/2) ,circle.center.y - (c.y - canvas.height/2),circle.radius,0,2*Math.PI);
    	context.fillStyle = color;
        context.fill();
    };

    this.refreshCanvas = function () {
        this.parent.refreshCanvas();

        context.fillStyle = "#5F61C2";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fill();
    };

    this.getContext = function () {
        return context;
    };
}

CanvasRenderer.inheritsFrom(Renderer);