/**
 * Created by Felipe on 07/05/2016.
 */

function Sprite(rectangle, image, information) {
    this.image = image;
    this.spriteInformation = information;
    this.rectangle = rectangle;
    this.rotation = 0;
    this.direction = information.direction;

    //TODO: Translate and rotate context to change
    this.draw = function (context) {
        var a = this.spriteInformation;
        var b = this.rectangle;

        context.drawImage(this.image, a.x, a.y, a.w, a.h,
            b.x, b.y, b.width, b.height);
    }
}

function SpriteInformation(information) {
    this.x = information.x;
    this.y = information.y;
    this.w = information.w;
    this.h = information.h;
    this.pivot = new Vector2(information.pivot.x, information.pivot.y);
    this.frameSpeed = information.frameSpeed;
    this.direction = information.direction;
    this.collisions = information.collisions;
}