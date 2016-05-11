/**
 * Created by Felipe on 11/05/2016.
 */

CameraFollowWithMargins.inheritsFrom(Camera);

function CameraFollowWithMargins(scene, horizontalMargin, verticalMargin) {
    var target;

    this.onCreate = function (scene) {
        this.onCreateCamera(scene, new Vector2());
    };

    this.onCreate(scene);

    this.setTarget = function (newTarget) {
        target = newTarget;
        this.position = new Vector2(target.position.x, target.position.y);
    };

    this.getTarget = function () {
        return target;
    };

    this.onUpdate = function () {
        if (target.position.x > canvas.width/2 - horizontalMargin + this.position.x) {
            this.position.x = target.position.x - canvas.width/2 + horizontalMargin;
        }
        if (target.position.x < this.position.x - canvas.width/2 + horizontalMargin) {
            this.position.x = target.position.x + canvas.width/2 - horizontalMargin;
        }

        if (target.position.y > canvas.height/2 - verticalMargin + this.position.y) {
            this.position.y = target.position.y - canvas.height/2 + verticalMargin;
        }
        if (target.position.y < this.position.y - canvas.height/2 + verticalMargin) {
            this.position.y = target.position.y + canvas.height/2 - verticalMargin;
        }
    }
}