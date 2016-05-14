/**
 * Created by Felipe on 07/05/2016.
 */

function CollisionSystem() {
    this.bodys = [];
    
    this.update = function () {
        // CHECAR COLLISAO ENTRE TODOS DA MESMA TAG E
        // CHAMAR OS EVENTOS DE CADA UM
        
        // 
    };
    
    this.addBody = function (body){
    	this.bodys.push(body);
    };
    
    this.moveBody = function (body, velocity) {
        
    };
    
    this.checkCollision = function (thisCollisionComponent, componentsListToCheck) {
        var componentsListToCheck = componentsListToCheck || this.bodys;
        var bodysCollided = [];
        
        for(var i = 0; i < componentsListToCheck.length; i++){
        	if(componentsListToCheck[i] != thisCollisionComponent){
        		if(thisCollisionComponent.collisionInfo instanceof Rectangle && componentsListToCheck[i].collisionInfo instanceof Rectangle){
        			if(checkCollisionBetweenRectangles(thisCollisionComponent, componentsListToCheck[i])){
        				bodysCollided.push(componentsListToCheck[i]);
        				console.log("Player[minx: "+getRecMinX(thisCollisionComponent)+" miny: "+getRecMinY(thisCollisionComponent)+" maxx: "+getRecMaxX(thisCollisionComponent)+" maxy: "+getRecMaxY(thisCollisionComponent));
        				console.log("Tile[minx: "+getRecMinX(bodysCollided[0])+" miny: "+getRecMinY(bodysCollided[0])+" maxx: "+getRecMaxX(bodysCollided[0])+" maxy: "+getRecMaxY(bodysCollided[0]));
        			}            	
            	}
        	}      	
        	     	
        }
        //console.log(bodysCollided);
        //console.log = function(){};   
        return bodysCollided;
        
    };
    
    function checkCollisionBetweenRectangles(collisionComponent1, collisionComponent2){
    	if(getRecMinX(collisionComponent1) > getRecMaxX(collisionComponent2) || getRecMaxX(collisionComponent1) < getRecMinX(collisionComponent2)){
			return false;
		}			
		if(getRecMinY(collisionComponent1) > getRecMaxY(collisionComponent2) || getRecMaxY(collisionComponent1) < getRecMinY(collisionComponent2)){
			return false;
		}
    	return true;
    }
    
    function getRecMinX(collisionComponent){
    	return collisionComponent.parent.position.x + collisionComponent.collisionInfo.x;
    }
    
    function getRecMinY(collisionComponent){
    	return collisionComponent.parent.position.y + collisionComponent.collisionInfo.y;
    }
    
    function getRecMaxX(collisionComponent){
    	return collisionComponent.parent.position.x + collisionComponent.collisionInfo.width;
    }
    
    function getRecMaxY(collisionComponent){
    	return collisionComponent.parent.position.y + collisionComponent.collisionInfo.height;
    }
}