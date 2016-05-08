/**
 * Created by Felipe on 06/05/2016.
 */

function GameObject(scene, position, rotation) {

    this.onCreateGameObject = function (scene, position, rotation) {
        this.scene = scene;
        this.position = position || new Vector2();
        this.rotation = rotation;
        this.components = {};
    };

    this.onCreate = function (scene, position, rotation) {
        this.onCreateGameObject(scene, position, rotation);
    };

    this.onCreate(scene, position, rotation);

    this.onInitialize = function () {

    };

    this.onPreUpdate = function () {
        for (var i = 0; i < this.components.length; i++)
            this.components[i].onPreUpdate();
    };

    //GENERICO
    this.internalUpdate = function () {
        this.componentsUpdate();
        this.update();
    };

    this.componentsUpdate = function () {
        for (var i = 0; i < this.components.length; i++)
            this.components[i].onUpdate();
    };

    // CADA CLASSE PRECISA IMPLEMENTAR
    this.update = function () {

    };

    this.onPostUpdate = function () {
        for (var i = 0; i < this.components.length; i++)
            this.components[i].onPostUpdate();
    };

    this.addComponent = function (name, component) {
        this.components[name] = component;
    };

    this.getComponent = function (name) {
        return this.components[name];
    }
}