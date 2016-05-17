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

    function higherY(a,b) {
        if (a.rectangle.y > b.rectangle.y)
            return 1;
        if (a.rectangle.y < b.rectangle.y)
            return -1;
        return 0;
    }

    // TODO: Reorder all the sprites on this layer based on their Y position
    function orderY() {
        this.sprites.sort(higherY);
    }

    this.removeSpriteComponent = function(sprite){
        var index = this.sprites.indexOf(sprite);
        this.sprites.splice(index,1);
    };

    this.drawAllSprites = function (renderer) {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(renderer);
        }
    };
}