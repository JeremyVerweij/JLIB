JLIB.common.includesAll = (arr, values) => values.every(v => arr.includes(v));

JLIB.common.addScript = function(src){
    var JLIB_addScript_html_temp = document.createElement('script');
    JLIB_addScript_html_temp.src = JLIB.sourceFolder + src + ".js";
    document.head.appendChild(JLIB_addScript_html_temp);
}

JLIB.common.scriptLoaded = new Event("JLIB_script_loaded");

window.addEventListener("JLIB_script_loaded", () => {
    for (let JLIB_script_loaded_index = 0; JLIB_script_loaded_index < JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length; JLIB_script_loaded_index++) {
        const JLIB_script_loaded_element = JLIB_LOADER.JLIB_LOADED_WAIT_LIST[JLIB_script_loaded_index];
        if(JLIB.common.includesAll(JLIB_LOADER.JLIB_LOADED, JLIB_script_loaded_element.requirements))
            JLIB.common.addScript(JLIB_script_loaded_element.src);
    }

    var JLIB_script_loaded_tmp = JLIB_LOADER.JLIB_SRC_LIST[JLIB_LOADER.JLIB_SRC_LOAD_INDEX];
    JLIB_LOADER.JLIB_LOADED.push(JLIB_script_loaded_tmp.src);
    
    JLIB_LOADER.JLIB_SRC_LOAD_INDEX++;
    
    if(JLIB_LOADER.JLIB_SRC_LOAD_INDEX == JLIB_LOADER.JLIB_SRC_LIST.length) return;

    JLIB_script_loaded_tmp = JLIB_LOADER.JLIB_SRC_LIST[JLIB_LOADER.JLIB_SRC_LOAD_INDEX];

    if(JLIB.common.includesAll(JLIB_LOADER.JLIB_LOADED, JLIB_script_loaded_tmp.requirements))
        JLIB.common.addScript(JLIB_script_loaded_tmp.src);
    else
        JLIB_LOADER.JLIB_LOADED_WAIT_LIST.push(JLIB_script_loaded_tmp);
})

window.dispatchEvent(JLIB.common.scriptLoaded)