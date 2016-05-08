/**
 * Created by Felipe on 07/05/2016.
 */

function CollisionBoxComponent(parent, rectangle) {
    var collisionSystem = SceneManager.getCurrentScene().collisionSystem;

    function onCreate (parent, rectangle) {
        this.parent = parent;
        this.rectangle = rectangle;
    }

    onCreate.call(this, parent, rectangle);

    this.updateBox = function (boxInfo) {
        this.rectangle.x = boxInfo.x;
        this.rectangle.y = boxInfo.y;
        this.rectangle.width = boxInfo.w;
        this.rectangle.head = boxInfo.h;
    };
}