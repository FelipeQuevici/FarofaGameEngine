/**
 * Created by Felipe on 07/05/2016.
 */

function RigidBodyComponent(parent, collisionInfo) {
    var collisionSystem = parent.scene.collisionSystem;
    
    function onCreate (parent, collisionInfo) {
        this.parent = parent;

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
    	if(this.collisionInfo instanceof Rectangle){
    		var x = this.parent.position.x + this.collisionInfo.x;
    		var y = this.parent.position.y + this.collisionInfo.y;
    		var rect = new Rectangle(x,y,this.collisionInfo.width,this.collisionInfo.height);
    		renderer.drawRectangle(rect, "red");
		}         
    };

    this.move = function (velocity) {
    	var movedBy = velocity;
        var newPosition = new Vector2(this.parent.position.x,this.parent.position.y);   
        newPosition.sum(movedBy);
        var collisions = collisionSystem.checkCollision(this);
        var biggestCoordinate = velocity.getBiggestCoordinate();
        if(collisions.length > 0){
        	newPosition.x = this.parent.position.x;
        	newPosition.y = this.parent.position.y;
        	
        	for(var i = 0; i < biggestCoordinate; i++){
            	
            }
        }
        //console.log(collisions);
        //CHECAR PIXEl A PIXEl SE COLIDU COM CADA UM DEELES E PARAR QUANDO COLIDIR
        this.parent.position.sum(movedBy);
    };

    this.onPostUpdate = function () {
    	
    };

    this.updateCollisionInfo = function (collisionInfo) {
    	if (collisionInfo.shape == "rectangle") {
    		if(!(this.collisionInfo instanceof Rectangle)){
    			this.collisionInfo = new Rectangle();
    		}    		
	        this.collisionInfo.x = collisionInfo.x;
	        this.collisionInfo.y = collisionInfo.y;
	        this.collisionInfo.width = collisionInfo.w;
	        this.collisionInfo.height = collisionInfo.h;	        
    	}else if (collisionInfo.shape == "circle") {
    		if(!(this.collisionInfo instanceof Circle)){
    			this.collisionInfo = new Circle();
    		}
    		this.collisionInfo.center = collisionInfo.center;
    		this.collisionInfo.radius = collisionInfo.radius;
    	}
    	
    };
}

RigidBodyComponent.inheritsFrom(Component);