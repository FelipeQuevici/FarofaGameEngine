/**
 * Created by Felipe on 07/05/2016.
 */

function Sprite(image, information) {
    this.image = image;
    this.spriteInformation = clone(information);
    this.rotation = 0;
    this.direction = information.direction;

    this.draw = function (renderer) {
        renderer.drawSprite(this);
    }
}

function SpriteInformation(information) {
    this.x = information.x;
    this.y = information.y;
    this.w = information.w;
    this.h = information.h;
    this.tag = information.tag;
    this.pivot = new Vector2(information.pivot.x, information.pivot.y);
    this.frameSpeed = information.frameSpeed;
    this.direction = information.direction;
    this.collisions = information.collisions;
}