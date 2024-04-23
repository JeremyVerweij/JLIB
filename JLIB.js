var JLIB = {};
var JLIB_LOADER = {};
var JLIB_EXTENSIONS = [];

JLIB_LOADER.JLIB_LOADED = [];
JLIB_LOADER.JLIB_LOADED_WAIT = [];
JLIB_LOADER.JLIB_LOADED_WAIT_LIST = [];
JLIB_LOADER.JLIB_SRC_LOAD_INDEX = 0;

JLIB_LOADER.JLIB_SRC_LIST = [
    {src: "common/addScript", requirements: []},
    {src: "common/addCss", requirements: []},
    {src: "common/extensions", requirements: []},
    {src: "common/http", requirements: []},
    {src: "common/commonMath", requirements: []},
    {src: "common/boundsCheck", requirements: ["common/commonMath"]},
    {src: "api/events", requirements: ["common/boundsCheck"]},
    {src: "api/log", requirements: []},
];

JLIB_LOADER.JLIB_SRC_LIST_NODE = [
    {src: "node/fsExtended", requirements: []},
];

JLIB.common = {};
JLIB.api = {};

JLIB.sourceFolder = document.getElementById("JLIB").dataset.lib;
JLIB_EXTENSIONS = JSON.parse(document.getElementById("JLIB").dataset.extensions);

document.head.appendChild((() => {var JLIB_SOURCE_LOADER_tmp = document.createElement('script'); JLIB_SOURCE_LOADER_tmp.src = JLIB.sourceFolder + "common/addScript.js"; return JLIB_SOURCE_LOADER_tmp;})());