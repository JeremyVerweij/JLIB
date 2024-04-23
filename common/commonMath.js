JLIB.common.pythagorean = {};
JLIB.common.pythagorean.a = (c, b) => Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
JLIB.common.pythagorean.b = (c, a) => Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
JLIB.common.pythagorean.c = (a, b) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

JLIB.common.convertToBox = function(notBox, array = false){
    var box = {};

    if(array){
        box.x1 = notBox[0];
        box.y1 = notBox[1];
        box.x2 = notBox[2];
        box.y2 = notBox[3];
    }else{
        box.x1 = notBox.x;
        box.y1 = notBox.y;
        box.x2 = notBox.x + notBox.width;
        box.y2 = notBox.y + notBox.height;
    }

    return box;
}

JLIB.common.convertToCoord = function(object){
    if(object.x2 != undefined && object.y2 != undefined)
        return [object.x1, object.y1, object.x2, object.y2];

    return [object.x, object.y];
}

JLIB.common.getBoxWidthAndHeight = (box) => [(box.x2 - box.x1), (box.y2 - box.y1)];
JLIB.common.getBoxDiagonal = (w, h) => JLIB.common.pythagorean.c(w, h);
JLIB.common.getBoxRadius = (w, h) => JLIB.common.getBoxDiagonal(w, h) / 2;

JLIB.common.getBoxCenter = function(box){
    var w = box.x2 - box.x1;
    var h = box.y2 - box.y1;

    var x = box.x1 + (w/2);
    var y = box.y1 + (h/2);

    return JLIB.common.coord(x, y);
}

JLIB.common.coordObject = class{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.convertToCoord = () => JLIB.common.convertToCoord(this);
    }
}

JLIB.common.boxObject = class{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.convertToBox = () => JLIB.common.convertToBox(this);
        this.getBoxCenter = () => JLIB.common.getBoxCenter(this.convertToBox());
    }
}

JLIB.common.box = class{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.getBoxCenter = () => JLIB.common.getBoxCenter(this);
        this.getWidthAndHeight = () => JLIB.common.getBoxWidthAndHeight(this);
    }

    getBoxRadius(){
        var wh = this.getWidthAndHeight();
        return JLIB.common.getBoxRadius(wh[0], wh[1]);
    }

    getBoxDiagonal(){
        var wh = this.getWidthAndHeight();
        return JLIB.common.getBoxDiagonal(wh[0], wh[1]);
    }
}

JLIB.common.circle = class{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
    }
}

JLIB.common.coord = (x, y) => [x, y];

JLIB.common.calcDistance = (point1, point2) => {
    return JLIB.common.pythagorean.c((point1[0] - point2[0]), (point1[1] - point2[1]))
}

JLIB.common.calcDistanceBoxes = function(box1, box2){
    var point1 = JLIB.common.getBoxCenter(box1);
    var point2 = JLIB.common.getBoxCenter(box2);
    var wh1 = JLIB.common.getBoxWidthAndHeight(box1);
    var wh2 = JLIB.common.getBoxWidthAndHeight(box2);
    var r1 = JLIB.common.getBoxRadius(wh1[0], wh1[1]);
    var r2 = JLIB.common.getBoxRadius(wh2[0], wh2[1]);
    return JLIB.common.calcDistance(point1, point2) - r1 - r2;
}

JLIB.common.calcDistanceCircle = function(circle1, circle2){
    var m1 = circle1.center;
    var m2 = circle2.center;
    var d = JLIB.common.calcDistance(m1, m2);
    return d - circle1.radius - circle2.radius;
}

window.dispatchEvent(JLIB.common.scriptLoaded)