JLIB.common.includesAll = (arr, values) => values.every(v => arr.includes(v));
JLIB.common.objectIncludesAll = (object, values) => values.every(v => object[v] != undefined);

JLIB.common.addScript = function(src){
    var JLIB_addScript_html_temp = document.createElement('script');
    JLIB_addScript_html_temp.src = JLIB.sourceFolder + src + ".js";
    JLIB.scripts_element.appendChild(JLIB_addScript_html_temp);
}

JLIB.common.scriptLoaded = new Event("JLIB_script_loaded");

JLIB.common.scriptLoadedEvent = function() {
    for (let index = 0; index < JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length; index++) {
        const loaded_element = JLIB_LOADER.JLIB_LOADED_WAIT_LIST[index];

        var cds = true;

        if(loaded_element.EXTENSION != undefined){
            var x = JLIB_EXTENSIONS[loaded_element.EXTENSION].requirements;
            for (let index = 0; index < x.length; index++) {
                const element = JLIB_EXTENSIONS[x[index]];
                if(!element.loaded){
                    cds = false;
                }
            }
        }

        if(JLIB.common.includesAll(JLIB_LOADER.JLIB_LOADED, loaded_element.requirements) && loaded_element.enabled() && cds){
            JLIB.common.addScript(loaded_element.src);
            JLIB_LOADER.JLIB_LOADED.push(loaded_element.src);
            JLIB_LOADER.JLIB_LOADED_WAIT_LIST.splice(index, 1);
            return;
        }
    }

    var JLIB_script_loaded_tmp = JLIB_LOADER.JLIB_SRC_LIST[JLIB_LOADER.JLIB_SRC_LOAD_INDEX];

    if(JLIB_LOADER.JLIB_LOADED_WAIT.indexOf(JLIB_script_loaded_tmp.src) == -1)
        JLIB_LOADER.JLIB_LOADED.push(JLIB_script_loaded_tmp.src);
    
    JLIB_LOADER.JLIB_SRC_LOAD_INDEX++;
    
    if(JLIB_LOADER.JLIB_SRC_LOAD_INDEX == JLIB_LOADER.JLIB_SRC_LIST.length){
        function JLIB_TEMP_FUNCTION(){
            var JLIB_TEMP_F = "";
            for (let index = 0; index < JLIB_LOADER.JLIB_LOADED_WAIT_LIST.length; index++) {
                const element = JLIB_LOADER.JLIB_LOADED_WAIT_LIST[index];
                if(index != 0)
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

    if(JLIB_script_loaded_tmp.EXTENSION != undefined){
        var x = JLIB_EXTENSIONS[JLIB_script_loaded_tmp.EXTENSION].requirements;
        for (let index = 0; index < x.length; index++) {
            const element = JLIB_EXTENSIONS[x[index]];
            if(!element.loaded){
                JLIB_LOADER.JLIB_LOADED_WAIT_LIST.push(JLIB_script_loaded_tmp);
                JLIB_LOADER.JLIB_LOADED_WAIT.push(JLIB_script_loaded_tmp.src);
                JLIB.common.scriptLoadedEvent();
                return;
            }
        }
    }

    if(JLIB_LOADER.EXTENSION_LAST_ELEMENT[JLIB_script_loaded_tmp.src] !== undefined){
        JLIB_EXTENSIONS[JLIB_LOADER.EXTENSION_LAST_ELEMENT[JLIB_script_loaded_tmp.src]].loaded = true;
    }

    JLIB.common.addScript(JLIB_script_loaded_tmp.src);
}

window.addEventListener("JLIB_script_loaded", JLIB.common.scriptLoadedEvent)

window.dispatchEvent(JLIB.common.scriptLoaded)