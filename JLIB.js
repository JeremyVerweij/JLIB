var JLIB = {};
var JLIB_LOADER = {};
var JLIB_EXTENSIONS = {};

JLIB_LOADER.JLIB_LOADED = [];
JLIB_LOADER.JLIB_LOADED_WAIT = [];
JLIB_LOADER.JLIB_LOADED_WAIT_LIST = [];
JLIB_LOADER.JLIB_SRC_LOAD_INDEX = 0;

JLIB_LOADER.JLIB_SRC_LIST = [
    {src: "common/addScript", requirements: [], enabled: () => true},
    {src: "api/log", requirements: [], enabled: () => true},
    {src: "common/addCss", requirements: [], enabled: () => true},
    {src: "common/extensions", requirements: [], enabled: () => JLIB["extensionEnabled"]},
    {src: "common/http", requirements: [], enabled: () => true},
    {src: "common/commonMath", requirements: [], enabled: () => true},
    {src: "common/boundsCheck", requirements: ["common/commonMath"], enabled: () => true},
    {src: "api/events", requirements: ["common/boundsCheck"], enabled: () => true},
];

JLIB.common = {};
JLIB.api = {};
JLIB.extensions = {};

JLIB.config = document.getElementsByTagName("jlib-config")[0];
JLIB.sourceFolder = JLIB.config.getElementsByTagName("jlib-src")[0].innerHTML + "/";
JLIB.extensionEnabled = (JLIB.config.getElementsByTagName("jlib-allow-extensions")[0].innerHTML) === "true";

document.head.appendChild((() => {var JLIB_SOURCE_LOADER_tmp = document.createElement('script'); JLIB_SOURCE_LOADER_tmp.src = JLIB.sourceFolder + "common/addScript.js"; return JLIB_SOURCE_LOADER_tmp;})());