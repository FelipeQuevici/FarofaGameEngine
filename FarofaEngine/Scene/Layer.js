/**
 * Created by Felipe on 07/05/2016.
 */

function Layer(doesObjectsMove) {
    this.doesObjectsMove = doesObjectsMove;

    this.sprites = [];

    this.addSprite = function (sprite) {
        this.sprites.push(sprite);
    };

    this.draw = function (context) {
        if (this.doesObjectsMove) {
            orderY.call(this);
        }

        this.drawAllSprites(context);
    };

    // TODO: Reorder all the sprites on this layer based on their Y position
    function orderY() {

    }

    this.drawAllSprites = function (context) {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(context);
        }
    };
}