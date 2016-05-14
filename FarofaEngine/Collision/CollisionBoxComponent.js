/**
 * Created by Felipe on 07/05/2016.
 */

function CollisionBoxComponent(parent, collisionInfo) {
    var collisionSystem = SceneManager.getCurrentScene().collisionSystem;

    function onCreate (parent, collisionInfo) {
        this.parent = parent;
        this.collisionInfo = collisionInfo;
    }

    onCreate.call(this, parent, collisionInfo);
    
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