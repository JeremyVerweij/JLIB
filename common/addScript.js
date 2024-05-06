JLIB.common.includesAll = (arr, values) => values.every(v => arr.includes(v));
JLIB.common.objectIncludesAll = (object, values) => values.every(v => object[v] != undefined);

JLIB.common.addScript = function(src){
    var JLIB_addScript_html_temp = document.createElement('script');
    JLIB_addScript_html_temp.src = JLIB.sourceFolder + src + ".js";
    JLIB.scripts_element.appendChild(JLIB_addScript_html_temp);
}

JLIB.common.scriptLoaded = new Event("JLIB_script_loaded");

JLIB.common.scriptLoadedEvent = function() {
    for (let JLIB_script_loaded_index = 0; JLIB_script_loaded_index < JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length; JLIB_script_loaded_index++) {
        const JLIB_script_loaded_element = JLIB_LOADER.JLIB_LOADED_WAIT_LIST[JLIB_script_loaded_index];
        if(JLIB.common.includesAll(JLIB_LOADER.JLIB_LOADED, JLIB_script_loaded_element.requirements) && JLIB_script_loaded_element.enabled()){
            JLIB.common.addScript(JLIB_script_loaded_element.src);
            JLIB_LOADER.JLIB_LOADED_WAIT_LIST.splice(JLIB_script_loaded_index, 1);
        }
    }

    var JLIB_script_loaded_tmp = JLIB_LOADER.JLIB_SRC_LIST[JLIB_LOADER.JLIB_SRC_LOAD_INDEX];
    if(JLIB_LOADER.JLIB_LOADED_WAIT.indexOf(JLIB_script_loaded_tmp.src) == -1) JLIB_LOADER.JLIB_LOADED.push(JLIB_script_loaded_tmp.src);
    
    JLIB_LOADER.JLIB_SRC_LOAD_INDEX++;
    
    if(JLIB_LOADER.JLIB_SRC_LOAD_INDEX == JLIB_LOADER.JLIB_SRC_LIST.length){
        function JLIB_TEMP_FUNCTION(){
            var JLIB_TEMP_F = "";
            for (let JLIB_INDEX_TEMP = 0; JLIB_INDEX_TEMP < JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length; JLIB_INDEX_TEMP++) {
                const element = JLIB_LOADER.JLIB_LOADED_WAIT_LIST[JLIB_INDEX_TEMP];
                if(JLIB_INDEX_TEMP != 0)
                    JLIB_TEMP_F += ", ";
                JLIB_TEMP_F += element.src;
            }

            return JLIB_TEMP_F;
        }

        if(JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length != 0)
            console.error(`JLIB-ScriptLoader: couldn't load the following files: "${JLIB_TEMP_FUNCTION()}"`)
        return;
    }

    JLIB_script_loaded_tmp = JLIB_LOADER.JLIB_SRC_LIST[JLIB_LOADER.JLIB_SRC_LOAD_INDEX];
    
    if(!JLIB.common.includesAll(JLIB_LOADER.JLIB_LOADED, JLIB_script_loaded_tmp.requirements)){
        JLIB_LOADER.JLIB_LOADED_WAIT_LIST.push(JLIB_script_loaded_tmp);
        JLIB_LOADER.JLIB_LOADED_WAIT.push(JLIB_script_loaded_tmp.src);
        JLIB.common.scriptLoadedEvent();
        return;
    }

    if(!JLIB_script_loaded_tmp.enabled()){
        JLIB_LOADER.JLIB_LOADED_WAIT_LIST.push(JLIB_script_loaded_tmp);
        JLIB_LOADER.JLIB_LOADED_WAIT.push(JLIB_script_loaded_tmp.src);
        JLIB.common.scriptLoadedEvent();
        return;
    }

    JLIB.common.addScript(JLIB_script_loaded_tmp.src);
}

window.addEventListener("JLIB_script_loaded", JLIB.common.scriptLoadedEvent)

window.dispatchEvent(JLIB.common.scriptLoaded)