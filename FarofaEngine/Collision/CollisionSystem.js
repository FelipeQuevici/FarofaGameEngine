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

	this.removeBody = function (body) {
		var index = this.bodys.indexOf(body);
		this.bodys.splice(index,1);
	};
    
    this.checkCollision = function (thisCollisionComponent, componentsListToCheck) {
        var componentsListToCheck = componentsListToCheck || this.bodys;
        var bodysCollided = [];
        
        for(var i = 0; i < componentsListToCheck.length; i++){
        	if(componentsListToCheck[i] != thisCollisionComponent){
        		if(thisCollisionComponent.collisionInfo instanceof Rectangle && componentsListToCheck[i].collisionInfo instanceof Rectangle){
        			if(checkCollisionBetweenRectangles(thisCollisionComponent, componentsListToCheck[i])){
        				bodysCollided.push(componentsListToCheck[i]);        				
        			}            	
            	}else if(thisCollisionComponent.collisionInfo instanceof Circle && componentsListToCheck[i].collisionInfo instanceof Circle){
            		if(checkCollisionBetweenCircles(thisCollisionComponent, componentsListToCheck[i])){
        				bodysCollided.push(componentsListToCheck[i]);        				
        			}
            	}else{
            		if(checkCollisionBetweenCircleAndRectangle(thisCollisionComponent, componentsListToCheck[i])){
        				bodysCollided.push(componentsListToCheck[i]);        				
        			}
            	}
        	}      	        	     	
        }
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
    
    function checkCollisionBetweenCircles(collisionComponent1, collisionComponent2){
    	var center1 = getCircleCenter(collisionComponent1);
    	var center2 = getCircleCenter(collisionComponent2);
    	var deltaX = center2.x - center1.x;
    	var deltaY = center1.y - center2.y;
    	var powX = deltaX * deltaX; 
    	var powY = deltaY * deltaY; 
    	var rSum = collisionComponent1.collisionInfo.radius + collisionComponent2.collisionInfo.radius;
    	var powR = rSum * rSum;
    	if(powX + powY <= powR){
			return true;
		}			
    	return false;
    }
    
    function checkCollisionBetweenCircleAndRectangle(collisionComponent1, collisionComponent2){
    	if(collisionComponent1.collisionInfo instanceof Rectangle){
    		rec = collisionComponent1;
    		cir = collisionComponent2;
    	}else{
    		rec = collisionComponent2;
    		cir = collisionComponent1;
    	}
    	var circleCenter = getCircleCenter(cir);    	
    	var closestX = clamp(circleCenter.x, getRecMinX(rec), getRecMaxX(rec));
    	var closestY = clamp(circleCenter.y, getRecMinY(rec), getRecMaxY(rec));
    	var distanceX = circleCenter.x - closestX;
    	var distanceY = circleCenter.y - closestY;
    	var distanceSquared =  (distanceX * distanceX) + (distanceY * distanceY);
    	
    	if (distanceSquared < cir.collisionInfo.radius * cir.collisionInfo.radius){
    		return true;
    	}else{
    		return false;
    	}
    }
    
    function getRecMinX(collisionComponent){
    	return collisionComponent.parent.position.x + collisionComponent.collisionInfo.x;
    }
    
    function getRecMinY(collisionComponent){
    	return collisionComponent.parent.position.y + collisionComponent.collisionInfo.y;
    }
    
    function getRecMaxX(collisionComponent){
    	return getRecMinX(collisionComponent) + collisionComponent.collisionInfo.width;
    }
    
    function getRecMaxY(collisionComponent){
    	return getRecMinY(collisionComponent) + collisionComponent.collisionInfo.height;
    }
    
    function getCircleCenter(collisionComponent){
    	return new Vector2(collisionComponent.parent.position.x + collisionComponent.collisionInfo.center.x,
    				       collisionComponent.parent.position.y + collisionComponent.collisionInfo.center.y);
    }
}