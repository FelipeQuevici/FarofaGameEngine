/**
 * Created by Felipe on 06/05/2016.
 */

function GameObject(position, rotation) {

    this.onCreateGameObject = function (position, rotation) {
        this.position = position || new Vector2();
        this.rotation = rotation;
        this.components = {};
    };

    this.onCreate = function (position, rotation) {
        this.onCreateGameObject(position, rotation);
    };

    this.onCreate(position, rotation);

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