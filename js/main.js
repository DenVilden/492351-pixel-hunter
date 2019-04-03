(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)

	var meta$1 = _meta.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)

	var meta$2 = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)


	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)


	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)


	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)

	_export(_export.S, 'Object', { is: _sameValue });

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export(_export.P, 'Function', { bind: _bind });

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var HAS_INSTANCE = _wks('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !_isObject(O)) return false;
	  if (!_isObject(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = _objectGpo(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var $trim$2 = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim$2(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN$2(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
	      dP$3($Number, key, gOPD$2(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var _stringRepeat = function repeat(count) {
	  var str = String(_defined(this));
	  var res = '';
	  var n = _toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $toFixed = 1.0.toFixed;
	var floor$1 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$1(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$1(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	_export(_export.P + _export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = _aNumberValue(this, ERROR);
	    var f = _toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + _stringRepeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $toPrecision = 1.0.toPrecision;

	_export(_export.P + _export.F * (_fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON


	_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)

	var _isFinite = _global.isFinite;

	_export(_export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)


	var abs = Math.abs;

	_export(_export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER


	_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER


	_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	// 20.1.2.12 Number.parseFloat(string)
	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

	// 20.1.2.13 Number.parseInt(string, radix)
	_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)


	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	_export(_export.S + _export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)

	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)



	_export(_export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)


	_export(_export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)

	var exp = Math.exp;

	_export(_export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	var _mathExpm1 = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	// 20.2.2.14 Math.expm1(x)



	_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

	// 20.2.2.16 Math.fround(x)

	var pow$1 = Math.pow;
	var EPSILON = pow$1(2, -52);
	var EPSILON32 = pow$1(2, -23);
	var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
	var MIN32 = pow$1(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = _mathSign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	// 20.2.2.16 Math.fround(x)


	_export(_export.S, 'Math', { fround: _mathFround });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

	var abs$1 = Math.abs;

	_export(_export.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)

	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	_export(_export.S + _export.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)


	_export(_export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)


	_export(_export.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)


	_export(_export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)


	_export(_export.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)


	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	_export(_export.S + _export.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)


	var exp$2 = Math.exp;

	_export(_export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = _mathExpm1(x = +x);
	    var b = _mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)


	_export(_export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	_export(_export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = _toIobject(callSite.raw);
	    var len = _toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $at$1 = _stringAt(false);
	_export(_export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export(_export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(_defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  _export(_export.P + _export.F * _fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	_export(_export.P + _export.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = _toObject(this);
	    var pv = _toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (_fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !_fails(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



	// PhantomJS / old WebKit has a broken implementations
	_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
	  toISOString: _dateToIsoString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime$1 = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING, function toString() {
	    var value = getTime$1.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

	var NUMBER$1 = 'number';

	var _dateToPrimitive = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
	  return _toPrimitive(_anObject(this), hint != NUMBER$1);
	};

	var TO_PRIMITIVE$1 = _wks('toPrimitive');
	var proto$1 = Date.prototype;

	if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// WebKit Array.of isn't generic
	_export(_export.S + _export.F * _fails(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) _createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)


	var arrayJoin = [].join;

	// fallback for not array-like strings
	_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
	  }
	});

	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) arraySlice$1.call(_html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test$1.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  _aFunction(callbackfn);
	  var O = _toObject(that);
	  var self = _iobject(O);
	  var length = _toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $native$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
	    var O = _toIobject(this);
	    var length = _toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = _toObject(this);
	  var len = _toLength(O.length);
	  var to = _toAbsoluteIndex(target, len);
	  var from = _toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


	_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

	_addToUnscopables('copyWithin');

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	_export(_export.P, 'Array', { fill: _arrayFill });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$4 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING$1 = 'toString';
	var $toString$1 = /./[TO_STRING$1];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString$1.name != TO_STRING$1) {
	  define(function toString() {
	    return $toString$1.call(this);
	  });
	}

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var SPECIES$2 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$3 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$3(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = _regexpExecAbstract(rx, S);
	      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$3 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$5(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var es6_weakMap = createCommonjsModule(function (module) {

	var each = _arrayMethods(0);






	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var TYPED = _uid('typed_array');
	var VIEW = _uid('view');
	var ABV = !!(_global.ArrayBuffer && _global.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
	    _hide(Typed.prototype, TYPED, true);
	    _hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

	// https://tc39.github.io/ecma262/#sec-toindex


	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = _toInteger(it);
	  var length = _toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _typedBuffer = createCommonjsModule(function (module, exports) {











	var gOPN = _objectGopn.f;
	var dP = _objectDp.f;


	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = _global[ARRAY_BUFFER];
	var $DataView = _global[DATA_VIEW];
	var Math = _global.Math;
	var RangeError = _global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = _global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = _descriptors ? '_b' : BUFFER;
	var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
	var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!_typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = _toIndex(length);
	    this._b = _arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    _anInstance(this, $DataView, DATA_VIEW);
	    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = _toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (_descriptors) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  _redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!_fails(function () {
	    $ArrayBuffer(1);
	  }) || !_fails(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || _fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      _anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(_toIndex(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	_setToStringTag($DataView, DATA_VIEW);
	_hide($DataView[PROTOTYPE], _typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var ArrayBuffer = _global.ArrayBuffer;

	var $ArrayBuffer = _typedBuffer.ArrayBuffer;
	var $DataView = _typedBuffer.DataView;
	var $isView = _typed.ABV && ArrayBuffer.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = _typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	_export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
	  }
	});

	_export(_export.P + _export.U + _export.F * _fails(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
	    var len = _anObject(this).byteLength;
	    var first = _toAbsoluteIndex(start, len);
	    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER);

	_export(_export.G + _export.W + _export.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = createCommonjsModule(function (module) {
	if (_descriptors) {
	  var global = _global;
	  var fails = _fails;
	  var $export = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx = _ctx;
	  var anInstance = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide = _hide;
	  var redefineAll = _redefineAll;
	  var toInteger = _toInteger;
	  var toLength = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive = _toPrimitive;
	  var has = _has;
	  var classof = _classof;
	  var isObject = _isObject;
	  var toObject = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create = _objectCreate;
	  var getPrototypeOf = _objectGpo;
	  var gOPN = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks = _wks;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators = _iterators;
	  var $iterDetect = _iterDetect;
	  var setSpecies = _setSpecies;
	  var arrayFill = _arrayFill;
	  var arrayCopyWithin = _arrayCopyWithin;
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };
	});

	_typedArray('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArray('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



	var rApply = (_global.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	_export(_export.S + _export.F * !_fails(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = _aFunction(target);
	    var L = _anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	_export(_export.S + _export.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    _anObject(target);
	    propertyKey = _toPrimitive(propertyKey, true);
	    _anObject(attributes);
	    try {
	      _objectDp.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)

	var gOPD$3 = _objectGopd.f;


	_export(_export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$3(_anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)


	var Enumerate = function (iterated) {
	  this._t = _anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	_export(_export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




	_export(_export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return _objectGopd.f(_anObject(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)




	_export(_export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return _objectGpo(_anObject(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)


	_export(_export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)


	var $isExtensible = Object.isExtensible;

	_export(_export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    _anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)


	_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)


	var $preventExtensions = Object.preventExtensions;

	_export(_export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    _anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (_isObject(proto = _objectGpo(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = _propertyDesc(0);
	  }
	  if (_has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !_isObject(receiver)) return false;
	    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      _objectDp.f(receiver, propertyKey, existingDescriptor);
	    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	_export(_export.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)



	if (_setProto) _export(_export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    _setProto.check(target, proto);
	    try {
	      _setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	var includes = _core.Array.includes;

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray




	var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

	function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (_isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	var _flattenIntoArray = flattenIntoArray;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap







	_export(_export.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = _toObject(this);
	    var sourceLen, A;
	    _aFunction(callbackfn);
	    sourceLen = _toLength(O.length);
	    A = _arraySpeciesCreate(O, 0);
	    _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	_addToUnscopables('flatMap');

	var flatMap = _core.Array.flatMap;

	// https://github.com/tc39/proposal-string-pad-start-end




	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(_defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = _toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	var padStart = _core.String.padStart;

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	var padEnd = _core.String.padEnd;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	var trimStart = _core.String.trimLeft;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	var trimEnd = _core.String.trimRight;

	_wksDefine('asyncIterator');

	var asyncIterator = _wksExt.f('asyncIterator');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	var _finally = _core.Promise['finally'];

	// ie9- setTimeout & setInterval additional parameters fix



	var slice = [].slice;
	var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
	var wrap$1 = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	_export(_export.G + _export.B + _export.F * MSIE, {
	  setTimeout: wrap$1(_global.setTimeout),
	  setInterval: wrap$1(_global.setInterval)
	});

	_export(_export.G + _export.B, {
	  setImmediate: _task.set,
	  clearImmediate: _task.clear
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
	  var NAME$1 = collections[i$2];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$3 = Collection && Collection.prototype;
	  var key$1;
	  if (proto$3) {
	    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
	    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
	  }
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$6 = Object.defineProperty;

	var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$6(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$8
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$3 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$3];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$3];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has$1(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$3] = C[PROTOTYPE$3];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	// https://github.com/tc39/proposal-global


	_export$1(_export$1.G, { global: _global$1 });

	var global$1 = _core$1.global;

	var lib = createCommonjsModule(function (module) {



	function _global() {
	  const data = _interopRequireDefault(global$1);

	  _global = function () {
	    return data;
	  };

	  return data;
	}

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (_global().default._babelPolyfill && typeof console !== "undefined" && console.warn) {
	  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
	}

	_global().default._babelPolyfill = true;
	});

	unwrapExports(lib);

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	var mainElement = document.querySelector("#main");
	var renderTemplate = function renderTemplate() {
	  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	  var wrapper = document.createElement("div");
	  wrapper.innerHTML = template.trim();
	  return wrapper;
	};
	var changeView = function changeView(view) {
	  mainElement.innerHTML = "";
	  mainElement.appendChild(view.element);
	};
	var renderGame = function renderGame(element1, element2) {
	  var root = document.createElement("div");
	  root.appendChild(element1.element);
	  root.appendChild(element2.element);
	  return root;
	};
	var checkIfElementExist = function checkIfElementExist(array, answer, url) {
	  var question = [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var iterator = _step.value;

	      if (iterator.type === answer) {
	        question.push(iterator);
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	        _iterator["return"]();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return question[0].image.url === url;
	};
	var getCorrectAnswers = function getCorrectAnswers(array, answer) {
	  var index = 0;
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var element = _step2.value;

	      if (element !== answer) {
	        index++;
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
	        _iterator2["return"]();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }

	  return index;
	};
	var getBonusAnswers = function getBonusAnswers(array, answer) {
	  var index = 0;
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;

	  try {
	    for (var _iterator3 = array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var element = _step3.value;

	      if (element === answer) {
	        index++;
	      }
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
	        _iterator3["return"]();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }

	  return index;
	};

	var AbstractView =
	/*#__PURE__*/
	function () {
	  function AbstractView() {
	    _classCallCheck(this, AbstractView);

	    if ((this instanceof AbstractView ? this.constructor : void 0) === AbstractView) {
	      throw new Error("Can't instantiate AbstractView, only concrete one");
	    }
	  }

	  _createClass(AbstractView, [{
	    key: "render",
	    value: function render() {
	      return renderTemplate(this.template);
	    }
	  }, {
	    key: "bind",
	    value: function bind() {} // bind handlers if required

	  }, {
	    key: "template",
	    get: function get() {
	      throw new Error("Template is required");
	    }
	  }, {
	    key: "element",
	    get: function get() {
	      if (this._element) {
	        return this._element;
	      }

	      this._element = this.render();
	      this.bind(this._element);
	      return this._element;
	    }
	  }]);

	  return AbstractView;
	}();

	var IntroView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(IntroView, _AbstractView);

	  function IntroView() {
	    _classCallCheck(this, IntroView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(IntroView).apply(this, arguments));
	  }

	  _createClass(IntroView, [{
	    key: "bind",
	    value: function bind() {
	      var _this = this;

	      var startGame = this.element.querySelector(".intro__asterisk");
	      startGame.addEventListener("click", function () {
	        return _this.onClick();
	      });
	    }
	  }, {
	    key: "onClick",
	    value: function onClick() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"intro\">\n        <button class=\"intro__asterisk asterisk\" type=\"button\">\n          <span class=\"visually-hidden\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</span>*\n        </button>\n        <p class=\"intro__motto\">\n          <sup>*</sup> \u042D\u0442\u043E \u043D\u0435 \u0444\u043E\u0442\u043E. \u042D\u0442\u043E \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043C\u0430\u0441\u043B\u043E\u043C \u043D\u0438\u0434\u0435\u0440\u043B\u0430\u043D\u0434\u0441\u043A\u043E\u0433\u043E\n          \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430-\u0444\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0441\u0442\u0430 Tjalf Sparnaay.\n        </p>\n      </section>\n    ";
	    }
	  }]);

	  return IntroView;
	}(AbstractView);

	var IntroController =
	/*#__PURE__*/
	function () {
	  function IntroController() {
	    _classCallCheck(this, IntroController);

	    this.introScreen = new IntroView();

	    this.introScreen.onClick = function () {
	      return Router.showGreeting();
	    };
	  }

	  _createClass(IntroController, [{
	    key: "element",
	    get: function get() {
	      return this.introScreen.element;
	    }
	  }]);

	  return IntroController;
	}();

	var GreetingView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(GreetingView, _AbstractView);

	  function GreetingView() {
	    _classCallCheck(this, GreetingView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(GreetingView).apply(this, arguments));
	  }

	  _createClass(GreetingView, [{
	    key: "bind",
	    value: function bind() {
	      var _this = this;

	      var greetingContinue = this.element.querySelector(".greeting__continue");
	      greetingContinue.addEventListener("click", function () {
	        return _this.onClick();
	      });
	    }
	  }, {
	    key: "onClick",
	    value: function onClick() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"greeting central--blur\">\n        <img\n          class=\"greeting__logo\"\n          src=\"img/logo_ph-big.svg\"\n          width=\"201\"\n          height=\"89\"\n          alt=\"Pixel Hunter\"\n        />\n        <div class=\"greeting__asterisk asterisk\">\n          <span class=\"visually-hidden\">\u042F \u043F\u0440\u043E\u0441\u0442\u043E \u043A\u0440\u0430\u0441\u0438\u0432\u0430\u044F \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u043A\u0430</span>*\n        </div>\n        <div class=\"greeting__challenge\">\n          <h3 class=\"greeting__challenge-title\">\n            \u041B\u0443\u0447\u0448\u0438\u0435 \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0438-\u0444\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0441\u0442\u044B \u0431\u0440\u043E\u0441\u0430\u044E\u0442 \u0442\u0435\u0431\u0435 \u0432\u044B\u0437\u043E\u0432!\n          </h3>\n          <p class=\"greeting__challenge-text\">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438\u0433\u0440\u044B \u043F\u0440\u043E\u0441\u0442\u044B:</p>\n          <ul class=\"greeting__challenge-list\">\n            <li>\u041D\u0443\u0436\u043D\u043E \u043E\u0442\u043B\u0438\u0447\u0438\u0442\u044C \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043E\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u0438 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440.</li>\n            <li>\n              \u0417\u0430\u0434\u0430\u0447\u0430 \u043A\u0430\u0436\u0435\u0442\u0441\u044F \u0442\u0440\u0438\u0432\u0438\u0430\u043B\u044C\u043D\u043E\u0439, \u043D\u043E \u043D\u0435 \u0434\u0443\u043C\u0430\u0439, \u0447\u0442\u043E \u0432\u0441\u0435 \u0442\u0430\u043A \u043F\u0440\u043E\u0441\u0442\u043E.\n            </li>\n            <li>\u0424\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0437\u043C \u043E\u0431\u043C\u0430\u043D\u0447\u0438\u0432 \u0438 \u043A\u043E\u0432\u0430\u0440\u0435\u043D.</li>\n            <li>\u041F\u043E\u043C\u043D\u0438, \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u2014 \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0447\u0435\u043D\u044C \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u043E.</li>\n          </ul>\n        </div>\n        <button class=\"greeting__continue\" type=\"button\">\n          <span class=\"visually-hidden\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</span>\n          <svg\n            class=\"icon\"\n            width=\"64\"\n            height=\"64\"\n            viewBox=\"0 0 64 64\"\n            fill=\"#000000\"\n          >\n            <use xlink:href=\"img/sprite.svg#arrow-right\"></use>\n          </svg>\n        </button>\n      </section>\n    ";
	    }
	  }]);

	  return GreetingView;
	}(AbstractView);

	var GreetingController =
	/*#__PURE__*/
	function () {
	  function GreetingController() {
	    _classCallCheck(this, GreetingController);

	    this.greetingScreen = new GreetingView();

	    this.greetingScreen.onClick = function () {
	      return Router.showRules();
	    };
	  }

	  _createClass(GreetingController, [{
	    key: "element",
	    get: function get() {
	      return this.greetingScreen.element;
	    }
	  }]);

	  return GreetingController;
	}();

	var BackButtonView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(BackButtonView, _AbstractView);

	  function BackButtonView() {
	    _classCallCheck(this, BackButtonView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(BackButtonView).apply(this, arguments));
	  }

	  _createClass(BackButtonView, [{
	    key: "bind",
	    value: function bind() {
	      var _this = this;

	      var backButton = this.element.querySelector(".back");
	      backButton.addEventListener("click", function () {
	        return _this.onClick();
	      });
	    }
	  }, {
	    key: "onClick",
	    value: function onClick() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <button class=\"back\">\n        <span class=\"visually-hidden\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043D\u0430\u0447\u0430\u043B\u0443</span>\n        <svg\n          class=\"icon\"\n          width=\"45\"\n          height=\"45\"\n          viewBox=\"0 0 45 45\"\n          fill=\"#000000\"\n        >\n          <use xlink:href=\"img/sprite.svg#arrow-left\"></use>\n        </svg>\n        <svg\n          class=\"icon\"\n          width=\"101\"\n          height=\"44\"\n          viewBox=\"0 0 101 44\"\n          fill=\"#000000\"\n        >\n          <use xlink:href=\"img/sprite.svg#logo-small\"></use>\n        </svg>\n      </button>\n    ";
	    }
	  }]);

	  return BackButtonView;
	}(AbstractView);

	var BackButtonController =
	/*#__PURE__*/
	function () {
	  function BackButtonController() {
	    _classCallCheck(this, BackButtonController);

	    this.backButton = new BackButtonView();

	    this.backButton.onClick = function () {
	      return Router.showGreeting();
	    };
	  }

	  _createClass(BackButtonController, [{
	    key: "element",
	    get: function get() {
	      return this.backButton.element;
	    }
	  }]);

	  return BackButtonController;
	}();

	var RulesView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(RulesView, _AbstractView);

	  function RulesView() {
	    var _this;

	    _classCallCheck(this, RulesView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(RulesView).call(this));
	    _this.button = new BackButtonController();
	    return _this;
	  }

	  _createClass(RulesView, [{
	    key: "bind",
	    value: function bind() {
	      var _this2 = this;

	      var header = this.element.querySelector(".header");
	      header.appendChild(this.button.element);
	      var rulesInput = this.element.querySelector(".rules__input");
	      var rulesButton = this.element.querySelector(".rules__button"); // Disable button if input is empty

	      rulesInput.addEventListener("input", function (evt) {
	        rulesButton.disabled = evt.target.value.length === 0;
	      });
	      rulesButton.addEventListener("click", function () {
	        return _this2.onClick(rulesInput.value);
	      });
	    }
	  }, {
	    key: "onClick",
	    value: function onClick() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <header class=\"header\"></header>\n      <section class=\"rules\">\n        <h2 class=\"rules__title\">\u041F\u0440\u0430\u0432\u0438\u043B\u0430</h2>\n        <ul class=\"rules__description\">\n          <li>\n            \u0423\u0433\u0430\u0434\u0430\u0439 10 \u0440\u0430\u0437 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0444\u043E\u0442\u043E\n            <img\n              class=\"rules__icon\"\n              src=\"img/icon-photo.png\"\n              width=\"32\"\n              height=\"31\"\n              alt=\"\u0424\u043E\u0442\u043E\"\n            />\n            \u0438\u043B\u0438 \u0440\u0438\u0441\u0443\u043D\u043E\u043A\n            <img\n              class=\"rules__icon\"\n              src=\"img/icon-paint.png\"\n              width=\"32\"\n              height=\"31\"\n              alt=\"\u0420\u0438\u0441\u0443\u043D\u043E\u043A\"\n            />\n          </li>\n          <li>\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F\u043C\u0438 \u0438\u043B\u0438 \u0440\u0438\u0441\u0443\u043D\u043A\u0430\u043C\u0438 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043E\u0431\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F.</li>\n          <li>\u041D\u0430 \u043A\u0430\u0436\u0434\u0443\u044E \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043E\u0442\u0432\u043E\u0434\u0438\u0442\u0441\u044F 30 \u0441\u0435\u043A\u0443\u043D\u0434.</li>\n          <li>\u041E\u0448\u0438\u0431\u0438\u0442\u044C\u0441\u044F \u043C\u043E\u0436\u043D\u043E \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 3 \u0440\u0430\u0437.</li>\n        </ul>\n        <p class=\"rules__ready\">\u0413\u043E\u0442\u043E\u0432\u044B?</p>\n        <form class=\"rules__form\">\n          <input class=\"rules__input\" type=\"text\" placeholder=\"\u0412\u0430\u0448\u0435 \u0418\u043C\u044F\" />\n          <button class=\"rules__button  continue\" type=\"submit\" disabled>\n            Go!\n          </button>\n        </form>\n      </section>\n    ";
	    }
	  }]);

	  return RulesView;
	}(AbstractView);

	var RulesController =
	/*#__PURE__*/
	function () {
	  function RulesController() {
	    _classCallCheck(this, RulesController);

	    this.rulesScreen = new RulesView();

	    this.rulesScreen.onClick = function (playerName) {
	      return Router.showData(playerName);
	    };
	  }

	  _createClass(RulesController, [{
	    key: "element",
	    get: function get() {
	      return this.rulesScreen.element;
	    }
	  }]);

	  return RulesController;
	}();

	var gameData = {
	  initialState: {
	    level: 0,
	    lives: 3,
	    time: 30,
	    answers: []
	  },
	  SCORE: {
	    RIGHT_ANSWER: 100,
	    BONUS_ANSWER: 50,
	    ONE_LIFE_SCORE: 50,
	    QUICK_ANSWER: 20,
	    // sec
	    SLOW_ANSWER: 10
	  },
	  getAnswer: function getAnswer(timeSpent, completed) {
	    if (completed === false) {
	      return "wrong";
	    }

	    if (timeSpent >= this.SCORE.QUICK_ANSWER) {
	      return "fast";
	    }

	    if (timeSpent <= this.SCORE.SLOW_ANSWER) {
	      return "slow";
	    }

	    if (completed === true) {
	      return "correct";
	    }

	    return null;
	  },
	  calculateTotalScore: function calculateTotalScore(answers, lives) {
	    var _this = this;

	    return answers.reduce(function (score, it) {
	      if (it.completed !== "wrong") {
	        score += _this.SCORE.RIGHT_ANSWER;
	      }

	      if (it.completed === "fast") {
	        score += _this.SCORE.BONUS_ANSWER;
	      }

	      if (it.completed === "slow") {
	        score -= _this.SCORE.BONUS_ANSWER;
	      }

	      return score;
	    }, lives * this.SCORE.ONE_LIFE_SCORE);
	  },
	  changeLevel: function changeLevel(state) {
	    return Object.assign({}, state, {
	      level: state.level + 1,
	      time: this.initialState.time
	    });
	  },
	  setLives: function setLives(state) {
	    return Object.assign({}, state, {
	      lives: state.lives - 1
	    });
	  },
	  pushAnswer: function pushAnswer(answers, completed, timeSpent) {
	    return answers.concat(this.getAnswer(timeSpent, completed));
	  },
	  addAnswer: function addAnswer(state, completed, timeSpent) {
	    return Object.assign({}, state, {
	      answers: this.pushAnswer(state.answers, completed, timeSpent)
	    });
	  },
	  tick: function tick(state) {
	    return Object.assign({}, state, {
	      time: state.time - 1
	    });
	  },
	  getFinalStats: function getFinalStats(state) {
	    return {
	      stats: state.answers,
	      lives: state.lives,
	      score: this.calculateTotalScore(state.answers, state.lives)
	    };
	  }
	};

	var HeaderDataView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(HeaderDataView, _AbstractView);

	  function HeaderDataView(state) {
	    var _this;

	    _classCallCheck(this, HeaderDataView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderDataView).call(this));
	    _this.state = state;
	    _this.button = new BackButtonController();
	    return _this;
	  }

	  _createClass(HeaderDataView, [{
	    key: "bind",
	    value: function bind() {
	      var timer = this.element.querySelector(".game__timer");

	      if (this.state.time <= 5) {
	        timer.style.color = "red";
	        setTimeout(function () {
	          timer.style.color = "black";
	        }, 500); // half sec
	      }
	    }
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <header class=\"header\">\n        <div class=\"game__timer\">".concat(this.state.time, "</div>\n        <div class=\"game__lives\">\n          ").concat(new Array(gameData.initialState.lives - this.state.lives).fill("<img src=\"../img/heart__empty.svg\" class=\"game__heart\"\n          alt=\" Missed Life\" width=\"31\" height=\"27\">").join(""), "\n          ").concat(new Array(this.state.lives).fill("<img src=\"../img/heart__full.svg\" class=\"game__heart\"\n          alt=\"Life\" width=\"31\" height=\"27\">").join(""), "\n        </div>\n      </header>\n    ");
	    }
	  }]);

	  return HeaderDataView;
	}(AbstractView);

	var statsTemplate = function statsTemplate(state) {
	  return "\n  <ul class=\"stats\">\n    ".concat(state.map(function (it) {
	    if (it === "wrong") {
	      return "<li class=\"stats__result stats__result--wrong\"></li>";
	    }

	    if (it === "fast") {
	      return "<li class=\"stats__result stats__result--fast\"></li>";
	    }

	    if (it === "slow") {
	      return "<li class=\"stats__result stats__result--slow\"></li>";
	    }

	    if (it === "correct") {
	      return "<li class=\"stats__result stats__result--correct\"></li>";
	    }

	    return null;
	  }).join(""), "\n    ").concat(new Array(10 - state.length).fill("<li class=\"stats__result stats__result--unknown\"></li>").join(""), "\n  </ul>\n");
	};

	var GameOneView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(GameOneView, _AbstractView);

	  function GameOneView(state, data) {
	    var _this;

	    _classCallCheck(this, GameOneView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameOneView).call(this));
	    _this.state = state;
	    _this.data = data;
	    return _this;
	  }

	  _createClass(GameOneView, [{
	    key: "bind",
	    value: function bind() {
	      var _this2 = this;

	      var gameAnswer = this.element.querySelectorAll(".game__answer input"); // Change screen if both inputs are checked

	      gameAnswer.forEach(function (it) {
	        it.addEventListener("input", function () {
	          var radio = _this2.element.querySelectorAll(".game__answer input:checked"); // Check if clicked element matches data


	          if (radio.length === 2) {
	            _this2.onAnswer(radio[0].value === _this2.data[_this2.state.level].answers[0].type && radio[1].value === _this2.data[_this2.state.level].answers[1].type);
	          }
	        });
	      });
	    }
	  }, {
	    key: "onAnswer",
	    value: function onAnswer() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"game\">\n        <p class=\"game__task\">".concat(this.data[this.state.level].question, "</p>\n        <form class=\"game__content\">\n          <div class=\"game__option\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[0].image.url, "\"\n              alt=\"Option 1\"\n              width=\"468\"\n              height=\"458\"\n            />\n            <label class=\"game__answer game__answer--photo\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question1\"\n                type=\"radio\"\n                value=\"photo\"\n              />\n              <span>\u0424\u043E\u0442\u043E</span>\n            </label>\n            <label class=\"game__answer game__answer--paint\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question1\"\n                type=\"radio\"\n                value=\"painting\"\n              />\n              <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n            </label>\n          </div>\n          <div class=\"game__option\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[1].image.url, "\"\n              alt=\"Option 2\"\n              width=\"468\"\n              height=\"458\"\n            />\n            <label class=\"game__answer  game__answer--photo\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question2\"\n                type=\"radio\"\n                value=\"photo\"\n              />\n              <span>\u0424\u043E\u0442\u043E</span>\n            </label>\n            <label class=\"game__answer  game__answer--paint\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question2\"\n                type=\"radio\"\n                value=\"painting\"\n              />\n              <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n            </label>\n          </div>\n        </form>\n        ").concat(statsTemplate(this.state.answers), "\n      </section>\n    ");
	    }
	  }]);

	  return GameOneView;
	}(AbstractView);

	var GameTwoView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(GameTwoView, _AbstractView);

	  function GameTwoView(state, data) {
	    var _this;

	    _classCallCheck(this, GameTwoView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameTwoView).call(this));
	    _this.state = state;
	    _this.data = data;
	    return _this;
	  }

	  _createClass(GameTwoView, [{
	    key: "bind",
	    value: function bind() {
	      var _this2 = this;

	      var gameAnswer = this.element.querySelectorAll(".game__answer input");
	      gameAnswer.forEach(function (it) {
	        it.addEventListener("input", function (evt) {
	          _this2.onAnswer(evt.target.value === _this2.data[_this2.state.level].answers[0].type);
	        });
	      });
	    }
	  }, {
	    key: "onAnswer",
	    value: function onAnswer() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"game\">\n        <p class=\"game__task\">".concat(this.data[this.state.level].question, "</p>\n        <form class=\"game__content  game__content--wide\">\n          <div class=\"game__option\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[0].image.url, "\"\n              alt=\"Option 1\"\n              width=\"705\"\n              height=\"455\"\n            />\n            <label class=\"game__answer  game__answer--photo\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question1\"\n                type=\"radio\"\n                value=\"photo\"\n              />\n              <span>\u0424\u043E\u0442\u043E</span>\n            </label>\n            <label class=\"game__answer  game__answer--paint\">\n              <input\n                class=\"visually-hidden\"\n                name=\"question1\"\n                type=\"radio\"\n                value=\"painting\"\n              />\n              <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n            </label>\n          </div>\n        </form>\n        ").concat(statsTemplate(this.state.answers), "\n      </section>\n    ");
	    }
	  }]);

	  return GameTwoView;
	}(AbstractView);

	var GameThreeView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(GameThreeView, _AbstractView);

	  function GameThreeView(state, data) {
	    var _this;

	    _classCallCheck(this, GameThreeView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameThreeView).call(this));
	    _this.state = state;
	    _this.data = data;
	    return _this;
	  }

	  _createClass(GameThreeView, [{
	    key: "bind",
	    value: function bind() {
	      var _this2 = this;

	      var gameAnswer = this.element.querySelectorAll(".game__option");
	      var isRight = this.element.querySelector(".game__task");

	      var getBonusAnswers$$1 = function getBonusAnswers$$1(evt) {
	        if (isRight.textContent === "\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0441\u0440\u0435\u0434\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439") {
	          return checkIfElementExist(_this2.data[_this2.state.level].answers, "photo", evt.target.src);
	        }

	        return isRight.textContent === "\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u0441\u0440\u0435\u0434\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439" ? checkIfElementExist(_this2.data[_this2.state.level].answers, "painting", evt.target.src) : null;
	      };

	      gameAnswer.forEach(function (it) {
	        it.addEventListener("click", function (evt) {
	          return _this2.onAnswer(getBonusAnswers$$1(evt));
	        });
	      });
	    }
	  }, {
	    key: "onAnswer",
	    value: function onAnswer() {}
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"game\">\n        <p class=\"game__task\">".concat(this.data[this.state.level].question, "</p>\n        <form class=\"game__content  game__content--triple\">\n          <div class=\"game__option\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[0].image.url, "\"\n              alt=\"Option 1\"\n              width=\"304\"\n              height=\"455\"\n            />\n          </div>\n          <div class=\"game__option  game__option--selected\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[1].image.url, "\"\n              alt=\"Option 2\"\n              width=\"304\"\n              height=\"455\"\n            />\n          </div>\n          <div class=\"game__option\">\n            <img\n              src=\"").concat(this.data[this.state.level].answers[2].image.url, "\"\n              alt=\"Option 3\"\n              width=\"304\"\n              height=\"455\"\n            />\n          </div>\n        </form>\n        ").concat(statsTemplate(this.state.answers), "\n      </section>\n    ");
	    }
	  }]);

	  return GameThreeView;
	}(AbstractView);

	var GameController =
	/*#__PURE__*/
	function () {
	  function GameController(model) {
	    _classCallCheck(this, GameController);

	    this.model = model;
	    this.screen = this.initGame(this.model.state, this.model.data, this.model.getCurrentLevel());
	    this.headerData = new HeaderDataView(this.model.state);
	    this.backButton = new BackButtonController();
	    this.updateHeader();
	    this.root = renderGame(this.headerData, this.screen);
	    this.screen.onAnswer = this.answer.bind(this);
	    this._interval = null;
	    this.startTimer();
	  }

	  _createClass(GameController, [{
	    key: "initGame",
	    value: function initGame(state, data, level) {
	      if (level.type === "two-of-two") {
	        return new GameOneView(state, data);
	      }

	      if (level.type === "tinder-like") {
	        return new GameTwoView(state, data);
	      }

	      if (level.type === "one-of-three") {
	        return new GameThreeView(state, data);
	      }

	      return null;
	    }
	  }, {
	    key: "stopTimer",
	    value: function stopTimer() {
	      clearInterval(this._interval);
	    }
	  }, {
	    key: "startTimer",
	    value: function startTimer() {
	      var _this = this;

	      this._interval = setInterval(function () {
	        _this.model.tick();

	        _this.updateHeader();

	        if (_this.model.hasTime()) {
	          _this.stopTimer();

	          _this.model.setLives();

	          _this.model.addAnswer();

	          _this.continueGame();
	        }
	      }, 1000); // 1 sec
	    }
	  }, {
	    key: "answer",
	    value: function answer(_answer) {
	      this.stopTimer();

	      if (!_answer) {
	        this.model.setLives();
	      }

	      this.model.addAnswer(_answer);
	      this.continueGame();
	    }
	  }, {
	    key: "continueGame",
	    value: function continueGame() {
	      if (this.model.die()) {
	        this.endGame();
	      } else {
	        this.changeGame();
	      }
	    }
	  }, {
	    key: "endGame",
	    value: function endGame() {
	      var result = this.model.updateScore(this.model.state);
	      Router.showResult(result, this.model.playerName);
	    }
	  }, {
	    key: "changeGame",
	    value: function changeGame() {
	      this.model.changeLevel();
	      Router.showGame(this.model);
	    }
	  }, {
	    key: "updateHeader",
	    value: function updateHeader() {
	      var header = new HeaderDataView(this.model.state);
	      this.headerData.element.replaceWith(header.element);
	      this.headerData = header;
	      header.element.querySelector("header").prepend(this.backButton.element);
	    }
	  }, {
	    key: "element",
	    get: function get() {
	      return this.root;
	    }
	  }]);

	  return GameController;
	}();

	var ErrorView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(ErrorView, _AbstractView);

	  function ErrorView() {
	    _classCallCheck(this, ErrorView);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ErrorView).apply(this, arguments));
	  }

	  _createClass(ErrorView, [{
	    key: "template",
	    get: function get() {
	      return "\n      <section class=\"modal\">\n        <div class=\"modal__inner\">\n          <h2 class=\"modal__title\">\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!</h2>\n          <p class=\"modal__text modal__text--error\">\n            \u0421\u0442\u0430\u0442\u0443\u0441: 404. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.\n          </p>\n        </div>\n      </section>\n    ";
	    }
	  }]);

	  return ErrorView;
	}(AbstractView);

	var GameModel =
	/*#__PURE__*/
	function () {
	  function GameModel(playerName, data) {
	    _classCallCheck(this, GameModel);

	    this.data = data;
	    this.playerName = playerName;
	    this.restart();
	  }

	  _createClass(GameModel, [{
	    key: "die",
	    value: function die() {
	      return this.hasNextLevel() || this.hasLives();
	    }
	  }, {
	    key: "hasNextLevel",
	    value: function hasNextLevel() {
	      return this.getLevel(this._state.level + 1) === undefined;
	    }
	  }, {
	    key: "changeLevel",
	    value: function changeLevel() {
	      this._state = gameData.changeLevel(this._state);
	    }
	  }, {
	    key: "getLevel",
	    value: function getLevel(state) {
	      return this.data[state];
	    }
	  }, {
	    key: "setLives",
	    value: function setLives() {
	      this._state = gameData.setLives(this._state);
	    }
	  }, {
	    key: "addAnswer",
	    value: function addAnswer() {
	      var completed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      this._state = gameData.addAnswer(this._state, completed, this._state.time);
	    }
	  }, {
	    key: "restart",
	    value: function restart() {
	      this._state = gameData.initialState;
	    }
	  }, {
	    key: "hasLives",
	    value: function hasLives() {
	      return this._state.lives <= 0;
	    }
	  }, {
	    key: "hasTime",
	    value: function hasTime() {
	      return this._state.time <= 0;
	    }
	  }, {
	    key: "getCurrentLevel",
	    value: function getCurrentLevel() {
	      return this.getLevel(this._state.level);
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this._state = gameData.tick(this._state);
	    }
	  }, {
	    key: "updateScore",
	    value: function updateScore(model) {
	      return gameData.getFinalStats(model);
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.freeze(this._state);
	    }
	  }]);

	  return GameModel;
	}();

	var result = {
	  fast: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C",
	  alive: "\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u0436\u0438\u0437\u043D\u0438",
	  slow: "\u0428\u0442\u0440\u0430\u0444 \u0437\u0430 \u043C\u0435\u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"
	};

	var ResultView =
	/*#__PURE__*/
	function (_AbstractView) {
	  _inherits(ResultView, _AbstractView);

	  function ResultView(state) {
	    var _this;

	    _classCallCheck(this, ResultView);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResultView).call(this));
	    _this.state = state;
	    _this.button = new BackButtonController();
	    return _this;
	  }

	  _createClass(ResultView, [{
	    key: "bind",
	    value: function bind() {
	      var header = this.element.querySelector(".header");
	      header.appendChild(this.button.element);
	      this._result = this.element.querySelector(".result");
	    }
	  }, {
	    key: "showScores",
	    value: function showScores(scores) {
	      var _this2 = this;

	      this._result.innerHTML = "\n      <h2 class=\"result__title\">\n        ".concat(this.state.lives <= 0 ? "\u041F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435" : "\u041F\u043E\u0431\u0435\u0434\u0430!", "\n      </h2>\n      <table class=\"result__table\">\n        ").concat(scores.reverse().map(function (it, i) {
	        return "\n    <tr>\n      <td class=\"result__number\">".concat(i + 1, ".</td>\n      <td colspan=\"2\">\n        <ul class=\"stats\">\n          ").concat(statsTemplate(it.stats), "\n        </ul>\n      </td>\n      ").concat(_this2.renderResult(it), "\n    ");
	      }).join(""), "\n      </table>\n    ");
	    }
	  }, {
	    key: "renderResult",
	    value: function renderResult(it) {
	      if (it.lives <= 0) {
	        return "\n      <td class=\"result__total\"></td>\n      <td class=\"result__total result__total--final\">fail</td>\n    </tr>\n      ";
	      }

	      return "\n      <td class=\"result__points\">\xD7 ".concat(gameData.SCORE.RIGHT_ANSWER, "</td>\n      <td class=\"result__total\">").concat(getCorrectAnswers(it.stats, "wrong") * gameData.SCORE.RIGHT_ANSWER, "</td>\n    </tr>\n    ").concat(this.renderBonus(getBonusAnswers(it.stats, "fast"), "fast"), "\n    ").concat(this.renderBonus(it.lives, "alive"), "\n    ").concat(this.renderBonus(getBonusAnswers(it.stats, "slow"), "slow"), "\n    <tr>\n      <td colspan=\"5\" class=\"result__total  result__total--final\">").concat(it.score, "</td>\n    </tr>\n\n    ");
	    }
	  }, {
	    key: "renderBonus",
	    value: function renderBonus(answer, type) {
	      return "\n      <tr>\n        <td></td>\n        <td class=\"result__extra\">".concat(result[type], ":</td>\n        <td class=\"result__extra\">\n          ").concat(answer, " <span class=\"stats__result stats__result--").concat(type, "\"></span>\n        </td>\n        <td class=\"result__points\">\xD7 ").concat(gameData.SCORE.BONUS_ANSWER, "</td>\n        <td class=\"result__total\">").concat(answer * gameData.SCORE.BONUS_ANSWER, "</td>\n      </tr>\n    ");
	    }
	  }, {
	    key: "template",
	    get: function get() {
	      return "\n  <header class=\"header\"></header>\n  <section class=\"result\"></section>\n    ";
	    }
	  }]);

	  return ResultView;
	}(AbstractView);

	var SERVER_URL = "https://es.dump.academy/pixel-hunter";
	var DEFAULT_NAME = "Kappa";
	var APP_ID = 3751463022;

	var checkStatus = function checkStatus(response) {
	  if (response.ok) {
	    return response;
	  } else {
	    throw new Error("".concat(response.status, ": ").concat(response.statusText));
	  }
	};

	var toJSON = function toJSON(res) {
	  return res.json();
	};

	var Loader =
	/*#__PURE__*/
	function () {
	  function Loader() {
	    _classCallCheck(this, Loader);
	  }

	  _createClass(Loader, null, [{
	    key: "loadData",
	    value: function () {
	      var _loadData = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee() {
	        var response, res;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return fetch("".concat(SERVER_URL, "/questions"));

	              case 2:
	                response = _context.sent;
	                _context.next = 5;
	                return checkStatus(response);

	              case 5:
	                res = _context.sent;
	                return _context.abrupt("return", toJSON(res));

	              case 7:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee);
	      }));

	      function loadData() {
	        return _loadData.apply(this, arguments);
	      }

	      return loadData;
	    }()
	  }, {
	    key: "loadResults",
	    value: function () {
	      var _loadResults = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee2() {
	        var name,
	            response,
	            res,
	            _args2 = arguments;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                name = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : DEFAULT_NAME;
	                _context2.next = 3;
	                return fetch("".concat(SERVER_URL, "/stats/:").concat(APP_ID, "-:").concat(name));

	              case 3:
	                response = _context2.sent;
	                _context2.next = 6;
	                return checkStatus(response);

	              case 6:
	                res = _context2.sent;
	                return _context2.abrupt("return", toJSON(res));

	              case 8:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      function loadResults() {
	        return _loadResults.apply(this, arguments);
	      }

	      return loadResults;
	    }()
	  }, {
	    key: "saveResults",
	    value: function () {
	      var _saveResults = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee3(data) {
	        var name,
	            requestSettings,
	            response,
	            _args3 = arguments;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                name = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : DEFAULT_NAME;
	                data = Object.assign({
	                  name: name
	                }, data);
	                requestSettings = {
	                  body: JSON.stringify(data),
	                  headers: {
	                    'Content-Type': "application/json"
	                  },
	                  method: "POST"
	                };
	                _context3.next = 5;
	                return fetch("".concat(SERVER_URL, "/stats/:").concat(APP_ID, "-:").concat(name), requestSettings);

	              case 5:
	                response = _context3.sent;
	                return _context3.abrupt("return", checkStatus(response));

	              case 7:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3);
	      }));

	      function saveResults(_x) {
	        return _saveResults.apply(this, arguments);
	      }

	      return saveResults;
	    }()
	  }]);

	  return Loader;
	}();

	var gameData$1;

	var Router =
	/*#__PURE__*/
	function () {
	  function Router() {
	    _classCallCheck(this, Router);
	  }

	  _createClass(Router, null, [{
	    key: "init",
	    value: function init() {
	      Loader.loadData().then(function (data) {
	        return gameData$1 = data;
	      }).then(function () {
	        return Router.showIntro();
	      })["catch"](Router.showError);
	    }
	  }, {
	    key: "showIntro",
	    value: function showIntro() {
	      var intro = new IntroController();
	      changeView(intro);
	    }
	  }, {
	    key: "showGreeting",
	    value: function showGreeting() {
	      var greeting = new GreetingController();
	      changeView(greeting);
	    }
	  }, {
	    key: "showRules",
	    value: function showRules() {
	      var rules = new RulesController();
	      changeView(rules);
	    }
	  }, {
	    key: "showData",
	    value: function showData(playerName) {
	      Router.showGame(new GameModel(playerName, gameData$1));
	    }
	  }, {
	    key: "showGame",
	    value: function showGame(model) {
	      var game = new GameController(model);
	      changeView(game);
	    }
	  }, {
	    key: "showResult",
	    value: function showResult(state, playerName) {
	      var result = new ResultView(state);
	      changeView(result);
	      Loader.saveResults(state, playerName).then(function () {
	        return Loader.loadResults(playerName);
	      }).then(function (data) {
	        return result.showScores(data);
	      })["catch"](Router.showError);
	    }
	  }, {
	    key: "showError",
	    value: function showError() {
	      var error = new ErrorView();
	      changeView(error);
	    }
	  }]);

	  return Router;
	}();

	var init = function init() {
	  Router.init();
	};

	init();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mdW5jdGlvbi10by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MtZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNlYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QucHJldmVudC1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLWZyb3plbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1zZWFsZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2FtZS12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1wcm90by5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19iaW5kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uYmluZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctd3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctdHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3BhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3BhcnNlLWZsb2F0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1udW1iZXItdmFsdWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLWZpeGVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLXByZWNpc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5lcHNpbG9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLWZpbml0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtc2FmZS1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLm1heC1zYWZlLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1pbnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hY29zaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXNpbmguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmF0YW5oLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1zaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jbHozMi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY29zaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtZXhwbTEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmV4cG0xLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1mcm91bmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmZyb3VuZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguaHlwb3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguc2luaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudHJ1bmMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZnJvbS1jb2RlLXBvaW50LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJhdy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy50cmltLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5jb2RlLXBvaW50LWF0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtcmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy1pcy1yZWdleHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmFuY2hvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5iaWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYmxpbmsuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYm9sZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5maXhlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mb250Y29sb3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZm9udHNpemUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRhbGljcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5saW5rLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnNtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0cmlrZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdWIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3VwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS5ub3cuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kYXRlLXRvLWlzby1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLWlzby1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RhdGUtdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaWN0LW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmpvaW4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zbGljZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZm9yLWVhY2guanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5tYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zb21lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZXZlcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UtcmlnaHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pbmRleC1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lmxhc3QtaW5kZXgtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1jb3B5LXdpdGhpbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmxhZ3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5leGVjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVnZXhwLWV4ZWMtYWJzdHJhY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wZXJmb3JtLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdXNlci1hZ2VudC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi13ZWFrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1tYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLXNldC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3R5cGVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5hcnJheS1idWZmZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5kYXRhLXZpZXcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDgtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5pbnQxNi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmFwcGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVsZXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmlzLWV4dGVuc2libGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9hcnJheS9pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYXR0ZW4taW50by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LmFycmF5LmZsYXQtbWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vYXJyYXkvZmxhdC1tYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcGFkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3N0cmluZy9wYWQtc3RhcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWVuZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3N0cmluZy9wYWQtZW5kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3N0cmluZy90cmltLXN0YXJ0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tcmlnaHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9zdHJpbmcvdHJpbS1lbmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9zeW1ib2wvYXN5bmMtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC92YWx1ZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vcHJvbWlzZS9maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9wb2x5ZmlsbC9saWIvaW5kZXguanMiLCJqcy91dGlsLmpzIiwianMvdmlldy9hYnN0cmFjdC12aWV3LmpzIiwianMvdmlldy9pbnRyby12aWV3LmpzIiwianMvY29udHJvbGxlci9pbnRyby1jb250cm9sbGVyLmpzIiwianMvdmlldy9ncmVldGluZy12aWV3LmpzIiwianMvY29udHJvbGxlci9ncmVldGluZy1jb250cm9sbGVyLmpzIiwianMvdmlldy9iYWNrLWJ1dHRvbi12aWV3LmpzIiwianMvY29udHJvbGxlci9iYWNrLWJ1dHRvbi1jb250cm9sbGVyLmpzIiwianMvdmlldy9ydWxlcy12aWV3LmpzIiwianMvY29udHJvbGxlci9ydWxlcy1jb250cm9sbGVyLmpzIiwianMvZGF0YS9nYW1lLWRhdGEuanMiLCJqcy92aWV3L2hlYWRlci1kYXRhLXZpZXcuanMiLCJqcy90ZW1wbGF0ZXMvc3RhdHMtdGVtcGxhdGUuanMiLCJqcy92aWV3L2dhbWUtMS12aWV3LmpzIiwianMvdmlldy9nYW1lLTItdmlldy5qcyIsImpzL3ZpZXcvZ2FtZS0zLXZpZXcuanMiLCJqcy9jb250cm9sbGVyL2dhbWUtY29udHJvbGxlci5qcyIsImpzL3ZpZXcvZXJyb3Itdmlldy5qcyIsImpzL2dhbWUtbW9kZWwuanMiLCJqcy92aWV3L3Jlc3VsdC12aWV3LmpzIiwianMvbG9hZGVyLmpzIiwianMvcm91dGVyLmpzIiwianMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjUnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFNSQyA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuL19mdW5jdGlvbi10by1zdHJpbmcnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICAkcmVwbGFjZXIgPSByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKSB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydGllczogcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpIH0pO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iLCIvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuIiwiLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlOYW1lcycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpLmY7XG59KTtcbiIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24gKCRmcmVlemUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShpdCkge1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMi4xNyBPYmplY3Quc2VhbChPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdzZWFsJywgZnVuY3Rpb24gKCRzZWFsKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzZWFsKGl0KSB7XG4gICAgcmV0dXJuICRzZWFsICYmIGlzT2JqZWN0KGl0KSA/ICRzZWFsKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7XG4iLCIvLyAxOS4xLjIuMTUgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ3ByZXZlbnRFeHRlbnNpb25zJywgZnVuY3Rpb24gKCRwcmV2ZW50RXh0ZW5zaW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMoaXQpIHtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zICYmIGlzT2JqZWN0KGl0KSA/ICRwcmV2ZW50RXh0ZW5zaW9ucyhtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuIiwiLy8gMTkuMS4yLjEyIE9iamVjdC5pc0Zyb3plbihPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNGcm96ZW4nLCBmdW5jdGlvbiAoJGlzRnJvemVuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc0Zyb3plbihpdCkge1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNGcm96ZW4gPyAkaXNGcm96ZW4oaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7XG4iLCIvLyAxOS4xLjIuMTMgT2JqZWN0LmlzU2VhbGVkKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc1NlYWxlZCcsIGZ1bmN0aW9uICgkaXNTZWFsZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzU2VhbGVkKGl0KSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc1NlYWxlZCA/ICRpc1NlYWxlZChpdCkgOiBmYWxzZSA6IHRydWU7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMi4xMSBPYmplY3QuaXNFeHRlbnNpYmxlKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc0V4dGVuc2libGUnLCBmdW5jdGlvbiAoJGlzRXh0ZW5zaWJsZSkge1xuICByZXR1cm4gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKGl0KSA6IHRydWUgOiBmYWxzZTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwiLy8gNy4yLjkgU2FtZVZhbHVlKHgsIHkpXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59O1xuIiwiLy8gMTkuMS4zLjEwIE9iamVjdC5pcyh2YWx1ZTEsIHZhbHVlMilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgaXM6IHJlcXVpcmUoJy4vX3NhbWUtdmFsdWUnKSB9KTtcbiIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIHRlc3QgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYgKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpIHtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufVxuIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGFycmF5U2xpY2UgPSBbXS5zbGljZTtcbnZhciBmYWN0b3JpZXMgPSB7fTtcblxudmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIChGLCBsZW4sIGFyZ3MpIHtcbiAgaWYgKCEobGVuIGluIGZhY3RvcmllcykpIHtcbiAgICBmb3IgKHZhciBuID0gW10sIGkgPSAwOyBpIDwgbGVuOyBpKyspIG5baV0gPSAnYVsnICsgaSArICddJztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBmYWN0b3JpZXNbbGVuXSA9IEZ1bmN0aW9uKCdGLGEnLCAncmV0dXJuIG5ldyBGKCcgKyBuLmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1tsZW5dKEYsIGFyZ3MpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5iaW5kIHx8IGZ1bmN0aW9uIGJpbmQodGhhdCAvKiAsIC4uLmFyZ3MgKi8pIHtcbiAgdmFyIGZuID0gYUZ1bmN0aW9uKHRoaXMpO1xuICB2YXIgcGFydEFyZ3MgPSBhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kID0gZnVuY3Rpb24gKC8qIGFyZ3MuLi4gKi8pIHtcbiAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZCA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbiAgaWYgKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpIGJvdW5kLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIi8vIDE5LjIuMy4yIC8gMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQodGhpc0FyZywgYXJncy4uLilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnRnVuY3Rpb24nLCB7IGJpbmQ6IHJlcXVpcmUoJy4vX2JpbmQnKSB9KTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgRlByb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIG5hbWVSRSA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopLztcbnZhciBOQU1FID0gJ25hbWUnO1xuXG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZQcm90byB8fCByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIGRQKEZQcm90bywgTkFNRSwge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKCcnICsgdGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIEhBU19JTlNUQU5DRSA9IHJlcXVpcmUoJy4vX3drcycpKCdoYXNJbnN0YW5jZScpO1xudmFyIEZ1bmN0aW9uUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyAxOS4yLjMuNiBGdW5jdGlvbi5wcm90b3R5cGVbQEBoYXNJbnN0YW5jZV0oVilcbmlmICghKEhBU19JTlNUQU5DRSBpbiBGdW5jdGlvblByb3RvKSkgcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZihGdW5jdGlvblByb3RvLCBIQVNfSU5TVEFOQ0UsIHsgdmFsdWU6IGZ1bmN0aW9uIChPKSB7XG4gIGlmICh0eXBlb2YgdGhpcyAhPSAnZnVuY3Rpb24nIHx8ICFpc09iamVjdChPKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzT2JqZWN0KHRoaXMucHJvdG90eXBlKSkgcmV0dXJuIE8gaW5zdGFuY2VvZiB0aGlzO1xuICAvLyBmb3IgZW52aXJvbm1lbnQgdy9vIG5hdGl2ZSBgQEBoYXNJbnN0YW5jZWAgbG9naWMgZW5vdWdoIGBpbnN0YW5jZW9mYCwgYnV0IGFkZCB0aGlzOlxuICB3aGlsZSAoTyA9IGdldFByb3RvdHlwZU9mKE8pKSBpZiAodGhpcy5wcm90b3R5cGUgPT09IE8pIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59IH0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcbiAgJ1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzcGFjZXMgPSByZXF1aXJlKCcuL19zdHJpbmctd3MnKTtcbnZhciBzcGFjZSA9ICdbJyArIHNwYWNlcyArICddJztcbnZhciBub24gPSAnXFx1MjAwYlxcdTAwODUnO1xudmFyIGx0cmltID0gUmVnRXhwKCdeJyArIHNwYWNlICsgc3BhY2UgKyAnKicpO1xudmFyIHJ0cmltID0gUmVnRXhwKHNwYWNlICsgc3BhY2UgKyAnKiQnKTtcblxudmFyIGV4cG9ydGVyID0gZnVuY3Rpb24gKEtFWSwgZXhlYywgQUxJQVMpIHtcbiAgdmFyIGV4cCA9IHt9O1xuICB2YXIgRk9SQ0UgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhc3BhY2VzW0tFWV0oKSB8fCBub25bS0VZXSgpICE9IG5vbjtcbiAgfSk7XG4gIHZhciBmbiA9IGV4cFtLRVldID0gRk9SQ0UgPyBleGVjKHRyaW0pIDogc3BhY2VzW0tFWV07XG4gIGlmIChBTElBUykgZXhwW0FMSUFTXSA9IGZuO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFLCAnU3RyaW5nJywgZXhwKTtcbn07XG5cbi8vIDEgLT4gU3RyaW5nI3RyaW1MZWZ0XG4vLyAyIC0+IFN0cmluZyN0cmltUmlnaHRcbi8vIDMgLT4gU3RyaW5nI3RyaW1cbnZhciB0cmltID0gZXhwb3J0ZXIudHJpbSA9IGZ1bmN0aW9uIChzdHJpbmcsIFRZUEUpIHtcbiAgc3RyaW5nID0gU3RyaW5nKGRlZmluZWQoc3RyaW5nKSk7XG4gIGlmIChUWVBFICYgMSkgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICByZXR1cm4gc3RyaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlcjtcbiIsInZhciAkcGFyc2VJbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5wYXJzZUludDtcbnZhciAkdHJpbSA9IHJlcXVpcmUoJy4vX3N0cmluZy10cmltJykudHJpbTtcbnZhciB3cyA9IHJlcXVpcmUoJy4vX3N0cmluZy13cycpO1xudmFyIGhleCA9IC9eWy0rXT8wW3hYXS87XG5cbm1vZHVsZS5leHBvcnRzID0gJHBhcnNlSW50KHdzICsgJzA4JykgIT09IDggfHwgJHBhcnNlSW50KHdzICsgJzB4MTYnKSAhPT0gMjIgPyBmdW5jdGlvbiBwYXJzZUludChzdHIsIHJhZGl4KSB7XG4gIHZhciBzdHJpbmcgPSAkdHJpbShTdHJpbmcoc3RyKSwgMyk7XG4gIHJldHVybiAkcGFyc2VJbnQoc3RyaW5nLCAocmFkaXggPj4+IDApIHx8IChoZXgudGVzdChzdHJpbmcpID8gMTYgOiAxMCkpO1xufSA6ICRwYXJzZUludDtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fcGFyc2UtaW50Jyk7XG4vLyAxOC4yLjUgcGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlSW50ICE9ICRwYXJzZUludCksIHsgcGFyc2VJbnQ6ICRwYXJzZUludCB9KTtcbiIsInZhciAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnBhcnNlRmxvYXQ7XG52YXIgJHRyaW0gPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW07XG5cbm1vZHVsZS5leHBvcnRzID0gMSAvICRwYXJzZUZsb2F0KHJlcXVpcmUoJy4vX3N0cmluZy13cycpICsgJy0wJykgIT09IC1JbmZpbml0eSA/IGZ1bmN0aW9uIHBhcnNlRmxvYXQoc3RyKSB7XG4gIHZhciBzdHJpbmcgPSAkdHJpbShTdHJpbmcoc3RyKSwgMyk7XG4gIHZhciByZXN1bHQgPSAkcGFyc2VGbG9hdChzdHJpbmcpO1xuICByZXR1cm4gcmVzdWx0ID09PSAwICYmIHN0cmluZy5jaGFyQXQoMCkgPT0gJy0nID8gLTAgOiByZXN1bHQ7XG59IDogJHBhcnNlRmxvYXQ7XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fcGFyc2UtZmxvYXQnKTtcbi8vIDE4LjIuNCBwYXJzZUZsb2F0KHN0cmluZylcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlRmxvYXQgIT0gJHBhcnNlRmxvYXQpLCB7IHBhcnNlRmxvYXQ6ICRwYXJzZUZsb2F0IH0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQ7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCB0YXJnZXQsIEMpIHtcbiAgdmFyIFMgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gIHZhciBQO1xuICBpZiAoUyAhPT0gQyAmJiB0eXBlb2YgUyA9PSAnZnVuY3Rpb24nICYmIChQID0gUy5wcm90b3R5cGUpICE9PSBDLnByb3RvdHlwZSAmJiBpc09iamVjdChQKSAmJiBzZXRQcm90b3R5cGVPZikge1xuICAgIHNldFByb3RvdHlwZU9mKHRoYXQsIFApO1xuICB9IHJldHVybiB0aGF0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIGdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyICR0cmltID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIE5VTUJFUiA9ICdOdW1iZXInO1xudmFyICROdW1iZXIgPSBnbG9iYWxbTlVNQkVSXTtcbnZhciBCYXNlID0gJE51bWJlcjtcbnZhciBwcm90byA9ICROdW1iZXIucHJvdG90eXBlO1xuLy8gT3BlcmEgfjEyIGhhcyBicm9rZW4gT2JqZWN0I3RvU3RyaW5nXG52YXIgQlJPS0VOX0NPRiA9IGNvZihyZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykocHJvdG8pKSA9PSBOVU1CRVI7XG52YXIgVFJJTSA9ICd0cmltJyBpbiBTdHJpbmcucHJvdG90eXBlO1xuXG4vLyA3LjEuMyBUb051bWJlcihhcmd1bWVudClcbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICBpZiAodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIpIHtcbiAgICBpdCA9IFRSSU0gPyBpdC50cmltKCkgOiAkdHJpbShpdCwgMyk7XG4gICAgdmFyIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgdGhpcmQsIHJhZGl4LCBtYXhDb2RlO1xuICAgIGlmIChmaXJzdCA9PT0gNDMgfHwgZmlyc3QgPT09IDQ1KSB7XG4gICAgICB0aGlyZCA9IGl0LmNoYXJDb2RlQXQoMik7XG4gICAgICBpZiAodGhpcmQgPT09IDg4IHx8IHRoaXJkID09PSAxMjApIHJldHVybiBOYU47IC8vIE51bWJlcignKzB4MScpIHNob3VsZCBiZSBOYU4sIG9sZCBWOCBmaXhcbiAgICB9IGVsc2UgaWYgKGZpcnN0ID09PSA0OCkge1xuICAgICAgc3dpdGNoIChpdC5jaGFyQ29kZUF0KDEpKSB7XG4gICAgICAgIGNhc2UgNjY6IGNhc2UgOTg6IHJhZGl4ID0gMjsgbWF4Q29kZSA9IDQ5OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBiWzAxXSskL2lcbiAgICAgICAgY2FzZSA3OTogY2FzZSAxMTE6IHJhZGl4ID0gODsgbWF4Q29kZSA9IDU1OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBvWzAtN10rJC9pXG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiAraXQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBkaWdpdHMgPSBpdC5zbGljZSgyKSwgaSA9IDAsIGwgPSBkaWdpdHMubGVuZ3RoLCBjb2RlOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBkaWdpdHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgLy8gcGFyc2VJbnQgcGFyc2VzIGEgc3RyaW5nIHRvIGEgZmlyc3QgdW5hdmFpbGFibGUgc3ltYm9sXG4gICAgICAgIC8vIGJ1dCBUb051bWJlciBzaG91bGQgcmV0dXJuIE5hTiBpZiBhIHN0cmluZyBjb250YWlucyB1bmF2YWlsYWJsZSBzeW1ib2xzXG4gICAgICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IG1heENvZGUpIHJldHVybiBOYU47XG4gICAgICB9IHJldHVybiBwYXJzZUludChkaWdpdHMsIHJhZGl4KTtcbiAgICB9XG4gIH0gcmV0dXJuICtpdDtcbn07XG5cbmlmICghJE51bWJlcignIDBvMScpIHx8ICEkTnVtYmVyKCcwYjEnKSB8fCAkTnVtYmVyKCcrMHgxJykpIHtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSkge1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICByZXR1cm4gdGhhdCBpbnN0YW5jZW9mICROdW1iZXJcbiAgICAgIC8vIGNoZWNrIG9uIDEuLmNvbnN0cnVjdG9yKGZvbykgY2FzZVxuICAgICAgJiYgKEJST0tFTl9DT0YgPyBmYWlscyhmdW5jdGlvbiAoKSB7IHByb3RvLnZhbHVlT2YuY2FsbCh0aGF0KTsgfSkgOiBjb2YodGhhdCkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBCYXNlKHRvTnVtYmVyKGl0KSksIHRoYXQsICROdW1iZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUE4oQmFzZSkgOiAoXG4gICAgLy8gRVMzOlxuICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAvLyBFUzYgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzYgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAnRVBTSUxPTixpc0Zpbml0ZSxpc0ludGVnZXIsaXNOYU4saXNTYWZlSW50ZWdlcixNQVhfU0FGRV9JTlRFR0VSLCcgK1xuICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICApLnNwbGl0KCcsJyksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgaisrKSB7XG4gICAgaWYgKGhhcyhCYXNlLCBrZXkgPSBrZXlzW2pdKSAmJiAhaGFzKCROdW1iZXIsIGtleSkpIHtcbiAgICAgIGRQKCROdW1iZXIsIGtleSwgZ09QRChCYXNlLCBrZXkpKTtcbiAgICB9XG4gIH1cbiAgJE51bWJlci5wcm90b3R5cGUgPSBwcm90bztcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkTnVtYmVyO1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKGdsb2JhbCwgTlVNQkVSLCAkTnVtYmVyKTtcbn1cbiIsInZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnbnVtYmVyJyAmJiBjb2YoaXQpICE9ICdOdW1iZXInKSB0aHJvdyBUeXBlRXJyb3IobXNnKTtcbiAgcmV0dXJuICtpdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoZGVmaW5lZCh0aGlzKSk7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIG4gPSB0b0ludGVnZXIoY291bnQpO1xuICBpZiAobiA8IDAgfHwgbiA9PSBJbmZpbml0eSkgdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IgKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpIGlmIChuICYgMSkgcmVzICs9IHN0cjtcbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBhTnVtYmVyVmFsdWUgPSByZXF1aXJlKCcuL19hLW51bWJlci12YWx1ZScpO1xudmFyIHJlcGVhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKTtcbnZhciAkdG9GaXhlZCA9IDEuMC50b0ZpeGVkO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBkYXRhID0gWzAsIDAsIDAsIDAsIDAsIDBdO1xudmFyIEVSUk9SID0gJ051bWJlci50b0ZpeGVkOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnO1xudmFyIFpFUk8gPSAnMCc7XG5cbnZhciBtdWx0aXBseSA9IGZ1bmN0aW9uIChuLCBjKSB7XG4gIHZhciBpID0gLTE7XG4gIHZhciBjMiA9IGM7XG4gIHdoaWxlICgrK2kgPCA2KSB7XG4gICAgYzIgKz0gbiAqIGRhdGFbaV07XG4gICAgZGF0YVtpXSA9IGMyICUgMWU3O1xuICAgIGMyID0gZmxvb3IoYzIgLyAxZTcpO1xuICB9XG59O1xudmFyIGRpdmlkZSA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciBpID0gNjtcbiAgdmFyIGMgPSAwO1xuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICBjICs9IGRhdGFbaV07XG4gICAgZGF0YVtpXSA9IGZsb29yKGMgLyBuKTtcbiAgICBjID0gKGMgJSBuKSAqIDFlNztcbiAgfVxufTtcbnZhciBudW1Ub1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGkgPSA2O1xuICB2YXIgcyA9ICcnO1xuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICBpZiAocyAhPT0gJycgfHwgaSA9PT0gMCB8fCBkYXRhW2ldICE9PSAwKSB7XG4gICAgICB2YXIgdCA9IFN0cmluZyhkYXRhW2ldKTtcbiAgICAgIHMgPSBzID09PSAnJyA/IHQgOiBzICsgcmVwZWF0LmNhbGwoWkVSTywgNyAtIHQubGVuZ3RoKSArIHQ7XG4gICAgfVxuICB9IHJldHVybiBzO1xufTtcbnZhciBwb3cgPSBmdW5jdGlvbiAoeCwgbiwgYWNjKSB7XG4gIHJldHVybiBuID09PSAwID8gYWNjIDogbiAlIDIgPT09IDEgPyBwb3coeCwgbiAtIDEsIGFjYyAqIHgpIDogcG93KHggKiB4LCBuIC8gMiwgYWNjKTtcbn07XG52YXIgbG9nID0gZnVuY3Rpb24gKHgpIHtcbiAgdmFyIG4gPSAwO1xuICB2YXIgeDIgPSB4O1xuICB3aGlsZSAoeDIgPj0gNDA5Nikge1xuICAgIG4gKz0gMTI7XG4gICAgeDIgLz0gNDA5NjtcbiAgfVxuICB3aGlsZSAoeDIgPj0gMikge1xuICAgIG4gKz0gMTtcbiAgICB4MiAvPSAyO1xuICB9IHJldHVybiBuO1xufTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoISEkdG9GaXhlZCAmJiAoXG4gIDAuMDAwMDgudG9GaXhlZCgzKSAhPT0gJzAuMDAwJyB8fFxuICAwLjkudG9GaXhlZCgwKSAhPT0gJzEnIHx8XG4gIDEuMjU1LnRvRml4ZWQoMikgIT09ICcxLjI1JyB8fFxuICAxMDAwMDAwMDAwMDAwMDAwMTI4LjAudG9GaXhlZCgwKSAhPT0gJzEwMDAwMDAwMDAwMDAwMDAxMjgnXG4pIHx8ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgLy8gVjggfiBBbmRyb2lkIDQuMy1cbiAgJHRvRml4ZWQuY2FsbCh7fSk7XG59KSksICdOdW1iZXInLCB7XG4gIHRvRml4ZWQ6IGZ1bmN0aW9uIHRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpIHtcbiAgICB2YXIgeCA9IGFOdW1iZXJWYWx1ZSh0aGlzLCBFUlJPUik7XG4gICAgdmFyIGYgPSB0b0ludGVnZXIoZnJhY3Rpb25EaWdpdHMpO1xuICAgIHZhciBzID0gJyc7XG4gICAgdmFyIG0gPSBaRVJPO1xuICAgIHZhciBlLCB6LCBqLCBrO1xuICAgIGlmIChmIDwgMCB8fCBmID4gMjApIHRocm93IFJhbmdlRXJyb3IoRVJST1IpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoeCAhPSB4KSByZXR1cm4gJ05hTic7XG4gICAgaWYgKHggPD0gLTFlMjEgfHwgeCA+PSAxZTIxKSByZXR1cm4gU3RyaW5nKHgpO1xuICAgIGlmICh4IDwgMCkge1xuICAgICAgcyA9ICctJztcbiAgICAgIHggPSAteDtcbiAgICB9XG4gICAgaWYgKHggPiAxZS0yMSkge1xuICAgICAgZSA9IGxvZyh4ICogcG93KDIsIDY5LCAxKSkgLSA2OTtcbiAgICAgIHogPSBlIDwgMCA/IHggKiBwb3coMiwgLWUsIDEpIDogeCAvIHBvdygyLCBlLCAxKTtcbiAgICAgIHogKj0gMHgxMDAwMDAwMDAwMDAwMDtcbiAgICAgIGUgPSA1MiAtIGU7XG4gICAgICBpZiAoZSA+IDApIHtcbiAgICAgICAgbXVsdGlwbHkoMCwgeik7XG4gICAgICAgIGogPSBmO1xuICAgICAgICB3aGlsZSAoaiA+PSA3KSB7XG4gICAgICAgICAgbXVsdGlwbHkoMWU3LCAwKTtcbiAgICAgICAgICBqIC09IDc7XG4gICAgICAgIH1cbiAgICAgICAgbXVsdGlwbHkocG93KDEwLCBqLCAxKSwgMCk7XG4gICAgICAgIGogPSBlIC0gMTtcbiAgICAgICAgd2hpbGUgKGogPj0gMjMpIHtcbiAgICAgICAgICBkaXZpZGUoMSA8PCAyMyk7XG4gICAgICAgICAgaiAtPSAyMztcbiAgICAgICAgfVxuICAgICAgICBkaXZpZGUoMSA8PCBqKTtcbiAgICAgICAgbXVsdGlwbHkoMSwgMSk7XG4gICAgICAgIGRpdmlkZSgyKTtcbiAgICAgICAgbSA9IG51bVRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtdWx0aXBseSgwLCB6KTtcbiAgICAgICAgbXVsdGlwbHkoMSA8PCAtZSwgMCk7XG4gICAgICAgIG0gPSBudW1Ub1N0cmluZygpICsgcmVwZWF0LmNhbGwoWkVSTywgZik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmID4gMCkge1xuICAgICAgayA9IG0ubGVuZ3RoO1xuICAgICAgbSA9IHMgKyAoayA8PSBmID8gJzAuJyArIHJlcGVhdC5jYWxsKFpFUk8sIGYgLSBrKSArIG0gOiBtLnNsaWNlKDAsIGsgLSBmKSArICcuJyArIG0uc2xpY2UoayAtIGYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHMgKyBtO1xuICAgIH0gcmV0dXJuIG07XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGFOdW1iZXJWYWx1ZSA9IHJlcXVpcmUoJy4vX2EtbnVtYmVyLXZhbHVlJyk7XG52YXIgJHRvUHJlY2lzaW9uID0gMS4wLnRvUHJlY2lzaW9uO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICgkZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBJRTctXG4gIHJldHVybiAkdG9QcmVjaXNpb24uY2FsbCgxLCB1bmRlZmluZWQpICE9PSAnMSc7XG59KSB8fCAhJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gVjggfiBBbmRyb2lkIDQuMy1cbiAgJHRvUHJlY2lzaW9uLmNhbGwoe30pO1xufSkpLCAnTnVtYmVyJywge1xuICB0b1ByZWNpc2lvbjogZnVuY3Rpb24gdG9QcmVjaXNpb24ocHJlY2lzaW9uKSB7XG4gICAgdmFyIHRoYXQgPSBhTnVtYmVyVmFsdWUodGhpcywgJ051bWJlciN0b1ByZWNpc2lvbjogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gICAgcmV0dXJuIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gJHRvUHJlY2lzaW9uLmNhbGwodGhhdCkgOiAkdG9QcmVjaXNpb24uY2FsbCh0aGF0LCBwcmVjaXNpb24pO1xuICB9XG59KTtcbiIsIi8vIDIwLjEuMi4xIE51bWJlci5FUFNJTE9OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHsgRVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKSB9KTtcbiIsIi8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmlzRmluaXRlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9XG59KTtcbiIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0ludGVnZXIoaXQpIHtcbiAgcmV0dXJuICFpc09iamVjdChpdCkgJiYgaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XG59O1xuIiwiLy8gMjAuMS4yLjMgTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHsgaXNJbnRlZ2VyOiByZXF1aXJlKCcuL19pcy1pbnRlZ2VyJykgfSk7XG4iLCIvLyAyMC4xLjIuNCBOdW1iZXIuaXNOYU4obnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzTmFOOiBmdW5jdGlvbiBpc05hTihudW1iZXIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH1cbn0pO1xuIiwiLy8gMjAuMS4yLjUgTnVtYmVyLmlzU2FmZUludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc0ludGVnZXIgPSByZXF1aXJlKCcuL19pcy1pbnRlZ2VyJyk7XG52YXIgYWJzID0gTWF0aC5hYnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc1NhZmVJbnRlZ2VyOiBmdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKG51bWJlcikge1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSAweDFmZmZmZmZmZmZmZmZmO1xuICB9XG59KTtcbiIsIi8vIDIwLjEuMi42IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHsgTUFYX1NBRkVfSU5URUdFUjogMHgxZmZmZmZmZmZmZmZmZiB9KTtcbiIsIi8vIDIwLjEuMi4xMCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7IE1JTl9TQUZFX0lOVEVHRVI6IC0weDFmZmZmZmZmZmZmZmZmIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX3BhcnNlLWZsb2F0Jyk7XG4vLyAyMC4xLjIuMTIgTnVtYmVyLnBhcnNlRmxvYXQoc3RyaW5nKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTnVtYmVyLnBhcnNlRmxvYXQgIT0gJHBhcnNlRmxvYXQpLCAnTnVtYmVyJywgeyBwYXJzZUZsb2F0OiAkcGFyc2VGbG9hdCB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fcGFyc2UtaW50Jyk7XG4vLyAyMC4xLjIuMTMgTnVtYmVyLnBhcnNlSW50KHN0cmluZywgcmFkaXgpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChOdW1iZXIucGFyc2VJbnQgIT0gJHBhcnNlSW50KSwgJ051bWJlcicsIHsgcGFyc2VJbnQ6ICRwYXJzZUludCB9KTtcbiIsIi8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgubG9nMXAgfHwgZnVuY3Rpb24gbG9nMXAoeCkge1xuICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBNYXRoLmxvZygxICsgeCk7XG59O1xuIiwiLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBsb2cxcCA9IHJlcXVpcmUoJy4vX21hdGgtbG9nMXAnKTtcbnZhciBzcXJ0ID0gTWF0aC5zcXJ0O1xudmFyICRhY29zaCA9IE1hdGguYWNvc2g7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYWNvc2hcbiAgLy8gVjggYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzUwOVxuICAmJiBNYXRoLmZsb29yKCRhY29zaChOdW1iZXIuTUFYX1ZBTFVFKSkgPT0gNzEwXG4gIC8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hY29zaChJbmZpbml0eSkgLT4gTmFOXG4gICYmICRhY29zaChJbmZpbml0eSkgPT0gSW5maW5pdHlcbiksICdNYXRoJywge1xuICBhY29zaDogZnVuY3Rpb24gYWNvc2goeCkge1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiB4ID4gOTQ5MDYyNjUuNjI0MjUxNTZcbiAgICAgID8gTWF0aC5sb2coeCkgKyBNYXRoLkxOMlxuICAgICAgOiBsb2cxcCh4IC0gMSArIHNxcnQoeCAtIDEpICogc3FydCh4ICsgMSkpO1xuICB9XG59KTtcbiIsIi8vIDIwLjIuMi41IE1hdGguYXNpbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGFzaW5oID0gTWF0aC5hc2luaDtcblxuZnVuY3Rpb24gYXNpbmgoeCkge1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IE1hdGgubG9nKHggKyBNYXRoLnNxcnQoeCAqIHggKyAxKSk7XG59XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hc2luaCgwKSAtPiAtMFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKCRhc2luaCAmJiAxIC8gJGFzaW5oKDApID4gMCksICdNYXRoJywgeyBhc2luaDogYXNpbmggfSk7XG4iLCIvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRhdGFuaCA9IE1hdGguYXRhbmg7XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hdGFuaCgtMCkgLT4gMFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKCRhdGFuaCAmJiAxIC8gJGF0YW5oKC0wKSA8IDApLCAnTWF0aCcsIHtcbiAgYXRhbmg6IGZ1bmN0aW9uIGF0YW5oKHgpIHtcbiAgICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiBNYXRoLmxvZygoMSArIHgpIC8gKDEgLSB4KSkgLyAyO1xuICB9XG59KTtcbiIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5zaWduIHx8IGZ1bmN0aW9uIHNpZ24oeCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcbn07XG4iLCIvLyAyMC4yLjIuOSBNYXRoLmNicnQoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgc2lnbiA9IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGNicnQ6IGZ1bmN0aW9uIGNicnQoeCkge1xuICAgIHJldHVybiBzaWduKHggPSAreCkgKiBNYXRoLnBvdyhNYXRoLmFicyh4KSwgMSAvIDMpO1xuICB9XG59KTtcbiIsIi8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGNsejMyOiBmdW5jdGlvbiBjbHozMih4KSB7XG4gICAgcmV0dXJuICh4ID4+Pj0gMCkgPyAzMSAtIE1hdGguZmxvb3IoTWF0aC5sb2coeCArIDAuNSkgKiBNYXRoLkxPRzJFKSA6IDMyO1xuICB9XG59KTtcbiIsIi8vIDIwLjIuMi4xMiBNYXRoLmNvc2goeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgZXhwID0gTWF0aC5leHA7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY29zaDogZnVuY3Rpb24gY29zaCh4KSB7XG4gICAgcmV0dXJuIChleHAoeCA9ICt4KSArIGV4cCgteCkpIC8gMjtcbiAgfVxufSk7XG4iLCIvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxudmFyICRleHBtMSA9IE1hdGguZXhwbTE7XG5tb2R1bGUuZXhwb3J0cyA9ICghJGV4cG0xXG4gIC8vIE9sZCBGRiBidWdcbiAgfHwgJGV4cG0xKDEwKSA+IDIyMDI1LjQ2NTc5NDgwNjcxOSB8fCAkZXhwbTEoMTApIDwgMjIwMjUuNDY1Nzk0ODA2NzE2NTE2OFxuICAvLyBUb3IgQnJvd3NlciBidWdcbiAgfHwgJGV4cG0xKC0yZS0xNykgIT0gLTJlLTE3XG4pID8gZnVuY3Rpb24gZXhwbTEoeCkge1xuICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiB4ID4gLTFlLTYgJiYgeCA8IDFlLTYgPyB4ICsgeCAqIHggLyAyIDogTWF0aC5leHAoeCkgLSAxO1xufSA6ICRleHBtMTtcbiIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRleHBtMSA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoJGV4cG0xICE9IE1hdGguZXhwbTEpLCAnTWF0aCcsIHsgZXhwbTE6ICRleHBtMSB9KTtcbiIsIi8vIDIwLjIuMi4xNiBNYXRoLmZyb3VuZCh4KVxudmFyIHNpZ24gPSByZXF1aXJlKCcuL19tYXRoLXNpZ24nKTtcbnZhciBwb3cgPSBNYXRoLnBvdztcbnZhciBFUFNJTE9OID0gcG93KDIsIC01Mik7XG52YXIgRVBTSUxPTjMyID0gcG93KDIsIC0yMyk7XG52YXIgTUFYMzIgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKTtcbnZhciBNSU4zMiA9IHBvdygyLCAtMTI2KTtcblxudmFyIHJvdW5kVGllc1RvRXZlbiA9IGZ1bmN0aW9uIChuKSB7XG4gIHJldHVybiBuICsgMSAvIEVQU0lMT04gLSAxIC8gRVBTSUxPTjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWF0aC5mcm91bmQgfHwgZnVuY3Rpb24gZnJvdW5kKHgpIHtcbiAgdmFyICRhYnMgPSBNYXRoLmFicyh4KTtcbiAgdmFyICRzaWduID0gc2lnbih4KTtcbiAgdmFyIGEsIHJlc3VsdDtcbiAgaWYgKCRhYnMgPCBNSU4zMikgcmV0dXJuICRzaWduICogcm91bmRUaWVzVG9FdmVuKCRhYnMgLyBNSU4zMiAvIEVQU0lMT04zMikgKiBNSU4zMiAqIEVQU0lMT04zMjtcbiAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xuICByZXN1bHQgPSBhIC0gKGEgLSAkYWJzKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICBpZiAocmVzdWx0ID4gTUFYMzIgfHwgcmVzdWx0ICE9IHJlc3VsdCkgcmV0dXJuICRzaWduICogSW5maW5pdHk7XG4gIHJldHVybiAkc2lnbiAqIHJlc3VsdDtcbn07XG4iLCIvLyAyMC4yLjIuMTYgTWF0aC5mcm91bmQoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHsgZnJvdW5kOiByZXF1aXJlKCcuL19tYXRoLWZyb3VuZCcpIH0pO1xuIiwiLy8gMjAuMi4yLjE3IE1hdGguaHlwb3QoW3ZhbHVlMVssIHZhbHVlMlssIOKApiBdXV0pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFicyA9IE1hdGguYWJzO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGh5cG90OiBmdW5jdGlvbiBoeXBvdCh2YWx1ZTEsIHZhbHVlMikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHN1bSA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbGFyZyA9IDA7XG4gICAgdmFyIGFyZywgZGl2O1xuICAgIHdoaWxlIChpIDwgYUxlbikge1xuICAgICAgYXJnID0gYWJzKGFyZ3VtZW50c1tpKytdKTtcbiAgICAgIGlmIChsYXJnIDwgYXJnKSB7XG4gICAgICAgIGRpdiA9IGxhcmcgLyBhcmc7XG4gICAgICAgIHN1bSA9IHN1bSAqIGRpdiAqIGRpdiArIDE7XG4gICAgICAgIGxhcmcgPSBhcmc7XG4gICAgICB9IGVsc2UgaWYgKGFyZyA+IDApIHtcbiAgICAgICAgZGl2ID0gYXJnIC8gbGFyZztcbiAgICAgICAgc3VtICs9IGRpdiAqIGRpdjtcbiAgICAgIH0gZWxzZSBzdW0gKz0gYXJnO1xuICAgIH1cbiAgICByZXR1cm4gbGFyZyA9PT0gSW5maW5pdHkgPyBJbmZpbml0eSA6IGxhcmcgKiBNYXRoLnNxcnQoc3VtKTtcbiAgfVxufSk7XG4iLCIvLyAyMC4yLjIuMTggTWF0aC5pbXVsKHgsIHkpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRpbXVsID0gTWF0aC5pbXVsO1xuXG4vLyBzb21lIFdlYktpdCB2ZXJzaW9ucyBmYWlscyB3aXRoIGJpZyBudW1iZXJzLCBzb21lIGhhcyB3cm9uZyBhcml0eVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICRpbXVsKDB4ZmZmZmZmZmYsIDUpICE9IC01IHx8ICRpbXVsLmxlbmd0aCAhPSAyO1xufSksICdNYXRoJywge1xuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpIHtcbiAgICB2YXIgVUlOVDE2ID0gMHhmZmZmO1xuICAgIHZhciB4biA9ICt4O1xuICAgIHZhciB5biA9ICt5O1xuICAgIHZhciB4bCA9IFVJTlQxNiAmIHhuO1xuICAgIHZhciB5bCA9IFVJTlQxNiAmIHluO1xuICAgIHJldHVybiAwIHwgeGwgKiB5bCArICgoVUlOVDE2ICYgeG4gPj4+IDE2KSAqIHlsICsgeGwgKiAoVUlOVDE2ICYgeW4gPj4+IDE2KSA8PCAxNiA+Pj4gMCk7XG4gIH1cbn0pO1xuIiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgKiBNYXRoLkxPRzEwRTtcbiAgfVxufSk7XG4iLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywgeyBsb2cxcDogcmVxdWlyZSgnLi9fbWF0aC1sb2cxcCcpIH0pO1xuIiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMjtcbiAgfVxufSk7XG4iLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7IHNpZ246IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpIH0pO1xuIiwiLy8gMjAuMi4yLjMwIE1hdGguc2luaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBleHBtMSA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKTtcbnZhciBleHAgPSBNYXRoLmV4cDtcblxuLy8gVjggbmVhciBDaHJvbWl1bSAzOCBoYXMgYSBwcm9ibGVtIHdpdGggdmVyeSBzbWFsbCBudW1iZXJzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIU1hdGguc2luaCgtMmUtMTcpICE9IC0yZS0xNztcbn0pLCAnTWF0aCcsIHtcbiAgc2luaDogZnVuY3Rpb24gc2luaCh4KSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHggPSAreCkgPCAxXG4gICAgICA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyXG4gICAgICA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKE1hdGguRSAvIDIpO1xuICB9XG59KTtcbiIsIi8vIDIwLjIuMi4zMyBNYXRoLnRhbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgZXhwbTEgPSByZXF1aXJlKCcuL19tYXRoLWV4cG0xJyk7XG52YXIgZXhwID0gTWF0aC5leHA7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdGFuaDogZnVuY3Rpb24gdGFuaCh4KSB7XG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpO1xuICAgIHZhciBiID0gZXhwbTEoLXgpO1xuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XG4gIH1cbn0pO1xuIiwiLy8gMjAuMi4yLjM0IE1hdGgudHJ1bmMoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KSB7XG4gICAgcmV0dXJuIChpdCA+IDAgPyBNYXRoLmZsb29yIDogTWF0aC5jZWlsKShpdCk7XG4gIH1cbn0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgJGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcblxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoISEkZnJvbUNvZGVQb2ludCAmJiAkZnJvbUNvZGVQb2ludC5sZW5ndGggIT0gMSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi4yIFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHMpXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGNvZGU7XG4gICAgd2hpbGUgKGFMZW4gPiBpKSB7XG4gICAgICBjb2RlID0gK2FyZ3VtZW50c1tpKytdO1xuICAgICAgaWYgKHRvQWJzb2x1dGVJbmRleChjb2RlLCAweDEwZmZmZikgIT09IGNvZGUpIHRocm93IFJhbmdlRXJyb3IoY29kZSArICcgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludCcpO1xuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcbiAgICAgICAgPyBmcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgOiBmcm9tQ2hhckNvZGUoKChjb2RlIC09IDB4MTAwMDApID4+IDEwKSArIDB4ZDgwMCwgY29kZSAlIDB4NDAwICsgMHhkYzAwKVxuICAgICAgKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKSB7XG4gICAgdmFyIHRwbCA9IHRvSU9iamVjdChjYWxsU2l0ZS5yYXcpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aCh0cGwubGVuZ3RoKTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAobGVuID4gaSkge1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZiAoaSA8IGFMZW4pIHJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMS4zLjI1IFN0cmluZy5wcm90b3R5cGUudHJpbSgpXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltJywgZnVuY3Rpb24gKCR0cmltKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltKCkge1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAzKTtcbiAgfTtcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykoZmFsc2UpO1xuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4zIFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQocG9zKVxuICBjb2RlUG9pbnRBdDogZnVuY3Rpb24gY29kZVBvaW50QXQocG9zKSB7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTtcbiIsIi8vIDcuMi44IElzUmVnRXhwKGFyZ3VtZW50KVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIi8vIGhlbHBlciBmb3IgU3RyaW5nI3tzdGFydHNXaXRoLCBlbmRzV2l0aCwgaW5jbHVkZXN9XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpIHtcbiAgaWYgKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpIHRocm93IFR5cGVFcnJvcignU3RyaW5nIycgKyBOQU1FICsgXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO1xuICByZXR1cm4gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xufTtcbiIsInZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciByZSA9IC8uLztcbiAgdHJ5IHtcbiAgICAnLy4vJ1tLRVldKHJlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICByZVtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAhJy8uLydbS0VZXShyZSk7XG4gICAgfSBjYXRjaCAoZikgeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNvbnRleHQgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpO1xudmFyIEVORFNfV0lUSCA9ICdlbmRzV2l0aCc7XG52YXIgJGVuZHNXaXRoID0gJydbRU5EU19XSVRIXTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShFTkRTX1dJVEgpLCAnU3RyaW5nJywge1xuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qICwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKSB7XG4gICAgdmFyIHRoYXQgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgRU5EU19XSVRIKTtcbiAgICB2YXIgZW5kUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpO1xuICAgIHZhciBlbmQgPSBlbmRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gbGVuIDogTWF0aC5taW4odG9MZW5ndGgoZW5kUG9zaXRpb24pLCBsZW4pO1xuICAgIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gJGVuZHNXaXRoXG4gICAgICA/ICRlbmRzV2l0aC5jYWxsKHRoYXQsIHNlYXJjaCwgZW5kKVxuICAgICAgOiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaC5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaDtcbiAgfVxufSk7XG4iLCIvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb250ZXh0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKTtcbnZhciBJTkNMVURFUyA9ICdpbmNsdWRlcyc7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoSU5DTFVERVMpLCAnU3RyaW5nJywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qICwgcG9zaXRpb24gPSAwICovKSB7XG4gICAgcmV0dXJuICEhfmNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBJTkNMVURFUylcbiAgICAgIC5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQoY291bnQpXG4gIHJlcGVhdDogcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG59KTtcbiIsIi8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0Jyk7XG52YXIgU1RBUlRTX1dJVEggPSAnc3RhcnRzV2l0aCc7XG52YXIgJHN0YXJ0c1dpdGggPSAnJ1tTVEFSVFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoU1RBUlRTX1dJVEgpLCAnU3RyaW5nJywge1xuICBzdGFydHNXaXRoOiBmdW5jdGlvbiBzdGFydHNXaXRoKHNlYXJjaFN0cmluZyAvKiAsIHBvc2l0aW9uID0gMCAqLykge1xuICAgIHZhciB0aGF0ID0gY29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIFNUQVJUU19XSVRIKTtcbiAgICB2YXIgaW5kZXggPSB0b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdGhhdC5sZW5ndGgpKTtcbiAgICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRzdGFydHNXaXRoXG4gICAgICA/ICRzdGFydHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBpbmRleClcbiAgICAgIDogdGhhdC5zbGljZShpbmRleCwgaW5kZXggKyBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xuICB9XG59KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG52YXIgcXVvdCA9IC9cIi9nO1xuLy8gQi4yLjMuMi4xIENyZWF0ZUhUTUwoc3RyaW5nLCB0YWcsIGF0dHJpYnV0ZSwgdmFsdWUpXG52YXIgY3JlYXRlSFRNTCA9IGZ1bmN0aW9uIChzdHJpbmcsIHRhZywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICB2YXIgUyA9IFN0cmluZyhkZWZpbmVkKHN0cmluZykpO1xuICB2YXIgcDEgPSAnPCcgKyB0YWc7XG4gIGlmIChhdHRyaWJ1dGUgIT09ICcnKSBwMSArPSAnICcgKyBhdHRyaWJ1dGUgKyAnPVwiJyArIFN0cmluZyh2YWx1ZSkucmVwbGFjZShxdW90LCAnJnF1b3Q7JykgKyAnXCInO1xuICByZXR1cm4gcDEgKyAnPicgKyBTICsgJzwvJyArIHRhZyArICc+Jztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FLCBleGVjKSB7XG4gIHZhciBPID0ge307XG4gIE9bTkFNRV0gPSBleGVjKGNyZWF0ZUhUTUwpO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVzdCA9ICcnW05BTUVdKCdcIicpO1xuICAgIHJldHVybiB0ZXN0ICE9PSB0ZXN0LnRvTG93ZXJDYXNlKCkgfHwgdGVzdC5zcGxpdCgnXCInKS5sZW5ndGggPiAzO1xuICB9KSwgJ1N0cmluZycsIE8pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjIgU3RyaW5nLnByb3RvdHlwZS5hbmNob3IobmFtZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2FuY2hvcicsIGZ1bmN0aW9uIChjcmVhdGVIVE1MKSB7XG4gIHJldHVybiBmdW5jdGlvbiBhbmNob3IobmFtZSkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ25hbWUnLCBuYW1lKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMyBTdHJpbmcucHJvdG90eXBlLmJpZygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdiaWcnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gYmlnKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiaWcnLCAnJywgJycpO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy40IFN0cmluZy5wcm90b3R5cGUuYmxpbmsoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmxpbmsnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gYmxpbmsoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2JsaW5rJywgJycsICcnKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNSBTdHJpbmcucHJvdG90eXBlLmJvbGQoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYm9sZCcsIGZ1bmN0aW9uIChjcmVhdGVIVE1MKSB7XG4gIHJldHVybiBmdW5jdGlvbiBib2xkKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiJywgJycsICcnKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNiBTdHJpbmcucHJvdG90eXBlLmZpeGVkKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZpeGVkJywgZnVuY3Rpb24gKGNyZWF0ZUhUTUwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZpeGVkKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICd0dCcsICcnLCAnJyk7XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjcgU3RyaW5nLnByb3RvdHlwZS5mb250Y29sb3IoY29sb3IpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmb250Y29sb3InLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gZm9udGNvbG9yKGNvbG9yKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2ZvbnQnLCAnY29sb3InLCBjb2xvcik7XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjggU3RyaW5nLnByb3RvdHlwZS5mb250c2l6ZShzaXplKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZm9udHNpemUnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gZm9udHNpemUoc2l6ZSkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdmb250JywgJ3NpemUnLCBzaXplKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuOSBTdHJpbmcucHJvdG90eXBlLml0YWxpY3MoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnaXRhbGljcycsIGZ1bmN0aW9uIChjcmVhdGVIVE1MKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpdGFsaWNzKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdpJywgJycsICcnKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTAgU3RyaW5nLnByb3RvdHlwZS5saW5rKHVybClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2xpbmsnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gbGluayh1cmwpIHtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYScsICdocmVmJywgdXJsKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTEgU3RyaW5nLnByb3RvdHlwZS5zbWFsbCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzbWFsbCcsIGZ1bmN0aW9uIChjcmVhdGVIVE1MKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzbWFsbCgpIHtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnc21hbGwnLCAnJywgJycpO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMiBTdHJpbmcucHJvdG90eXBlLnN0cmlrZSgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdHJpa2UnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gc3RyaWtlKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdHJpa2UnLCAnJywgJycpO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMyBTdHJpbmcucHJvdG90eXBlLnN1YigpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdWInLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gc3ViKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdWInLCAnJywgJycpO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xNCBTdHJpbmcucHJvdG90eXBlLnN1cCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdXAnLCBmdW5jdGlvbiAoY3JlYXRlSFRNTCkge1xuICByZXR1cm4gZnVuY3Rpb24gc3VwKCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdXAnLCAnJywgJycpO1xuICB9O1xufSk7XG4iLCIvLyAyMC4zLjMuMSAvIDE1LjkuNC40IERhdGUubm93KClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnRGF0ZScsIHsgbm93OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfSB9KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IERhdGUoTmFOKS50b0pTT04oKSAhPT0gbnVsbFxuICAgIHx8IERhdGUucHJvdG90eXBlLnRvSlNPTi5jYWxsKHsgdG9JU09TdHJpbmc6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0gfSkgIT09IDE7XG59KSwgJ0RhdGUnLCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTihrZXkpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBwdiA9IHRvUHJpbWl0aXZlKE8pO1xuICAgIHJldHVybiB0eXBlb2YgcHYgPT0gJ251bWJlcicgJiYgIWlzRmluaXRlKHB2KSA/IG51bGwgOiBPLnRvSVNPU3RyaW5nKCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjAuMy40LjM2IC8gMTUuOS41LjQzIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKClcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgZ2V0VGltZSA9IERhdGUucHJvdG90eXBlLmdldFRpbWU7XG52YXIgJHRvSVNPU3RyaW5nID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBseiA9IGZ1bmN0aW9uIChudW0pIHtcbiAgcmV0dXJuIG51bSA+IDkgPyBudW0gOiAnMCcgKyBudW07XG59O1xuXG4vLyBQaGFudG9tSlMgLyBvbGQgV2ViS2l0IGhhcyBhIGJyb2tlbiBpbXBsZW1lbnRhdGlvbnNcbm1vZHVsZS5leHBvcnRzID0gKGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICR0b0lTT1N0cmluZy5jYWxsKG5ldyBEYXRlKC01ZTEzIC0gMSkpICE9ICcwMzg1LTA3LTI1VDA3OjA2OjM5Ljk5OVonO1xufSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgJHRvSVNPU3RyaW5nLmNhbGwobmV3IERhdGUoTmFOKSk7XG59KSkgPyBmdW5jdGlvbiB0b0lTT1N0cmluZygpIHtcbiAgaWYgKCFpc0Zpbml0ZShnZXRUaW1lLmNhbGwodGhpcykpKSB0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgdmFyIGQgPSB0aGlzO1xuICB2YXIgeSA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgdmFyIG0gPSBkLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICB2YXIgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcbiAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xuICAgICctJyArIGx6KGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgbHooZC5nZXRVVENEYXRlKCkpICtcbiAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcbiAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcbn0gOiAkdG9JU09TdHJpbmc7XG4iLCIvLyAyMC4zLjQuMzYgLyAxNS45LjUuNDMgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b0lTT1N0cmluZyA9IHJlcXVpcmUoJy4vX2RhdGUtdG8taXNvLXN0cmluZycpO1xuXG4vLyBQaGFudG9tSlMgLyBvbGQgV2ViS2l0IGhhcyBhIGJyb2tlbiBpbXBsZW1lbnRhdGlvbnNcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nICE9PSB0b0lTT1N0cmluZyksICdEYXRlJywge1xuICB0b0lTT1N0cmluZzogdG9JU09TdHJpbmdcbn0pO1xuIiwidmFyIERhdGVQcm90byA9IERhdGUucHJvdG90eXBlO1xudmFyIElOVkFMSURfREFURSA9ICdJbnZhbGlkIERhdGUnO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgJHRvU3RyaW5nID0gRGF0ZVByb3RvW1RPX1NUUklOR107XG52YXIgZ2V0VGltZSA9IERhdGVQcm90by5nZXRUaW1lO1xuaWYgKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpIHtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShEYXRlUHJvdG8sIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0VGltZS5jYWxsKHRoaXMpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gJHRvU3RyaW5nLmNhbGwodGhpcykgOiBJTlZBTElEX0RBVEU7XG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBOVU1CRVIgPSAnbnVtYmVyJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaGludCkge1xuICBpZiAoaGludCAhPT0gJ3N0cmluZycgJiYgaGludCAhPT0gTlVNQkVSICYmIGhpbnQgIT09ICdkZWZhdWx0JykgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgaGludCcpO1xuICByZXR1cm4gdG9QcmltaXRpdmUoYW5PYmplY3QodGhpcyksIGhpbnQgIT0gTlVNQkVSKTtcbn07XG4iLCJ2YXIgVE9fUFJJTUlUSVZFID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvUHJpbWl0aXZlJyk7XG52YXIgcHJvdG8gPSBEYXRlLnByb3RvdHlwZTtcblxuaWYgKCEoVE9fUFJJTUlUSVZFIGluIHByb3RvKSkgcmVxdWlyZSgnLi9faGlkZScpKHByb3RvLCBUT19QUklNSVRJVkUsIHJlcXVpcmUoJy4vX2RhdGUtdG8tcHJpbWl0aXZlJykpO1xuIiwiLy8gMjIuMS4yLjIgLyAxNS40LjMuMiBBcnJheS5pc0FycmF5KGFyZylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnQXJyYXknLCB7IGlzQXJyYXk6IHJlcXVpcmUoJy4vX2lzLWFycmF5JykgfSk7XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcblxuLy8gV2ViS2l0IEFycmF5Lm9mIGlzbid0IGdlbmVyaWNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuICEoQXJyYXkub2YuY2FsbChGKSBpbnN0YW5jZW9mIEYpO1xufSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjMgQXJyYXkub2YoIC4uLml0ZW1zKVxuICBvZjogZnVuY3Rpb24gb2YoLyogLi4uYXJncyAqLykge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciByZXN1bHQgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpKGFMZW4pO1xuICAgIHdoaWxlIChhTGVuID4gaW5kZXgpIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGFMZW47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGxcbiAgICBhcmcgPyBtZXRob2QuY2FsbChudWxsLCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sIDEpIDogbWV0aG9kLmNhbGwobnVsbCk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUuam9pbihzZXBhcmF0b3IpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUpvaW4gPSBbXS5qb2luO1xuXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2Ugc3RyaW5nc1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAocmVxdWlyZSgnLi9faW9iamVjdCcpICE9IE9iamVjdCB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKGFycmF5Sm9pbikpLCAnQXJyYXknLCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKSB7XG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRvSU9iamVjdCh0aGlzKSwgc2VwYXJhdG9yID09PSB1bmRlZmluZWQgPyAnLCcgOiBzZXBhcmF0b3IpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTbGljZSA9IFtdLnNsaWNlO1xuXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICBpZiAoaHRtbCkgYXJyYXlTbGljZS5jYWxsKGh0bWwpO1xufSksICdBcnJheScsIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKGJlZ2luLCBlbmQpIHtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgodGhpcy5sZW5ndGgpO1xuICAgIHZhciBrbGFzcyA9IGNvZih0aGlzKTtcbiAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZDtcbiAgICBpZiAoa2xhc3MgPT0gJ0FycmF5JykgcmV0dXJuIGFycmF5U2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKTtcbiAgICB2YXIgc3RhcnQgPSB0b0Fic29sdXRlSW5kZXgoYmVnaW4sIGxlbik7XG4gICAgdmFyIHVwVG8gPSB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW4pO1xuICAgIHZhciBzaXplID0gdG9MZW5ndGgodXBUbyAtIHN0YXJ0KTtcbiAgICB2YXIgY2xvbmVkID0gbmV3IEFycmF5KHNpemUpO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKDsgaSA8IHNpemU7IGkrKykgY2xvbmVkW2ldID0ga2xhc3MgPT0gJ1N0cmluZydcbiAgICAgID8gdGhpcy5jaGFyQXQoc3RhcnQgKyBpKVxuICAgICAgOiB0aGlzW3N0YXJ0ICsgaV07XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciAkc29ydCA9IFtdLnNvcnQ7XG52YXIgdGVzdCA9IFsxLCAyLCAzXTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBJRTgtXG4gIHRlc3Quc29ydCh1bmRlZmluZWQpO1xufSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gVjggYnVnXG4gIHRlc3Quc29ydChudWxsKTtcbiAgLy8gT2xkIFdlYktpdFxufSkgfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkc29ydCkpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4yNSBBcnJheS5wcm90b3R5cGUuc29ydChjb21wYXJlZm4pXG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVmbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/ICRzb3J0LmNhbGwodG9PYmplY3QodGhpcykpXG4gICAgICA6ICRzb3J0LmNhbGwodG9PYmplY3QodGhpcyksIGFGdW5jdGlvbihjb21wYXJlZm4pKTtcbiAgfVxufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsKSkge1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xufTtcbiIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsLCBsZW5ndGgpIHtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsKSkobGVuZ3RoKTtcbn07XG4iLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYXNjID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRZUEUsICRjcmVhdGUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICB2YXIgY3JlYXRlID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IElPYmplY3QoTyk7XG4gICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWwsIHJlcztcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHJlc3VsdFtpbmRleF0gPSByZXM7ICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlcykgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmIChJU19FVkVSWSkgcmV0dXJuIGZhbHNlOyAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMCk7XG52YXIgU1RSSUNUID0gcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmZvckVhY2gsIHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFTVFJJQ1QsICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjEwIC8gMTUuNC40LjE4IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRtYXAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5tYXAsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xNSAvIDE1LjQuNC4xOSBBcnJheS5wcm90b3R5cGUubWFwKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMik7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5maWx0ZXIsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHNvbWUgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5zb21lLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGV2ZXJ5ID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDQpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZXZlcnksIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy41IC8gMTUuNC40LjE2IEFycmF5LnByb3RvdHlwZS5ldmVyeShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBldmVyeTogZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJGV2ZXJ5KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pO1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhhdCwgY2FsbGJhY2tmbiwgYUxlbiwgbWVtbywgaXNSaWdodCkge1xuICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gIHZhciBPID0gdG9PYmplY3QodGhhdCk7XG4gIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgdmFyIGluZGV4ID0gaXNSaWdodCA/IGxlbmd0aCAtIDEgOiAwO1xuICB2YXIgaSA9IGlzUmlnaHQgPyAtMSA6IDE7XG4gIGlmIChhTGVuIDwgMikgZm9yICg7Oykge1xuICAgIGlmIChpbmRleCBpbiBzZWxmKSB7XG4gICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICBpbmRleCArPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGluZGV4ICs9IGk7XG4gICAgaWYgKGlzUmlnaHQgPyBpbmRleCA8IDAgOiBsZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgIH1cbiAgfVxuICBmb3IgKDtpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKSBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIHNlbGZbaW5kZXhdLCBpbmRleCwgTyk7XG4gIH1cbiAgcmV0dXJuIG1lbW87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkcmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXktcmVkdWNlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5yZWR1Y2UsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xOCAvIDE1LjQuNC4yMSBBcnJheS5wcm90b3R5cGUucmVkdWNlKGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgZmFsc2UpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5LXJlZHVjZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ucmVkdWNlUmlnaHQsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xOSAvIDE1LjQuNC4yMiBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHQoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxuICByZWR1Y2VSaWdodDogZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgdHJ1ZSk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyICRuYXRpdmUgPSBbXS5pbmRleE9mO1xudmFyIE5FR0FUSVZFX1pFUk8gPSAhISRuYXRpdmUgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKE5FR0FUSVZFX1pFUk8gfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkbmF0aXZlKSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjExIC8gMTUuNC40LjE0IEFycmF5LnByb3RvdHlwZS5pbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/ICRuYXRpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgJG5hdGl2ZSA9IFtdLmxhc3RJbmRleE9mO1xudmFyIE5FR0FUSVZFX1pFUk8gPSAhISRuYXRpdmUgJiYgMSAvIFsxXS5sYXN0SW5kZXhPZigxLCAtMCkgPCAwO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChORUdBVElWRV9aRVJPIHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoJG5hdGl2ZSkpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xNCAvIDE1LjQuNC4xNSBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IEBbKi0xXSAqLykge1xuICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICBpZiAoTkVHQVRJVkVfWkVSTykgcmV0dXJuICRuYXRpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwO1xuICAgIHZhciBPID0gdG9JT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHRvSW50ZWdlcihhcmd1bWVudHNbMV0pKTtcbiAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IGxlbmd0aCArIGluZGV4O1xuICAgIGZvciAoO2luZGV4ID49IDA7IGluZGV4LS0pIGlmIChpbmRleCBpbiBPKSBpZiAoT1tpbmRleF0gPT09IHNlYXJjaEVsZW1lbnQpIHJldHVybiBpbmRleCB8fCAwO1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG4iLCIvLyAyMi4xLjMuMyBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0LCBlbmQgPSB0aGlzLmxlbmd0aClcbid1c2Ugc3RyaWN0JztcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXS5jb3B5V2l0aGluIHx8IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0IC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciB0byA9IHRvQWJzb2x1dGVJbmRleCh0YXJnZXQsIGxlbik7XG4gIHZhciBmcm9tID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBjb3VudCA9IE1hdGgubWluKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbikpIC0gZnJvbSwgbGVuIC0gdG8pO1xuICB2YXIgaW5jID0gMTtcbiAgaWYgKGZyb20gPCB0byAmJiB0byA8IGZyb20gKyBjb3VudCkge1xuICAgIGluYyA9IC0xO1xuICAgIGZyb20gKz0gY291bnQgLSAxO1xuICAgIHRvICs9IGNvdW50IC0gMTtcbiAgfVxuICB3aGlsZSAoY291bnQtLSA+IDApIHtcbiAgICBpZiAoZnJvbSBpbiBPKSBPW3RvXSA9IE9bZnJvbV07XG4gICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgdG8gKz0gaW5jO1xuICAgIGZyb20gKz0gaW5jO1xuICB9IHJldHVybiBPO1xufTtcbiIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5pZiAoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSByZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIvLyAyMi4xLjMuMyBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0LCBlbmQgPSB0aGlzLmxlbmd0aClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7IGNvcHlXaXRoaW46IHJlcXVpcmUoJy4vX2FycmF5LWNvcHktd2l0aGluJykgfSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdjb3B5V2l0aGluJyk7XG4iLCIvLyAyMi4xLjMuNiBBcnJheS5wcm90b3R5cGUuZmlsbCh2YWx1ZSwgc3RhcnQgPSAwLCBlbmQgPSB0aGlzLmxlbmd0aClcbid1c2Ugc3RyaWN0JztcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlsbCh2YWx1ZSAvKiAsIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLykge1xuICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKTtcbiAgdmFyIGVuZCA9IGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkO1xuICB2YXIgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW5ndGgpO1xuICB3aGlsZSAoZW5kUG9zID4gaW5kZXgpIE9baW5kZXgrK10gPSB2YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5JywgeyBmaWxsOiByZXF1aXJlKCcuL19hcnJheS1maWxsJykgfSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdmaWxsJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOCBBcnJheS5wcm90b3R5cGUuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRmaW5kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDUpO1xudmFyIEtFWSA9ICdmaW5kJztcbnZhciBmb3JjZWQgPSB0cnVlO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmIChLRVkgaW4gW10pIEFycmF5KDEpW0tFWV0oZnVuY3Rpb24gKCkgeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kOiBmdW5jdGlvbiBmaW5kKGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjkgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRmaW5kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDYpO1xudmFyIEtFWSA9ICdmaW5kSW5kZXgnO1xudmFyIGZvcmNlZCA9IHRydWU7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEtFWSBpbiBbXSkgQXJyYXkoMSlbS0VZXShmdW5jdGlvbiAoKSB7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwicmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnQXJyYXknKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJyk7XG52YXIgJGZsYWdzID0gcmVxdWlyZSgnLi9fZmxhZ3MnKTtcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBCYXNlID0gJFJlZ0V4cDtcbnZhciBwcm90byA9ICRSZWdFeHAucHJvdG90eXBlO1xudmFyIHJlMSA9IC9hL2c7XG52YXIgcmUyID0gL2EvZztcbi8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnZ3kgaGVyZVxudmFyIENPUlJFQ1RfTkVXID0gbmV3ICRSZWdFeHAocmUxKSAhPT0gcmUxO1xuXG5pZiAocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAoIUNPUlJFQ1RfTkVXIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZTJbcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyldID0gZmFsc2U7XG4gIC8vIFJlZ0V4cCBjb25zdHJ1Y3RvciBjYW4gYWx0ZXIgZmxhZ3MgYW5kIElzUmVnRXhwIHdvcmtzIGNvcnJlY3Qgd2l0aCBAQG1hdGNoXG4gIHJldHVybiAkUmVnRXhwKHJlMSkgIT0gcmUxIHx8ICRSZWdFeHAocmUyKSA9PSByZTIgfHwgJFJlZ0V4cChyZTEsICdpJykgIT0gJy9hL2knO1xufSkpKSB7XG4gICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocCwgZikge1xuICAgIHZhciB0aVJFID0gdGhpcyBpbnN0YW5jZW9mICRSZWdFeHA7XG4gICAgdmFyIHBpUkUgPSBpc1JlZ0V4cChwKTtcbiAgICB2YXIgZmlVID0gZiA9PT0gdW5kZWZpbmVkO1xuICAgIHJldHVybiAhdGlSRSAmJiBwaVJFICYmIHAuY29uc3RydWN0b3IgPT09ICRSZWdFeHAgJiYgZmlVID8gcFxuICAgICAgOiBpbmhlcml0SWZSZXF1aXJlZChDT1JSRUNUX05FV1xuICAgICAgICA/IG5ldyBCYXNlKHBpUkUgJiYgIWZpVSA/IHAuc291cmNlIDogcCwgZilcbiAgICAgICAgOiBCYXNlKChwaVJFID0gcCBpbnN0YW5jZW9mICRSZWdFeHApID8gcC5zb3VyY2UgOiBwLCBwaVJFICYmIGZpVSA/ICRmbGFncy5jYWxsKHApIDogZilcbiAgICAgICwgdGlSRSA/IHRoaXMgOiBwcm90bywgJFJlZ0V4cCk7XG4gIH07XG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBrZXkgaW4gJFJlZ0V4cCB8fCBkUCgkUmVnRXhwLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoaXQpIHsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yICh2YXIga2V5cyA9IGdPUE4oQmFzZSksIGkgPSAwOyBrZXlzLmxlbmd0aCA+IGk7KSBwcm94eShrZXlzW2krK10pO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICRSZWdFeHA7XG4gICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG59XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ1JlZ0V4cCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL19mbGFncycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS8sXG4gICAgICByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMVtMQVNUX0lOREVYXSAhPT0gMCB8fCByZTJbTEFTVF9JTkRFWF0gIT09IDA7XG59KSgpO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRDtcblxuaWYgKFBBVENIKSB7XG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHIpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBsYXN0SW5kZXgsIHJlQ29weSwgbWF0Y2gsIGk7XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyByZS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIHJlZ2V4cEZsYWdzLmNhbGwocmUpKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmVbTEFTVF9JTkRFWF07XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChyZSwgc3RyKTtcblxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlW0xBU1RfSU5ERVhdID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xucmVxdWlyZSgnLi9fZXhwb3J0Jykoe1xuICB0YXJnZXQ6ICdSZWdFeHAnLFxuICBwcm90bzogdHJ1ZSxcbiAgZm9yY2VkOiByZWdleHBFeGVjICE9PSAvLi8uZXhlY1xufSwge1xuICBleGVjOiByZWdleHBFeGVjXG59KTtcbiIsIi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcbmlmIChyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIC8uL2cuZmxhZ3MgIT0gJ2cnKSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mKFJlZ0V4cC5wcm90b3R5cGUsICdmbGFncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IHJlcXVpcmUoJy4vX2ZsYWdzJylcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi9lczYucmVnZXhwLmZsYWdzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciAkZmxhZ3MgPSByZXF1aXJlKCcuL19mbGFncycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyICR0b1N0cmluZyA9IC8uL1tUT19TVFJJTkddO1xuXG52YXIgZGVmaW5lID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmbiwgdHJ1ZSk7XG59O1xuXG4vLyAyMS4yLjUuMTQgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZygpXG5pZiAocmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7IHJldHVybiAkdG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSkpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gICAgcmV0dXJuICcvJy5jb25jYXQoUi5zb3VyY2UsICcvJyxcbiAgICAgICdmbGFncycgaW4gUiA/IFIuZmxhZ3MgOiAhREVTQ1JJUFRPUlMgJiYgUiBpbnN0YW5jZW9mIFJlZ0V4cCA/ICRmbGFncy5jYWxsKFIpIDogdW5kZWZpbmVkKTtcbiAgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxufSBlbHNlIGlmICgkdG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkcpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuIC8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIGJ1aWx0aW5FeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuXG4gLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChjbGFzc29mKFIpICE9PSAnUmVnRXhwJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuICByZXR1cm4gYnVpbHRpbkV4ZWMuY2FsbChSLCBTKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xuXG52YXIgU1BFQ0lFUyA9IHdrcygnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4gIHZhciByZSA9IC8oPzopLztcbiAgdmFyIG9yaWdpbmFsRXhlYyA9IHJlLmV4ZWM7XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBvcmlnaW5hbEV4ZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgdmFyIHJlc3VsdCA9ICdhYicuc3BsaXQocmUpO1xuICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gMiAmJiByZXN1bHRbMF0gPT09ICdhJyAmJiByZXN1bHRbMV0gPT09ICdiJztcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjKSB7XG4gIHZhciBTWU1CT0wgPSB3a3MoS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MID8gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IGV4ZWNDYWxsZWQgPSB0cnVlOyByZXR1cm4gbnVsbDsgfTtcbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgfVxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSkgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgKEtFWSA9PT0gJ3JlcGxhY2UnICYmICFSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUykgfHxcbiAgICAoS0VZID09PSAnc3BsaXQnICYmICFTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMpXG4gICkge1xuICAgIHZhciBuYXRpdmVSZWdFeHBNZXRob2QgPSAvLi9bU1lNQk9MXTtcbiAgICB2YXIgZm5zID0gZXhlYyhcbiAgICAgIGRlZmluZWQsXG4gICAgICBTWU1CT0wsXG4gICAgICAnJ1tLRVldLFxuICAgICAgZnVuY3Rpb24gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgIGlmIChyZWdleHAuZXhlYyA9PT0gcmVnZXhwRXhlYykge1xuICAgICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgICAvLyBwb2x5ZmlsbGVkIGZ1bmN0aW9uKSwgbGVhc2luZyB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICAgIH1cbiAgICApO1xuICAgIHZhciBzdHJmbiA9IGZuc1swXTtcbiAgICB2YXIgcnhmbiA9IGZuc1sxXTtcblxuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24gKHN0cmluZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4vX2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG5cbi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbiAoZGVmaW5lZCwgTUFUQ0gsICRtYXRjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hcbiAgICBmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gZGVmaW5lZCh0aGlzKTtcbiAgICAgIHZhciBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQG1hdGNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZSgkbWF0Y2gsIHJlZ2V4cCwgdGhpcyk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgdmFyIG4gPSAwO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHdoaWxlICgocmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUykpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBtYXRjaFN0ciA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBBW25dID0gbWF0Y2hTdHI7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuID09PSAwID8gbnVsbCA6IEE7XG4gICAgfVxuICBdO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi9fYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJmAnXXxcXGRcXGQ/fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJmAnXXxcXGRcXGQ/KS9nO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24gKGRlZmluZWQsIFJFUExBQ0UsICRyZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VcbiAgICBmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciBPID0gZGVmaW5lZCh0aGlzKTtcbiAgICAgIHZhciBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBmbi5jYWxsKHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoJHJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgaWYgKCFnbG9iYWwpIGJyZWFrO1xuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbWF4KG1pbih0b0ludGVnZXIocmVzdWx0LmluZGV4KSwgUy5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGNhcHR1cmVzID0gW107XG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgIGNhcHR1cmVzID0gcmVzdWx0LnNsaWNlKDEpLm1hcChtYXliZVRvU3RyaW5nKVxuICAgICAgICAvLyBidXQgZm9yIHNvbWUgcmVhc29uIGBuYXRpdmVTbGljZS5jYWxsKHJlc3VsdCwgMSwgcmVzdWx0Lmxlbmd0aClgIChjYWxsZWQgaW5cbiAgICAgICAgLy8gdGhlIHNsaWNlIHBvbHlmaWxsIHdoZW4gc2xpY2luZyBuYXRpdmUgYXJyYXlzKSBcImRvZXNuJ3Qgd29ya1wiIGluIHNhZmFyaSA5IGFuZFxuICAgICAgICAvLyBjYXVzZXMgYSBjcmFzaCAoaHR0cHM6Ly9wYXN0ZWJpbi5jb20vTjIxUXplUUEpIHdoZW4gdHJ5aW5nIHRvIGRlYnVnIGl0LlxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykgY2FwdHVyZXMucHVzaChtYXliZVRvU3RyaW5nKHJlc3VsdFtqXSkpO1xuICAgICAgICB2YXIgbmFtZWRDYXB0dXJlcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgIGlmIChmdW5jdGlvbmFsUmVwbGFjZSkge1xuICAgICAgICAgIHZhciByZXBsYWNlckFyZ3MgPSBbbWF0Y2hlZF0uY29uY2F0KGNhcHR1cmVzLCBwb3NpdGlvbiwgUyk7XG4gICAgICAgICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkgcmVwbGFjZXJBcmdzLnB1c2gobmFtZWRDYXB0dXJlcyk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gU3RyaW5nKHJlcGxhY2VWYWx1ZS5hcHBseSh1bmRlZmluZWQsIHJlcGxhY2VyQXJncykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGxhY2VtZW50ID0gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIFMsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24gPj0gbmV4dFNvdXJjZVBvc2l0aW9uKSB7XG4gICAgICAgICAgYWNjdW11bGF0ZWRSZXN1bHQgKz0gUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24sIHBvc2l0aW9uKSArIHJlcGxhY2VtZW50O1xuICAgICAgICAgIG5leHRTb3VyY2VQb3NpdGlvbiA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1bXVsYXRlZFJlc3VsdCArIFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uKTtcbiAgICB9XG4gIF07XG5cbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRzdWJzdGl0dXRpb25cbiAgZnVuY3Rpb24gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIHN0ciwgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlbWVudCkge1xuICAgIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgICB2YXIgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEO1xuICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICAgIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MUztcbiAgICB9XG4gICAgcmV0dXJuICRyZXBsYWNlLmNhbGwocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICAgIHZhciBjYXB0dXJlO1xuICAgICAgc3dpdGNoIChjaC5jaGFyQXQoMCkpIHtcbiAgICAgICAgY2FzZSAnJCc6IHJldHVybiAnJCc7XG4gICAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgICAgY2FzZSAnYCc6IHJldHVybiBzdHIuc2xpY2UoMCwgcG9zaXRpb24pO1xuICAgICAgICBjYXNlIFwiJ1wiOiByZXR1cm4gc3RyLnNsaWNlKHRhaWxQb3MpO1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICBjYXB0dXJlID0gbmFtZWRDYXB0dXJlc1tjaC5zbGljZSgxLCAtMSldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgICAgdmFyIG4gPSArY2g7XG4gICAgICAgICAgaWYgKG4gPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICAgIHZhciBmID0gZmxvb3IobiAvIDEwKTtcbiAgICAgICAgICAgIGlmIChmID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICAgIH0pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgc2FtZVZhbHVlID0gcmVxdWlyZSgnLi9fc2FtZS12YWx1ZScpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG4vLyBAQHNlYXJjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdzZWFyY2gnLCAxLCBmdW5jdGlvbiAoZGVmaW5lZCwgU0VBUkNILCAkc2VhcmNoLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zZWFyY2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuc2VhcmNoXG4gICAgZnVuY3Rpb24gc2VhcmNoKHJlZ2V4cCkge1xuICAgICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgICAgdmFyIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtTRUFSQ0hdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbU0VBUkNIXShTdHJpbmcoTykpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAc2VhcmNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZSgkc2VhcmNoLCByZWdleHAsIHRoaXMpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIHByZXZpb3VzTGFzdEluZGV4ID0gcngubGFzdEluZGV4O1xuICAgICAgaWYgKCFzYW1lVmFsdWUocHJldmlvdXNMYXN0SW5kZXgsIDApKSByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHJlc3VsdCA9IHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgaWYgKCFzYW1lVmFsdWUocngubGFzdEluZGV4LCBwcmV2aW91c0xhc3RJbmRleCkpIHJ4Lmxhc3RJbmRleCA9IHByZXZpb3VzTGFzdEluZGV4O1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbCA/IC0xIDogcmVzdWx0LmluZGV4O1xuICAgIH1cbiAgXTtcbn0pO1xuIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuL19hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY2FsbFJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciAkbWluID0gTWF0aC5taW47XG52YXIgJHB1c2ggPSBbXS5wdXNoO1xudmFyICRTUExJVCA9ICdzcGxpdCc7XG52YXIgTEVOR1RIID0gJ2xlbmd0aCc7XG52YXIgTEFTVF9JTkRFWCA9ICdsYXN0SW5kZXgnO1xudmFyIE1BWF9VSU5UMzIgPSAweGZmZmZmZmZmO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ3gnLCAneScpIC0+IC94L3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyIFNVUFBPUlRTX1kgPSAhZmFpbHMoZnVuY3Rpb24gKCkgeyBSZWdFeHAoTUFYX1VJTlQzMiwgJ3knKTsgfSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnc3BsaXQnLCAyLCBmdW5jdGlvbiAoZGVmaW5lZCwgU1BMSVQsICRzcGxpdCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHZhciBpbnRlcm5hbFNwbGl0O1xuICBpZiAoXG4gICAgJ2FiYmMnWyRTUExJVF0oLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAndGVzdCdbJFNQTElUXSgvKD86KS8sIC0xKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnYWInWyRTUExJVF0oLyg/OmFiKSovKVtMRU5HVEhdICE9IDIgfHxcbiAgICAnLidbJFNQTElUXSgvKC4/KSguPykvKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnLidbJFNQTElUXSgvKCkoKS8pW0xFTkdUSF0gPiAxIHx8XG4gICAgJydbJFNQTElUXSgvLj8vKVtMRU5HVEhdXG4gICkge1xuICAgIC8vIGJhc2VkIG9uIGVzNS1zaGltIGltcGxlbWVudGF0aW9uLCBuZWVkIHRvIHJld29yayBpdFxuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIGlmIChzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBuYXRpdmUgc3BsaXRcbiAgICAgIGlmICghaXNSZWdFeHAoc2VwYXJhdG9yKSkgcmV0dXJuICRzcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHNwbGl0TGltaXQgPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHlbTEFTVF9JTkRFWF07XG4gICAgICAgIGlmIChsYXN0SW5kZXggPiBsYXN0TGFzdEluZGV4KSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgaWYgKG1hdGNoW0xFTkdUSF0gPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nW0xFTkdUSF0pICRwdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXVtMRU5HVEhdO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYgKG91dHB1dFtMRU5HVEhdID49IHNwbGl0TGltaXQpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdID09PSBtYXRjaC5pbmRleCkgc2VwYXJhdG9yQ29weVtMQVNUX0lOREVYXSsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyaW5nW0xFTkdUSF0pIHtcbiAgICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvckNvcHkudGVzdCgnJykpIG91dHB1dC5wdXNoKCcnKTtcbiAgICAgIH0gZWxzZSBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgICAgcmV0dXJuIG91dHB1dFtMRU5HVEhdID4gc3BsaXRMaW1pdCA/IG91dHB1dC5zbGljZSgwLCBzcGxpdExpbWl0KSA6IG91dHB1dDtcbiAgICB9O1xuICAvLyBDaGFrcmEsIFY4XG4gIH0gZWxzZSBpZiAoJzAnWyRTUExJVF0odW5kZWZpbmVkLCAwKVtMRU5HVEhdKSB7XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICByZXR1cm4gc2VwYXJhdG9yID09PSB1bmRlZmluZWQgJiYgbGltaXQgPT09IDAgPyBbXSA6ICRzcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgaW50ZXJuYWxTcGxpdCA9ICRzcGxpdDtcbiAgfVxuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuc3BsaXRcbiAgICBmdW5jdGlvbiBzcGxpdChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgTyA9IGRlZmluZWQodGhpcyk7XG4gICAgICB2YXIgc3BsaXR0ZXIgPSBzZXBhcmF0b3IgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VwYXJhdG9yW1NQTElUXTtcbiAgICAgIHJldHVybiBzcGxpdHRlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gc3BsaXR0ZXIuY2FsbChzZXBhcmF0b3IsIE8sIGxpbWl0KVxuICAgICAgICA6IGludGVybmFsU3BsaXQuY2FsbChTdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBzcGxpdFxuICAgIC8vXG4gICAgLy8gTk9URTogVGhpcyBjYW5ub3QgYmUgcHJvcGVybHkgcG9seWZpbGxlZCBpbiBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydFxuICAgIC8vIHRoZSAneScgZmxhZy5cbiAgICBmdW5jdGlvbiAocmVnZXhwLCBsaW1pdCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShpbnRlcm5hbFNwbGl0LCByZWdleHAsIHRoaXMsIGxpbWl0LCBpbnRlcm5hbFNwbGl0ICE9PSAkc3BsaXQpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3RvcihyeCwgUmVnRXhwKTtcblxuICAgICAgdmFyIHVuaWNvZGVNYXRjaGluZyA9IHJ4LnVuaWNvZGU7XG4gICAgICB2YXIgZmxhZ3MgPSAocnguaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChTVVBQT1JUU19ZID8gJ3knIDogJ2cnKTtcblxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIFMgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBDKFNVUFBPUlRTX1kgPyByeCA6ICdeKD86JyArIHJ4LnNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoUy5sZW5ndGggPT09IDApIHJldHVybiBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgUykgPT09IG51bGwgPyBbU10gOiBbXTtcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIHZhciBxID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB3aGlsZSAocSA8IFMubGVuZ3RoKSB7XG4gICAgICAgIHNwbGl0dGVyLmxhc3RJbmRleCA9IFNVUFBPUlRTX1kgPyBxIDogMDtcbiAgICAgICAgdmFyIHogPSBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgU1VQUE9SVFNfWSA/IFMgOiBTLnNsaWNlKHEpKTtcbiAgICAgICAgdmFyIGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB6ID09PSBudWxsIHx8XG4gICAgICAgICAgKGUgPSAkbWluKHRvTGVuZ3RoKHNwbGl0dGVyLmxhc3RJbmRleCArIChTVVBQT1JUU19ZID8gMCA6IHEpKSwgUy5sZW5ndGgpKSA9PT0gcFxuICAgICAgICApIHtcbiAgICAgICAgICBxID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHEsIHVuaWNvZGVNYXRjaGluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQS5wdXNoKFMuc2xpY2UocCwgcSkpO1xuICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB6Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgQS5wdXNoKHpbaV0pO1xuICAgICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIH1cbiAgICAgICAgICBxID0gcCA9IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEEucHVzaChTLnNsaWNlKHApKTtcbiAgICAgIHJldHVybiBBO1xuICAgIH1cbiAgXTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUWVBFKSB7XG4gIGlmICghaXNPYmplY3QoaXQpIHx8IGl0Ll90ICE9PSBUWVBFKSB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyICRpdGVyRGVmaW5lID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIGZhc3RLZXkgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBTSVpFID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbiAodGhhdCwga2V5KSB7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSk7XG4gIHZhciBlbnRyeTtcbiAgaWYgKGluZGV4ICE9PSAnRicpIHJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvciAoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKSB7XG4gICAgaWYgKGVudHJ5LmsgPT0ga2V5KSByZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24gKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpIHtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24gKHRoYXQsIGl0ZXJhYmxlKSB7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5fdCA9IE5BTUU7ICAgICAgICAgLy8gY29sbGVjdGlvbiB0eXBlXG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMS4zLjEgTWFwLnByb3RvdHlwZS5jbGVhcigpXG4gICAgICAvLyAyMy4yLjMuMiBTZXQucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgZm9yICh2YXIgdGhhdCA9IHZhbGlkYXRlKHRoaXMsIE5BTUUpLCBkYXRhID0gdGhhdC5faSwgZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKSB7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYgKGVudHJ5LnApIGVudHJ5LnAgPSBlbnRyeS5wLm4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZW50cnkuaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5fZiA9IHRoYXQuX2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoYXRbU0laRV0gPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjIuMy40IFNldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB2YWxpZGF0ZSh0aGlzLCBOQU1FKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uO1xuICAgICAgICAgIHZhciBwcmV2ID0gZW50cnkucDtcbiAgICAgICAgICBkZWxldGUgdGhhdC5faVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAocHJldikgcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZiAobmV4dCkgbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZiAodGhhdC5fZiA9PSBlbnRyeSkgdGhhdC5fZiA9IG5leHQ7XG4gICAgICAgICAgaWYgKHRoYXQuX2wgPT0gZW50cnkpIHRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLCBOQU1FKTtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpO1xuICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgIHdoaWxlIChlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2YpIHtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlIChlbnRyeSAmJiBlbnRyeS5yKSBlbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh2YWxpZGF0ZSh0aGlzLCBOQU1FKSwga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUodGhpcywgTkFNRSlbU0laRV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24gKHRoYXQsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgIHZhciBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmICghdGhhdC5fZikgdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYgKHByZXYpIHByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZiAoaW5kZXggIT09ICdGJykgdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24gKEMsIE5BTUUsIElTX01BUCkge1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgICAgIHRoaXMuX3QgPSB2YWxpZGF0ZShpdGVyYXRlZCwgTkFNRSk7IC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgICAgICAgICAgICAgICAgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIga2luZCA9IHRoYXQuX2s7XG4gICAgICB2YXIgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucikgZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmICghdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKSB7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgJGl0ZXJEZXRlY3QgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspIHtcbiAgdmFyIEJhc2UgPSBnbG9iYWxbTkFNRV07XG4gIHZhciBDID0gQmFzZTtcbiAgdmFyIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJztcbiAgdmFyIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZTtcbiAgdmFyIE8gPSB7fTtcbiAgdmFyIGZpeE1ldGhvZCA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgICB2YXIgZm4gPSBwcm90b1tLRVldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBLRVksXG4gICAgICBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2hhcycgPyBmdW5jdGlvbiBoYXMoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyB1bmRlZmluZWQgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdhZGQnID8gZnVuY3Rpb24gYWRkKGEpIHsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyByZXR1cm4gdGhpczsgfVxuICAgICAgICA6IGZ1bmN0aW9uIHNldChhLCBiKSB7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTsgcmV0dXJuIHRoaXM7IH1cbiAgICApO1xuICB9O1xuICBpZiAodHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKSB7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgICBtZXRhLk5FRUQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDKCk7XG4gICAgLy8gZWFybHkgaW1wbGVtZW50YXRpb25zIG5vdCBzdXBwb3J0cyBjaGFpbmluZ1xuICAgIHZhciBIQVNOVF9DSEFJTklORyA9IGluc3RhbmNlW0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSkgIT0gaW5zdGFuY2U7XG4gICAgLy8gVjggfiAgQ2hyb21pdW0gNDAtIHdlYWstY29sbGVjdGlvbnMgdGhyb3dzIG9uIHByaW1pdGl2ZXMsIGJ1dCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgdmFyIFRIUk9XU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBpbnN0YW5jZS5oYXMoMSk7IH0pO1xuICAgIC8vIG1vc3QgZWFybHkgaW1wbGVtZW50YXRpb25zIGRvZXNuJ3Qgc3VwcG9ydHMgaXRlcmFibGVzLCBtb3N0IG1vZGVybiAtIG5vdCBjbG9zZSBpdCBjb3JyZWN0bHlcbiAgICB2YXIgQUNDRVBUX0lURVJBQkxFUyA9ICRpdGVyRGV0ZWN0KGZ1bmN0aW9uIChpdGVyKSB7IG5ldyBDKGl0ZXIpOyB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAvLyBmb3IgZWFybHkgaW1wbGVtZW50YXRpb25zIC0wIGFuZCArMCBub3QgdGhlIHNhbWVcbiAgICB2YXIgQlVHR1lfWkVSTyA9ICFJU19XRUFLICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFY4IH4gQ2hyb21pdW0gNDItIGZhaWxzIG9ubHkgd2l0aCA1KyBlbGVtZW50c1xuICAgICAgdmFyICRpbnN0YW5jZSA9IG5ldyBDKCk7XG4gICAgICB2YXIgaW5kZXggPSA1O1xuICAgICAgd2hpbGUgKGluZGV4LS0pICRpbnN0YW5jZVtBRERFUl0oaW5kZXgsIGluZGV4KTtcbiAgICAgIHJldHVybiAhJGluc3RhbmNlLmhhcygtMCk7XG4gICAgfSk7XG4gICAgaWYgKCFBQ0NFUFRfSVRFUkFCTEVTKSB7XG4gICAgICBDID0gd3JhcHBlcihmdW5jdGlvbiAodGFyZ2V0LCBpdGVyYWJsZSkge1xuICAgICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UoKSwgdGFyZ2V0LCBDKTtcbiAgICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQy5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgaWYgKFRIUk9XU19PTl9QUklNSVRJVkVTIHx8IEJVR0dZX1pFUk8pIHtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIGlmIChCVUdHWV9aRVJPIHx8IEhBU05UX0NIQUlOSU5HKSBmaXhNZXRob2QoQURERVIpO1xuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYgKElTX1dFQUsgJiYgcHJvdG8uY2xlYXIpIGRlbGV0ZSBwcm90by5jbGVhcjtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqIChDICE9IEJhc2UpLCBPKTtcblxuICBpZiAoIUlTX1dFQUspIGNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBNQVAgPSAnTWFwJztcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoTUFQLCBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKSB7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh2YWxpZGF0ZSh0aGlzLCBNQVApLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodmFsaWRhdGUodGhpcywgTUFQKSwga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgU0VUID0gJ1NldCc7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKFNFVCwgZnVuY3Rpb24gKGdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodmFsaWRhdGUodGhpcywgU0VUKSwgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgZ2V0V2VhayA9IHJlcXVpcmUoJy4vX21ldGEnKS5nZXRXZWFrO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIGNyZWF0ZUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpO1xudmFyICRoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBhcnJheUZpbmQgPSBjcmVhdGVBcnJheU1ldGhvZCg1KTtcbnZhciBhcnJheUZpbmRJbmRleCA9IGNyZWF0ZUFycmF5TWV0aG9kKDYpO1xudmFyIGlkID0gMDtcblxuLy8gZmFsbGJhY2sgZm9yIHVuY2F1Z2h0IGZyb3plbiBrZXlzXG52YXIgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IFVuY2F1Z2h0RnJvemVuU3RvcmUoKSk7XG59O1xudmFyIFVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYSA9IFtdO1xufTtcbnZhciBmaW5kVW5jYXVnaHRGcm96ZW4gPSBmdW5jdGlvbiAoc3RvcmUsIGtleSkge1xuICByZXR1cm4gYXJyYXlGaW5kKHN0b3JlLmEsIGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICB9KTtcbn07XG5VbmNhdWdodEZyb3plblN0b3JlLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYgKGVudHJ5KSByZXR1cm4gZW50cnlbMV07XG4gIH0sXG4gIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhIWZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYgKGVudHJ5KSBlbnRyeVsxXSA9IHZhbHVlO1xuICAgIGVsc2UgdGhpcy5hLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSxcbiAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheUZpbmRJbmRleCh0aGlzLmEsIGZ1bmN0aW9uIChpdCkge1xuICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgfSk7XG4gICAgaWYgKH5pbmRleCkgdGhpcy5hLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuICEhfmluZGV4O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX3QgPSBOQU1FOyAgICAgIC8vIGNvbGxlY3Rpb24gdHlwZVxuICAgICAgdGhhdC5faSA9IGlkKys7ICAgICAgLy8gY29sbGVjdGlvbiBpZFxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgLy8gbGVhayBzdG9yZSBmb3IgdW5jYXVnaHQgZnJvemVuIG9iamVjdHNcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHZhbGlkYXRlKHRoaXMsIE5BTUUpKVsnZGVsZXRlJ10oa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKSAmJiBkZWxldGUgZGF0YVt0aGlzLl9pXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHZhbGlkYXRlKHRoaXMsIE5BTUUpKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbiAodGhhdCwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBkYXRhID0gZ2V0V2Vhayhhbk9iamVjdChrZXkpLCB0cnVlKTtcbiAgICBpZiAoZGF0YSA9PT0gdHJ1ZSkgdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGF0KS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgZWxzZSBkYXRhW3RoYXQuX2ldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIHVmc3RvcmU6IHVuY2F1Z2h0RnJvemVuU3RvcmVcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyk7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIElTX0lFMTEgPSAhZ2xvYmFsLkFjdGl2ZVhPYmplY3QgJiYgJ0FjdGl2ZVhPYmplY3QnIGluIGdsb2JhbDtcbnZhciBXRUFLX01BUCA9ICdXZWFrTWFwJztcbnZhciBnZXRXZWFrID0gbWV0YS5nZXRXZWFrO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG52YXIgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IHdlYWsudWZzdG9yZTtcbnZhciBJbnRlcm5hbE1hcDtcblxudmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrTWFwKCkge1xuICAgIHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICB9O1xufTtcblxudmFyIG1ldGhvZHMgPSB7XG4gIC8vIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIGlmIChpc09iamVjdChrZXkpKSB7XG4gICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgIGlmIChkYXRhID09PSB0cnVlKSByZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh2YWxpZGF0ZSh0aGlzLCBXRUFLX01BUCkpLmdldChrZXkpO1xuICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhW3RoaXMuX2ldIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgLy8gMjMuMy4zLjUgV2Vha01hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gd2Vhay5kZWYodmFsaWRhdGUodGhpcywgV0VBS19NQVApLCBrZXksIHZhbHVlKTtcbiAgfVxufTtcblxuLy8gMjMuMyBXZWFrTWFwIE9iamVjdHNcbnZhciAkV2Vha01hcCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKFdFQUtfTUFQLCB3cmFwcGVyLCBtZXRob2RzLCB3ZWFrLCB0cnVlLCB0cnVlKTtcblxuLy8gSUUxMSBXZWFrTWFwIGZyb3plbiBrZXlzIGZpeFxuaWYgKE5BVElWRV9XRUFLX01BUCAmJiBJU19JRTExKSB7XG4gIEludGVybmFsTWFwID0gd2Vhay5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBXRUFLX01BUCk7XG4gIGFzc2lnbihJbnRlcm5hbE1hcC5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICBtZXRhLk5FRUQgPSB0cnVlO1xuICBlYWNoKFsnZGVsZXRlJywgJ2hhcycsICdnZXQnLCAnc2V0J10sIGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcHJvdG8gPSAkV2Vha01hcC5wcm90b3R5cGU7XG4gICAgdmFyIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVkZWZpbmUocHJvdG8sIGtleSwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGludGVybmFsIHdlYWttYXAgc2hpbVxuICAgICAgaWYgKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mKSB0aGlzLl9mID0gbmV3IEludGVybmFsTWFwKCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9mW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpO1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIFdFQUtfU0VUID0gJ1dlYWtTZXQnO1xuXG4vLyAyMy40IFdlYWtTZXQgT2JqZWN0c1xucmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKFdFQUtfU0VULCBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrU2V0KCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuNC4zLjEgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgIHJldHVybiB3ZWFrLmRlZih2YWxpZGF0ZSh0aGlzLCBXRUFLX1NFVCksIHZhbHVlLCB0cnVlKTtcbiAgfVxufSwgd2VhaywgZmFsc2UsIHRydWUpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgVFlQRUQgPSB1aWQoJ3R5cGVkX2FycmF5Jyk7XG52YXIgVklFVyA9IHVpZCgndmlldycpO1xudmFyIEFCViA9ICEhKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBnbG9iYWwuRGF0YVZpZXcpO1xudmFyIENPTlNUUiA9IEFCVjtcbnZhciBpID0gMDtcbnZhciBsID0gOTtcbnZhciBUeXBlZDtcblxudmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPSAoXG4gICdJbnQ4QXJyYXksVWludDhBcnJheSxVaW50OENsYW1wZWRBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSdcbikuc3BsaXQoJywnKTtcblxud2hpbGUgKGkgPCBsKSB7XG4gIGlmIChUeXBlZCA9IGdsb2JhbFtUeXBlZEFycmF5Q29uc3RydWN0b3JzW2krK11dKSB7XG4gICAgaGlkZShUeXBlZC5wcm90b3R5cGUsIFRZUEVELCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkLnByb3RvdHlwZSwgVklFVywgdHJ1ZSk7XG4gIH0gZWxzZSBDT05TVFIgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFCVjogQUJWLFxuICBDT05TVFI6IENPTlNUUixcbiAgVFlQRUQ6IFRZUEVELFxuICBWSUVXOiBWSUVXXG59O1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9pbmRleFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xuICB2YXIgbnVtYmVyID0gdG9JbnRlZ2VyKGl0KTtcbiAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKG51bWJlcik7XG4gIGlmIChudW1iZXIgIT09IGxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcignV3JvbmcgbGVuZ3RoIScpO1xuICByZXR1cm4gbGVuZ3RoO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkdHlwZWQgPSByZXF1aXJlKCcuL190eXBlZCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgYXJyYXlGaWxsID0gcmVxdWlyZSgnLi9fYXJyYXktZmlsbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBBUlJBWV9CVUZGRVIgPSAnQXJyYXlCdWZmZXInO1xudmFyIERBVEFfVklFVyA9ICdEYXRhVmlldyc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgV1JPTkdfTEVOR1RIID0gJ1dyb25nIGxlbmd0aCEnO1xudmFyIFdST05HX0lOREVYID0gJ1dyb25nIGluZGV4ISc7XG52YXIgJEFycmF5QnVmZmVyID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl07XG52YXIgJERhdGFWaWV3ID0gZ2xvYmFsW0RBVEFfVklFV107XG52YXIgTWF0aCA9IGdsb2JhbC5NYXRoO1xudmFyIFJhbmdlRXJyb3IgPSBnbG9iYWwuUmFuZ2VFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3ctcmVzdHJpY3RlZC1uYW1lc1xudmFyIEluZmluaXR5ID0gZ2xvYmFsLkluZmluaXR5O1xudmFyIEJhc2VCdWZmZXIgPSAkQXJyYXlCdWZmZXI7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgcG93ID0gTWF0aC5wb3c7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGxvZyA9IE1hdGgubG9nO1xudmFyIExOMiA9IE1hdGguTE4yO1xudmFyIEJVRkZFUiA9ICdidWZmZXInO1xudmFyIEJZVEVfTEVOR1RIID0gJ2J5dGVMZW5ndGgnO1xudmFyIEJZVEVfT0ZGU0VUID0gJ2J5dGVPZmZzZXQnO1xudmFyICRCVUZGRVIgPSBERVNDUklQVE9SUyA/ICdfYicgOiBCVUZGRVI7XG52YXIgJExFTkdUSCA9IERFU0NSSVBUT1JTID8gJ19sJyA6IEJZVEVfTEVOR1RIO1xudmFyICRPRkZTRVQgPSBERVNDUklQVE9SUyA/ICdfbycgOiBCWVRFX09GRlNFVDtcblxuLy8gSUVFRTc1NCBjb252ZXJzaW9ucyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2llZWU3NTRcbmZ1bmN0aW9uIHBhY2tJRUVFNzU0KHZhbHVlLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShuQnl0ZXMpO1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDE7XG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMTtcbiAgdmFyIHJ0ID0gbUxlbiA9PT0gMjMgPyBwb3coMiwgLTI0KSAtIHBvdygyLCAtNzcpIDogMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDA7XG4gIHZhciBlLCBtLCBjO1xuICB2YWx1ZSA9IGFicyh2YWx1ZSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgaWYgKHZhbHVlICE9IHZhbHVlIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBtID0gdmFsdWUgIT0gdmFsdWUgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gZmxvb3IobG9nKHZhbHVlKSAvIExOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBwb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogcG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIHBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIHBvdygyLCBlQmlhcyAtIDEpICogcG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltpKytdID0gbSAmIDI1NSwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW2krK10gPSBlICYgMjU1LCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcbiAgYnVmZmVyWy0taV0gfD0gcyAqIDEyODtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmZ1bmN0aW9uIHVucGFja0lFRUU3NTQoYnVmZmVyLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBuQml0cyA9IGVMZW4gLSA3O1xuICB2YXIgaSA9IG5CeXRlcyAtIDE7XG4gIHZhciBzID0gYnVmZmVyW2ktLV07XG4gIHZhciBlID0gcyAmIDEyNztcbiAgdmFyIG07XG4gIHMgPj49IDc7XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW2ldLCBpLS0sIG5CaXRzIC09IDgpO1xuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW2ldLCBpLS0sIG5CaXRzIC09IDgpO1xuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogcyA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgcG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH0gcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBwb3coMiwgZSAtIG1MZW4pO1xufVxuXG5mdW5jdGlvbiB1bnBhY2tJMzIoYnl0ZXMpIHtcbiAgcmV0dXJuIGJ5dGVzWzNdIDw8IDI0IHwgYnl0ZXNbMl0gPDwgMTYgfCBieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF07XG59XG5mdW5jdGlvbiBwYWNrSTgoaXQpIHtcbiAgcmV0dXJuIFtpdCAmIDB4ZmZdO1xufVxuZnVuY3Rpb24gcGFja0kxNihpdCkge1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmZdO1xufVxuZnVuY3Rpb24gcGFja0kzMihpdCkge1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmYsIGl0ID4+IDE2ICYgMHhmZiwgaXQgPj4gMjQgJiAweGZmXTtcbn1cbmZ1bmN0aW9uIHBhY2tGNjQoaXQpIHtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KGl0LCA1MiwgOCk7XG59XG5mdW5jdGlvbiBwYWNrRjMyKGl0KSB7XG4gIHJldHVybiBwYWNrSUVFRTc1NChpdCwgMjMsIDQpO1xufVxuXG5mdW5jdGlvbiBhZGRHZXR0ZXIoQywga2V5LCBpbnRlcm5hbCkge1xuICBkUChDW1BST1RPVFlQRV0sIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXNbaW50ZXJuYWxdOyB9IH0pO1xufVxuXG5mdW5jdGlvbiBnZXQodmlldywgYnl0ZXMsIGluZGV4LCBpc0xpdHRsZUVuZGlhbikge1xuICB2YXIgbnVtSW5kZXggPSAraW5kZXg7XG4gIHZhciBpbnRJbmRleCA9IHRvSW5kZXgobnVtSW5kZXgpO1xuICBpZiAoaW50SW5kZXggKyBieXRlcyA+IHZpZXdbJExFTkdUSF0pIHRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgc3RvcmUgPSB2aWV3WyRCVUZGRVJdLl9iO1xuICB2YXIgc3RhcnQgPSBpbnRJbmRleCArIHZpZXdbJE9GRlNFVF07XG4gIHZhciBwYWNrID0gc3RvcmUuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgYnl0ZXMpO1xuICByZXR1cm4gaXNMaXR0bGVFbmRpYW4gPyBwYWNrIDogcGFjay5yZXZlcnNlKCk7XG59XG5mdW5jdGlvbiBzZXQodmlldywgYnl0ZXMsIGluZGV4LCBjb252ZXJzaW9uLCB2YWx1ZSwgaXNMaXR0bGVFbmRpYW4pIHtcbiAgdmFyIG51bUluZGV4ID0gK2luZGV4O1xuICB2YXIgaW50SW5kZXggPSB0b0luZGV4KG51bUluZGV4KTtcbiAgaWYgKGludEluZGV4ICsgYnl0ZXMgPiB2aWV3WyRMRU5HVEhdKSB0aHJvdyBSYW5nZUVycm9yKFdST05HX0lOREVYKTtcbiAgdmFyIHN0b3JlID0gdmlld1skQlVGRkVSXS5fYjtcbiAgdmFyIHN0YXJ0ID0gaW50SW5kZXggKyB2aWV3WyRPRkZTRVRdO1xuICB2YXIgcGFjayA9IGNvbnZlcnNpb24oK3ZhbHVlKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlczsgaSsrKSBzdG9yZVtzdGFydCArIGldID0gcGFja1tpc0xpdHRsZUVuZGlhbiA/IGkgOiBieXRlcyAtIGkgLSAxXTtcbn1cblxuaWYgKCEkdHlwZWQuQUJWKSB7XG4gICRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIEFycmF5QnVmZmVyKGxlbmd0aCkge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuICAgIHZhciBieXRlTGVuZ3RoID0gdG9JbmRleChsZW5ndGgpO1xuICAgIHRoaXMuX2IgPSBhcnJheUZpbGwuY2FsbChuZXcgQXJyYXkoYnl0ZUxlbmd0aCksIDApO1xuICAgIHRoaXNbJExFTkdUSF0gPSBieXRlTGVuZ3RoO1xuICB9O1xuXG4gICREYXRhVmlldyA9IGZ1bmN0aW9uIERhdGFWaWV3KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuICAgIGFuSW5zdGFuY2UoYnVmZmVyLCAkQXJyYXlCdWZmZXIsIERBVEFfVklFVyk7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJ1ZmZlclskTEVOR1RIXTtcbiAgICB2YXIgb2Zmc2V0ID0gdG9JbnRlZ2VyKGJ5dGVPZmZzZXQpO1xuICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCA+IGJ1ZmZlckxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0IScpO1xuICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID09PSB1bmRlZmluZWQgPyBidWZmZXJMZW5ndGggLSBvZmZzZXQgOiB0b0xlbmd0aChieXRlTGVuZ3RoKTtcbiAgICBpZiAob2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlckxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHRoaXNbJEJVRkZFUl0gPSBidWZmZXI7XG4gICAgdGhpc1skT0ZGU0VUXSA9IG9mZnNldDtcbiAgICB0aGlzWyRMRU5HVEhdID0gYnl0ZUxlbmd0aDtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICBhZGRHZXR0ZXIoJEFycmF5QnVmZmVyLCBCWVRFX0xFTkdUSCwgJ19sJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQlVGRkVSLCAnX2InKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCWVRFX0xFTkdUSCwgJ19sJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQllURV9PRkZTRVQsICdfbycpO1xuICB9XG5cbiAgcmVkZWZpbmVBbGwoJERhdGFWaWV3W1BST1RPVFlQRV0sIHtcbiAgICBnZXRJbnQ4OiBmdW5jdGlvbiBnZXRJbnQ4KGJ5dGVPZmZzZXQpIHtcbiAgICAgIHJldHVybiBnZXQodGhpcywgMSwgYnl0ZU9mZnNldClbMF0gPDwgMjQgPj4gMjQ7XG4gICAgfSxcbiAgICBnZXRVaW50ODogZnVuY3Rpb24gZ2V0VWludDgoYnl0ZU9mZnNldCkge1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXTtcbiAgICB9LFxuICAgIGdldEludDE2OiBmdW5jdGlvbiBnZXRJbnQxNihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIHJldHVybiAoYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdKSA8PCAxNiA+PiAxNjtcbiAgICB9LFxuICAgIGdldFVpbnQxNjogZnVuY3Rpb24gZ2V0VWludDE2KGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHZhciBieXRlcyA9IGdldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pO1xuICAgICAgcmV0dXJuIGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXTtcbiAgICB9LFxuICAgIGdldEludDMyOiBmdW5jdGlvbiBnZXRJbnQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSTMyKGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pKTtcbiAgICB9LFxuICAgIGdldFVpbnQzMjogZnVuY3Rpb24gZ2V0VWludDMyKGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHJldHVybiB1bnBhY2tJMzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSkpID4+PiAwO1xuICAgIH0sXG4gICAgZ2V0RmxvYXQzMjogZnVuY3Rpb24gZ2V0RmxvYXQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSUVFRTc1NChnZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSwgMjMsIDQpO1xuICAgIH0sXG4gICAgZ2V0RmxvYXQ2NDogZnVuY3Rpb24gZ2V0RmxvYXQ2NChieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSUVFRTc1NChnZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSwgNTIsIDgpO1xuICAgIH0sXG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJOCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0VWludDg6IGZ1bmN0aW9uIHNldFVpbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKSB7XG4gICAgICBzZXQodGhpcywgMSwgYnl0ZU9mZnNldCwgcGFja0k4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRJbnQxNjogZnVuY3Rpb24gc2V0SW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSTE2LCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldFVpbnQxNjogZnVuY3Rpb24gc2V0VWludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0kxNiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRJbnQzMjogZnVuY3Rpb24gc2V0SW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSTMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldFVpbnQzMjogZnVuY3Rpb24gc2V0VWludDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0kzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRGbG9hdDMyOiBmdW5jdGlvbiBzZXRGbG9hdDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0YzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRGbG9hdDY0OiBmdW5jdGlvbiBzZXRGbG9hdDY0KGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgcGFja0Y2NCwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGlmICghZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgICRBcnJheUJ1ZmZlcigxKTtcbiAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgJEFycmF5QnVmZmVyKC0xKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyAkQXJyYXlCdWZmZXIoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBuZXcgJEFycmF5QnVmZmVyKDEuNSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbmV3ICRBcnJheUJ1ZmZlcihOYU4pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIHJldHVybiAkQXJyYXlCdWZmZXIubmFtZSAhPSBBUlJBWV9CVUZGRVI7XG4gIH0pKSB7XG4gICAgJEFycmF5QnVmZmVyID0gZnVuY3Rpb24gQXJyYXlCdWZmZXIobGVuZ3RoKSB7XG4gICAgICBhbkluc3RhbmNlKHRoaXMsICRBcnJheUJ1ZmZlcik7XG4gICAgICByZXR1cm4gbmV3IEJhc2VCdWZmZXIodG9JbmRleChsZW5ndGgpKTtcbiAgICB9O1xuICAgIHZhciBBcnJheUJ1ZmZlclByb3RvID0gJEFycmF5QnVmZmVyW1BST1RPVFlQRV0gPSBCYXNlQnVmZmVyW1BST1RPVFlQRV07XG4gICAgZm9yICh2YXIga2V5cyA9IGdPUE4oQmFzZUJ1ZmZlciksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajspIHtcbiAgICAgIGlmICghKChrZXkgPSBrZXlzW2orK10pIGluICRBcnJheUJ1ZmZlcikpIGhpZGUoJEFycmF5QnVmZmVyLCBrZXksIEJhc2VCdWZmZXJba2V5XSk7XG4gICAgfVxuICAgIGlmICghTElCUkFSWSkgQXJyYXlCdWZmZXJQcm90by5jb25zdHJ1Y3RvciA9ICRBcnJheUJ1ZmZlcjtcbiAgfVxuICAvLyBpT1MgU2FmYXJpIDcueCBidWdcbiAgdmFyIHZpZXcgPSBuZXcgJERhdGFWaWV3KG5ldyAkQXJyYXlCdWZmZXIoMikpO1xuICB2YXIgJHNldEludDggPSAkRGF0YVZpZXdbUFJPVE9UWVBFXS5zZXRJbnQ4O1xuICB2aWV3LnNldEludDgoMCwgMjE0NzQ4MzY0OCk7XG4gIHZpZXcuc2V0SW50OCgxLCAyMTQ3NDgzNjQ5KTtcbiAgaWYgKHZpZXcuZ2V0SW50OCgwKSB8fCAhdmlldy5nZXRJbnQ4KDEpKSByZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIHNldEludDg6IGZ1bmN0aW9uIHNldEludDgoYnl0ZU9mZnNldCwgdmFsdWUpIHtcbiAgICAgICRzZXRJbnQ4LmNhbGwodGhpcywgYnl0ZU9mZnNldCwgdmFsdWUgPDwgMjQgPj4gMjQpO1xuICAgIH0sXG4gICAgc2V0VWludDg6IGZ1bmN0aW9uIHNldFVpbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKSB7XG4gICAgICAkc2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9XG4gIH0sIHRydWUpO1xufVxuc2V0VG9TdHJpbmdUYWcoJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuc2V0VG9TdHJpbmdUYWcoJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuaGlkZSgkRGF0YVZpZXdbUFJPVE9UWVBFXSwgJHR5cGVkLlZJRVcsIHRydWUpO1xuZXhwb3J0c1tBUlJBWV9CVUZGRVJdID0gJEFycmF5QnVmZmVyO1xuZXhwb3J0c1tEQVRBX1ZJRVddID0gJERhdGFWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdHlwZWQgPSByZXF1aXJlKCcuL190eXBlZCcpO1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5BcnJheUJ1ZmZlcjtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgJEFycmF5QnVmZmVyID0gYnVmZmVyLkFycmF5QnVmZmVyO1xudmFyICREYXRhVmlldyA9IGJ1ZmZlci5EYXRhVmlldztcbnZhciAkaXNWaWV3ID0gJHR5cGVkLkFCViAmJiBBcnJheUJ1ZmZlci5pc1ZpZXc7XG52YXIgJHNsaWNlID0gJEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZTtcbnZhciBWSUVXID0gJHR5cGVkLlZJRVc7XG52YXIgQVJSQVlfQlVGRkVSID0gJ0FycmF5QnVmZmVyJztcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQXJyYXlCdWZmZXIgIT09ICRBcnJheUJ1ZmZlciksIHsgQXJyYXlCdWZmZXI6ICRBcnJheUJ1ZmZlciB9KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhJHR5cGVkLkNPTlNUUiwgQVJSQVlfQlVGRkVSLCB7XG4gIC8vIDI0LjEuMy4xIEFycmF5QnVmZmVyLmlzVmlldyhhcmcpXG4gIGlzVmlldzogZnVuY3Rpb24gaXNWaWV3KGl0KSB7XG4gICAgcmV0dXJuICRpc1ZpZXcgJiYgJGlzVmlldyhpdCkgfHwgaXNPYmplY3QoaXQpICYmIFZJRVcgaW4gaXQ7XG4gIH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuVSArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIW5ldyAkQXJyYXlCdWZmZXIoMikuc2xpY2UoMSwgdW5kZWZpbmVkKS5ieXRlTGVuZ3RoO1xufSksIEFSUkFZX0JVRkZFUiwge1xuICAvLyAyNC4xLjQuMyBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2Uoc3RhcnQsIGVuZClcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoJHNsaWNlICE9PSB1bmRlZmluZWQgJiYgZW5kID09PSB1bmRlZmluZWQpIHJldHVybiAkc2xpY2UuY2FsbChhbk9iamVjdCh0aGlzKSwgc3RhcnQpOyAvLyBGRiBmaXhcbiAgICB2YXIgbGVuID0gYW5PYmplY3QodGhpcykuYnl0ZUxlbmd0aDtcbiAgICB2YXIgZmlyc3QgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbik7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZCwgbGVuKTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IChzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJEFycmF5QnVmZmVyKSkodG9MZW5ndGgoZmluIC0gZmlyc3QpKTtcbiAgICB2YXIgdmlld1MgPSBuZXcgJERhdGFWaWV3KHRoaXMpO1xuICAgIHZhciB2aWV3VCA9IG5ldyAkRGF0YVZpZXcocmVzdWx0KTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlIChmaXJzdCA8IGZpbikge1xuICAgICAgdmlld1Quc2V0VWludDgoaW5kZXgrKywgdmlld1MuZ2V0VWludDgoZmlyc3QrKykpO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoQVJSQVlfQlVGRkVSKTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL190eXBlZCcpLkFCViwge1xuICBEYXRhVmlldzogcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJykuRGF0YVZpZXdcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuaWYgKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykpIHtcbiAgdmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG4gIHZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbiAgdmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbiAgdmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiAgdmFyICR0eXBlZCA9IHJlcXVpcmUoJy4vX3R5cGVkJyk7XG4gIHZhciAkYnVmZmVyID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJyk7XG4gIHZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbiAgdmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xuICB2YXIgcHJvcGVydHlEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuICB2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiAgdmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG4gIHZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG4gIHZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuICB2YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG4gIHZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xuICB2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbiAgdmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xuICB2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbiAgdmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4gIHZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xuICB2YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG4gIHZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG4gIHZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbiAgdmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG4gIHZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuICB2YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG4gIHZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbiAgdmFyIGNyZWF0ZUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpO1xuICB2YXIgY3JlYXRlQXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJyk7XG4gIHZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG4gIHZhciBBcnJheUl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG4gIHZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbiAgdmFyICRpdGVyRGV0ZWN0ID0gcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKTtcbiAgdmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpO1xuICB2YXIgYXJyYXlGaWxsID0gcmVxdWlyZSgnLi9fYXJyYXktZmlsbCcpO1xuICB2YXIgYXJyYXlDb3B5V2l0aGluID0gcmVxdWlyZSgnLi9fYXJyYXktY29weS13aXRoaW4nKTtcbiAgdmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xuICB2YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xuICB2YXIgZFAgPSAkRFAuZjtcbiAgdmFyIGdPUEQgPSAkR09QRC5mO1xuICB2YXIgUmFuZ2VFcnJvciA9IGdsb2JhbC5SYW5nZUVycm9yO1xuICB2YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbiAgdmFyIFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheTtcbiAgdmFyIEFSUkFZX0JVRkZFUiA9ICdBcnJheUJ1ZmZlcic7XG4gIHZhciBTSEFSRURfQlVGRkVSID0gJ1NoYXJlZCcgKyBBUlJBWV9CVUZGRVI7XG4gIHZhciBCWVRFU19QRVJfRUxFTUVOVCA9ICdCWVRFU19QRVJfRUxFTUVOVCc7XG4gIHZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheVtQUk9UT1RZUEVdO1xuICB2YXIgJEFycmF5QnVmZmVyID0gJGJ1ZmZlci5BcnJheUJ1ZmZlcjtcbiAgdmFyICREYXRhVmlldyA9ICRidWZmZXIuRGF0YVZpZXc7XG4gIHZhciBhcnJheUZvckVhY2ggPSBjcmVhdGVBcnJheU1ldGhvZCgwKTtcbiAgdmFyIGFycmF5RmlsdGVyID0gY3JlYXRlQXJyYXlNZXRob2QoMik7XG4gIHZhciBhcnJheVNvbWUgPSBjcmVhdGVBcnJheU1ldGhvZCgzKTtcbiAgdmFyIGFycmF5RXZlcnkgPSBjcmVhdGVBcnJheU1ldGhvZCg0KTtcbiAgdmFyIGFycmF5RmluZCA9IGNyZWF0ZUFycmF5TWV0aG9kKDUpO1xuICB2YXIgYXJyYXlGaW5kSW5kZXggPSBjcmVhdGVBcnJheU1ldGhvZCg2KTtcbiAgdmFyIGFycmF5SW5jbHVkZXMgPSBjcmVhdGVBcnJheUluY2x1ZGVzKHRydWUpO1xuICB2YXIgYXJyYXlJbmRleE9mID0gY3JlYXRlQXJyYXlJbmNsdWRlcyhmYWxzZSk7XG4gIHZhciBhcnJheVZhbHVlcyA9IEFycmF5SXRlcmF0b3JzLnZhbHVlcztcbiAgdmFyIGFycmF5S2V5cyA9IEFycmF5SXRlcmF0b3JzLmtleXM7XG4gIHZhciBhcnJheUVudHJpZXMgPSBBcnJheUl0ZXJhdG9ycy5lbnRyaWVzO1xuICB2YXIgYXJyYXlMYXN0SW5kZXhPZiA9IEFycmF5UHJvdG8ubGFzdEluZGV4T2Y7XG4gIHZhciBhcnJheVJlZHVjZSA9IEFycmF5UHJvdG8ucmVkdWNlO1xuICB2YXIgYXJyYXlSZWR1Y2VSaWdodCA9IEFycmF5UHJvdG8ucmVkdWNlUmlnaHQ7XG4gIHZhciBhcnJheUpvaW4gPSBBcnJheVByb3RvLmpvaW47XG4gIHZhciBhcnJheVNvcnQgPSBBcnJheVByb3RvLnNvcnQ7XG4gIHZhciBhcnJheVNsaWNlID0gQXJyYXlQcm90by5zbGljZTtcbiAgdmFyIGFycmF5VG9TdHJpbmcgPSBBcnJheVByb3RvLnRvU3RyaW5nO1xuICB2YXIgYXJyYXlUb0xvY2FsZVN0cmluZyA9IEFycmF5UHJvdG8udG9Mb2NhbGVTdHJpbmc7XG4gIHZhciBJVEVSQVRPUiA9IHdrcygnaXRlcmF0b3InKTtcbiAgdmFyIFRBRyA9IHdrcygndG9TdHJpbmdUYWcnKTtcbiAgdmFyIFRZUEVEX0NPTlNUUlVDVE9SID0gdWlkKCd0eXBlZF9jb25zdHJ1Y3RvcicpO1xuICB2YXIgREVGX0NPTlNUUlVDVE9SID0gdWlkKCdkZWZfY29uc3RydWN0b3InKTtcbiAgdmFyIEFMTF9DT05TVFJVQ1RPUlMgPSAkdHlwZWQuQ09OU1RSO1xuICB2YXIgVFlQRURfQVJSQVkgPSAkdHlwZWQuVFlQRUQ7XG4gIHZhciBWSUVXID0gJHR5cGVkLlZJRVc7XG4gIHZhciBXUk9OR19MRU5HVEggPSAnV3JvbmcgbGVuZ3RoISc7XG5cbiAgdmFyICRtYXAgPSBjcmVhdGVBcnJheU1ldGhvZCgxLCBmdW5jdGlvbiAoTywgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGFsbG9jYXRlKHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pLCBsZW5ndGgpO1xuICB9KTtcblxuICB2YXIgTElUVExFX0VORElBTiA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXSA9PT0gMTtcbiAgfSk7XG5cbiAgdmFyIEZPUkNFRF9TRVQgPSAhIVVpbnQ4QXJyYXkgJiYgISFVaW50OEFycmF5W1BST1RPVFlQRV0uc2V0ICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgVWludDhBcnJheSgxKS5zZXQoe30pO1xuICB9KTtcblxuICB2YXIgdG9PZmZzZXQgPSBmdW5jdGlvbiAoaXQsIEJZVEVTKSB7XG4gICAgdmFyIG9mZnNldCA9IHRvSW50ZWdlcihpdCk7XG4gICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICUgQllURVMpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCEnKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9O1xuXG4gIHZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIGlmIChpc09iamVjdChpdCkgJiYgVFlQRURfQVJSQVkgaW4gaXQpIHJldHVybiBpdDtcbiAgICB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIHR5cGVkIGFycmF5IScpO1xuICB9O1xuXG4gIHZhciBhbGxvY2F0ZSA9IGZ1bmN0aW9uIChDLCBsZW5ndGgpIHtcbiAgICBpZiAoIShpc09iamVjdChDKSAmJiBUWVBFRF9DT05TVFJVQ1RPUiBpbiBDKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJdCBpcyBub3QgYSB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciEnKTtcbiAgICB9IHJldHVybiBuZXcgQyhsZW5ndGgpO1xuICB9O1xuXG4gIHZhciBzcGVjaWVzRnJvbUxpc3QgPSBmdW5jdGlvbiAoTywgbGlzdCkge1xuICAgIHJldHVybiBmcm9tTGlzdChzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSwgbGlzdCk7XG4gIH07XG5cbiAgdmFyIGZyb21MaXN0ID0gZnVuY3Rpb24gKEMsIGxpc3QpIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICB2YXIgcmVzdWx0ID0gYWxsb2NhdGUoQywgbGVuZ3RoKTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHJlc3VsdFtpbmRleF0gPSBsaXN0W2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uIChpdCwga2V5LCBpbnRlcm5hbCkge1xuICAgIGRQKGl0LCBrZXksIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kW2ludGVybmFsXTsgfSB9KTtcbiAgfTtcblxuICB2YXIgJGZyb20gPSBmdW5jdGlvbiBmcm9tKHNvdXJjZSAvKiAsIG1hcGZuLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChzb3VyY2UpO1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgaSwgbGVuZ3RoLCB2YWx1ZXMsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIWlzQXJyYXlJdGVyKGl0ZXJGbikpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgdmFsdWVzID0gW10sIGkgPSAwOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGkrKykge1xuICAgICAgICB2YWx1ZXMucHVzaChzdGVwLnZhbHVlKTtcbiAgICAgIH0gTyA9IHZhbHVlcztcbiAgICB9XG4gICAgaWYgKG1hcHBpbmcgJiYgYUxlbiA+IDIpIG1hcGZuID0gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKSwgcmVzdWx0ID0gYWxsb2NhdGUodGhpcywgbGVuZ3RoKTsgbGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSBtYXBwaW5nID8gbWFwZm4oT1tpXSwgaSkgOiBPW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciAkb2YgPSBmdW5jdGlvbiBvZigvKiAuLi5pdGVtcyAqLykge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9IGFsbG9jYXRlKHRoaXMsIGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSByZXN1bHRbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gaU9TIFNhZmFyaSA2LnggZmFpbHMgaGVyZVxuICB2YXIgVE9fTE9DQUxFX0JVRyA9ICEhVWludDhBcnJheSAmJiBmYWlscyhmdW5jdGlvbiAoKSB7IGFycmF5VG9Mb2NhbGVTdHJpbmcuY2FsbChuZXcgVWludDhBcnJheSgxKSk7IH0pO1xuXG4gIHZhciAkdG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZygpIHtcbiAgICByZXR1cm4gYXJyYXlUb0xvY2FsZVN0cmluZy5hcHBseShUT19MT0NBTEVfQlVHID8gYXJyYXlTbGljZS5jYWxsKHZhbGlkYXRlKHRoaXMpKSA6IHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHZhciBwcm90byA9IHtcbiAgICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldCwgc3RhcnQgLyogLCBlbmQgKi8pIHtcbiAgICAgIHJldHVybiBhcnJheUNvcHlXaXRoaW4uY2FsbCh2YWxpZGF0ZSh0aGlzKSwgdGFyZ2V0LCBzdGFydCwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgICByZXR1cm4gYXJyYXlFdmVyeSh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZmlsbDogZnVuY3Rpb24gZmlsbCh2YWx1ZSAvKiAsIHN0YXJ0LCBlbmQgKi8pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5RmlsbC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgICByZXR1cm4gc3BlY2llc0Zyb21MaXN0KHRoaXMsIGFycmF5RmlsdGVyKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLFxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24gZmluZChwcmVkaWNhdGUgLyogLCB0aGlzQXJnICovKSB7XG4gICAgICByZXR1cm4gYXJyYXlGaW5kKHZhbGlkYXRlKHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICAgIHJldHVybiBhcnJheUZpbmRJbmRleCh2YWxpZGF0ZSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgICBhcnJheUZvckVhY2godmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCAqLykge1xuICAgICAgcmV0dXJuIGFycmF5SW5kZXhPZih2YWxpZGF0ZSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggKi8pIHtcbiAgICAgIHJldHVybiBhcnJheUluY2x1ZGVzKHZhbGlkYXRlKHRoaXMpLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlKb2luLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggKi8pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5TGFzdEluZGV4T2YuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIG1hcChtYXBmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICAgIHJldHVybiAkbWFwKHZhbGlkYXRlKHRoaXMpLCBtYXBmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlSZWR1Y2UuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICByZWR1Y2VSaWdodDogZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlSZWR1Y2VSaWdodC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgbGVuZ3RoID0gdmFsaWRhdGUodGhhdCkubGVuZ3RoO1xuICAgICAgdmFyIG1pZGRsZSA9IE1hdGguZmxvb3IobGVuZ3RoIC8gMik7XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgd2hpbGUgKGluZGV4IDwgbWlkZGxlKSB7XG4gICAgICAgIHZhbHVlID0gdGhhdFtpbmRleF07XG4gICAgICAgIHRoYXRbaW5kZXgrK10gPSB0aGF0Wy0tbGVuZ3RoXTtcbiAgICAgICAgdGhhdFtsZW5ndGhdID0gdmFsdWU7XG4gICAgICB9IHJldHVybiB0aGF0O1xuICAgIH0sXG4gICAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgICAgcmV0dXJuIGFycmF5U29tZSh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJlZm4pIHtcbiAgICAgIHJldHVybiBhcnJheVNvcnQuY2FsbCh2YWxpZGF0ZSh0aGlzKSwgY29tcGFyZWZuKTtcbiAgICB9LFxuICAgIHN1YmFycmF5OiBmdW5jdGlvbiBzdWJhcnJheShiZWdpbiwgZW5kKSB7XG4gICAgICB2YXIgTyA9IHZhbGlkYXRlKHRoaXMpO1xuICAgICAgdmFyIGxlbmd0aCA9IE8ubGVuZ3RoO1xuICAgICAgdmFyICRiZWdpbiA9IHRvQWJzb2x1dGVJbmRleChiZWdpbiwgbGVuZ3RoKTtcbiAgICAgIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pKShcbiAgICAgICAgTy5idWZmZXIsXG4gICAgICAgIE8uYnl0ZU9mZnNldCArICRiZWdpbiAqIE8uQllURVNfUEVSX0VMRU1FTlQsXG4gICAgICAgIHRvTGVuZ3RoKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbmd0aCkpIC0gJGJlZ2luKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyICRzbGljZSA9IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gc3BlY2llc0Zyb21MaXN0KHRoaXMsIGFycmF5U2xpY2UuY2FsbCh2YWxpZGF0ZSh0aGlzKSwgc3RhcnQsIGVuZCkpO1xuICB9O1xuXG4gIHZhciAkc2V0ID0gZnVuY3Rpb24gc2V0KGFycmF5TGlrZSAvKiAsIG9mZnNldCAqLykge1xuICAgIHZhbGlkYXRlKHRoaXMpO1xuICAgIHZhciBvZmZzZXQgPSB0b09mZnNldChhcmd1bWVudHNbMV0sIDEpO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICB2YXIgc3JjID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgoc3JjLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBpZiAobGVuICsgb2Zmc2V0ID4gbGVuZ3RoKSB0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgd2hpbGUgKGluZGV4IDwgbGVuKSB0aGlzW29mZnNldCArIGluZGV4XSA9IHNyY1tpbmRleCsrXTtcbiAgfTtcblxuICB2YXIgJGl0ZXJhdG9ycyA9IHtcbiAgICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgICAgcmV0dXJuIGFycmF5RW50cmllcy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgICByZXR1cm4gYXJyYXlLZXlzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgICByZXR1cm4gYXJyYXlWYWx1ZXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBpc1RBSW5kZXggPSBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHtcbiAgICByZXR1cm4gaXNPYmplY3QodGFyZ2V0KVxuICAgICAgJiYgdGFyZ2V0W1RZUEVEX0FSUkFZXVxuICAgICAgJiYgdHlwZW9mIGtleSAhPSAnc3ltYm9sJ1xuICAgICAgJiYga2V5IGluIHRhcmdldFxuICAgICAgJiYgU3RyaW5nKCtrZXkpID09IFN0cmluZyhrZXkpO1xuICB9O1xuICB2YXIgJGdldERlc2MgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcbiAgICByZXR1cm4gaXNUQUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAgID8gcHJvcGVydHlEZXNjKDIsIHRhcmdldFtrZXldKVxuICAgICAgOiBnT1BEKHRhcmdldCwga2V5KTtcbiAgfTtcbiAgdmFyICRzZXREZXNjID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICBpZiAoaXNUQUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAgICYmIGlzT2JqZWN0KGRlc2MpXG4gICAgICAmJiBoYXMoZGVzYywgJ3ZhbHVlJylcbiAgICAgICYmICFoYXMoZGVzYywgJ2dldCcpXG4gICAgICAmJiAhaGFzKGRlc2MsICdzZXQnKVxuICAgICAgLy8gVE9ETzogYWRkIHZhbGlkYXRpb24gZGVzY3JpcHRvciB3L28gY2FsbGluZyBhY2Nlc3NvcnNcbiAgICAgICYmICFkZXNjLmNvbmZpZ3VyYWJsZVxuICAgICAgJiYgKCFoYXMoZGVzYywgJ3dyaXRhYmxlJykgfHwgZGVzYy53cml0YWJsZSlcbiAgICAgICYmICghaGFzKGRlc2MsICdlbnVtZXJhYmxlJykgfHwgZGVzYy5lbnVtZXJhYmxlKVxuICAgICkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBkZXNjLnZhbHVlO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IHJldHVybiBkUCh0YXJnZXQsIGtleSwgZGVzYyk7XG4gIH07XG5cbiAgaWYgKCFBTExfQ09OU1RSVUNUT1JTKSB7XG4gICAgJEdPUEQuZiA9ICRnZXREZXNjO1xuICAgICREUC5mID0gJHNldERlc2M7XG4gIH1cblxuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFBTExfQ09OU1RSVUNUT1JTLCAnT2JqZWN0Jywge1xuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldERlc2MsXG4gICAgZGVmaW5lUHJvcGVydHk6ICRzZXREZXNjXG4gIH0pO1xuXG4gIGlmIChmYWlscyhmdW5jdGlvbiAoKSB7IGFycmF5VG9TdHJpbmcuY2FsbCh7fSk7IH0pKSB7XG4gICAgYXJyYXlUb1N0cmluZyA9IGFycmF5VG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBhcnJheUpvaW4uY2FsbCh0aGlzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyICRUeXBlZEFycmF5UHJvdG90eXBlJCA9IHJlZGVmaW5lQWxsKHt9LCBwcm90byk7XG4gIHJlZGVmaW5lQWxsKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJGl0ZXJhdG9ycyk7XG4gIGhpZGUoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCBJVEVSQVRPUiwgJGl0ZXJhdG9ycy52YWx1ZXMpO1xuICByZWRlZmluZUFsbCgkVHlwZWRBcnJheVByb3RvdHlwZSQsIHtcbiAgICBzbGljZTogJHNsaWNlLFxuICAgIHNldDogJHNldCxcbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkgeyAvKiBub29wICovIH0sXG4gICAgdG9TdHJpbmc6IGFycmF5VG9TdHJpbmcsXG4gICAgdG9Mb2NhbGVTdHJpbmc6ICR0b0xvY2FsZVN0cmluZ1xuICB9KTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J1ZmZlcicsICdiJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdieXRlT2Zmc2V0JywgJ28nKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J5dGVMZW5ndGgnLCAnbCcpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnbGVuZ3RoJywgJ2UnKTtcbiAgZFAoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCBUQUcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXNbVFlQRURfQVJSQVldOyB9XG4gIH0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50c1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIEJZVEVTLCB3cmFwcGVyLCBDTEFNUEVEKSB7XG4gICAgQ0xBTVBFRCA9ICEhQ0xBTVBFRDtcbiAgICB2YXIgTkFNRSA9IEtFWSArIChDTEFNUEVEID8gJ0NsYW1wZWQnIDogJycpICsgJ0FycmF5JztcbiAgICB2YXIgR0VUVEVSID0gJ2dldCcgKyBLRVk7XG4gICAgdmFyIFNFVFRFUiA9ICdzZXQnICsgS0VZO1xuICAgIHZhciBUeXBlZEFycmF5ID0gZ2xvYmFsW05BTUVdO1xuICAgIHZhciBCYXNlID0gVHlwZWRBcnJheSB8fCB7fTtcbiAgICB2YXIgVEFDID0gVHlwZWRBcnJheSAmJiBnZXRQcm90b3R5cGVPZihUeXBlZEFycmF5KTtcbiAgICB2YXIgRk9SQ0VEID0gIVR5cGVkQXJyYXkgfHwgISR0eXBlZC5BQlY7XG4gICAgdmFyIE8gPSB7fTtcbiAgICB2YXIgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXkgJiYgVHlwZWRBcnJheVtQUk9UT1RZUEVdO1xuICAgIHZhciBnZXR0ZXIgPSBmdW5jdGlvbiAodGhhdCwgaW5kZXgpIHtcbiAgICAgIHZhciBkYXRhID0gdGhhdC5fZDtcbiAgICAgIHJldHVybiBkYXRhLnZbR0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCBMSVRUTEVfRU5ESUFOKTtcbiAgICB9O1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodGhhdCwgaW5kZXgsIHZhbHVlKSB7XG4gICAgICB2YXIgZGF0YSA9IHRoYXQuX2Q7XG4gICAgICBpZiAoQ0xBTVBFRCkgdmFsdWUgPSAodmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKSkgPCAwID8gMCA6IHZhbHVlID4gMHhmZiA/IDB4ZmYgOiB2YWx1ZSAmIDB4ZmY7XG4gICAgICBkYXRhLnZbU0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCB2YWx1ZSwgTElUVExFX0VORElBTik7XG4gICAgfTtcbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uICh0aGF0LCBpbmRleCkge1xuICAgICAgZFAodGhhdCwgaW5kZXgsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldHRlcih0aGlzLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcih0aGlzLCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIHtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBkYXRhLCAkb2Zmc2V0LCAkbGVuZ3RoKSB7XG4gICAgICAgIGFuSW5zdGFuY2UodGhhdCwgVHlwZWRBcnJheSwgTkFNRSwgJ19kJyk7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICB2YXIgYnVmZmVyLCBieXRlTGVuZ3RoLCBsZW5ndGgsIGtsYXNzO1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgbGVuZ3RoID0gdG9JbmRleChkYXRhKTtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gbGVuZ3RoICogQllURVM7XG4gICAgICAgICAgYnVmZmVyID0gbmV3ICRBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgJEFycmF5QnVmZmVyIHx8IChrbGFzcyA9IGNsYXNzb2YoZGF0YSkpID09IEFSUkFZX0JVRkZFUiB8fCBrbGFzcyA9PSBTSEFSRURfQlVGRkVSKSB7XG4gICAgICAgICAgYnVmZmVyID0gZGF0YTtcbiAgICAgICAgICBvZmZzZXQgPSB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUyk7XG4gICAgICAgICAgdmFyICRsZW4gPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgaWYgKCRsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCRsZW4gJSBCWVRFUykgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9ICRsZW4gLSBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8IDApIHRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9IHRvTGVuZ3RoKCRsZW5ndGgpICogQllURVM7XG4gICAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCArIG9mZnNldCA+ICRsZW4pIHRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVuZ3RoID0gYnl0ZUxlbmd0aCAvIEJZVEVTO1xuICAgICAgICB9IGVsc2UgaWYgKFRZUEVEX0FSUkFZIGluIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRmcm9tLmNhbGwoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaGlkZSh0aGF0LCAnX2QnLCB7XG4gICAgICAgICAgYjogYnVmZmVyLFxuICAgICAgICAgIG86IG9mZnNldCxcbiAgICAgICAgICBsOiBieXRlTGVuZ3RoLFxuICAgICAgICAgIGU6IGxlbmd0aCxcbiAgICAgICAgICB2OiBuZXcgJERhdGFWaWV3KGJ1ZmZlcilcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkgYWRkRWxlbWVudCh0aGF0LCBpbmRleCsrKTtcbiAgICAgIH0pO1xuICAgICAgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXlbUFJPVE9UWVBFXSA9IGNyZWF0ZSgkVHlwZWRBcnJheVByb3RvdHlwZSQpO1xuICAgICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBUeXBlZEFycmF5KTtcbiAgICB9IGVsc2UgaWYgKCFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgICBUeXBlZEFycmF5KDEpO1xuICAgIH0pIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgICBuZXcgVHlwZWRBcnJheSgtMSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfSkgfHwgISRpdGVyRGV0ZWN0KGZ1bmN0aW9uIChpdGVyKSB7XG4gICAgICBuZXcgVHlwZWRBcnJheSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgbmV3IFR5cGVkQXJyYXkobnVsbCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgICBuZXcgVHlwZWRBcnJheSgxLjUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgbmV3IFR5cGVkQXJyYXkoaXRlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfSwgdHJ1ZSkpIHtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBkYXRhLCAkb2Zmc2V0LCAkbGVuZ3RoKSB7XG4gICAgICAgIGFuSW5zdGFuY2UodGhhdCwgVHlwZWRBcnJheSwgTkFNRSk7XG4gICAgICAgIHZhciBrbGFzcztcbiAgICAgICAgLy8gYHdzYCBtb2R1bGUgYnVnLCB0ZW1wb3JhcmlseSByZW1vdmUgdmFsaWRhdGlvbiBsZW5ndGggZm9yIFVpbnQ4QXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvcHVsbC82NDVcbiAgICAgICAgaWYgKCFpc09iamVjdChkYXRhKSkgcmV0dXJuIG5ldyBCYXNlKHRvSW5kZXgoZGF0YSkpO1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mICRBcnJheUJ1ZmZlciB8fCAoa2xhc3MgPSBjbGFzc29mKGRhdGEpKSA9PSBBUlJBWV9CVUZGRVIgfHwga2xhc3MgPT0gU0hBUkVEX0JVRkZFUikge1xuICAgICAgICAgIHJldHVybiAkbGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gbmV3IEJhc2UoZGF0YSwgdG9PZmZzZXQoJG9mZnNldCwgQllURVMpLCAkbGVuZ3RoKVxuICAgICAgICAgICAgOiAkb2Zmc2V0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBuZXcgQmFzZShkYXRhLCB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUykpXG4gICAgICAgICAgICAgIDogbmV3IEJhc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFRZUEVEX0FSUkFZIGluIGRhdGEpIHJldHVybiBmcm9tTGlzdChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgICAgcmV0dXJuICRmcm9tLmNhbGwoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIGFycmF5Rm9yRWFjaChUQUMgIT09IEZ1bmN0aW9uLnByb3RvdHlwZSA/IGdPUE4oQmFzZSkuY29uY2F0KGdPUE4oVEFDKSkgOiBnT1BOKEJhc2UpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBUeXBlZEFycmF5KSkgaGlkZShUeXBlZEFycmF5LCBrZXksIEJhc2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICAgIFR5cGVkQXJyYXlbUFJPVE9UWVBFXSA9IFR5cGVkQXJyYXlQcm90b3R5cGU7XG4gICAgICBpZiAoIUxJQlJBUlkpIFR5cGVkQXJyYXlQcm90b3R5cGUuY29uc3RydWN0b3IgPSBUeXBlZEFycmF5O1xuICAgIH1cbiAgICB2YXIgJG5hdGl2ZUl0ZXJhdG9yID0gVHlwZWRBcnJheVByb3RvdHlwZVtJVEVSQVRPUl07XG4gICAgdmFyIENPUlJFQ1RfSVRFUl9OQU1FID0gISEkbmF0aXZlSXRlcmF0b3JcbiAgICAgICYmICgkbmF0aXZlSXRlcmF0b3IubmFtZSA9PSAndmFsdWVzJyB8fCAkbmF0aXZlSXRlcmF0b3IubmFtZSA9PSB1bmRlZmluZWQpO1xuICAgIHZhciAkaXRlcmF0b3IgPSAkaXRlcmF0b3JzLnZhbHVlcztcbiAgICBoaWRlKFR5cGVkQXJyYXksIFRZUEVEX0NPTlNUUlVDVE9SLCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRZUEVEX0FSUkFZLCBOQU1FKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFZJRVcsIHRydWUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgREVGX0NPTlNUUlVDVE9SLCBUeXBlZEFycmF5KTtcblxuICAgIGlmIChDTEFNUEVEID8gbmV3IFR5cGVkQXJyYXkoMSlbVEFHXSAhPSBOQU1FIDogIShUQUcgaW4gVHlwZWRBcnJheVByb3RvdHlwZSkpIHtcbiAgICAgIGRQKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRBRywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE5BTUU7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIE9bTkFNRV0gPSBUeXBlZEFycmF5O1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoVHlwZWRBcnJheSAhPSBCYXNlKSwgTyk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUywgTkFNRSwge1xuICAgICAgQllURVNfUEVSX0VMRU1FTlQ6IEJZVEVTXG4gICAgfSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgQmFzZS5vZi5jYWxsKFR5cGVkQXJyYXksIDEpOyB9KSwgTkFNRSwge1xuICAgICAgZnJvbTogJGZyb20sXG4gICAgICBvZjogJG9mXG4gICAgfSk7XG5cbiAgICBpZiAoIShCWVRFU19QRVJfRUxFTUVOVCBpbiBUeXBlZEFycmF5UHJvdG90eXBlKSkgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBCWVRFU19QRVJfRUxFTUVOVCwgQllURVMpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAsIE5BTUUsIHByb3RvKTtcblxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFRF9TRVQsIE5BTUUsIHsgc2V0OiAkc2V0IH0pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhQ09SUkVDVF9JVEVSX05BTUUsIE5BTUUsICRpdGVyYXRvcnMpO1xuXG4gICAgaWYgKCFMSUJSQVJZICYmIFR5cGVkQXJyYXlQcm90b3R5cGUudG9TdHJpbmcgIT0gYXJyYXlUb1N0cmluZykgVHlwZWRBcnJheVByb3RvdHlwZS50b1N0cmluZyA9IGFycmF5VG9TdHJpbmc7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIG5ldyBUeXBlZEFycmF5KDEpLnNsaWNlKCk7XG4gICAgfSksIE5BTUUsIHsgc2xpY2U6ICRzbGljZSB9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbMSwgMl0udG9Mb2NhbGVTdHJpbmcoKSAhPSBuZXcgVHlwZWRBcnJheShbMSwgMl0pLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIFR5cGVkQXJyYXlQcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcuY2FsbChbMSwgMl0pO1xuICAgIH0pKSwgTkFNRSwgeyB0b0xvY2FsZVN0cmluZzogJHRvTG9jYWxlU3RyaW5nIH0pO1xuXG4gICAgSXRlcmF0b3JzW05BTUVdID0gQ09SUkVDVF9JVEVSX05BTUUgPyAkbmF0aXZlSXRlcmF0b3IgOiAkaXRlcmF0b3I7XG4gICAgaWYgKCFMSUJSQVJZICYmICFDT1JSRUNUX0lURVJfTkFNRSkgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBJVEVSQVRPUiwgJGl0ZXJhdG9yKTtcbiAgfTtcbn0gZWxzZSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDgnLCAxLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gSW50OEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTtcbiIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQ4JywgMSwgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gVWludDhDbGFtcGVkQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0sIHRydWUpO1xuIiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnSW50MTYnLCAyLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gSW50MTZBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7XG4iLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MTYnLCAyLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gVWludDE2QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnSW50MzInLCA0LCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gSW50MzJBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7XG4iLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MzInLCA0LCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gVWludDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQzMicsIDQsIGZ1bmN0aW9uIChpbml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBGbG9hdDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQ2NCcsIDgsIGZ1bmN0aW9uIChpbml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBGbG9hdDY0QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwiLy8gMjYuMS4xIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHJBcHBseSA9IChyZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0IHx8IHt9KS5hcHBseTtcbnZhciBmQXBwbHkgPSBGdW5jdGlvbi5hcHBseTtcbi8vIE1TIEVkZ2UgYXJndW1lbnRzTGlzdCBhcmd1bWVudCBpcyBvcHRpb25hbFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJBcHBseShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSksICdSZWZsZWN0Jywge1xuICBhcHBseTogZnVuY3Rpb24gYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpIHtcbiAgICB2YXIgVCA9IGFGdW5jdGlvbih0YXJnZXQpO1xuICAgIHZhciBMID0gYW5PYmplY3QoYXJndW1lbnRzTGlzdCk7XG4gICAgcmV0dXJuIHJBcHBseSA/IHJBcHBseShULCB0aGlzQXJndW1lbnQsIEwpIDogZkFwcGx5LmNhbGwoVCwgdGhpc0FyZ3VtZW50LCBMKTtcbiAgfVxufSk7XG4iLCIvLyAyNi4xLjIgUmVmbGVjdC5jb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IFssIG5ld1RhcmdldF0pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9fYmluZCcpO1xudmFyIHJDb25zdHJ1Y3QgPSAocmVxdWlyZSgnLi9fZ2xvYmFsJykuUmVmbGVjdCB8fCB7fSkuY29uc3RydWN0O1xuXG4vLyBNUyBFZGdlIHN1cHBvcnRzIG9ubHkgMiBhcmd1bWVudHMgYW5kIGFyZ3VtZW50c0xpc3QgYXJndW1lbnQgaXMgb3B0aW9uYWxcbi8vIEZGIE5pZ2h0bHkgc2V0cyB0aGlyZCBhcmd1bWVudCBhcyBgbmV3LnRhcmdldGAsIGJ1dCBkb2VzIG5vdCBjcmVhdGUgYHRoaXNgIGZyb20gaXRcbnZhciBORVdfVEFSR0VUX0JVRyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gIShyQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KTtcbnZhciBBUkdTX0JVRyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJDb25zdHJ1Y3QoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChORVdfVEFSR0VUX0JVRyB8fCBBUkdTX0JVRyksICdSZWZsZWN0Jywge1xuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIGNvbnN0cnVjdChUYXJnZXQsIGFyZ3MgLyogLCBuZXdUYXJnZXQgKi8pIHtcbiAgICBhRnVuY3Rpb24oVGFyZ2V0KTtcbiAgICBhbk9iamVjdChhcmdzKTtcbiAgICB2YXIgbmV3VGFyZ2V0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyBUYXJnZXQgOiBhRnVuY3Rpb24oYXJndW1lbnRzWzJdKTtcbiAgICBpZiAoQVJHU19CVUcgJiYgIU5FV19UQVJHRVRfQlVHKSByZXR1cm4gckNvbnN0cnVjdChUYXJnZXQsIGFyZ3MsIG5ld1RhcmdldCk7XG4gICAgaWYgKFRhcmdldCA9PSBuZXdUYXJnZXQpIHtcbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgb3B0aW1pemF0aW9uIGZvciAwLTQgYXJndW1lbnRzXG4gICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBUYXJnZXQoKTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgY2FzZSA0OiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIH1cbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgbG90IG9mIGFyZ3VtZW50cyBjYXNlXG4gICAgICB2YXIgJGFyZ3MgPSBbbnVsbF07XG4gICAgICAkYXJncy5wdXNoLmFwcGx5KCRhcmdzLCBhcmdzKTtcbiAgICAgIHJldHVybiBuZXcgKGJpbmQuYXBwbHkoVGFyZ2V0LCAkYXJncykpKCk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byA9IG5ld1RhcmdldC5wcm90b3R5cGU7XG4gICAgdmFyIGluc3RhbmNlID0gY3JlYXRlKGlzT2JqZWN0KHByb3RvKSA/IHByb3RvIDogT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IEZ1bmN0aW9uLmFwcGx5LmNhbGwoVGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfVxufSk7XG4iLCIvLyAyNi4xLjMgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKVxudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcblxuLy8gTVMgRWRnZSBoYXMgYnJva2VuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkgLSB0aHJvd2luZyBpbnN0ZWFkIG9mIHJldHVybmluZyBmYWxzZVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZFAuZih7fSwgMSwgeyB2YWx1ZTogMSB9KSwgMSwgeyB2YWx1ZTogMiB9KTtcbn0pLCAnUmVmbGVjdCcsIHtcbiAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpIHtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUocHJvcGVydHlLZXksIHRydWUpO1xuICAgIGFuT2JqZWN0KGF0dHJpYnV0ZXMpO1xuICAgIHRyeSB7XG4gICAgICBkUC5mKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7XG4iLCIvLyAyNi4xLjQgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICB2YXIgZGVzYyA9IGdPUEQoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjYuMS41IFJlZmxlY3QuZW51bWVyYXRlKHRhcmdldClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBFbnVtZXJhdGUgPSBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IGFuT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdmFyIGtleXMgPSB0aGlzLl9rID0gW107ICAgICAgLy8ga2V5c1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBpdGVyYXRlZCkga2V5cy5wdXNoKGtleSk7XG59O1xucmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIGtleXMgPSB0aGF0Ll9rO1xuICB2YXIga2V5O1xuICBkbyB7XG4gICAgaWYgKHRoYXQuX2kgPj0ga2V5cy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfSB3aGlsZSAoISgoa2V5ID0ga2V5c1t0aGF0Ll9pKytdKSBpbiB0aGF0Ll90KSk7XG4gIHJldHVybiB7IHZhbHVlOiBrZXksIGRvbmU6IGZhbHNlIH07XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBlbnVtZXJhdGU6IGZ1bmN0aW9uIGVudW1lcmF0ZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZSh0YXJnZXQpO1xuICB9XG59KTtcbiIsIi8vIDI2LjEuNiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5S2V5IFssIHJlY2VpdmVyXSlcbnZhciBnT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSAvKiAsIHJlY2VpdmVyICovKSB7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdO1xuICB2YXIgZGVzYywgcHJvdG87XG4gIGlmIChhbk9iamVjdCh0YXJnZXQpID09PSByZWNlaXZlcikgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIGlmIChkZXNjID0gZ09QRC5mKHRhcmdldCwgcHJvcGVydHlLZXkpKSByZXR1cm4gaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgPyBkZXNjLnZhbHVlXG4gICAgOiBkZXNjLmdldCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgaWYgKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpIHJldHVybiBnZXQocHJvdG8sIHByb3BlcnR5S2V5LCByZWNlaXZlcik7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHsgZ2V0OiBnZXQgfSk7XG4iLCIvLyAyNi4xLjcgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciBnT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgcmV0dXJuIGdPUEQuZihhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH1cbn0pO1xuIiwiLy8gMjYuMS44IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBnZXRQcm90byA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZih0YXJnZXQpIHtcbiAgICByZXR1cm4gZ2V0UHJvdG8oYW5PYmplY3QodGFyZ2V0KSk7XG4gIH1cbn0pO1xuIiwiLy8gMjYuMS45IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICByZXR1cm4gcHJvcGVydHlLZXkgaW4gdGFyZ2V0O1xuICB9XG59KTtcbiIsIi8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGlzRXh0ZW5zaWJsZTogZnVuY3Rpb24gaXNFeHRlbnNpYmxlKHRhcmdldCkge1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgcmV0dXJuICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKHRhcmdldCkgOiB0cnVlO1xuICB9XG59KTtcbiIsIi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIFJlZmxlY3QgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBSZWZsZWN0ICYmIFJlZmxlY3Qub3duS2V5cyB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ09QTi5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICByZXR1cm4gZ2V0U3ltYm9scyA/IGtleXMuY29uY2F0KGdldFN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0JywgeyBvd25LZXlzOiByZXF1aXJlKCcuL19vd24ta2V5cycpIH0pO1xuIiwiLy8gMjYuMS4xMiBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zKHRhcmdldClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCkge1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICgkcHJldmVudEV4dGVuc2lvbnMpICRwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7XG4iLCIvLyAyNi4xLjEzIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYgWywgcmVjZWl2ZXJdKVxudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgZ09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViAvKiAsIHJlY2VpdmVyICovKSB7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCA0ID8gdGFyZ2V0IDogYXJndW1lbnRzWzNdO1xuICB2YXIgb3duRGVzYyA9IGdPUEQuZihhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIHZhciBleGlzdGluZ0Rlc2NyaXB0b3IsIHByb3RvO1xuICBpZiAoIW93bkRlc2MpIHtcbiAgICBpZiAoaXNPYmplY3QocHJvdG8gPSBnZXRQcm90b3R5cGVPZih0YXJnZXQpKSkge1xuICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICB9XG4gICAgb3duRGVzYyA9IGNyZWF0ZURlc2MoMCk7XG4gIH1cbiAgaWYgKGhhcyhvd25EZXNjLCAndmFsdWUnKSkge1xuICAgIGlmIChvd25EZXNjLndyaXRhYmxlID09PSBmYWxzZSB8fCAhaXNPYmplY3QocmVjZWl2ZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGV4aXN0aW5nRGVzY3JpcHRvciA9IGdPUEQuZihyZWNlaXZlciwgcHJvcGVydHlLZXkpKSB7XG4gICAgICBpZiAoZXhpc3RpbmdEZXNjcmlwdG9yLmdldCB8fCBleGlzdGluZ0Rlc2NyaXB0b3Iuc2V0IHx8IGV4aXN0aW5nRGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgIGV4aXN0aW5nRGVzY3JpcHRvci52YWx1ZSA9IFY7XG4gICAgICBkUC5mKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSwgZXhpc3RpbmdEZXNjcmlwdG9yKTtcbiAgICB9IGVsc2UgZFAuZihyZWNlaXZlciwgcHJvcGVydHlLZXksIGNyZWF0ZURlc2MoMCwgVikpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvd25EZXNjLnNldCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiAob3duRGVzYy5zZXQuY2FsbChyZWNlaXZlciwgViksIHRydWUpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7IHNldDogc2V0IH0pO1xuIiwiLy8gMjYuMS4xNCBSZWZsZWN0LnNldFByb3RvdHlwZU9mKHRhcmdldCwgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHNldFByb3RvID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJyk7XG5cbmlmIChzZXRQcm90bykgJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBzZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bykge1xuICAgIHNldFByb3RvLmNoZWNrKHRhcmdldCwgcHJvdG8pO1xuICAgIHRyeSB7XG4gICAgICBzZXRQcm90by5zZXQodGFyZ2V0LCBwcm90byk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2luY2x1ZGVzJyk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuaW5jbHVkZXM7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLWZsYXRNYXAvI3NlYy1GbGF0dGVuSW50b0FycmF5XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gcmVxdWlyZSgnLi9fd2tzJykoJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xuXG5mdW5jdGlvbiBmbGF0dGVuSW50b0FycmF5KHRhcmdldCwgb3JpZ2luYWwsIHNvdXJjZSwgc291cmNlTGVuLCBzdGFydCwgZGVwdGgsIG1hcHBlciwgdGhpc0FyZykge1xuICB2YXIgdGFyZ2V0SW5kZXggPSBzdGFydDtcbiAgdmFyIHNvdXJjZUluZGV4ID0gMDtcbiAgdmFyIG1hcEZuID0gbWFwcGVyID8gY3R4KG1hcHBlciwgdGhpc0FyZywgMykgOiBmYWxzZTtcbiAgdmFyIGVsZW1lbnQsIHNwcmVhZGFibGU7XG5cbiAgd2hpbGUgKHNvdXJjZUluZGV4IDwgc291cmNlTGVuKSB7XG4gICAgaWYgKHNvdXJjZUluZGV4IGluIHNvdXJjZSkge1xuICAgICAgZWxlbWVudCA9IG1hcEZuID8gbWFwRm4oc291cmNlW3NvdXJjZUluZGV4XSwgc291cmNlSW5kZXgsIG9yaWdpbmFsKSA6IHNvdXJjZVtzb3VyY2VJbmRleF07XG5cbiAgICAgIHNwcmVhZGFibGUgPSBmYWxzZTtcbiAgICAgIGlmIChpc09iamVjdChlbGVtZW50KSkge1xuICAgICAgICBzcHJlYWRhYmxlID0gZWxlbWVudFtJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gICAgICAgIHNwcmVhZGFibGUgPSBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KGVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3ByZWFkYWJsZSAmJiBkZXB0aCA+IDApIHtcbiAgICAgICAgdGFyZ2V0SW5kZXggPSBmbGF0dGVuSW50b0FycmF5KHRhcmdldCwgb3JpZ2luYWwsIGVsZW1lbnQsIHRvTGVuZ3RoKGVsZW1lbnQubGVuZ3RoKSwgdGFyZ2V0SW5kZXgsIGRlcHRoIC0gMSkgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhcmdldEluZGV4ID49IDB4MWZmZmZmZmZmZmZmZmYpIHRocm93IFR5cGVFcnJvcigpO1xuICAgICAgICB0YXJnZXRbdGFyZ2V0SW5kZXhdID0gZWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0SW5kZXgrKztcbiAgICB9XG4gICAgc291cmNlSW5kZXgrKztcbiAgfVxuICByZXR1cm4gdGFyZ2V0SW5kZXg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbkludG9BcnJheTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtZmxhdE1hcC8jc2VjLUFycmF5LnByb3RvdHlwZS5mbGF0TWFwXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGZsYXR0ZW5JbnRvQXJyYXkgPSByZXF1aXJlKCcuL19mbGF0dGVuLWludG8tYXJyYXknKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7XG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBzb3VyY2VMZW4sIEE7XG4gICAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xuICAgIHNvdXJjZUxlbiA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIGZsYXR0ZW5JbnRvQXJyYXkoQSwgTywgTywgc291cmNlTGVuLCAwLCAxLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2ZsYXRNYXAnKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LmFycmF5LmZsYXQtbWFwJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mbGF0TWFwO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHJlcGVhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcsIGxlZnQpIHtcbiAgdmFyIFMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gIHZhciBzdHJpbmdMZW5ndGggPSBTLmxlbmd0aDtcbiAgdmFyIGZpbGxTdHIgPSBmaWxsU3RyaW5nID09PSB1bmRlZmluZWQgPyAnICcgOiBTdHJpbmcoZmlsbFN0cmluZyk7XG4gIHZhciBpbnRNYXhMZW5ndGggPSB0b0xlbmd0aChtYXhMZW5ndGgpO1xuICBpZiAoaW50TWF4TGVuZ3RoIDw9IHN0cmluZ0xlbmd0aCB8fCBmaWxsU3RyID09ICcnKSByZXR1cm4gUztcbiAgdmFyIGZpbGxMZW4gPSBpbnRNYXhMZW5ndGggLSBzdHJpbmdMZW5ndGg7XG4gIHZhciBzdHJpbmdGaWxsZXIgPSByZXBlYXQuY2FsbChmaWxsU3RyLCBNYXRoLmNlaWwoZmlsbExlbiAvIGZpbGxTdHIubGVuZ3RoKSk7XG4gIGlmIChzdHJpbmdGaWxsZXIubGVuZ3RoID4gZmlsbExlbikgc3RyaW5nRmlsbGVyID0gc3RyaW5nRmlsbGVyLnNsaWNlKDAsIGZpbGxMZW4pO1xuICByZXR1cm4gbGVmdCA/IHN0cmluZ0ZpbGxlciArIFMgOiBTICsgc3RyaW5nRmlsbGVyO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRwYWQgPSByZXF1aXJlKCcuL19zdHJpbmctcGFkJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMjgwXG52YXIgV0VCS0lUX0JVRyA9IC9WZXJzaW9uXFwvMTBcXC5cXGQrKFxcLlxcZCspPyggTW9iaWxlXFwvXFx3Kyk/IFNhZmFyaVxcLy8udGVzdCh1c2VyQWdlbnQpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIFdFQktJVF9CVUcsICdTdHJpbmcnLCB7XG4gIHBhZFN0YXJ0OiBmdW5jdGlvbiBwYWRTdGFydChtYXhMZW5ndGggLyogLCBmaWxsU3RyaW5nID0gJyAnICovKSB7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3RyaW5nLnBhZFN0YXJ0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHBhZCA9IHJlcXVpcmUoJy4vX3N0cmluZy1wYWQnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8yODBcbnZhciBXRUJLSVRfQlVHID0gL1ZlcnNpb25cXC8xMFxcLlxcZCsoXFwuXFxkKyk/KCBNb2JpbGVcXC9cXHcrKT8gU2FmYXJpXFwvLy50ZXN0KHVzZXJBZ2VudCk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogV0VCS0lUX0JVRywgJ1N0cmluZycsIHtcbiAgcGFkRW5kOiBmdW5jdGlvbiBwYWRFbmQobWF4TGVuZ3RoIC8qICwgZmlsbFN0cmluZyA9ICcgJyAqLykge1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIGZhbHNlKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWVuZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3RyaW5nLnBhZEVuZDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW1MZWZ0JywgZnVuY3Rpb24gKCR0cmltKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltTGVmdCgpIHtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMSk7XG4gIH07XG59LCAndHJpbVN0YXJ0Jyk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TdHJpbmcudHJpbUxlZnQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2VibWFya2JhZ2UvZWNtYXNjcmlwdC1zdHJpbmctbGVmdC1yaWdodC10cmltXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltUmlnaHQnLCBmdW5jdGlvbiAoJHRyaW0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW1SaWdodCgpIHtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMik7XG4gIH07XG59LCAndHJpbUVuZCcpO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tcmlnaHQnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN0cmluZy50cmltUmlnaHQ7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignYXN5bmNJdGVyYXRvcicpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4vX293bi1rZXlzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iamVjdCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gICAgdmFyIGdldERlc2MgPSBnT1BELmY7XG4gICAgdmFyIGtleXMgPSBvd25LZXlzKE8pO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleSwgZGVzYztcbiAgICB3aGlsZSAoa2V5cy5sZW5ndGggPiBpKSB7XG4gICAgICBkZXNjID0gZ2V0RGVzYyhPLCBrZXkgPSBrZXlzW2krK10pO1xuICAgICAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCkgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2MpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycztcbiIsInZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgaXNFbnVtID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpc0VudHJpZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IGdldEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KSB7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC52YWx1ZXM7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpIHtcbiAgICByZXR1cm4gJGVudHJpZXMoaXQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZW50cmllcztcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZVsnZmluYWxseSddO1xuIiwiLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBNU0lFID0gL01TSUUgLlxcLi8udGVzdCh1c2VyQWdlbnQpOyAvLyA8LSBkaXJ0eSBpZTktIGNoZWNrXG52YXIgd3JhcCA9IGZ1bmN0aW9uIChzZXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChmbiwgdGltZSAvKiAsIC4uLmFyZ3MgKi8pIHtcbiAgICB2YXIgYm91bmRBcmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gICAgdmFyIGFyZ3MgPSBib3VuZEFyZ3MgPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBmYWxzZTtcbiAgICByZXR1cm4gc2V0KGJvdW5kQXJncyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbikpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gOiBmbiwgdGltZSk7XG4gIH07XG59O1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkIgKyAkZXhwb3J0LkYgKiBNU0lFLCB7XG4gIHNldFRpbWVvdXQ6IHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHRhc2sgPSByZXF1aXJlKCcuL190YXNrJyk7XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiwge1xuICBzZXRJbW1lZGlhdGU6ICR0YXNrLnNldCxcbiAgY2xlYXJJbW1lZGlhdGU6ICR0YXNrLmNsZWFyXG59KTtcbiIsInZhciAkaXRlcmF0b3JzID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciBJVEVSQVRPUiA9IHdrcygnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5O1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBDU1NSdWxlTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IGZhbHNlLFxuICBDU1NWYWx1ZUxpc3Q6IGZhbHNlLFxuICBDbGllbnRSZWN0TGlzdDogZmFsc2UsXG4gIERPTVJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NU3RyaW5nTGlzdDogZmFsc2UsXG4gIERPTVRva2VuTGlzdDogdHJ1ZSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IGZhbHNlLFxuICBGaWxlTGlzdDogZmFsc2UsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MRm9ybUVsZW1lbnQ6IGZhbHNlLFxuICBIVE1MU2VsZWN0RWxlbWVudDogZmFsc2UsXG4gIE1lZGlhTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIE1pbWVUeXBlQXJyYXk6IGZhbHNlLFxuICBOYW1lZE5vZGVNYXA6IGZhbHNlLFxuICBOb2RlTGlzdDogdHJ1ZSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogZmFsc2UsXG4gIFBsdWdpbjogZmFsc2UsXG4gIFBsdWdpbkFycmF5OiBmYWxzZSxcbiAgU1ZHTGVuZ3RoTGlzdDogZmFsc2UsXG4gIFNWR051bWJlckxpc3Q6IGZhbHNlLFxuICBTVkdQYXRoU2VnTGlzdDogZmFsc2UsXG4gIFNWR1BvaW50TGlzdDogZmFsc2UsXG4gIFNWR1N0cmluZ0xpc3Q6IGZhbHNlLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiBmYWxzZSxcbiAgU291cmNlQnVmZmVyTGlzdDogZmFsc2UsXG4gIFN0eWxlU2hlZXRMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgVGV4dFRyYWNrQ3VlTGlzdDogZmFsc2UsXG4gIFRleHRUcmFja0xpc3Q6IGZhbHNlLFxuICBUb3VjaExpc3Q6IGZhbHNlXG59O1xuXG5mb3IgKHZhciBjb2xsZWN0aW9ucyA9IGdldEtleXMoRE9NSXRlcmFibGVzKSwgaSA9IDA7IGkgPCBjb2xsZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IGNvbGxlY3Rpb25zW2ldO1xuICB2YXIgZXhwbGljaXQgPSBET01JdGVyYWJsZXNbTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICB2YXIga2V5O1xuICBpZiAocHJvdG8pIHtcbiAgICBpZiAoIXByb3RvW0lURVJBVE9SXSkgaGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZiAoIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBpZiAoZXhwbGljaXQpIGZvciAoa2V5IGluICRpdGVyYXRvcnMpIGlmICghcHJvdG9ba2V5XSkgcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjUnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZ2xvYmFsXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuRywgeyBnbG9iYWw6IHJlcXVpcmUoJy4vX2dsb2JhbCcpIH0pO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuZ2xvYmFsJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5nbG9iYWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcIi4vbm9Db25mbGljdFwiKTtcblxuZnVuY3Rpb24gX2dsb2JhbCgpIHtcbiAgY29uc3QgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nbG9iYWxcIikpO1xuXG4gIF9nbG9iYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmlmIChfZ2xvYmFsKCkuZGVmYXVsdC5fYmFiZWxQb2x5ZmlsbCAmJiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4pIHtcbiAgY29uc29sZS53YXJuKFwiQGJhYmVsL3BvbHlmaWxsIGlzIGxvYWRlZCBtb3JlIHRoYW4gb25jZSBvbiB0aGlzIHBhZ2UuIFRoaXMgaXMgcHJvYmFibHkgbm90IGRlc2lyYWJsZS9pbnRlbmRlZCBcIiArIFwiYW5kIG1heSBoYXZlIGNvbnNlcXVlbmNlcyBpZiBkaWZmZXJlbnQgdmVyc2lvbnMgb2YgdGhlIHBvbHlmaWxscyBhcmUgYXBwbGllZCBzZXF1ZW50aWFsbHkuIFwiICsgXCJJZiB5b3UgZG8gbmVlZCB0byBsb2FkIHRoZSBwb2x5ZmlsbCBtb3JlIHRoYW4gb25jZSwgdXNlIEBiYWJlbC9wb2x5ZmlsbC9ub0NvbmZsaWN0IFwiICsgXCJpbnN0ZWFkIHRvIGJ5cGFzcyB0aGUgd2FybmluZy5cIik7XG59XG5cbl9nbG9iYWwoKS5kZWZhdWx0Ll9iYWJlbFBvbHlmaWxsID0gdHJ1ZTsiLCJjb25zdCBtYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluYCk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZSA9ICh0ZW1wbGF0ZSA9IGBgKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgd3JhcHBlci5pbm5lckhUTUwgPSB0ZW1wbGF0ZS50cmltKCk7XG4gIHJldHVybiB3cmFwcGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpZXcgPSB2aWV3ID0+IHtcbiAgbWFpbkVsZW1lbnQuaW5uZXJIVE1MID0gYGA7XG4gIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKHZpZXcuZWxlbWVudCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR2FtZSA9IChlbGVtZW50MSwgZWxlbWVudDIpID0+IHtcbiAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICByb290LmFwcGVuZENoaWxkKGVsZW1lbnQxLmVsZW1lbnQpO1xuICByb290LmFwcGVuZENoaWxkKGVsZW1lbnQyLmVsZW1lbnQpO1xuICByZXR1cm4gcm9vdDtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0lmRWxlbWVudEV4aXN0ID0gKGFycmF5LCBhbnN3ZXIsIHVybCkgPT4ge1xuICBjb25zdCBxdWVzdGlvbiA9IFtdO1xuXG4gIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgYXJyYXkpIHtcbiAgICBpZiAoaXRlcmF0b3IudHlwZSA9PT0gYW5zd2VyKSB7XG4gICAgICBxdWVzdGlvbi5wdXNoKGl0ZXJhdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcXVlc3Rpb25bMF0uaW1hZ2UudXJsID09PSB1cmw7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ycmVjdEFuc3dlcnMgPSAoYXJyYXksIGFuc3dlcikgPT4ge1xuICBsZXQgaW5kZXggPSAwO1xuICBmb3IgKGxldCBlbGVtZW50IG9mIGFycmF5KSB7XG4gICAgaWYgKGVsZW1lbnQgIT09IGFuc3dlcikge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJvbnVzQW5zd2VycyA9IChhcnJheSwgYW5zd2VyKSA9PiB7XG4gIGxldCBpbmRleCA9IDA7XG4gIGZvciAobGV0IGVsZW1lbnQgb2YgYXJyYXkpIHtcbiAgICBpZiAoZWxlbWVudCA9PT0gYW5zd2VyKSB7XG4gICAgICBpbmRleCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXg7XG59O1xuIiwiaW1wb3J0IHsgcmVuZGVyVGVtcGxhdGUgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKG5ldy50YXJnZXQgPT09IEFic3RyYWN0Vmlldykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBpbnN0YW50aWF0ZSBBYnN0cmFjdFZpZXcsIG9ubHkgY29uY3JldGUgb25lYCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGVtcGxhdGUgaXMgcmVxdWlyZWRgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gcmVuZGVyVGVtcGxhdGUodGhpcy50ZW1wbGF0ZSk7XG4gIH1cblxuICBiaW5kKCkge30gLy8gYmluZCBoYW5kbGVycyBpZiByZXF1aXJlZFxuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kKHRoaXMuX2VsZW1lbnQpO1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludHJvVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJpbnRyb1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaW50cm9fX2FzdGVyaXNrIGFzdGVyaXNrXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J/RgNC+0LTQvtC70LbQuNGC0Yw8L3NwYW4+KlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHAgY2xhc3M9XCJpbnRyb19fbW90dG9cIj5cbiAgICAgICAgICA8c3VwPio8L3N1cD4g0K3RgtC+INC90LUg0YTQvtGC0L4uINCt0YLQviDRgNC40YHRg9C90L7QuiDQvNCw0YHQu9C+0Lwg0L3QuNC00LXRgNC70LDQvdC00YHQutC+0LPQvlxuICAgICAgICAgINGF0YPQtNC+0LbQvdC40LrQsC3RhNC+0YLQvtGA0LXQsNC70LjRgdGC0LAgVGphbGYgU3Bhcm5hYXkuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBzdGFydEdhbWUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmludHJvX19hc3Rlcmlza2ApO1xuICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHRoaXMub25DbGljaygpKTtcbiAgfVxuXG4gIG9uQ2xpY2soKSB7fVxufVxuIiwiaW1wb3J0IEludHJvVmlldyBmcm9tICcuLi92aWV3L2ludHJvLXZpZXcnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuLi9yb3V0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRyb0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmludHJvU2NyZWVuID0gbmV3IEludHJvVmlldygpO1xuICAgIHRoaXMuaW50cm9TY3JlZW4ub25DbGljayA9ICgpID0+IFJvdXRlci5zaG93R3JlZXRpbmcoKTtcbiAgfVxuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmludHJvU2NyZWVuLmVsZW1lbnQ7XG4gIH1cbn1cbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9hYnN0cmFjdC12aWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JlZXRpbmdWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c2VjdGlvbiBjbGFzcz1cImdyZWV0aW5nIGNlbnRyYWwtLWJsdXJcIj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzPVwiZ3JlZXRpbmdfX2xvZ29cIlxuICAgICAgICAgIHNyYz1cImltZy9sb2dvX3BoLWJpZy5zdmdcIlxuICAgICAgICAgIHdpZHRoPVwiMjAxXCJcbiAgICAgICAgICBoZWlnaHQ9XCI4OVwiXG4gICAgICAgICAgYWx0PVwiUGl4ZWwgSHVudGVyXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdyZWV0aW5nX19hc3RlcmlzayBhc3Rlcmlza1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0K8g0L/RgNC+0YHRgtC+INC60YDQsNGB0LjQstCw0Y8g0LfQstGR0LfQtNC+0YfQutCwPC9zcGFuPipcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmVldGluZ19fY2hhbGxlbmdlXCI+XG4gICAgICAgICAgPGgzIGNsYXNzPVwiZ3JlZXRpbmdfX2NoYWxsZW5nZS10aXRsZVwiPlxuICAgICAgICAgICAg0JvRg9GH0YjQuNC1INGF0YPQtNC+0LbQvdC40LrQuC3RhNC+0YLQvtGA0LXQsNC70LjRgdGC0Ysg0LHRgNC+0YHQsNGO0YIg0YLQtdCx0LUg0LLRi9C30L7QsiFcbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ3JlZXRpbmdfX2NoYWxsZW5nZS10ZXh0XCI+0J/RgNCw0LLQuNC70LAg0LjQs9GA0Ysg0L/RgNC+0YHRgtGLOjwvcD5cbiAgICAgICAgICA8dWwgY2xhc3M9XCJncmVldGluZ19fY2hhbGxlbmdlLWxpc3RcIj5cbiAgICAgICAgICAgIDxsaT7QndGD0LbQvdC+INC+0YLQu9C40YfQuNGC0Ywg0YDQuNGB0YPQvdC+0Log0L7RgiDRhNC+0YLQvtCz0YDQsNGE0LjQuCDQuCDRgdC00LXQu9Cw0YLRjCDQstGL0LHQvtGALjwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgINCX0LDQtNCw0YfQsCDQutCw0LbQtdGC0YHRjyDRgtGA0LjQstC40LDQu9GM0L3QvtC5LCDQvdC+INC90LUg0LTRg9C80LDQuSwg0YfRgtC+INCy0YHQtSDRgtCw0Log0L/RgNC+0YHRgtC+LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT7QpNC+0YLQvtGA0LXQsNC70LjQt9C8INC+0LHQvNCw0L3Rh9C40LIg0Lgg0LrQvtCy0LDRgNC10L0uPC9saT5cbiAgICAgICAgICAgIDxsaT7Qn9C+0LzQvdC4LCDQs9C70LDQstC90L7QtSDigJQg0YHQvNC+0YLRgNC10YLRjCDQvtGH0LXQvdGMINCy0L3QuNC80LDRgtC10LvRjNC90L4uPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImdyZWV0aW5nX19jb250aW51ZVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQvtC00L7Qu9C20LjRgtGMPC9zcGFuPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIGNsYXNzPVwiaWNvblwiXG4gICAgICAgICAgICB3aWR0aD1cIjY0XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjY0XCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNjQgNjRcIlxuICAgICAgICAgICAgZmlsbD1cIiMwMDAwMDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2Fycm93LXJpZ2h0XCI+PC91c2U+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGdyZWV0aW5nQ29udGludWUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmdyZWV0aW5nX19jb250aW51ZWApO1xuICAgIGdyZWV0aW5nQ29udGludWUuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB0aGlzLm9uQ2xpY2soKSk7XG4gIH1cblxuICBvbkNsaWNrKCkge31cbn1cbiIsImltcG9ydCBHcmVldGluZ1ZpZXcgZnJvbSAnLi4vdmlldy9ncmVldGluZy12aWV3JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JlZXRpbmdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmVldGluZ1NjcmVlbiA9IG5ldyBHcmVldGluZ1ZpZXcoKTtcbiAgICB0aGlzLmdyZWV0aW5nU2NyZWVuLm9uQ2xpY2sgPSAoKSA9PiBSb3V0ZXIuc2hvd1J1bGVzKCk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmVldGluZ1NjcmVlbi5lbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tCdXR0b25WaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYmFja1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCS0LXRgNC90YPRgtGM0YHRjyDQuiDQvdCw0YfQsNC70YM8L3NwYW4+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICBjbGFzcz1cImljb25cIlxuICAgICAgICAgIHdpZHRoPVwiNDVcIlxuICAgICAgICAgIGhlaWdodD1cIjQ1XCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQ1IDQ1XCJcbiAgICAgICAgICBmaWxsPVwiIzAwMDAwMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNhcnJvdy1sZWZ0XCI+PC91c2U+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgY2xhc3M9XCJpY29uXCJcbiAgICAgICAgICB3aWR0aD1cIjEwMVwiXG4gICAgICAgICAgaGVpZ2h0PVwiNDRcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTAxIDQ0XCJcbiAgICAgICAgICBmaWxsPVwiIzAwMDAwMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNsb2dvLXNtYWxsXCI+PC91c2U+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3QgYmFja0J1dHRvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuYmFja2ApO1xuICAgIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB0aGlzLm9uQ2xpY2soKSk7XG4gIH1cblxuICBvbkNsaWNrKCkge31cbn1cbiIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCBCYWNrQnV0dG9uVmlldyBmcm9tICcuLi92aWV3L2JhY2stYnV0dG9uLXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrQnV0dG9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFja0J1dHRvbiA9IG5ldyBCYWNrQnV0dG9uVmlldygpO1xuICAgIHRoaXMuYmFja0J1dHRvbi5vbkNsaWNrID0gKCkgPT4gUm91dGVyLnNob3dHcmVldGluZygpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja0J1dHRvbi5lbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5pbXBvcnQgQmFja0J1dHRvbkNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlci9iYWNrLWJ1dHRvbi1jb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZXNWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBCYWNrQnV0dG9uQ29udHJvbGxlcigpO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyXCI+PC9oZWFkZXI+XG4gICAgICA8c2VjdGlvbiBjbGFzcz1cInJ1bGVzXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInJ1bGVzX190aXRsZVwiPtCf0YDQsNCy0LjQu9CwPC9oMj5cbiAgICAgICAgPHVsIGNsYXNzPVwicnVsZXNfX2Rlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAg0KPQs9Cw0LTQsNC5IDEwINGA0LDQtyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDRhNC+0YLQvlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBjbGFzcz1cInJ1bGVzX19pY29uXCJcbiAgICAgICAgICAgICAgc3JjPVwiaW1nL2ljb24tcGhvdG8ucG5nXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMlwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjMxXCJcbiAgICAgICAgICAgICAgYWx0PVwi0KTQvtGC0L5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgINC40LvQuCDRgNC40YHRg9C90L7QulxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBjbGFzcz1cInJ1bGVzX19pY29uXCJcbiAgICAgICAgICAgICAgc3JjPVwiaW1nL2ljb24tcGFpbnQucG5nXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMlwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjMxXCJcbiAgICAgICAgICAgICAgYWx0PVwi0KDQuNGB0YPQvdC+0LpcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaT7QpNC+0YLQvtCz0YDQsNGE0LjRj9C80Lgg0LjQu9C4INGA0LjRgdGD0L3QutCw0LzQuCDQvNC+0LPRg9GCINCx0YvRgtGMINC+0LHQsCDQuNC30L7QsdGA0LDQttC10L3QuNGPLjwvbGk+XG4gICAgICAgICAgPGxpPtCd0LAg0LrQsNC20LTRg9GOINC/0L7Qv9GL0YLQutGDINC+0YLQstC+0LTQuNGC0YHRjyAzMCDRgdC10LrRg9C90LQuPC9saT5cbiAgICAgICAgICA8bGk+0J7RiNC40LHQuNGC0YzRgdGPINC80L7QttC90L4g0L3QtSDQsdC+0LvQtdC1IDMg0YDQsNC3LjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxwIGNsYXNzPVwicnVsZXNfX3JlYWR5XCI+0JPQvtGC0L7QstGLPzwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJydWxlc19fZm9ybVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInJ1bGVzX19pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLQktCw0YjQtSDQmNC80Y9cIiAvPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJydWxlc19fYnV0dG9uICBjb250aW51ZVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD5cbiAgICAgICAgICAgIEdvIVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5oZWFkZXJgKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24uZWxlbWVudCk7XG5cbiAgICBjb25zdCBydWxlc0lucHV0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ydWxlc19faW5wdXRgKTtcbiAgICBjb25zdCBydWxlc0J1dHRvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAucnVsZXNfX2J1dHRvbmApO1xuXG4gICAgLy8gRGlzYWJsZSBidXR0b24gaWYgaW5wdXQgaXMgZW1wdHlcbiAgICBydWxlc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoYGlucHV0YCwgZXZ0ID0+IHtcbiAgICAgIHJ1bGVzQnV0dG9uLmRpc2FibGVkID0gZXZ0LnRhcmdldC52YWx1ZS5sZW5ndGggPT09IDA7XG4gICAgfSk7XG5cbiAgICBydWxlc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHRoaXMub25DbGljayhydWxlc0lucHV0LnZhbHVlKSk7XG4gIH1cblxuICBvbkNsaWNrKCkge31cbn1cbiIsImltcG9ydCBSdWxlc1ZpZXcgZnJvbSAnLi4vdmlldy9ydWxlcy12aWV3JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZXNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ydWxlc1NjcmVlbiA9IG5ldyBSdWxlc1ZpZXcoKTtcbiAgICB0aGlzLnJ1bGVzU2NyZWVuLm9uQ2xpY2sgPSBwbGF5ZXJOYW1lID0+IFJvdXRlci5zaG93RGF0YShwbGF5ZXJOYW1lKTtcbiAgfVxuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJ1bGVzU2NyZWVuLmVsZW1lbnQ7XG4gIH1cbn1cbiIsImNvbnN0IGdhbWVEYXRhID0ge1xuICBpbml0aWFsU3RhdGU6IHtcbiAgICBsZXZlbDogMCxcbiAgICBsaXZlczogMyxcbiAgICB0aW1lOiAzMCxcbiAgICBhbnN3ZXJzOiBbXVxuICB9LFxuXG4gIFNDT1JFOiB7XG4gICAgUklHSFRfQU5TV0VSOiAxMDAsXG4gICAgQk9OVVNfQU5TV0VSOiA1MCxcbiAgICBPTkVfTElGRV9TQ09SRTogNTAsXG4gICAgUVVJQ0tfQU5TV0VSOiAyMCwgLy8gc2VjXG4gICAgU0xPV19BTlNXRVI6IDEwXG4gIH0sXG5cbiAgZ2V0QW5zd2VyKHRpbWVTcGVudCwgY29tcGxldGVkKSB7XG4gICAgaWYgKGNvbXBsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBgd3JvbmdgO1xuICAgIH1cblxuICAgIGlmICh0aW1lU3BlbnQgPj0gdGhpcy5TQ09SRS5RVUlDS19BTlNXRVIpIHtcbiAgICAgIHJldHVybiBgZmFzdGA7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVTcGVudCA8PSB0aGlzLlNDT1JFLlNMT1dfQU5TV0VSKSB7XG4gICAgICByZXR1cm4gYHNsb3dgO1xuICAgIH1cblxuICAgIGlmIChjb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBgY29ycmVjdGA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGNhbGN1bGF0ZVRvdGFsU2NvcmUoYW5zd2VycywgbGl2ZXMpIHtcbiAgICByZXR1cm4gYW5zd2Vycy5yZWR1Y2UoKHNjb3JlLCBpdCkgPT4ge1xuICAgICAgaWYgKGl0LmNvbXBsZXRlZCAhPT0gYHdyb25nYCkge1xuICAgICAgICBzY29yZSArPSB0aGlzLlNDT1JFLlJJR0hUX0FOU1dFUjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0LmNvbXBsZXRlZCA9PT0gYGZhc3RgKSB7XG4gICAgICAgIHNjb3JlICs9IHRoaXMuU0NPUkUuQk9OVVNfQU5TV0VSO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXQuY29tcGxldGVkID09PSBgc2xvd2ApIHtcbiAgICAgICAgc2NvcmUgLT0gdGhpcy5TQ09SRS5CT05VU19BTlNXRVI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzY29yZTtcbiAgICB9LCBsaXZlcyAqIHRoaXMuU0NPUkUuT05FX0xJRkVfU0NPUkUpO1xuICB9LFxuXG4gIGNoYW5nZUxldmVsKHN0YXRlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBsZXZlbDogc3RhdGUubGV2ZWwgKyAxLFxuICAgICAgdGltZTogdGhpcy5pbml0aWFsU3RhdGUudGltZVxuICAgIH0pO1xuICB9LFxuXG4gIHNldExpdmVzKHN0YXRlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBsaXZlczogc3RhdGUubGl2ZXMgLSAxXG4gICAgfSk7XG4gIH0sXG5cbiAgcHVzaEFuc3dlcihhbnN3ZXJzLCBjb21wbGV0ZWQsIHRpbWVTcGVudCkge1xuICAgIHJldHVybiBhbnN3ZXJzLmNvbmNhdCh0aGlzLmdldEFuc3dlcih0aW1lU3BlbnQsIGNvbXBsZXRlZCkpO1xuICB9LFxuXG4gIGFkZEFuc3dlcihzdGF0ZSwgY29tcGxldGVkLCB0aW1lU3BlbnQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgIGFuc3dlcnM6IHRoaXMucHVzaEFuc3dlcihzdGF0ZS5hbnN3ZXJzLCBjb21wbGV0ZWQsIHRpbWVTcGVudClcbiAgICB9KTtcbiAgfSxcblxuICB0aWNrKHN0YXRlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICB0aW1lOiBzdGF0ZS50aW1lIC0gMVxuICAgIH0pO1xuICB9LFxuXG4gIGdldEZpbmFsU3RhdHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHM6IHN0YXRlLmFuc3dlcnMsXG4gICAgICBsaXZlczogc3RhdGUubGl2ZXMsXG4gICAgICBzY29yZTogdGhpcy5jYWxjdWxhdGVUb3RhbFNjb3JlKHN0YXRlLmFuc3dlcnMsIHN0YXRlLmxpdmVzKVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVEYXRhO1xuIiwiaW1wb3J0IEJhY2tCdXR0b25Db250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXIvYmFjay1idXR0b24tY29udHJvbGxlcic7XG5pbXBvcnQgZ2FtZURhdGEgZnJvbSAnLi4vZGF0YS9nYW1lLWRhdGEnO1xuaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJEYXRhVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgQmFja0J1dHRvbkNvbnRyb2xsZXIoKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fdGltZXJcIj4ke3RoaXMuc3RhdGUudGltZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbWVfX2xpdmVzXCI+XG4gICAgICAgICAgJHtuZXcgQXJyYXkoZ2FtZURhdGEuaW5pdGlhbFN0YXRlLmxpdmVzIC0gdGhpcy5zdGF0ZS5saXZlcylcbiAgICAgICAgICAgIC5maWxsKFxuICAgICAgICAgICAgICBgPGltZyBzcmM9XCIuLi9pbWcvaGVhcnRfX2VtcHR5LnN2Z1wiIGNsYXNzPVwiZ2FtZV9faGVhcnRcIlxuICAgICAgICAgIGFsdD1cIiBNaXNzZWQgTGlmZVwiIHdpZHRoPVwiMzFcIiBoZWlnaHQ9XCIyN1wiPmBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKGBgKX1cbiAgICAgICAgICAke25ldyBBcnJheSh0aGlzLnN0YXRlLmxpdmVzKVxuICAgICAgICAgICAgLmZpbGwoXG4gICAgICAgICAgICAgIGA8aW1nIHNyYz1cIi4uL2ltZy9oZWFydF9fZnVsbC5zdmdcIiBjbGFzcz1cImdhbWVfX2hlYXJ0XCJcbiAgICAgICAgICBhbHQ9XCJMaWZlXCIgd2lkdGg9XCIzMVwiIGhlaWdodD1cIjI3XCI+YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmpvaW4oYGApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IHRpbWVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5nYW1lX190aW1lcmApO1xuICAgIGlmICh0aGlzLnN0YXRlLnRpbWUgPD0gNSkge1xuICAgICAgdGltZXIuc3R5bGUuY29sb3IgPSBgcmVkYDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lci5zdHlsZS5jb2xvciA9IGBibGFja2A7XG4gICAgICB9LCA1MDApOyAvLyBoYWxmIHNlY1xuICAgIH1cbiAgfVxufVxuIiwiY29uc3Qgc3RhdHNUZW1wbGF0ZSA9IHN0YXRlID0+IGBcbiAgPHVsIGNsYXNzPVwic3RhdHNcIj5cbiAgICAke3N0YXRlXG4gICAgICAubWFwKGl0ID0+IHtcbiAgICAgICAgaWYgKGl0ID09PSBgd3JvbmdgKSB7XG4gICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJzdGF0c19fcmVzdWx0IHN0YXRzX19yZXN1bHQtLXdyb25nXCI+PC9saT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ID09PSBgZmFzdGApIHtcbiAgICAgICAgICByZXR1cm4gYDxsaSBjbGFzcz1cInN0YXRzX19yZXN1bHQgc3RhdHNfX3Jlc3VsdC0tZmFzdFwiPjwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdCA9PT0gYHNsb3dgKSB7XG4gICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJzdGF0c19fcmVzdWx0IHN0YXRzX19yZXN1bHQtLXNsb3dcIj48L2xpPmA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXQgPT09IGBjb3JyZWN0YCkge1xuICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwic3RhdHNfX3Jlc3VsdCBzdGF0c19fcmVzdWx0LS1jb3JyZWN0XCI+PC9saT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICAgLmpvaW4oYGApfVxuICAgICR7bmV3IEFycmF5KDEwIC0gc3RhdGUubGVuZ3RoKVxuICAgICAgLmZpbGwoYDxsaSBjbGFzcz1cInN0YXRzX19yZXN1bHQgc3RhdHNfX3Jlc3VsdC0tdW5rbm93blwiPjwvbGk+YClcbiAgICAgIC5qb2luKGBgKX1cbiAgPC91bD5cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRzVGVtcGxhdGU7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5pbXBvcnQgc3RhdHNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvc3RhdHMtdGVtcGxhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT25lVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBkYXRhKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJnYW1lXCI+XG4gICAgICAgIDxwIGNsYXNzPVwiZ2FtZV9fdGFza1wiPiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLnF1ZXN0aW9ufTwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJnYW1lX19jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWVfX29wdGlvblwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIke3RoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzWzBdLmltYWdlLnVybH1cIlxuICAgICAgICAgICAgICBhbHQ9XCJPcHRpb24gMVwiXG4gICAgICAgICAgICAgIHdpZHRoPVwiNDY4XCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiNDU4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnYW1lX19hbnN3ZXIgZ2FtZV9fYW5zd2VyLS1waG90b1wiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXN0aW9uMVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cInBob3RvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4+0KTQvtGC0L48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ2FtZV9fYW5zd2VyIGdhbWVfX2Fuc3dlci0tcGFpbnRcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJxdWVzdGlvbjFcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJwYWludGluZ1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuPtCg0LjRgdGD0L3QvtC6PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fb3B0aW9uXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMV0uaW1hZ2UudXJsfVwiXG4gICAgICAgICAgICAgIGFsdD1cIk9wdGlvbiAyXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCI0NjhcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI0NThcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdhbWVfX2Fuc3dlciAgZ2FtZV9fYW5zd2VyLS1waG90b1wiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXN0aW9uMlwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cInBob3RvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4+0KTQvtGC0L48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ2FtZV9fYW5zd2VyICBnYW1lX19hbnN3ZXItLXBhaW50XCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlc3Rpb24yXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwicGFpbnRpbmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QoNC40YHRg9C90L7Qujwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgJHtzdGF0c1RlbXBsYXRlKHRoaXMuc3RhdGUuYW5zd2Vycyl9XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3QgZ2FtZUFuc3dlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZ2FtZV9fYW5zd2VyIGlucHV0YCk7XG4gICAgLy8gQ2hhbmdlIHNjcmVlbiBpZiBib3RoIGlucHV0cyBhcmUgY2hlY2tlZFxuICAgIGdhbWVBbnN3ZXIuZm9yRWFjaChpdCA9PiB7XG4gICAgICBpdC5hZGRFdmVudExpc3RlbmVyKGBpbnB1dGAsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFkaW8gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBgLmdhbWVfX2Fuc3dlciBpbnB1dDpjaGVja2VkYFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGNsaWNrZWQgZWxlbWVudCBtYXRjaGVzIGRhdGFcbiAgICAgICAgaWYgKHJhZGlvLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHRoaXMub25BbnN3ZXIoXG4gICAgICAgICAgICByYWRpb1swXS52YWx1ZSA9PT0gdGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMF0udHlwZSAmJlxuICAgICAgICAgICAgICByYWRpb1sxXS52YWx1ZSA9PT0gdGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMV0udHlwZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25BbnN3ZXIoKSB7fVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuaW1wb3J0IHN0YXRzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3N0YXRzLXRlbXBsYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVR3b1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgZGF0YSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZ2FtZVwiPlxuICAgICAgICA8cCBjbGFzcz1cImdhbWVfX3Rhc2tcIj4ke3RoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5xdWVzdGlvbn08L3A+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZ2FtZV9fY29udGVudCAgZ2FtZV9fY29udGVudC0td2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb25cIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0uYW5zd2Vyc1swXS5pbWFnZS51cmx9XCJcbiAgICAgICAgICAgICAgYWx0PVwiT3B0aW9uIDFcIlxuICAgICAgICAgICAgICB3aWR0aD1cIjcwNVwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjQ1NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ2FtZV9fYW5zd2VyICBnYW1lX19hbnN3ZXItLXBob3RvXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlc3Rpb24xXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwicGhvdG9cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QpNC+0YLQvjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnYW1lX19hbnN3ZXIgIGdhbWVfX2Fuc3dlci0tcGFpbnRcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJxdWVzdGlvbjFcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJwYWludGluZ1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuPtCg0LjRgdGD0L3QvtC6PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICAke3N0YXRzVGVtcGxhdGUodGhpcy5zdGF0ZS5hbnN3ZXJzKX1cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBnYW1lQW5zd2VyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5nYW1lX19hbnN3ZXIgaW5wdXRgKTtcblxuICAgIGdhbWVBbnN3ZXIuZm9yRWFjaChpdCA9PiB7XG4gICAgICBpdC5hZGRFdmVudExpc3RlbmVyKGBpbnB1dGAsIGV2dCA9PiB7XG4gICAgICAgIHRoaXMub25BbnN3ZXIoXG4gICAgICAgICAgZXZ0LnRhcmdldC52YWx1ZSA9PT0gdGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMF0udHlwZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkFuc3dlcigpIHt9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5pbXBvcnQgc3RhdHNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvc3RhdHMtdGVtcGxhdGUnO1xuaW1wb3J0IHsgY2hlY2tJZkVsZW1lbnRFeGlzdCB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVGhyZWVWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUsIGRhdGEpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c2VjdGlvbiBjbGFzcz1cImdhbWVcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJnYW1lX190YXNrXCI+JHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0ucXVlc3Rpb259PC9wPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImdhbWVfX2NvbnRlbnQgIGdhbWVfX2NvbnRlbnQtLXRyaXBsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb25cIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0uYW5zd2Vyc1swXS5pbWFnZS51cmx9XCJcbiAgICAgICAgICAgICAgYWx0PVwiT3B0aW9uIDFcIlxuICAgICAgICAgICAgICB3aWR0aD1cIjMwNFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjQ1NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb24gIGdhbWVfX29wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0uYW5zd2Vyc1sxXS5pbWFnZS51cmx9XCJcbiAgICAgICAgICAgICAgYWx0PVwiT3B0aW9uIDJcIlxuICAgICAgICAgICAgICB3aWR0aD1cIjMwNFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjQ1NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb25cIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0uYW5zd2Vyc1syXS5pbWFnZS51cmx9XCJcbiAgICAgICAgICAgICAgYWx0PVwiT3B0aW9uIDNcIlxuICAgICAgICAgICAgICB3aWR0aD1cIjMwNFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjQ1NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgICR7c3RhdHNUZW1wbGF0ZSh0aGlzLnN0YXRlLmFuc3dlcnMpfVxuICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGdhbWVBbnN3ZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdhbWVfX29wdGlvbmApO1xuICAgIGNvbnN0IGlzUmlnaHQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmdhbWVfX3Rhc2tgKTtcblxuICAgIGNvbnN0IGdldEJvbnVzQW5zd2VycyA9IGV2dCA9PiB7XG4gICAgICBpZiAoaXNSaWdodC50ZXh0Q29udGVudCA9PT0gYNCd0LDQudC00LjRgtC1INGE0L7RgtC+INGB0YDQtdC00Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjQuWApIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrSWZFbGVtZW50RXhpc3QoXG4gICAgICAgICAgdGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnMsXG4gICAgICAgICAgYHBob3RvYCxcbiAgICAgICAgICBldnQudGFyZ2V0LnNyY1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXNSaWdodC50ZXh0Q29udGVudCA9PT0gYNCd0LDQudC00LjRgtC1INGA0LjRgdGD0L3QvtC6INGB0YDQtdC00Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjQuWBcbiAgICAgICAgPyBjaGVja0lmRWxlbWVudEV4aXN0KFxuICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnMsXG4gICAgICAgICAgICBgcGFpbnRpbmdgLFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5zcmNcbiAgICAgICAgICApXG4gICAgICAgIDogbnVsbDtcbiAgICB9O1xuXG4gICAgZ2FtZUFuc3dlci5mb3JFYWNoKGl0ID0+IHtcbiAgICAgIGl0LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZXZ0ID0+IHRoaXMub25BbnN3ZXIoZ2V0Qm9udXNBbnN3ZXJzKGV2dCkpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQW5zd2VyKCkge31cbn1cbiIsImltcG9ydCB7IHJlbmRlckdhbWUgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCBIZWFkZXJEYXRhVmlldyBmcm9tICcuLi92aWV3L2hlYWRlci1kYXRhLXZpZXcnO1xuaW1wb3J0IEdhbWVPbmVWaWV3IGZyb20gJy4uL3ZpZXcvZ2FtZS0xLXZpZXcnO1xuaW1wb3J0IEdhbWVUd29WaWV3IGZyb20gJy4uL3ZpZXcvZ2FtZS0yLXZpZXcnO1xuaW1wb3J0IEdhbWVUaHJlZVZpZXcgZnJvbSAnLi4vdmlldy9nYW1lLTMtdmlldyc7XG5pbXBvcnQgQmFja0J1dHRvbkNvbnRyb2xsZXIgZnJvbSAnLi9iYWNrLWJ1dHRvbi1jb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnNjcmVlbiA9IHRoaXMuaW5pdEdhbWUoXG4gICAgICB0aGlzLm1vZGVsLnN0YXRlLFxuICAgICAgdGhpcy5tb2RlbC5kYXRhLFxuICAgICAgdGhpcy5tb2RlbC5nZXRDdXJyZW50TGV2ZWwoKVxuICAgICk7XG4gICAgdGhpcy5oZWFkZXJEYXRhID0gbmV3IEhlYWRlckRhdGFWaWV3KHRoaXMubW9kZWwuc3RhdGUpO1xuICAgIHRoaXMuYmFja0J1dHRvbiA9IG5ldyBCYWNrQnV0dG9uQ29udHJvbGxlcigpO1xuXG4gICAgdGhpcy51cGRhdGVIZWFkZXIoKTtcblxuICAgIHRoaXMucm9vdCA9IHJlbmRlckdhbWUodGhpcy5oZWFkZXJEYXRhLCB0aGlzLnNjcmVlbik7XG5cbiAgICB0aGlzLnNjcmVlbi5vbkFuc3dlciA9IHRoaXMuYW5zd2VyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290O1xuICB9XG5cbiAgaW5pdEdhbWUoc3RhdGUsIGRhdGEsIGxldmVsKSB7XG4gICAgaWYgKGxldmVsLnR5cGUgPT09IGB0d28tb2YtdHdvYCkge1xuICAgICAgcmV0dXJuIG5ldyBHYW1lT25lVmlldyhzdGF0ZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKGxldmVsLnR5cGUgPT09IGB0aW5kZXItbGlrZWApIHtcbiAgICAgIHJldHVybiBuZXcgR2FtZVR3b1ZpZXcoc3RhdGUsIGRhdGEpO1xuICAgIH1cblxuICAgIGlmIChsZXZlbC50eXBlID09PSBgb25lLW9mLXRocmVlYCkge1xuICAgICAgcmV0dXJuIG5ldyBHYW1lVGhyZWVWaWV3KHN0YXRlLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0b3BUaW1lcigpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgfVxuXG4gIHN0YXJ0VGltZXIoKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm1vZGVsLnRpY2soKTtcbiAgICAgIHRoaXMudXBkYXRlSGVhZGVyKCk7XG5cbiAgICAgIGlmICh0aGlzLm1vZGVsLmhhc1RpbWUoKSkge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLm1vZGVsLnNldExpdmVzKCk7XG4gICAgICAgIHRoaXMubW9kZWwuYWRkQW5zd2VyKCk7XG4gICAgICAgIHRoaXMuY29udGludWVHYW1lKCk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7IC8vIDEgc2VjXG4gIH1cblxuICBhbnN3ZXIoYW5zd2VyKSB7XG4gICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICBpZiAoIWFuc3dlcikge1xuICAgICAgdGhpcy5tb2RlbC5zZXRMaXZlcygpO1xuICAgIH1cbiAgICB0aGlzLm1vZGVsLmFkZEFuc3dlcihhbnN3ZXIpO1xuICAgIHRoaXMuY29udGludWVHYW1lKCk7XG4gIH1cblxuICBjb250aW51ZUdhbWUoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwuZGllKCkpIHtcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYW5nZUdhbWUoKTtcbiAgICB9XG4gIH1cblxuICBlbmRHYW1lKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubW9kZWwudXBkYXRlU2NvcmUodGhpcy5tb2RlbC5zdGF0ZSk7XG4gICAgUm91dGVyLnNob3dSZXN1bHQocmVzdWx0LCB0aGlzLm1vZGVsLnBsYXllck5hbWUpO1xuICB9XG5cbiAgY2hhbmdlR2FtZSgpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZUxldmVsKCk7XG4gICAgUm91dGVyLnNob3dHYW1lKHRoaXMubW9kZWwpO1xuICB9XG5cbiAgdXBkYXRlSGVhZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJEYXRhVmlldyh0aGlzLm1vZGVsLnN0YXRlKTtcbiAgICB0aGlzLmhlYWRlckRhdGEuZWxlbWVudC5yZXBsYWNlV2l0aChoZWFkZXIuZWxlbWVudCk7XG4gICAgdGhpcy5oZWFkZXJEYXRhID0gaGVhZGVyO1xuICAgIGhlYWRlci5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlcmApLnByZXBlbmQodGhpcy5iYWNrQnV0dG9uLmVsZW1lbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2lubmVyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwibW9kYWxfX3RpdGxlXCI+0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCE8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzPVwibW9kYWxfX3RleHQgbW9kYWxfX3RleHQtLWVycm9yXCI+XG4gICAgICAgICAgICDQodGC0LDRgtGD0YE6IDQwNC4g0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtC1INGB0YLRgNCw0L3QuNGG0YMuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG59XG4iLCJpbXBvcnQgZ2FtZURhdGEgZnJvbSAnLi9kYXRhL2dhbWUtZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllck5hbWUsIGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMucGxheWVyTmFtZSA9IHBsYXllck5hbWU7XG4gICAgdGhpcy5yZXN0YXJ0KCk7XG4gIH1cblxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUodGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgZGllKCkge1xuICAgIHJldHVybiB0aGlzLmhhc05leHRMZXZlbCgpIHx8IHRoaXMuaGFzTGl2ZXMoKTtcbiAgfVxuXG4gIGhhc05leHRMZXZlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMZXZlbCh0aGlzLl9zdGF0ZS5sZXZlbCArIDEpID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBjaGFuZ2VMZXZlbCgpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGdhbWVEYXRhLmNoYW5nZUxldmVsKHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIGdldExldmVsKHN0YXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtzdGF0ZV07XG4gIH1cblxuICBzZXRMaXZlcygpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGdhbWVEYXRhLnNldExpdmVzKHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIGFkZEFuc3dlcihjb21wbGV0ZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuX3N0YXRlID0gZ2FtZURhdGEuYWRkQW5zd2VyKHRoaXMuX3N0YXRlLCBjb21wbGV0ZWQsIHRoaXMuX3N0YXRlLnRpbWUpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGdhbWVEYXRhLmluaXRpYWxTdGF0ZTtcbiAgfVxuXG4gIGhhc0xpdmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5saXZlcyA8PSAwO1xuICB9XG5cbiAgaGFzVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUudGltZSA8PSAwO1xuICB9XG5cbiAgZ2V0Q3VycmVudExldmVsKCkge1xuICAgIHJldHVybiB0aGlzLmdldExldmVsKHRoaXMuX3N0YXRlLmxldmVsKTtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBnYW1lRGF0YS50aWNrKHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKG1vZGVsKSB7XG4gICAgcmV0dXJuIGdhbWVEYXRhLmdldEZpbmFsU3RhdHMobW9kZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5pbXBvcnQgc3RhdHNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvc3RhdHMtdGVtcGxhdGUnO1xuaW1wb3J0IGdhbWVEYXRhIGZyb20gJy4uL2RhdGEvZ2FtZS1kYXRhJztcbmltcG9ydCB7IGdldENvcnJlY3RBbnN3ZXJzLCBnZXRCb251c0Fuc3dlcnMgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBCYWNrQnV0dG9uQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL2JhY2stYnV0dG9uLWNvbnRyb2xsZXInO1xuXG5jb25zdCByZXN1bHQgPSB7XG4gIGZhc3Q6IGDQkdC+0L3Rg9GBINC30LAg0YHQutC+0YDQvtGB0YLRjGAsXG4gIGFsaXZlOiBg0JHQvtC90YPRgSDQt9CwINC20LjQt9C90LhgLFxuICBzbG93OiBg0KjRgtGA0LDRhCDQt9CwINC80LXQtNC70LjRgtC10LvRjNC90L7RgdGC0YxgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRWaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBCYWNrQnV0dG9uQ29udHJvbGxlcigpO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj48L2hlYWRlcj5cbiAgPHNlY3Rpb24gY2xhc3M9XCJyZXN1bHRcIj48L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5oZWFkZXJgKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24uZWxlbWVudCk7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLnJlc3VsdGApO1xuICB9XG5cbiAgc2hvd1Njb3JlcyhzY29yZXMpIHtcbiAgICB0aGlzLl9yZXN1bHQuaW5uZXJIVE1MID0gYFxuICAgICAgPGgyIGNsYXNzPVwicmVzdWx0X190aXRsZVwiPlxuICAgICAgICAke3RoaXMuc3RhdGUubGl2ZXMgPD0gMCA/IGDQn9C+0YDQsNC20LXQvdC40LVgIDogYNCf0L7QsdC10LTQsCFgfVxuICAgICAgPC9oMj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cInJlc3VsdF9fdGFibGVcIj5cbiAgICAgICAgJHtzY29yZXNcbiAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChpdCwgaSkgPT4gYFxuICAgIDx0cj5cbiAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fbnVtYmVyXCI+JHtpICsgMX0uPC90ZD5cbiAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPlxuICAgICAgICA8dWwgY2xhc3M9XCJzdGF0c1wiPlxuICAgICAgICAgICR7c3RhdHNUZW1wbGF0ZShpdC5zdGF0cyl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L3RkPlxuICAgICAgJHt0aGlzLnJlbmRlclJlc3VsdChpdCl9XG4gICAgYFxuICAgICAgICAgIClcbiAgICAgICAgICAuam9pbihgYCl9XG4gICAgICA8L3RhYmxlPlxuICAgIGA7XG4gIH1cblxuICByZW5kZXJSZXN1bHQoaXQpIHtcbiAgICBpZiAoaXQubGl2ZXMgPD0gMCkge1xuICAgICAgcmV0dXJuIGBcbiAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fdG90YWxcIj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X190b3RhbCByZXN1bHRfX3RvdGFsLS1maW5hbFwiPmZhaWw8L3RkPlxuICAgIDwvdHI+XG4gICAgICBgO1xuICAgIH1cbiAgICByZXR1cm4gYFxuICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X19wb2ludHNcIj7DlyAke2dhbWVEYXRhLlNDT1JFLlJJR0hUX0FOU1dFUn08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X190b3RhbFwiPiR7Z2V0Q29ycmVjdEFuc3dlcnMoaXQuc3RhdHMsIGB3cm9uZ2ApICpcbiAgICAgICAgZ2FtZURhdGEuU0NPUkUuUklHSFRfQU5TV0VSfTwvdGQ+XG4gICAgPC90cj5cbiAgICAke3RoaXMucmVuZGVyQm9udXMoZ2V0Qm9udXNBbnN3ZXJzKGl0LnN0YXRzLCBgZmFzdGApLCBgZmFzdGApfVxuICAgICR7dGhpcy5yZW5kZXJCb251cyhpdC5saXZlcywgYGFsaXZlYCl9XG4gICAgJHt0aGlzLnJlbmRlckJvbnVzKGdldEJvbnVzQW5zd2VycyhpdC5zdGF0cywgYHNsb3dgKSwgYHNsb3dgKX1cbiAgICA8dHI+XG4gICAgICA8dGQgY29sc3Bhbj1cIjVcIiBjbGFzcz1cInJlc3VsdF9fdG90YWwgIHJlc3VsdF9fdG90YWwtLWZpbmFsXCI+JHtcbiAgICAgICAgaXQuc2NvcmVcbiAgICAgIH08L3RkPlxuICAgIDwvdHI+XG5cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyQm9udXMoYW5zd2VyLCB0eXBlKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fZXh0cmFcIj4ke3Jlc3VsdFt0eXBlXX06PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X19leHRyYVwiPlxuICAgICAgICAgICR7YW5zd2VyfSA8c3BhbiBjbGFzcz1cInN0YXRzX19yZXN1bHQgc3RhdHNfX3Jlc3VsdC0tJHt0eXBlfVwiPjwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X19wb2ludHNcIj7DlyAke2dhbWVEYXRhLlNDT1JFLkJPTlVTX0FOU1dFUn08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJyZXN1bHRfX3RvdGFsXCI+JHthbnN3ZXIgKiBnYW1lRGF0YS5TQ09SRS5CT05VU19BTlNXRVJ9PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgYDtcbiAgfVxufVxuIiwiY29uc3QgU0VSVkVSX1VSTCA9IGBodHRwczovL2VzLmR1bXAuYWNhZGVteS9waXhlbC1odW50ZXJgO1xuXG5jb25zdCBERUZBVUxUX05BTUUgPSBgS2FwcGFgO1xuY29uc3QgQVBQX0lEID0gMzc1MTQ2MzAyMjtcblxuY29uc3QgY2hlY2tTdGF0dXMgPSByZXNwb25zZSA9PiB7XG4gIGlmIChyZXNwb25zZS5vaykge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmVzcG9uc2Uuc3RhdHVzfTogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICB9XG59O1xuXG5jb25zdCB0b0pTT04gPSByZXMgPT4gcmVzLmpzb24oKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGVyIHtcbiAgc3RhdGljIGFzeW5jIGxvYWREYXRhKCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7U0VSVkVSX1VSTH0vcXVlc3Rpb25zYCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2hlY2tTdGF0dXMocmVzcG9uc2UpO1xuICAgIHJldHVybiB0b0pTT04ocmVzKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBsb2FkUmVzdWx0cyhuYW1lID0gREVGQVVMVF9OQU1FKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtTRVJWRVJfVVJMfS9zdGF0cy86JHtBUFBfSUR9LToke25hbWV9YCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2hlY2tTdGF0dXMocmVzcG9uc2UpO1xuICAgIHJldHVybiB0b0pTT04ocmVzKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBzYXZlUmVzdWx0cyhkYXRhLCBuYW1lID0gREVGQVVMVF9OQU1FKSB7XG4gICAgZGF0YSA9IE9iamVjdC5hc3NpZ24oeyBuYW1lIH0sIGRhdGEpO1xuICAgIGNvbnN0IHJlcXVlc3RTZXR0aW5ncyA9IHtcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogYGFwcGxpY2F0aW9uL2pzb25gXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBgUE9TVGBcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtTRVJWRVJfVVJMfS9zdGF0cy86JHtBUFBfSUR9LToke25hbWV9YCxcbiAgICAgIHJlcXVlc3RTZXR0aW5nc1xuICAgICk7XG4gICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hhbmdlVmlldyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgSW50cm9Db250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci9pbnRyby1jb250cm9sbGVyJztcbmltcG9ydCBHcmVldGluZ0NvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyL2dyZWV0aW5nLWNvbnRyb2xsZXInO1xuaW1wb3J0IFJ1bGVzQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIvcnVsZXMtY29udHJvbGxlcic7XG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyL2dhbWUtY29udHJvbGxlcic7XG5pbXBvcnQgRXJyb3JWaWV3IGZyb20gJy4vdmlldy9lcnJvci12aWV3JztcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSAnLi9nYW1lLW1vZGVsJztcbmltcG9ydCBSZXN1bHRWaWV3IGZyb20gJy4vdmlldy9yZXN1bHQtdmlldyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4vbG9hZGVyJztcblxubGV0IGdhbWVEYXRhO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBMb2FkZXIubG9hZERhdGEoKVxuICAgICAgLnRoZW4oZGF0YSA9PiAoZ2FtZURhdGEgPSBkYXRhKSlcbiAgICAgIC50aGVuKCgpID0+IFJvdXRlci5zaG93SW50cm8oKSlcbiAgICAgIC5jYXRjaChSb3V0ZXIuc2hvd0Vycm9yKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93SW50cm8oKSB7XG4gICAgY29uc3QgaW50cm8gPSBuZXcgSW50cm9Db250cm9sbGVyKCk7XG4gICAgY2hhbmdlVmlldyhpbnRybyk7XG4gIH1cblxuICBzdGF0aWMgc2hvd0dyZWV0aW5nKCkge1xuICAgIGNvbnN0IGdyZWV0aW5nID0gbmV3IEdyZWV0aW5nQ29udHJvbGxlcigpO1xuICAgIGNoYW5nZVZpZXcoZ3JlZXRpbmcpO1xuICB9XG5cbiAgc3RhdGljIHNob3dSdWxlcygpIHtcbiAgICBjb25zdCBydWxlcyA9IG5ldyBSdWxlc0NvbnRyb2xsZXIoKTtcbiAgICBjaGFuZ2VWaWV3KHJ1bGVzKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93RGF0YShwbGF5ZXJOYW1lKSB7XG4gICAgUm91dGVyLnNob3dHYW1lKG5ldyBHYW1lTW9kZWwocGxheWVyTmFtZSwgZ2FtZURhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93R2FtZShtb2RlbCkge1xuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZUNvbnRyb2xsZXIobW9kZWwpO1xuICAgIGNoYW5nZVZpZXcoZ2FtZSk7XG4gIH1cblxuICBzdGF0aWMgc2hvd1Jlc3VsdChzdGF0ZSwgcGxheWVyTmFtZSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBSZXN1bHRWaWV3KHN0YXRlKTtcbiAgICBjaGFuZ2VWaWV3KHJlc3VsdCk7XG5cbiAgICBMb2FkZXIuc2F2ZVJlc3VsdHMoc3RhdGUsIHBsYXllck5hbWUpXG4gICAgICAudGhlbigoKSA9PiBMb2FkZXIubG9hZFJlc3VsdHMocGxheWVyTmFtZSkpXG4gICAgICAudGhlbihkYXRhID0+IHJlc3VsdC5zaG93U2NvcmVzKGRhdGEpKVxuICAgICAgLmNhdGNoKFJvdXRlci5zaG93RXJyb3IpO1xuICB9XG5cbiAgc3RhdGljIHNob3dFcnJvcigpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvclZpZXcoKTtcbiAgICBjaGFuZ2VWaWV3KGVycm9yKTtcbiAgfVxufVxuIiwiaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcic7XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIFJvdXRlci5pbml0KCk7XG59O1xuXG5pbml0KCk7XG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsImlzT2JqZWN0IiwiZG9jdW1lbnQiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsImFuT2JqZWN0IiwidG9QcmltaXRpdmUiLCJJRThfRE9NX0RFRklORSIsImRQIiwiY3JlYXRlRGVzYyIsImdsb2JhbCIsImNvcmUiLCIkdG9TdHJpbmciLCJoYXMiLCJoaWRlIiwiYUZ1bmN0aW9uIiwiY3R4IiwicmVkZWZpbmUiLCJ1aWQiLCJMSUJSQVJZIiwid2tzRXh0IiwiY29mIiwiSU9iamVjdCIsImRlZmluZWQiLCJ0b0ludGVnZXIiLCJtaW4iLCJ0b0lPYmplY3QiLCJ0b0xlbmd0aCIsInRvQWJzb2x1dGVJbmRleCIsIiRrZXlzIiwiZW51bUJ1Z0tleXMiLCJnZXRLZXlzIiwiZ09QUyIsInBJRSIsIklFX1BST1RPIiwiUFJPVE9UWVBFIiwiZFBzIiwidG9TdHJpbmciLCJnT1BEIiwiJEdPUEQiLCIkRFAiLCJnT1BOIiwiZ09QTkV4dCIsIndrcyIsInNoYXJlZCIsIkRFU0NSSVBUT1JTIiwiJGZhaWxzIiwiX2NyZWF0ZSIsImVudW1LZXlzIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCIkZXhwb3J0Iiwid2tzRGVmaW5lIiwiaXNBcnJheSIsInJlcXVpcmUkJDUiLCJzZXRUb1N0cmluZ1RhZyIsImZhaWxzIiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIk9iamVjdFByb3RvIiwidG9PYmplY3QiLCIkZ2V0UHJvdG90eXBlT2YiLCJtZXRhIiwiVEFHIiwiY2xhc3NvZiIsImludm9rZSIsImdldFByb3RvdHlwZU9mIiwic3BhY2VzIiwid3MiLCIkcGFyc2VJbnQiLCIkdHJpbSIsIiRwYXJzZUZsb2F0IiwiaW5oZXJpdElmUmVxdWlyZWQiLCJqIiwicmVxdWlyZSQkNiIsImZsb29yIiwicmVwZWF0IiwiYU51bWJlclZhbHVlIiwiaXNJbnRlZ2VyIiwibG9nMXAiLCJzaWduIiwiJGV4cG0xIiwicG93IiwiYWJzIiwiZXhwIiwiZXhwbTEiLCJjcmVhdGUiLCJkZXNjcmlwdG9yIiwiJGl0ZXJDcmVhdGUiLCJJdGVyYXRvcnMiLCIkYXQiLCJpc1JlZ0V4cCIsIk1BVENIIiwiY29udGV4dCIsInRvSVNPU3RyaW5nIiwiZ2V0VGltZSIsIk5VTUJFUiIsIlRPX1BSSU1JVElWRSIsInByb3RvIiwiSVRFUkFUT1IiLCIkZGVmaW5lUHJvcGVydHkiLCJnZXRJdGVyRm4iLCJpc0FycmF5SXRlciIsImNyZWF0ZVByb3BlcnR5IiwiY2FsbCIsImFycmF5U2xpY2UiLCJodG1sIiwidGVzdCIsInNwZWNpZXNDb25zdHJ1Y3RvciIsImFzYyIsIiRyZWR1Y2UiLCIkbmF0aXZlIiwiTkVHQVRJVkVfWkVSTyIsIkFycmF5UHJvdG8iLCIkZmluZCIsIktFWSIsImZvcmNlZCIsIlNQRUNJRVMiLCJzdGVwIiwiYWRkVG9VbnNjb3BhYmxlcyIsIkJhc2UiLCIkZmxhZ3MiLCJrZXlzIiwicmVnZXhwRmxhZ3MiLCJyZWdleHBFeGVjIiwiVE9fU1RSSU5HIiwicmVnRXhwRXhlYyIsImFkdmFuY2VTdHJpbmdJbmRleCIsIm1heCIsInNhbWVWYWx1ZSIsIkxBU1RfSU5ERVgiLCJjYWxsUmVnRXhwRXhlYyIsImNlbCIsInByb2Nlc3MiLCJQcm9taXNlIiwibmV3UHJvbWlzZUNhcGFiaWxpdHkiLCJUeXBlRXJyb3IiLCJpc05vZGUiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSIsIlVTRV9OQVRJVkUiLCJ1c2VyQWdlbnQiLCJwZXJmb3JtIiwiYW5JbnN0YW5jZSIsInByb21pc2VSZXNvbHZlIiwicmVxdWlyZSQkNyIsImZvck9mIiwicmVkZWZpbmVBbGwiLCJ2YWxpZGF0ZSIsIiRpdGVyRGVmaW5lIiwic2V0U3BlY2llcyIsIiRpdGVyRGV0ZWN0Iiwic3Ryb25nIiwiY3JlYXRlQXJyYXlNZXRob2QiLCJpZCIsIiRoYXMiLCJ3ZWFrIiwiYXNzaWduIiwiaSIsInRvSW5kZXgiLCIkdHlwZWQiLCJhcnJheUZpbGwiLCJidWZmZXIiLCJWSUVXIiwicmVxdWlyZSQkOCIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQxMCIsInJlcXVpcmUkJDExIiwicmVxdWlyZSQkMTIiLCJyZXF1aXJlJCQxMyIsInJlcXVpcmUkJDE0IiwicmVxdWlyZSQkMTUiLCJyZXF1aXJlJCQxNiIsInJlcXVpcmUkJDE3IiwicmVxdWlyZSQkMTgiLCJyZXF1aXJlJCQxOSIsInJlcXVpcmUkJDIwIiwicmVxdWlyZSQkMjEiLCJyZXF1aXJlJCQyMiIsInJlcXVpcmUkJDIzIiwicmVxdWlyZSQkMjQiLCJyZXF1aXJlJCQyNSIsInJlcXVpcmUkJDI2IiwicmVxdWlyZSQkMjciLCJyZXF1aXJlJCQyOCIsInJlcXVpcmUkJDI5IiwicmVxdWlyZSQkMzAiLCJyZXF1aXJlJCQzMSIsInJlcXVpcmUkJDMyIiwicmVxdWlyZSQkMzMiLCJyZXF1aXJlJCQzNCIsInJlcXVpcmUkJDM1IiwicmVxdWlyZSQkMzYiLCJyZXF1aXJlJCQzNyIsInJlcXVpcmUkJDM4IiwiYmluZCIsImdldFByb3RvIiwiUmVmbGVjdCIsInNldFByb3RvIiwiYXJyYXlTcGVjaWVzQ3JlYXRlIiwiZmxhdHRlbkludG9BcnJheSIsIiRwYWQiLCJXRUJLSVRfQlVHIiwib3duS2V5cyIsImlzRW51bSIsIndyYXAiLCIkdGFzayIsIk5BTUUiLCJrZXkiLCIkaXRlcmF0b3JzIiwiaXMiLCJoYXNPd25Qcm9wZXJ0eSIsIm1haW5FbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInJlbmRlclRlbXBsYXRlIiwidGVtcGxhdGUiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyaW0iLCJjaGFuZ2VWaWV3IiwidmlldyIsImFwcGVuZENoaWxkIiwiZWxlbWVudCIsInJlbmRlckdhbWUiLCJlbGVtZW50MSIsImVsZW1lbnQyIiwicm9vdCIsImNoZWNrSWZFbGVtZW50RXhpc3QiLCJhcnJheSIsImFuc3dlciIsInVybCIsInF1ZXN0aW9uIiwiaXRlcmF0b3IiLCJ0eXBlIiwicHVzaCIsImltYWdlIiwiZ2V0Q29ycmVjdEFuc3dlcnMiLCJpbmRleCIsImdldEJvbnVzQW5zd2VycyIsIkFic3RyYWN0VmlldyIsIkVycm9yIiwiX2VsZW1lbnQiLCJyZW5kZXIiLCJJbnRyb1ZpZXciLCJzdGFydEdhbWUiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsIkludHJvQ29udHJvbGxlciIsImludHJvU2NyZWVuIiwiUm91dGVyIiwic2hvd0dyZWV0aW5nIiwiR3JlZXRpbmdWaWV3IiwiZ3JlZXRpbmdDb250aW51ZSIsIkdyZWV0aW5nQ29udHJvbGxlciIsImdyZWV0aW5nU2NyZWVuIiwic2hvd1J1bGVzIiwiQmFja0J1dHRvblZpZXciLCJiYWNrQnV0dG9uIiwiQmFja0J1dHRvbkNvbnRyb2xsZXIiLCJSdWxlc1ZpZXciLCJidXR0b24iLCJoZWFkZXIiLCJydWxlc0lucHV0IiwicnVsZXNCdXR0b24iLCJldnQiLCJkaXNhYmxlZCIsInRhcmdldCIsInZhbHVlIiwibGVuZ3RoIiwiUnVsZXNDb250cm9sbGVyIiwicnVsZXNTY3JlZW4iLCJwbGF5ZXJOYW1lIiwic2hvd0RhdGEiLCJnYW1lRGF0YSIsImluaXRpYWxTdGF0ZSIsImxldmVsIiwibGl2ZXMiLCJ0aW1lIiwiYW5zd2VycyIsIlNDT1JFIiwiUklHSFRfQU5TV0VSIiwiQk9OVVNfQU5TV0VSIiwiT05FX0xJRkVfU0NPUkUiLCJRVUlDS19BTlNXRVIiLCJTTE9XX0FOU1dFUiIsImdldEFuc3dlciIsInRpbWVTcGVudCIsImNvbXBsZXRlZCIsImNhbGN1bGF0ZVRvdGFsU2NvcmUiLCJyZWR1Y2UiLCJzY29yZSIsIml0IiwiY2hhbmdlTGV2ZWwiLCJzdGF0ZSIsIk9iamVjdCIsInNldExpdmVzIiwicHVzaEFuc3dlciIsImNvbmNhdCIsImFkZEFuc3dlciIsInRpY2siLCJnZXRGaW5hbFN0YXRzIiwic3RhdHMiLCJIZWFkZXJEYXRhVmlldyIsInRpbWVyIiwic3R5bGUiLCJjb2xvciIsInNldFRpbWVvdXQiLCJBcnJheSIsImZpbGwiLCJqb2luIiwic3RhdHNUZW1wbGF0ZSIsIm1hcCIsIkdhbWVPbmVWaWV3IiwiZGF0YSIsImdhbWVBbnN3ZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInJhZGlvIiwib25BbnN3ZXIiLCJHYW1lVHdvVmlldyIsIkdhbWVUaHJlZVZpZXciLCJpc1JpZ2h0IiwidGV4dENvbnRlbnQiLCJzcmMiLCJHYW1lQ29udHJvbGxlciIsIm1vZGVsIiwic2NyZWVuIiwiaW5pdEdhbWUiLCJnZXRDdXJyZW50TGV2ZWwiLCJoZWFkZXJEYXRhIiwidXBkYXRlSGVhZGVyIiwiX2ludGVydmFsIiwic3RhcnRUaW1lciIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhhc1RpbWUiLCJzdG9wVGltZXIiLCJjb250aW51ZUdhbWUiLCJkaWUiLCJlbmRHYW1lIiwiY2hhbmdlR2FtZSIsInJlc3VsdCIsInVwZGF0ZVNjb3JlIiwic2hvd1Jlc3VsdCIsInNob3dHYW1lIiwicmVwbGFjZVdpdGgiLCJwcmVwZW5kIiwiRXJyb3JWaWV3IiwiR2FtZU1vZGVsIiwicmVzdGFydCIsImhhc05leHRMZXZlbCIsImhhc0xpdmVzIiwiZ2V0TGV2ZWwiLCJfc3RhdGUiLCJ1bmRlZmluZWQiLCJmcmVlemUiLCJmYXN0IiwiYWxpdmUiLCJzbG93IiwiUmVzdWx0VmlldyIsIl9yZXN1bHQiLCJzY29yZXMiLCJyZXZlcnNlIiwicmVuZGVyUmVzdWx0IiwicmVuZGVyQm9udXMiLCJTRVJWRVJfVVJMIiwiREVGQVVMVF9OQU1FIiwiQVBQX0lEIiwiY2hlY2tTdGF0dXMiLCJyZXNwb25zZSIsIm9rIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsInRvSlNPTiIsInJlcyIsImpzb24iLCJMb2FkZXIiLCJmZXRjaCIsIm5hbWUiLCJyZXF1ZXN0U2V0dGluZ3MiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJtZXRob2QiLCJsb2FkRGF0YSIsInRoZW4iLCJzaG93SW50cm8iLCJzaG93RXJyb3IiLCJpbnRybyIsImdyZWV0aW5nIiwicnVsZXMiLCJnYW1lIiwic2F2ZVJlc3VsdHMiLCJsb2FkUmVzdWx0cyIsInNob3dTY29yZXMiLCJlcnJvciIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztDQUFBO0NBQ0EsSUFBSSxNQUFNLEdBQUcsY0FBYyxHQUFHLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUk7S0FDN0UsTUFBTSxHQUFHLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJOztLQUUvRCxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztDQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEs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SUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7S0FDMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztFQUNILEVBQUUsSUFBSSxDQUFDLENBQUM7O0FDSlRBLFlBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRTtHQUNwRCxPQUFPLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0tBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7RUFDSCxDQUFDLENBQUM7O0FDSkhBLFlBQXlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRTtHQUNyRCxPQUFPLFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0tBQ3BELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7RUFDSCxDQUFDLENBQUM7O0FDSkhBLFlBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRTtHQUNwRCxPQUFPLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0tBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7RUFDSCxDQUFDLENBQUM7O0FDSkhBLFlBQXlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRTtHQUNyRCxPQUFPLFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0tBQ3BELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0s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
