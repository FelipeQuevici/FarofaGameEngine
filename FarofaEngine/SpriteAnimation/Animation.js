/**
 * Created by Felipe on 07/05/2016.
 */

//TODO: TUDO
function Animation(animationName, information) {
	
    function onCreate(animationName, information) {
    	this.name = animationName;
    	this.speed = information[animationName].animationSpeed;
    	this.loop = information[animationName].loop;
    	this.frames = [];    	
    	for(var frame in information[animationName].frames){
    		this.frames.push(information[animationName].frames[frame]);
        }
    }

    onCreate.call(this, animationName, information);
}