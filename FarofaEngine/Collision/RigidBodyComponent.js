/**
 * Created by Felipe on 07/05/2016.
 */

function RigidBodyComponent(parent, rectangle) {
    var collisionSystem = parent.scene.collisionSystem;

    function onCreate (parent, rectangle) {
        this.parent = parent;
        if (rectangle instanceof Rectangle) {
            this.rectangle = rectangle;
        }
        else {
            this.rectangle = new Rectangle(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
        }
    }

    var movedBy = new Vector2();

    onCreate.call(this, parent, rectangle);

    this.move = function (velocity) {
        movedBy = velocity;
        collisionSystem.moveBody(this,velocity);
        var collisions = collisionSystem.checkCollision(this);
        //CHECAR PIXEl A PIXEl SE COLIDU COM CADA UM DEELES E PARAR QUANDO COLIDIR
    };

    this.onPostUpdate = function () {
        this.parent.position.sum(movedBy);
        movedBy = new Vector2();
    };

    this.updateBox = function (boxInfo) {
        this.rectangle.x = boxInfo.x;
        this.rectangle.y = boxInfo.y;
        this.rectangle.width = boxInfo.w;
        this.rectangle.head = boxInfo.h;
    };
}

RigidBodyComponent.inheritsFrom(Component);