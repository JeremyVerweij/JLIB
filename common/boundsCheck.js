JLIB.common.checkBoundForSingleCoord = function(box, coords){
    if (coords[0] >= box.x1 && coords[0] <= box.x2) {
        if (coords[1] >= box.y1 && coords[1] <= box.y2) {
            return true;
        }
    }
    return false;
}

JLIB.common.checkBoundForBox = function(box1, box2){
    // no horizontal overlap
	if (box1.x1 >= box2.x2 || box2.x1 >= box1.x2) return false;

	// no vertical overlap
	if (box1.y1 >= box2.y2 || box2.y1 >= box1.y2) return false;

	return true;
}

JLIB.common.convertToBox = function(notBox, array){
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

window.dispatchEvent(JLIB.common.scriptLoaded)