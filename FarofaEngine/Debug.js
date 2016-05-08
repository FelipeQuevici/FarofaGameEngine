/**
 * Created by Felipe on 07/05/2016.
 */

var Debug = (function () {
    var debugLevel = 0;
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
            if (types[type] || level >= debugLevel) {
                console.log(message);
            }
        },

        setLevel : function (level) {
            debugLevel = level;
        }
    }
})();