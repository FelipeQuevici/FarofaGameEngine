var GlobalVariables = (function () {
    var instance = {};
    
    return {
        getVariable: function (variable) {
            if (instance.hasOwnProperty(variable)) {
                return instance[variable];
            }
            console.log("Variable does not exist");
            return null;
        },

        setVariable: function (variable, value) {
            instance[variable] = value;
        }
    };
})();