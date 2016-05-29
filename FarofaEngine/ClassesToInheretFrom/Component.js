/**
 * Created by Felipe on 07/05/2016.
 */

function Component () {
    this.parent = null;
    this.enabled = false;

    this.onCreateComponent = function (parent) {
        this.parent = parent;
        this.enabled = true;
    };
    
    this.onPreUpdate = function () {
        
    };
    
    this.onUpdate =function (deltaTime) {

    };
    
    this.onPostUpdate = function () {
        
    };

    this.reset = function () {

    };

    this.onDestroy = function () {
        this.unsubscribeEvents();
    };

    this.unsubscribeEvents = function () {

    };
}