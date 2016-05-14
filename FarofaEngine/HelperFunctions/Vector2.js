function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector2.prototype.toString = function pointToString() {
    return "(" + this.x + "," + this.y + ")";
};

Vector2.prototype.sum = function (other) {
    this.x += other.x;
    this.y += other.y;
};

Vector2.prototype.equals = function (other) {
    return this.x == other.x && this.y == other.y;
};

Vector2.prototype.multiplyByScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};

Vector2.prototype.getBiggestCoordinate = function () {
	var x = Math.abs(this.x);
	var y = Math.abs(this.y);
	
    return x > y ? x : y;
};