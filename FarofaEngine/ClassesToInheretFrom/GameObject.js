/**
 * Created by Felipe on 06/05/2016.
 */

function GameObject(scene, position, rotation, tag) {

    this.onCreateGameObject = function (scene, position, rotation, tag) {
    	var tag = tag || "";
        this.scene = scene;
        this.position = position || new Vector2();
        this.rotation = rotation;
        this.scale = new Vector2(1,1);
        this.components = {};
        this.tag = tag;
        this.wasDestroyed = false;
    };

    this.onCreate = function (scene, position, rotation, tag) {
        this.onCreateGameObject(scene, position, rotation, tag);
    };

    this.reset = function () {
        for (var i in this.components) {
            this.components[i].reset();
        }
    };

    this.onDestroy = function () {
        this.unsubscribeEvents();
        for (var i in this.components) {
            this.components[i].onDestroy();
        }
    };

    this.unsubscribeEvents = function () {

    };

    this.onCreate(scene, position, rotation);

    this.onInitialize = function () {
    };

    this.onPreUpdate = function (deltaTime) {
        for (var i in this.components) {
            this.components[i].onPreUpdate(deltaTime);
        }
    };

    //GENERICO
    this.internalUpdate = function (deltaTime) {
        this.componentsUpdate(deltaTime);
        this.onUpdate(deltaTime);
    };

    this.componentsUpdate = function (deltaTime) {
        for (var i in this.components) {
            this.components[i].onUpdate(deltaTime);
        }
    };

    // CADA CLASSE PRECISA IMPLEMENTAR
    this.onUpdate = function (deltaTime) {

    };

    this.onPostUpdate = function () {
        //console.log("PostUPDATING");
        for (var i in this.components) {
            this.components[i].onPostUpdate();
        }
    };

    this.addComponent = function (name, component) {
        this.components[name] = component;
        return component;
    };

    this.getComponent = function (name) {
        return this.components[name];
    };
    
    this.hasComponent = function (name) {
        return this.components.hasOwnProperty(name);
    };
    
    this.setTag = function (tag) {
    	this.tag = tag;
    };
}