export function getAngleToPoint(currX, currZ, endX, endZ) {
    var angle = Math.atan2(endZ - currZ, endX - currX);

    return angle * 180 / Math.PI;
};

export function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
};