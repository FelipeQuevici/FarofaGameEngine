/**
 * Created by Felipe on 18/05/2016.
 */

function ScenarioGameObject(scene, x, y, sprite) {

    function onCreate(scene) {
        this.onCreateGameObject(scene,new Vector2(x,y),0);        
    }

    this.onInitialize = function () {
    	this.addComponent("rigidBody", new RigidBodyComponent(this));
        this.addComponent("sprite", new SpriteComponent(this,0,"objectsLayer",sprite));        
    };
    
    onCreate.call(this, scene);
}

ScenarioGameObject.inheritsFrom(GameObject);