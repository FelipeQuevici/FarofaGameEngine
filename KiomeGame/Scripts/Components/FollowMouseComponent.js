/**
 * Created by Felipe on 12/05/2016.
 */

FollowMouseComponent.inheritsFrom(Component);

function FollowMouseComponent(parent, camera) {
    this.onCreate = function (parent, camera) {
        this.parent = parent;
        this.camera = camera;
    };

    this.onCreate(parent, camera);
    
    this.onUpdate = function (deltaTime) {
        var mousePosition = InputManager.getMousePosition();
        this.parent.position = new Vector2(mousePosition.x + this.camera.position.x - 250
            , mousePosition.y + this.camera.position.y - 250);
    }
}