/**
 * Created by Felipe on 07/05/2016.
 */

function Layer(doesObjectsMove) {
    this.doesObjectsMove = doesObjectsMove;

    this.sprites = [];

    this.addSprite = function (sprite) {
        this.sprites.push(sprite);
    };

    this.draw = function (renderer) {
        if (this.doesObjectsMove) {
            orderY.call(this);
        }

        this.drawAllSprites(renderer);
    };

    // TODO: Reorder all the sprites on this layer based on their Y position
    function orderY() {

    }

    this.drawAllSprites = function (renderer) {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(renderer);
        }
    };
}