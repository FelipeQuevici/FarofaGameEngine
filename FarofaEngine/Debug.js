/**
 * Created by Felipe on 07/05/2016.
 */

var Debug = (function () {
    var debugLevel = 3;
    var types = {
        "collision": false,
        "draw": false,
        "generic": true,
        "sceneManager": true,
        "imagePool": true,
        "sprite": true
    };

    return {
        log: function (message, level, type) {
            if (types[type] && level >= debugLevel) {
                //console.log(message);
            }
        },
        setLevel : function (level) {
            debugLevel = level;
        }
    }
})();

var fps = {
    startTime : 0,
    frameNumber : 0,
    getFPS : function(){
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = ( d - this.startTime ) / 1000,
            result = Math.floor( ( this.frameNumber / currentTime ) );
        if( currentTime > 1 ){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }		
        return result;
    }
};