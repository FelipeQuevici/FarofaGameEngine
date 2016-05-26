/**
 * Created by Felipe on 07/05/2016.
 */

function Component () {
    this.parent = null;
    this.enebled = false;

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
}