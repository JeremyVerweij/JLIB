(() => {
    var JLIB_EXTENSIONS_TEMP = document.getElementsByTagName("jlib-extension");

    for (let JLIB_I = 0; JLIB_I < JLIB_EXTENSIONS_TEMP.length; JLIB_I++) {
        const JLIB_ELEMENT = JLIB_EXTENSIONS_TEMP[JLIB_I];
        
        var JLIB_E_TMP = JLIB_ELEMENT.children;

        var JLIB_TEMP_SRC, JLIB_TEMP_NAME;
        var JLIB_TEMP_REQUIREMENTS = [];

        for (let JLIB_I2 = 0; JLIB_I2 < JLIB_E_TMP.length; JLIB_I2++) {
            const JLIB_ELEMENT2 = JLIB_E_TMP[JLIB_I2];
            const JLIB_TEMP_TYPE = JLIB_ELEMENT2.nodeName;

            switch (JLIB_TEMP_TYPE) {
                case "JLIB-SRC":
                    JLIB_TEMP_SRC = JLIB_ELEMENT2.innerHTML;

                    break;
                case "JLIB-EXTENSION-NAME":
                    JLIB_TEMP_NAME = JLIB_ELEMENT2.innerHTML;
                        
                    break;
                case "JLIB-REQUIREMENT":
                    JLIB_TEMP_REQUIREMENTS.push(JLIB_ELEMENT2.innerHTML);
                    break;
            }

        }

        JLIB_EXTENSIONS[JLIB_TEMP_NAME] = {name: JLIB_TEMP_NAME, src: JLIB_TEMP_SRC, requirements: JLIB_TEMP_REQUIREMENTS, config_element: JLIB_ELEMENT};
    }

    for (const JLIB_TEMP_KEY in JLIB_EXTENSIONS) {
        const JLIB_TEMP_ELEMENT = JLIB_EXTENSIONS[JLIB_TEMP_KEY];
        
        if(!JLIB.common.objectIncludesAll(JLIB_EXTENSIONS, JLIB_TEMP_ELEMENT.requirements)){
            LOG.error(`Couldn't find all the dependencies for ${JLIB_TEMP_ELEMENT.name}`);
            return;
        }

        JLIB.common.addScript(JLIB_TEMP_ELEMENT.src + "/_init");
    }
})()

window.dispatchEvent(JLIB.common.scriptLoaded)