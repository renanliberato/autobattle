export function getAngleToPoint(currX, currZ, endX, endZ) {
    var angle = Math.atan2(endZ - currZ, endX - currX);

    return angle * 180 / Math.PI;
};