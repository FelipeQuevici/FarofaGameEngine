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
        this.layersNames["invisible"] = 0;
        this.layers.push(new Layer(false, true));
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

    this.onInternalPreUpdate = function (deltaTime) {
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (!object.wasDestroyed)
                object.onPreUpdate(deltaTime);
        }
    };

    this.onUpdate = function (deltaTime) {
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (!object.wasDestroyed)
                object.internalUpdate(deltaTime);
        }
    };
    
    this.onPreUpdate = function (deltaTime) {
        
    };    

    this.onPostUpdate = function (deltaTime) {
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (!object.wasDestroyed)
                object.onPostUpdate(deltaTime);
        }

        this.takePendingObjectsFromList();
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

    var destroyList = [];

    this.destroyObject = function (object) {
        destroyList.push(object);
        object.wasDestroyed = true;
    };

    this.takePendingObjectsFromList = function() {
        for (var i = 0; i < destroyList.length; i++) {
            var index = this.objects.indexOf(destroyList[i]);
            var object = destroyList[i];
            var sprite = object.getComponent("sprite");
            if (sprite) {
                this.layers[this.layersNames[sprite.layer]].removeSpriteComponent(sprite);
            }
            var rigidBody = object.getComponent("rigidBody");
            if (rigidBody) {
                this.collisionSystem.removeBody(rigidBody);
            }
            var collisionBox = object.getComponent("collisionBox");
            if (collisionBox) {
                this.collisionSystem.removeBody(collisionBox);
            }

            var attackBox = object.getComponent("attackCollisionBox");
            if (attackBox) {
                this.collisionSystem.removeBody(attackBox);
            }

            var textComponent = object.getComponent("textComponent");
            if (textComponent) {
                this.layers[this.layersNames[textComponent.layer]].removeSpriteComponent(textComponent);
            }
            object.onDestroy();
            this.objects.splice(index,1);
        }
        destroyList = [];
    };

    this.addLayer = function (name, shouldOrderY, isHud) {
        shouldOrderY = shouldOrderY || false;
        isHud = isHud || false;
        this.layersNames[name] = this.layers.length;
        this.layers.push(new Layer(shouldOrderY,isHud));
    };

    this.addSpriteToLayer = function (sprite, layer) {
        var layerIndex = this.layersNames[layer];
        this.layers[layerIndex].addSprite(sprite);
    };

    this.onDraw = function (renderer) {
        for (var i = 1; i < this.layers.length; i++) {
            this.drawLayer(renderer, i);
        }
        this.onPostDraw(renderer);
    };
    
    this.onDrawCollisions = function (renderer) {
        for (var i = 0; i < this.objects.length; i++) {
        	var obj = this.objects[i];
        	for(var name in obj.components){
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