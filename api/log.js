var LOG = {};
LOG.logs = [];
LOG.debugging = false;
LOG.debugtyle = 'background-color: darkred; color: white;';

LOG.normal = function(...msg){
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        console.log(element);
        
        LOG.logs.push({type: "normal", msg: element});
    }
}

LOG.warn = function(...msg){
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        console.warn(element);
        
        LOG.logs.push({type: "warn", msg: element});
    }
}

LOG.error = function(...msg){
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        console.error(element);
        
        LOG.logs.push({type: "error", msg: element});
    }
}

LOG.debug = function(...msg){
    if(!LOG.debugging) return;
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        console.log("%c" + element, LOG.debugtyle);
        
        LOG.logs.push({type: "debug", msg: element});
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
