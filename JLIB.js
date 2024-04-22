var JLIB = {};
var JLIB_LOADER = {};
var JLIB_EXTENSIONS = [];

JLIB_LOADER.JLIB_LOADED = [];
JLIB_LOADER.JLIB_LOADED_WAIT_LIST = [];
JLIB_LOADER.JLIB_SRC_LOAD_INDEX = 0;

JLIB_LOADER.JLIB_SRC_LIST = [
    {src: "common/addScript", requirements: []},
    {src: "common/addCss", requirements: []},
    {src: "common/boundsCheck", requirements: []},
    {src: "common/events", requirements: ["common/boundsCheck"]},
];

JLIB.common = {};
JLIB.api = {};
JLIB.render = {};
JLIB.ui = {};

JLIB.sourceFolder = document.getElementById("JLIB").dataset.lib;
document.head.appendChild((() => {var JLIB_SOURCE_LOADER_tmp = document.createElement('script'); JLIB_SOURCE_LOADER_tmp.src = JLIB.sourceFolder + "common/addScript.js"; return JLIB_SOURCE_LOADER_tmp;})());