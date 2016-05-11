/**
 * Created by Felipe on 10/05/2016.
 */

CameraFollowTarget.inheritsFrom(Camera);

function CameraFollowTarget(scene) {
    var target;

    this.onCreate = function (scene) {
        this.onCreateCamera(scene, new Vector2());
    };

    this.onCreate(scene);

    this.setTarget = function (newTarget) {
        target = newTarget;
        this.position = target.position;
    };

    this.getTarget = function () {
        return target;
    };
}

