/**
 * Created by Felipe on 06/05/2016.
 */

function Scene() {
    this.onCreateScene = function () {
        this.layers = [];
        this.layersNames = {};

        this.objects = [];
        this.collisionSystem = new CollisionSystem();
        console.log("Created Scene");
    };

    this.onCreateScene();

    this.onPreInitialize = function () {

    };

    this.onPreEnter = function () {
        
        this.subscribeEvents();
        this.onEnter();
    };

    this.subscribeEvents = function () {

    };

    // CREATE OBJECTS HERE
    this.onEnter = function () {

    };

    this.onPreUpdate = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].onPreUpdate();
        }
    };

    this.onUpdate = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].internalUpdate();
        }
    };

    this.onPostUpdate = function () {
        //console.log("DANDO POST UPDATE");
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].onPostUpdate();
        }
    };

    this.onPreExit = function () {
        this.unsubscribeEvents();
        this.onExit();
    };

    this.unsubscribeEvents = function () {

    };

    this.onExit = function () {

    };

    this.addObject = function (object) {
        this.objects.push(object);
    };


    // TODO: Check if layer name already exists
    this.addLayer = function (name, shouldOrderY) {
        shouldOrderY = shouldOrderY || false;
        this.layersNames[name] = this.layers.length;
        this.layers.push(new Layer(shouldOrderY));
    };

    // TODO: Check if layer name exits and give error if does not
    this.addSpriteToLayer = function (sprite, layer) {

        var layerIndex = this.layersNames[layer];
        this.layers[layerIndex].addSprite(sprite);
    };

    this.onDraw = function (renderer) {
        for (var i = 0; i < this.layers.length; i++) {
            this.drawLayer(renderer, i);
        }
        this.onPostDraw(renderer);
    };

    this.onPostDraw = function (renderer) {

    };

    this.drawLayer = function (renderer, i) {
        this.layers[i].draw(renderer);
    }
}