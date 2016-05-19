/**
 * Created by Felipe on 07/05/2016.
 */

function Layer(doesObjectsMove, isHudLayer) {
    this.doesObjectsMove = doesObjectsMove;
    this.isHudLayer = isHudLayer || false;

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
        if (a.parent.position.y > b.parent.position.y)
            return 1;
        if (a.parent.position.y < b.parent.position.y)
            return -1;
        return 0;
    }

    function orderY() {
        this.sprites.sort(higherY);
    }

    this.removeSpriteComponent = function(sprite){
        var index = this.sprites.indexOf(sprite);
        this.sprites.splice(index,1);
    };

    this.drawAllSprites = function (renderer) {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(renderer, this.isHudLayer);
        }
    };
}