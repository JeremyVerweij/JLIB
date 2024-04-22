(() => {
    var JLIB_E_TEMP = [];
    
    for (let index = 0; index < JLIB_EXTENSIONS.length; index++) {
        const element = JLIB_EXTENSIONS[index];
        JLIB_E_TEMP.push(element.name);
    }

    for (let index = 0; index < JLIB_E_TEMP.length; index++) {
        const element = JLIB_E_TEMP[index];
        const element2 = JLIB_EXTENSIONS[index];
        
        if(JLIB.common.includesAll(JLIB_E_TEMP, element2.requirements)){

        }else
            console.error(`JLIB-extension[${element}]: couldn't find all the required extensions!`)
    }
})()

window.dispatchEvent(JLIB.common.scriptLoaded)