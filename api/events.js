JLIB.api.mouse = {x: 0, y: 0, down: false};
JLIB.api.keyBoard = {};
JLIB.api.windowSize = {width: window.innerWidth, height: window.innerHeight};
JLIB.api.clickEvents = [];
JLIB.api.resizeEvents = [];
JLIB.api.wheelEvents = [];

JLIB.api.addClickEvent = (bounds, __callback) => JLIB.api.clickEvents.push({bounds: bounds, __callback: __callback});
JLIB.api.addResizeEvent = (__callback) => JLIB.api.resizeEvents.push({__callback: __callback});
JLIB.api.addWheelEvent = (__callback) => JLIB.api.wheelEvents.push({__callback: __callback});

window.addEventListener("mousemove", (e) => {
    JLIB.api.mouse.x = e.clientX;
    JLIB.api.mouse.y = e.clientY;
})

window.addEventListener("wheel", (event) => {
    for (let i = 0; i < JLIB.api.wheelEvents.length; i++) {
        const element = JLIB.api.wheelEvents[i];
        element.__callback(event.wheelDelta)
    }
})

window.addEventListener("mousedown", () => JLIB.api.mouse.down = true);
window.addEventListener("mouseup", () => JLIB.api.mouse.down = false);

window.addEventListener("keydown", (e) => JLIB.api.keyBoard[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => JLIB.api.keyBoard[e.key.toLowerCase()] = false);

window.addEventListener("click", () => {
    for (let i = 0; i < JLIB.api.clickEvents.length; i++) {
        const element = JLIB.api.clickEvents[i];
        if(JLIB.common.checkBoundForSingleCoord(element.bounds, JLIB.common.convertToCoord(JLIB.api.mouse)))
            element.__callback(JLIB.api.mouse);
    }
})

window.addEventListener("resize", () => {
    JLIB.api.windowSize.width = window.innerWidth;
    JLIB.api.windowSize.height = window.innerHeight;

    for (let i = 0; i < JLIB.api.resizeEvents.length; i++) {
        const element = JLIB.api.resizeEvents[i];
        element.__callback(JLIB.api.windowSize);
    }
})

window.dispatchEvent(JLIB.common.scriptLoaded)