/**
 * Created by Felipe on 06/05/2016.
 */

function Scene() {
    this.onCreateScene = function () {
        this.layers = [];
        this.layersNames = {};

        this.objects = [];
        this.collisionSystem = new CollisionSystem();
    };

    this.onCreateScene();

    this.onInternalInitialize = function () {
        this.declareCamera();
        this.declareObjects();
        this.initializeObjects();
    };

    this.declareCamera = function () {
        this.camera = new Camera(this, new Rectangle());
    };

    this.declareObjects = function () {

    };

    this.initializeObjects = function () {
        this.addObject(this.camera);
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].onInitialize();
        }
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

    this.onPreUpdate = function (deltaTime) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].onPreUpdate(deltaTime);
        }
    };

    this.onUpdate = function (deltaTime) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].internalUpdate(deltaTime);
        }
    };

    this.onPostUpdate = function (deltaTime) {
        //console.log("DANDO POST UPDATE");
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].onPostUpdate(deltaTime);
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

    this.createObject = function (object) {
        object.onInitialize();
        this.addObject(object)
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
    
    this.onDrawCollisions = function (renderer) {
        for (var i = 0; i < this.objects.length; i++) {
        	var obj = this.objects[i];
        	for(name in obj.components){
        		if(obj.components[name].hasOwnProperty("collisionInfo")){
        			obj.components[name].draw(renderer);
        		}
        	}
        }
    };
    
    this.onPostDraw = function (renderer) {

    };

    this.drawLayer = function (renderer, i) {
        this.layers[i].draw(renderer);
    }
}