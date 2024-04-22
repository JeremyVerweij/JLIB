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
            for (let idx = 0; idx < element2.overrides.length; idx++) {
                const ez = element2.overrides[idx];
                
                var idxZ = JLIB_LOADER.JLIB_SRC_LIST.findIndex((e) => e.src == ez);
                JLIB_LOADER.JLIB_SRC_LIST.splice(idxZ, 1);
            }

            JLIB_LOADER.JLIB_SRC_LIST = JLIB_LOADER.JLIB_SRC_LIST.concat(element2.files);
        }else
            console.error(`JLIB-extension[${element}]: couldn't find all the required extensions!`)
    }
})()

window.dispatchEvent(JLIB.common.scriptLoaded)