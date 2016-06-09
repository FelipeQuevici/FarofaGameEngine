function Rectangle(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.center = function () {
        return new Vector2(this.width / 2 + this.x, this.height / 2 + this.y);
    };

    this.bottom = function () {
        return this.y + this.height;
    };

    this.right = function () {
        return this.x + this.width;
    };

    this.toString = function () {
      return "(" + this.x + ", " +  this.y + ", "  + this.width + ", "+  this.height + ")";
    };

    this.isPointInside = function (point) {
        if (this.x <= point.x) {
            if (point.x <= this.right()) {
                if (this.y <= point.y) {
                    if (point.y <= this.bottom()){
                        return true;
                    }
                }
            }
        }
        return false;
        //return (this.x <= point.x <= this.x + this.width) && (this.y <= point.y <= this.y + this.height)
    }
}
