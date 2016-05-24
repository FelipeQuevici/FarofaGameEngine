/**
 * Created by Felipe on 11/05/2016.
 */

function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

function angleBetweenTwoPoints(p1, p2) {
    var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    return angle;
}

function distanceBetweenTwoPoints(p1, p2) {
    return Math.sqrt(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2));
}