(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _data = require('./data');

var _treeView = require('./tree-view');

var _treeView2 = _interopRequireDefault(_treeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = new _treeView2.default(document.getElementById('root'), _data.initialState);

// event listeners

document.getElementById('set-state-1').addEventListener("click", function (e) {
  tree.update(_data.initialState);
});

document.getElementById('set-state-2').addEventListener("click", function (e) {
  tree.update(_data.testState);
});

document.getElementById('get-state').addEventListener("click", function (e) {
  alert(JSON.stringify(tree.getData()));
});

document.getElementById('update-node').addEventListener("click", function (e) {
  tree.updateNode(11, _data.testNode);
});

},{"./data":2,"./tree-view":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = [{
  id: 1,
  name: 'Node 1',
  isChecked: false,
  childs: [{
    id: 11,
    name: 'Node 1.1',
    isChecked: true
  }]
}, {
  id: 2,
  name: 'Node 2',
  isChecked: false,
  childs: [{
    id: 21,
    name: 'Node 2.1',
    isChecked: true,
    childs: [{
      id: 211,
      name: 'Node 2.1.1',
      isChecked: true
    }]
  }, {
    id: 22,
    name: 'Node 2.2',
    isChecked: true,
    childs: [{
      id: 221,
      name: 'Node 2.2.1',
      isChecked: true
    }]
  }]
}];

var testState = [{
  id: 1,
  name: 'Node 1 test',
  isChecked: false,
  childs: [{
    id: 11,
    name: 'Node 1.1',
    isChecked: true
  }]
}, {
  id: 2,
  name: 'Node 2',
  isChecked: false,
  childs: [{
    id: 21,
    name: 'Node 2.1',
    isChecked: true,
    childs: [{
      id: 211,
      name: 'Node 2.1.1',
      isChecked: true
    }]
  }, {
    id: 22,
    name: 'Node 2.2',
    isChecked: true,
    childs: [{
      id: 221,
      name: 'Node 2.2.1',
      isChecked: true
    }]
  }]
}, {
  id: 3,
  name: 'Node 3',
  isChecked: false
}];

var testNode = {
  id: 11,
  name: 'Node 1.1',
  isChecked: false
};

exports.initialState = initialState;
exports.testState = testState;
exports.testNode = testNode;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepReplaceById;
function deepReplaceById(state, id, obj) {
  return state.map(function (item) {
    if (item.id === id) {
      return obj;
    } else if (item.childs && item.childs.length) {
      return {
        id: item.id,
        name: item.name,
        isChecked: item.isChecked,
        childs: deepReplaceById(item.childs, id, obj)
      };
    }
    return item;
  });
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createNode = function createNode(data, onUpdateNode) {
  var root_el = document.createElement("div"),
      label_el = document.createElement("label"),
      checkbox_el = document.createElement("input"),
      text_node = document.createTextNode(data.name);
  label_el.htmlFor = data.id;
  checkbox_el.type = 'checkbox';
  checkbox_el.id = data.id;
  checkbox_el.checked = data.isChecked;
  checkbox_el.onchange = function (e) {
    onUpdateNode(data.id, {
      id: data.id,
      name: data.name,
      isChecked: e.target.checked,
      childs: data.childs
    });
  };
  label_el.appendChild(text_node);
  root_el.appendChild(label_el);
  root_el.appendChild(checkbox_el);
  return root_el;
};

var createNodeList = function createNodeList(data, onUpdateNode) {
  var root_el = document.createElement("div");
  for (var i = 0; i < data.length; i++) {
    var element = createNode(data[i], onUpdateNode);
    var children = data[i].childs;
    if (children && children.length) {
      element.appendChild(createNodeList(children, onUpdateNode));
    }
    root_el.appendChild(element);
  }
  return root_el;
};

exports.default = createNodeList;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeCreator = require('./node-creator');

var _nodeCreator2 = _interopRequireDefault(_nodeCreator);

var _deepReplaceById = require('./deep-replace-by-id');

var _deepReplaceById2 = _interopRequireDefault(_deepReplaceById);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeView = function () {
  function TreeView(container, state) {
    _classCallCheck(this, TreeView);

    this.state = state;
    this.container = container;
    this.render();
  }

  _createClass(TreeView, [{
    key: 'render',
    value: function render() {
      this.container.innerHTML = "";
      this.container.appendChild((0, _nodeCreator2.default)(this.state, this.updateNode.bind(this)));
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.state;
    }
  }, {
    key: 'update',
    value: function update(state) {
      this.state = state;
      this.render();
    }
  }, {
    key: 'updateNode',
    value: function updateNode(id, node) {
      this.update((0, _deepReplaceById2.default)(this.state, id, node));
      this.render();
    }
  }]);

  return TreeView;
}();

exports.default = TreeView;

},{"./deep-replace-by-id":3,"./node-creator":4}]},{},[1]);
