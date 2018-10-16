webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: actionTypes, reducer, receiveStuff, updateLookup, updateProps, fetchStuff, lookupStuff, initializeStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStuff", function() { return receiveStuff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateLookup", function() { return updateLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProps", function() { return updateProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStuff", function() { return fetchStuff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookupStuff", function() { return lookupStuff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeStore", function() { return initializeStore; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var apac__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apac */ "./node_modules/apac/lib/apac.js");
/* harmony import */ var apac__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apac__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! isomorphic-fetch */ "../node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_5__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var initialState = {
  stuff: [],
  lookup: []
};
var actionTypes = {
  FETCH_STUFF: "FETCH_STUFF",
  RECEIVE_STUFF: "RECEIVE_STUFF",
  UPDATE_STUFF: "UPDATE_STUFF"
}; // REDUCERS

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState;

  switch (action.type) {
    case actionTypes.FETCH_STUFF:
      console.log("FETCH_STUFF Action");
      return action;

    case actionTypes.RECEIVE_STUFF:
      newState = action;
      console.log("RECEIVE_STUFF Action ", newState);
      return newState;

    case actionTypes.UPDATE_STUFF:
      newState = action;
      console.log("UPDATE_STUFF Action ", newState);
      return newState;

    default:
      return state;
  }
}; // ACTIONS

var receiveStuff = function receiveStuff(json) {
  return {
    type: actionTypes.RECEIVE_STUFF,
    stuff: json,
    lookup: []
  };
};
var updateLookup = function updateLookup(stuffProps, lookupProps) {
  return {
    type: actionTypes.UPDATE_STUFF,
    stuff: stuffProps,
    lookup: lookupProps
  };
};
var updateProps = function updateProps(stuffProps, lookupProps) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dispatch(updateLookup(stuffProps, lookupProps));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var fetchStuff = function fetchStuff(termino) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(dispatch) {
        var searchResAm, searchJsonAm, searchResult;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("termino ", termino);
                _context2.next = 3;
                return fetch("http://localhost:3030/api/am-item-search/?searchTerm=".concat(termino));

              case 3:
                searchResAm = _context2.sent;
                _context2.next = 6;
                return searchResAm.json();

              case 6:
                searchJsonAm = _context2.sent;
                _context2.next = 9;
                return dispatch(receiveStuff(searchJsonAm));

              case 9:
                searchResult = _context2.sent;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
var lookupStuff = function lookupStuff(termino) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(dispatch) {
        var lookupResAm, lookupJsonAm, lookupResult;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("termino ", termino);
                _context3.next = 3;
                return fetch("http://localhost:3030/api/am-item-lookup?itemId=".concat(termino));

              case 3:
                lookupResAm = _context3.sent;
                _context3.next = 6;
                return lookupResAm.json();

              case 6:
                lookupJsonAm = _context3.sent;
                _context3.next = 9;
                return dispatch(receiveStuff([lookupJsonAm.ItemAttributes]));

              case 9:
                lookupResult = _context3.sent;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
function initializeStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(reducer, initialState, Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_1__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_3__["default"])));
}

/***/ })

})
//# sourceMappingURL=_app.js.86101ed9d8a07693bacf.hot-update.js.map