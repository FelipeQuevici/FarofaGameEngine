/**
 * Created by Felipe on 07/05/2016.
 */

function RigidBodyComponent(parent, collisionInfo) {
    var collisionSystem = parent.scene.collisionSystem;
    
    function onCreate (parent, collisionInfo) {
        this.parent = parent;
        this.enable = true;
        this.type = "rigidBody";

        if(collisionInfo){
        	if(collisionInfo.shape == "rectangle"){
            	this.collisionInfo = new Rectangle(collisionInfo.x, collisionInfo.y, collisionInfo.w, collisionInfo.h);
            }else if(collisionInfo.shape == "circle"){
            	this.collisionInfo = new Circle(new Vector2(collisionInfo.x, collisionInfo.y), collisionInfo.radius);
            }
        }else{
        	this.collisionInfo = null;
        }
        
        collisionSystem.addBody(this); 
    }
    
    onCreate.call(this, parent, collisionInfo);
    
    this.draw = function (renderer) {
    	if(this.enable){
	    	if(this.collisionInfo instanceof Rectangle){
	    		var x = this.parent.position.x + this.collisionInfo.x;
	    		var y = this.parent.position.y + this.collisionInfo.y;
	    		var rect = new Rectangle(x,y,this.collisionInfo.width,this.collisionInfo.height);
	    		renderer.drawRectangle(rect, "red");
			}else if(this.collisionInfo instanceof Circle){	
				var center = new Vector2(this.parent.position.x + this.collisionInfo.center.x,
										 this.parent.position.y + this.collisionInfo.center.y);
	    		var circle = new Circle(center,this.collisionInfo.radius);
	    		renderer.drawCircle(circle, "red");
			}
    	}
    };

    this.move = function (velocity, callback, callbackCaller) {
    	callback = callback || null;
        this.parent.position.sum(velocity);
        var collisions = collisionSystem.checkCollision(this);
        if(collisions.length > 0){   
        	if(callback){
        		callback.call(callbackCaller, collisions);
        	}
        	var rigidBodyCollisions = [];
        	for(var i = 0; i < collisions.length; i++){            	
        		if(collisions[i].type == "rigidBody"){          			
        			rigidBodyCollisions.push(collisions[i]);
        		}
        	}        	        	
        	var steps = velocity.getBiggestCoordinate();
        	this.parent.position.sub(velocity);
        	var xStep = velocity.x != 0 ? velocity.x / steps : 0;
        	var yStep = velocity.y != 0 ? velocity.y / steps : 0;
        	var vectorSteps = new Vector2(xStep, 0);        	
        	moveStepByStep(this,rigidBodyCollisions, vectorSteps, steps);
        	vectorSteps = new Vector2(0, yStep);        	
        	moveStepByStep(this,rigidBodyCollisions, vectorSteps, steps);
        }
    };
    
    function moveStepByStep(component, collisions, vectorSteps, steps){
    	for(var i = 0; i < steps; i++){
    		component.parent.position.sum(vectorSteps);
    		if(collisionSystem.checkCollision(component, collisions).length > 0){
    			component.parent.position.sub(vectorSteps);
    			break;
    		}
        }
    }

    this.onPostUpdate = function () {

    };

    this.updateCollisionInfo = function (collisionInfo, spriteInformation) {
    	if (collisionInfo.shape == "rectangle") {
    		if(!(this.collisionInfo instanceof Rectangle)){
    			this.collisionInfo = new Rectangle();
    		}    		
	        this.collisionInfo.x = collisionInfo.x - spriteInformation.pivot.x;
	        this.collisionInfo.y = collisionInfo.y - spriteInformation.pivot.y;
	        this.collisionInfo.width = collisionInfo.w;
	        this.collisionInfo.height = collisionInfo.h;	        
    	}else if (collisionInfo.shape == "circle") {
    		if(!(this.collisionInfo instanceof Circle)){
    			this.collisionInfo = new Circle();
    		}
			this.collisionInfo.center.x = collisionInfo.center.x - spriteInformation.pivot.x;
			this.collisionInfo.center.y = collisionInfo.center.y - spriteInformation.pivot.y;
    		this.collisionInfo.radius = collisionInfo.radius;
    	}
    	
    };
}

RigidBodyComponent.inheritsFrom(Component);