JLIB.api.mouse = {x: 0, y: 0};
JLIB.api.keyBoard = {};

window.addEventListener("mousemove", (e) => {
    JLIB.api.mouse.x = e.clientX;
    JLIB.api.mouse.y = e.clientY;
})

window.addEventListener("keydown", (e) => {
    JLIB.api.keyBoard[e.key.toLowerCase()] = true;
})


window.addEventListener("keyup", (e) => {
    JLIB.api.keyBoard[e.key.toLowerCase()] = false;
})

window.dispatchEvent(JLIB.common.scriptLoaded)