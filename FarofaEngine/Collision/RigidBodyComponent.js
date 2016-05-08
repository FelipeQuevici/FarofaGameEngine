/**
 * Created by Felipe on 07/05/2016.
 */

function RigidBodyComponent(parent, rectangle) {
    var collisionSystem = SceneManager.getCurrentScene().collisionSystem;

    function onCreate (parent, rectangle) {
        this.parent = parent;
        this.rectangle = rectangle;
    }

    onCreate.call(this, parent, rectangle);

    this.move = function (velocity) {
        collisions.moveBody(this,velocity);
        var collisions = collisionSystem.checkCollision(this);
        //CHECAR PIXEl A PIXEl SE COLIDU COM CADA UM DEELES E PARAR QUANDO COLIDIR
    };

    this.updateBox = function (boxInfo) {
        this.rectangle.x = boxInfo.x;
        this.rectangle.y = boxInfo.y;
        this.rectangle.width = boxInfo.w;
        this.rectangle.head = boxInfo.h;
    };
}
