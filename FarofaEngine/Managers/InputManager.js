var InputManager = ( function () {
    var keys = [];
    var keyToNumber = {
        "a": 65,
        "d": 68,
        "s": 83,
        "w": 88,
        "arrowLeft": 37,
        "arrowUp": 38,
        "arrowRight": 39,
        "arrowDown": 40,
        "space": 32,
        "esc": 27
    };

    var numberToKey = {
        37: "arrowLeft",
        39: "arrowRight",
        32: "space",
        27: "esc"
    };

    function KeyPressed(key) {
        this.key = key;
        this.timePressed = new Date().getTime();
    }

    KeyPressed.prototype.toString = function () {
        return this.key + " " + this.timePressed;
    };

    function onKeyDown(e) {
        if (!keys[e.keyCode]) {
            EventCenterInstance.getInstance().callEvent(numberToKey[e.keyCode] + "Clicked", this, {"key": e.keyCode});
        }
        keys[e.keyCode] = true;
    }

    function onKeyUp(e) {
        keys[e.keyCode] = false;
    }

    function onMouseMove(event) {
        mousePosition = new Vector2(event.clientX, event.clientY);
        EventCenterInstance.getInstance().callEvent("mouseMovedTo", this, {"position": mousePosition});
    }

    var canvas;
    var mousePosition = new Vector2();

    return {
        initialize : function () {
            keys = [];
            window.addEventListener("keyup", onKeyUp);
            window.addEventListener("keydown", onKeyDown);
            canvas =  FarofaGame.getCanvas();
            //console.log(canvas);
            //canvas.addEventListener("mousemove ", onMouseMove);
            document.onmousemove = onMouseMove;
        },
        isKeyPressed : function (key) {
            return keys[keyToNumber[key]];
        },
        getMousePosition: function () {
            var boundingRect = canvas.getBoundingClientRect();
            return new Vector2(mousePosition.x - boundingRect.left, mousePosition.y - boundingRect.top);
        }
    }
})();
