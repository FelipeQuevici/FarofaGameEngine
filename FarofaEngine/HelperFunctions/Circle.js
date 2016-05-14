function Circle(center, radius) {
    this.center = center || new Vector2(0,0);
    this.radius = radius || 0;

    this.toString = function () {
      return "(Center: " + this.center.x + ", " +  this.radius.y + ", Radius: "  + this.radius + ")";
    };
}
