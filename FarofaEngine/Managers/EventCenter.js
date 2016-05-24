function EventCenter() {
    this.initialize = function () {
        this.events = {};
    };

    this.initialize();

    function FunctionCaller(functionName, owner) {
        this.functionName = functionName;
        this.owner = owner;
    }

    this.subscribeEvent = function (eventName, functionToFire, owner) {
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(new FunctionCaller(functionToFire, owner));
    };

    this.unsubscribeEvent = function (eventName, functionToUnsubscribe) {
        if (!this.events.hasOwnProperty(eventName))
            return;

        var index = this.events[eventName].indexOf(functionToUnsubscribe);

        if (index < 0)
            return;

        this.events[eventName].splice(index, 1);
    };

    this.callEvent = function (eventName, sender, args) {
        if (!this.events.hasOwnProperty(eventName))
            return;
        args = args || {};
        args["sender"] = sender;
        
        for (var i = 0; i < this.events[eventName].length; i++) {
            this.events[eventName][i].functionName.call(this.events[eventName][i].owner, args);
        }
    };
}

var EventCenterInstance = (function () {
    var instance;

    function createInstance() {
        return new EventCenter();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();