/**
 * Created by Felipe on 10/05/2016.
 */

function Camera(scene, position) {
    this.onCreateCamera = function (scene, position) {
        this.onCreateGameObject(scene,position, 0);
    };

    this.onCreate = function (scene, position) {
        this.onCreateCamera(scene, position);
    };

    this.onCreate(scene,position);
    
    //TODO: Use collision system to check if object is on screen
    this.isOnScreen = function (object) {
        return true;
    }
}

Camera.inheritsFrom(GameObject);