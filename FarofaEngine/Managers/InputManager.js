var InputManager = ( function () {
    var keys = [];
    var keyToNumber = {
        "a": [65],
        "d": [68],
        "s": [83],
        "w": [87],
        "arrowLeft": [37],
        "arrowUp": [38],
        "arrowRight": [39],
        "arrowDown": [40],
        "space": [32],
        "esc": [27],
        "mouseLeft": [1],

        "left": [65, 37],
        "right": [68, 39],
        "down": [83, 40],
        "up": [87, 38],

        "attack1": [1],
        "attack2": [3],
        "dash": [32]
    };

    var numberToKey = {
        37: "arrowLeft",
        39: "arrowRight",
        32: "space",
        27: "esc"
    };

    function onKeyDown(e) {
        if (e.keyCode == 3) return;

        if (!keys[e.keyCode]) {
            EventCenterInstance.getInstance().callEvent(numberToKey[e.keyCode] + "Clicked", this, {"key": e.keyCode});
        }
        keys[e.keyCode] = true;
    }

    function onKeyUp(e) {
        if (e.keyCode == 3) return;

        keys[e.keyCode] = false;
    }

    function onMouseMove(event) {

        mousePosition = new Vector2(event.clientX, event.clientY);
        EventCenterInstance.getInstance().callEvent("mouseMovedTo", this, {"position": mousePosition});
    }

    function onClick(event) {

    }

    var mouseEventToButton = function (event) {
        var button;
        if ("which" in event) {
            button = event.which;
        }
        else if ("button" in event) {
            button = event.button;
        }
        return button;
    };

    function onMouseDown(event) {
        event.preventDefault();
        var button = mouseEventToButton(event);
        if (!keys[button]) {
            EventCenterInstance.getInstance().callEvent("mouse" + button + "Clicked", this, {position: mousePosition});
        }
        keys[button] = true;
    }

    function onMouseUp(event) {
        keys[mouseEventToButton(event)] = false;
    }

    var canvas;
    var mousePosition = new Vector2();

    return {
        initialize : function () {
            keys = [];
            window.addEventListener("keyup", onKeyUp);
            window.addEventListener("keydown", onKeyDown);
            canvas =  FarofaGame.getCanvas();
            document.onmousemove = onMouseMove;
            window.addEventListener("mousedown", onMouseDown);
            window.addEventListener("mouseup", onMouseUp);
        },
        isKeyPressed : function (key) {
            if (keyToNumber.hasOwnProperty(key)) {
                for (var i = 0; i < keyToNumber[key].length; i++) {
                    if (keys[keyToNumber[key][i]]) return true;
                }
            }
            return false;
        },
        getMousePosition: function () {
            var boundingRect = canvas.getBoundingClientRect();
            return new Vector2(mousePosition.x - boundingRect.left, mousePosition.y - boundingRect.top);
        }
    }
})();
