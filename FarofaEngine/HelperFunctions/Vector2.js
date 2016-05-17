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

Vector2.prototype.sub = function (other) {
    this.x -= other.x;
    this.y -= other.y;
};

Vector2.prototype.equals = function (other) {
    return this.x == other.x && this.y == other.y;
};

Vector2.prototype.multiplyByScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};

Vector2.prototype.divideByScalar = function (scalar) {
    this.x /= scalar;
    this.y /= scalar;
};

Vector2.prototype.getBiggestCoordinate = function () {
	var x = Math.abs(this.x);
	var y = Math.abs(this.y);
	
    return x > y ? x : y;
};

Vector2.prototype.magnitude = function () {
    return Math.sqrt(this.x*this.x + this.y * this.y);
};

Vector2.prototype.normalize = function () {
    if (this.x == 0 && this.y == 0) return;

    var m = this.magnitude();
    this.divideByScalar(m);
};

Vector2.prototype.angle = function () {
    var atan = Math.atan2(this.y, this.x) * 180 / Math.PI;
    if (atan < 0) atan += 360;
    return atan;
};

var polarToVector = function (magnitude, angle) {
    angle-=180;
    angle *=  Math.PI / 180;
    return new Vector2(-Math.cos(angle)*magnitude, -Math.sin(angle)*magnitude)
};