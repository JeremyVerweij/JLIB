JLIB.common.addCSS = function(src){
    var JLIB_addCSS_html_temp = document.createElement('link');
    JLIB_addCSS_html_temp.rel = "stylesheet";
    JLIB_addCSS_html_temp.href = JLIB.sourceFolder + src + ".css";
    document.head.appendChild(JLIB_addCSS_html_temp);
}

window.dispatchEvent(JLIB.common.scriptLoaded)