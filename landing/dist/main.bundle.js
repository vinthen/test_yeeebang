/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/footer.js":
/*!***********************!*\
  !*** ./src/footer.js ***!
  \***********************/
/*! exports provided: createFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createFooter\", function() { return createFooter; });\n/* --------------- Create footer --------------- */\nvar createFooter = function createFooter(wrapper) {\n  var footer = document.createElement('div');\n  footer.classList.add('footer');\n  var htmlFragment = \"<div class=\\\"centerwpr\\\">\\n        <p class=\\\"footer--rights\\\">Copyright \\xA9 2016 SynerFUN Technology Corp. All rights reserved.</p>\\n    </div>\";\n  footer.innerHTML = htmlFragment;\n  wrapper.appendChild(footer);\n};\n\n//# sourceURL=webpack:///./src/footer.js?");

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! exports provided: createHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createHeader\", function() { return createHeader; });\n/* --------------- Create header --------------- */\nvar createHeader = function createHeader(wrapper) {\n  // header wrapper\n  var header = document.createElement('div');\n  header.classList.add('header'); // header html\n\n  var htmlFragment = _htmlFragment();\n\n  header.innerHTML = htmlFragment;\n  wrapper.appendChild(header); // search bar handler\n\n  var searchControl = header.querySelector('.search-control');\n  searchBarHandler(searchControl);\n};\n/* ---------- header HTML fragment ---------- */\n\nvar _htmlFragment = function _htmlFragment() {\n  var HTML = \"<div class=\\\"centerwpr\\\">\\n        <a class=\\\"logo\\\" href=\\\"/\\\"></a>\\n\\n        <div class=\\\"search-control\\\">\\n            <input type=\\\"text\\\" id=\\\"siteSearchBar\\\">\\n            <div class=\\\"search-hint\\\">\\n                <i class=\\\"fas fa-search\\\"></i>\\n                <i class=\\\"fas fa-angle-down\\\"></i>\\n                <span class=\\\"placeholder\\\">\\u641C\\u5C0B\\u624D\\u85DD\\u73ED\\u6216\\u51AC\\u590F\\u4EE4\\u71DF</span>\\n            </div>\\n\\n            <div class=\\\"search-menu\\\">\\n                <div class=\\\"searchMenu--overlay\\\"></div>\\n                <div id=\\\"siteSearchMenu\\\" class=\\\"search-condition\\\">\\n                    <h3><i class=\\\"fas fa-circle\\\"></i>\\u589E\\u52A0\\u641C\\u5C0B\\u689D\\u4EF6</h3>\\n                    <ul class=\\\"classType\\\">\\n                        <li class=\\\"typeEntry selected\\\">\\u624D\\u85DD\\u73ED</li>\\n                        <li class=\\\"typeEntry\\\">\\u590F\\u4EE4\\u71DF</li>\\n                        <li class=\\\"typeEntry\\\">\\u51AC\\u4EE4\\u71DF</li>\\n                    </ul>\\n                    \\n                    <div class=\\\"condition-tab\\\">\\n                        <div class=\\\"condition-tab__bg\\\"></div>\\n                        <div class=\\\"condition-entry\\\">\\n                            <span class=\\\"type\\\">\\u5730\\u5340</span>\\n                            <div class=\\\"option\\\">\\u6240\\u6709\\u5730\\u5340</div>\\n                        </div>\\n\\n                        <div class=\\\"condition-entry\\\">\\n                            <span class=\\\"type\\\">\\u985E\\u5225</span>\\n                            <div class=\\\"option\\\">\\u6240\\u6709\\u985E\\u5225</div>\\n                        </div>\\n\\n                        <div class=\\\"condition-entry\\\">\\n                            <div class=\\\"condition-select\\\">\\n                                <div class=\\\"checkbox\\\"></div>                             \\n                                <div class=\\\"text\\\">\\u6709\\u590F\\u4EE4\\u71DF</div>\\n                            </div>\\n\\n                            <div class=\\\"condition-select\\\">  \\n                                <div class=\\\"checkbox\\\"></div>                            \\n                                <div class=\\\"text\\\">\\u6709\\u51AC\\u4EE4\\u71DF</div>\\n                            </div>\\n                        </div>\\n\\n                    </div>\\n\\n                    <div id=\\\"search-submit\\\">\\u641C\\u5C0B</div>\\n                </div>\\n            </div><!-- .search-menu -->\\n\\n        </div><!-- .search-control -->\\n\\n    </div>\";\n  return HTML;\n}; // _htmlFragment\n\n/* ---------- search bar handler ---------- */\n\n\nvar searchBarHandler = function searchBarHandler(container) {\n  var searchBar = container.querySelector('#siteSearchBar');\n  var placeholder = container.querySelector('.placeholder'); // input handler\n\n  searchBar.addEventListener('input', function (event) {\n    var _this = event.target;\n    var inputValue = _this.value;\n    inputValue.length > 0 ? container.classList.add('input') : container.classList.remove('input'); // console.log(inputValue);\n  }); // focus handler\n\n  searchBar.addEventListener('focus', function () {\n    container.classList.add('active');\n    placeholder.textContent = '輸入關鍵字 ...';\n  }); // blur handler\n  // searchBar.addEventListener('blur',() => {\n  //     container.classList.remove('input');\n  // });\n\n  var menuOverlay = container.querySelector('.searchMenu--overlay'); // console.log(menuOverlay);\n\n  menuOverlay.addEventListener('click', function () {\n    container.classList.remove('active');\n    placeholder.textContent = '搜尋才藝班或冬夏令營'; // console.log('click');\n  });\n};\n\n//# sourceURL=webpack:///./src/header.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ \"./src/header.js\");\n/* harmony import */ var _main_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-content */ \"./src/main-content.js\");\n/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer */ \"./src/footer.js\");\n\n\n\nvar ROOT = document.getElementById('root');\nObject(_header__WEBPACK_IMPORTED_MODULE_0__[\"createHeader\"])(ROOT);\nObject(_main_content__WEBPACK_IMPORTED_MODULE_1__[\"createMainContent\"])(ROOT);\nObject(_footer__WEBPACK_IMPORTED_MODULE_2__[\"createFooter\"])(ROOT); // console.log('build');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main-content.js":
/*!*****************************!*\
  !*** ./src/main-content.js ***!
  \*****************************/
/*! exports provided: createMainContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMainContent\", function() { return createMainContent; });\n/* --------------- Create main content --------------- */\nvar createMainContent = function createMainContent(wrapper) {\n  var mainContainer = document.createElement('div');\n  mainContainer.classList.add('main');\n  var htmlFragment = \"<div class=\\\"banner\\\"></div>\\n    <div class=\\\"centerwpr\\\">\\n        \\n    </div>\";\n  mainContainer.innerHTML = htmlFragment;\n  wrapper.appendChild(mainContainer);\n};\n\n//# sourceURL=webpack:///./src/main-content.js?");

/***/ })

/******/ });