webpackJsonp([1,0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.2.6
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
	}(this, (function () { 'use strict';
	
	/*  */
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}
	
	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});
	
	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; };
	
	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}
	
	/*  */
	
	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',
	
	  /**
	   * Whether to record perf
	   */
	  performance: false,
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],
	
	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],
	
	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};
	
	/*  */
	
	var emptyObject = Object.freeze({});
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	
	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}
	
	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	
	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();
	
	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };
	
	    return Set;
	  }());
	}
	
	var warn = noop;
	var tip = noop;
	var formatComponentName;
	
	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };
	
	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };
	
	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;
	
	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }
	
	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };
	
	  var formatLocation = function (str) {
	    if (str === "<Anonymous>") {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}
	
	/*  */
	
	
	var uid$1 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop();
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;
	
	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};
	
	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};
	
	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ("development" !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}
	
	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}
	
	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    {
	      warn(("Error in " + info + ":"), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var initProxy;
	
	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );
	
	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };
	
	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);
	
	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }
	
	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };
	
	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}
	
	var mark;
	var measure;
	
	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};
	
	var prototypeAccessors = { child: {} };
	
	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};
	
	Object.defineProperties( VNode.prototype, prototypeAccessors );
	
	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}
	
	/*  */
	
	var normalizeEvent = cached(function (name) {
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture
	  }
	});
	
	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;
	
	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.fns) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}
	
	/*  */
	
	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];
	
	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }
	
	  if (!oldHook) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (oldHook.fns && oldHook.merged) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }
	
	  invoker.merged = true;
	  def[hookKey] = invoker;
	}
	
	/*  */
	
	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:
	
	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}
	
	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}
	
	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}
	
	/*  */
	
	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}
	
	var target;
	
	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}
	
	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}
	
	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}
	
	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };
	
	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}
	
	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}
	
	function resolveScopedSlots (
	  fns
	) {
	  var res = {};
	  for (var i = 0; i < fns.length; i++) {
	    res[fns[i][0]] = fns[i][1];
	  }
	  return res
	}
	
	/*  */
	
	var activeInstance = null;
	
	function initLifecycle (vm) {
	  var options = vm.$options;
	
	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }
	
	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;
	
	  vm.$children = [];
	  vm.$refs = {};
	
	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };
	
	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // remove reference to DOM nodes (prevents leak)
	    vm.$options._parentElm = vm.$options._refElm = null;
	  };
	}
	
	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');
	
	  var updateComponent;
	  /* istanbul ignore if */
	  if ("development" !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;
	
	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);
	
	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }
	
	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;
	
	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}
	
	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );
	
	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;
	
	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}
	
	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}
	
	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive == null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}
	
	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}
	
	/*  */
	
	
	var queue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }
	
	  // reset scheduler before updated hook called
	  var oldQueue = queue.slice();
	  resetSchedulerState();
	
	  // call updated hooks
	  index = oldQueue.length;
	  while (index--) {
	    watcher = oldQueue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}
	
	/*  */
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}
	
	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}
	
	/*  */
	
	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};
	
	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}
	
	var isReservedProp = { key: 1, ref: 1, slot: 1 };
	
	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };
	
	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}
	
	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}
	
	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}
	
	var computedWatcherOptions = { lazy: true };
	
	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);
	
	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    {
	      if (getter === undefined) {
	        warn(
	          ("No getter function has been defined for computed property \"" + key + "\"."),
	          vm
	        );
	        getter = noop;
	      }
	    }
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);
	
	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    }
	  }
	}
	
	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}
	
	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}
	
	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);
	
	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}
	
	/*  */
	
	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },
	
	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },
	
	  insert: function insert (vnode) {
	    if (!vnode.componentInstance._isMounted) {
	      vnode.componentInstance._isMounted = true;
	      callHook(vnode.componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      activateChildComponent(vnode.componentInstance, true /* direct */);
	    }
	  },
	
	  destroy: function destroy (vnode) {
	    if (!vnode.componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        vnode.componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(vnode.componentInstance, true /* direct */);
	      }
	    }
	  }
	};
	
	var hooksToMerge = Object.keys(componentVNodeHooks);
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }
	
	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }
	
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }
	
	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);
	
	  data = data || {};
	
	  // transform component v-model data into props & events
	  if (data.model) {
	    transformModel(Ctor.options, data);
	  }
	
	  // extract props
	  var propsData = extractProps(data, Ctor, tag);
	
	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;
	
	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;
	
	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };
	
	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };
	
	    var res = factory(resolve, reject);
	
	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }
	
	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}
	
	function extractProps (data, Ctor, tag) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && attrs.hasOwnProperty(keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}
	
	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}
	
	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (on[event]) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}
	
	/*  */
	
	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}
	
	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  return ret
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}
	
	/*  */
	
	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      "development" !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}
	
	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}
	
	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}
	
	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}
	
	/*  */
	
	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };
	
	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }
	
	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	
	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = _toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}
	
	/*  */
	
	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}
	
	function initInjections (vm) {
	  var inject = vm.$options.inject;
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);
	
	    var loop = function ( i ) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          /* istanbul ignore else */
	          {
	            defineReactive$$1(vm, key, source._provided[provideKey], function () {
	              warn(
	                "Avoid mutating an injected value directly since the changes will be " +
	                "overwritten whenever the provided component re-renders. " +
	                "injection being mutated: \"" + key + "\"",
	                vm
	              );
	            });
	          }
	          break
	        }
	        source = source.$parent;
	      }
	    };
	
	    for (var i = 0; i < keys.length; i++) loop( i );
	  }
	}
	
	/*  */
	
	var uid = 0;
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	
	    var startTag, endTag;
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }
	
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');
	
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }
	
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}
	
	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}
	
	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}
	
	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], sealed[key]);
	    }
	  }
	  return modified
	}
	
	function dedupe (latest, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    for (var i = 0; i < latest.length; i++) {
	      if (sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}
	
	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}
	
	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	
	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }
	
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);
	
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}
	
	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}
	
	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}
	
	/*  */
	
	var patternTypes = [String, RegExp];
	
	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}
	
	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (pattern instanceof RegExp) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}
	
	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },
	
	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },
	
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	};
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	
	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };
	
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;
	
	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });
	
	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;
	
	  extend(Vue.options.components, builtInComponents);
	
	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}
	
	initGlobalAPI(Vue$3);
	
	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});
	
	Vue$3.version = '2.2.6';
	
	/*  */
	
	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);
	
	var isPreTag = function (tag) { return tag === 'pre'; };
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}
	
	/*  */
	
	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild (node, child) {
	  node.removeChild(child);
	}
	
	function appendChild (node, child) {
	  node.appendChild(child);
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text;
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }
	
	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyNode = new VNode('', {}, []);
	
	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	function isUndef (v) {
	  return v === undefined || v === null
	}
	
	function isDef (v) {
	  return v !== undefined && v !== null
	}
	
	function isTrue (v) {
	  return v === true
	}
	
	function sameVnode (a, b) {
	  return (
	    a.key === b.key &&
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	  )
	}
	
	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }
	
	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }
	
	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }
	
	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	
	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }
	
	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }
	
	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }
	
	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }
	
	  function insert (parent, elm, ref) {
	    if (isDef(parent)) {
	      if (isDef(ref)) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }
	
	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	        isTrue(oldVnode.isStatic) &&
	        vnode.key === oldVnode.key &&
	        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }
	
	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');
	
	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }
	
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];
	
	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );
	
	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }
	
	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};
	
	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}
	
	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];
	
	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }
	
	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }
	
	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }
	
	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}
	
	var emptyModifiers = Object.create(null);
	
	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}
	
	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}
	
	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	];
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }
	
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode);
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	};
	
	/*  */
	
	var validDivisionCharRE = /[\w).+\-_$\]]/;
	
	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;
	
	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }
	
	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }
	
	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }
	
	  return expression
	}
	
	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}
	
	/*  */
	
	function baseWarn (msg) {
	  console.error(("[Vue compiler]: " + msg));
	}
	
	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}
	
	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}
	
	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}
	
	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}
	
	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}
	
	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}
	
	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}
	
	/*  */
	
	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
	  el,
	  value,
	  modifiers
	) {
	  var ref = modifiers || {};
	  var number = ref.number;
	  var trim = ref.trim;
	
	  var baseValueExpression = '$$v';
	  var valueExpression = baseValueExpression;
	  if (trim) {
	    valueExpression =
	      "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	  var assignment = genAssignmentCode(value, valueExpression);
	
	  el.model = {
	    value: ("(" + value + ")"),
	    expression: ("\"" + value + "\""),
	    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	  };
	}
	
	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
	  value,
	  assignment
	) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}
	
	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */
	
	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;
	
	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;
	
	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }
	
	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }
	
	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}
	
	function next () {
	  return str.charCodeAt(++index$1)
	}
	
	function eof () {
	  return index$1 >= len
	}
	
	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}
	
	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}
	
	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}
	
	/*  */
	
	var warn$1;
	
	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';
	
	function model (
	  el,
	  dir,
	  _warn
	) {
	  warn$1 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$1(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	    // inputs with type="file" are read only and setting the input's
	    // value will throw an error.
	    if (tag === 'input' && type === 'file') {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	        "File inputs are read only. Use a v-on:change listener instead."
	      );
	    }
	  }
	
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else if (tag === 'input' || tag === 'textarea') {
	    genDefaultModel(el, value, modifiers);
	  } else if (!config.isReservedTag(tag)) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else {
	    warn$1(
	      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	      "v-model is not supported on this element type. " +
	      'If you are working with contenteditable, it\'s recommended to ' +
	      'wrap a library dedicated for that purpose inside a custom component.'
	    );
	  }
	
	  // ensure runtime directive metadata
	  return true
	}
	
	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, CHECKBOX_RADIO_TOKEN,
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}
	
	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
	}
	
	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var selectedVal = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})";
	
	  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	  var code = "var $$selectedVal = " + selectedVal + ";";
	  code = code + " " + (genAssignmentCode(value, assignment));
	  addHandler(el, 'change', code, null, true);
	}
	
	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var needCompositionGuard = !lazy && type !== 'range';
	  var event = lazy
	    ? 'change'
	    : type === 'range'
	      ? RANGE_TOKEN
	      : 'input';
	
	  var valueExpression = '$event.target.value';
	  if (trim) {
	    valueExpression = "$event.target.value.trim()";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	
	  var code = genAssignmentCode(value, valueExpression);
	  if (needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	
	  addProp(el, 'value', ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}
	
	/*  */
	
	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (on[RANGE_TOKEN]) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (on[CHECKBOX_RADIO_TOKEN]) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}
	
	var target$1;
	
	function add$1 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}
	
	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}
	
	// check platforms/web/util/attrs.js acceptValue
	
	
	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}
	
	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}
	
	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};
	
	/*  */
	
	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});
	
	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}
	
	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}
	
	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;
	
	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }
	
	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }
	
	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}
	
	/*  */
	
	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};
	
	var prefixes = ['Webkit', 'Moz', 'ms'];
	
	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});
	
	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	
	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }
	
	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};
	
	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;
	
	  var style = normalizeStyleBinding(vnode.data.style) || {};
	
	  vnode.data.style = style.__ob__ ? extend({}, style) : style;
	
	  var newStyle = getStyle(vnode, true);
	
	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	};
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}
	
	/*  */
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});
	
	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';
	
	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}
	
	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;
	
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}
	
	var transformRE = /\b(transform|all)(,|$)/;
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }
	
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;
	
	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;
	
	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;
	
	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );
	
	  if ("development" !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }
	
	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm;
	
	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);
	
	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );
	
	  if ("development" !== 'production' && explicitLeaveDuration != null) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });
	
	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}
	
	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}
	
	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}
	
	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (!fn) { return false }
	  var invokerFns = fn.fns;
	  if (invokerFns) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}
	
	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}
	
	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);
	
	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}
	
	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};
	
	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true;
	}
	
	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },
	
	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};
	
	var platformDirectives = {
	  model: model$1,
	  show: show
	};
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }
	
	    var mode = this.mode;
	
	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }
	
	    var rawChild = children[0];
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;
	
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }
	
	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }
	
	    return rawChild
	  }
	};
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);
	
	delete props.mode;
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);
	
	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};
	
	/*  */
	
	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;
	
	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);
	
	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;
	
	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if ("development" !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if ("development" !== 'production' &&
	      config.productionTip !== false &&
	      inBrowser && typeof console !== 'undefined') {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);
	
	/*  */
	
	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}
	
	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;
	
	/*  */
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr'
	);
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track'
	);
	
	/*  */
	
	var decoder;
	
	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}
	
	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */
	
	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */
	
	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);
	
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;
	
	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});
	
	// Special Elements (can contain anything)
	var isPlainTextElement = makeMap('script,style,textarea', true);
	var reCache = {};
	
	var decodingMap = {
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&amp;': '&',
	  '&#10;': '\n'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;
	
	function decodeAttr (value, shouldDecodeNewlines) {
	  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	  return value.replace(re, function (match) { return decodingMap[match]; })
	}
	
	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a plaintext content element like script/style
	    if (!lastTag || !isPlainTextElement(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');
	
	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }
	
	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');
	
	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }
	
	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }
	
	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }
	
	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }
	
	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd >= 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }
	
	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }
	
	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }
	
	    if (html === last) {
	      options.chars && options.chars(html);
	      if ("development" !== 'production' && !stack.length && options.warn) {
	        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
	      }
	      break
	    }
	  }
	
	  // Clean up any remaining tags
	  parseEndTag();
	
	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }
	
	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }
	
	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;
	
	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }
	
	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;
	
	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }
	
	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	    }
	
	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }
	
	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }
	
	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }
	
	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }
	
	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if ("development" !== 'production' &&
	            (i > pos || !tagName) &&
	            options.warn) {
	          options.warn(
	            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
	          );
	        }
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }
	
	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}
	
	/*  */
	
	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});
	
	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}
	
	/*  */
	
	var onRE = /^@|^v-on:/;
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	
	var argRE = /:(.*)$/;
	var bindRE = /^:|^v-bind:/;
	var modifierRE = /\.[^.]+/g;
	
	var decodeHTMLCached = cached(decode);
	
	// configurable state
	var warn$2;
	var delimiters;
	var transforms;
	var preTransforms;
	var postTransforms;
	var platformIsPreTag;
	var platformMustUseProp;
	var platformGetTagNamespace;
	
	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$2 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	
	  function warnOnce (msg) {
	    if (!warned) {
	      warned = true;
	      warn$2(msg);
	    }
	  }
	
	  function endPre (element) {
	    // check pre state
	    if (element.pre) {
	      inVPre = false;
	    }
	    if (platformIsPreTag(element.tag)) {
	      inPre = false;
	    }
	  }
	
	  parseHTML(template, {
	    warn: warn$2,
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    canBeLeftOpenTag: options.canBeLeftOpenTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
	
	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }
	
	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }
	
	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$2(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }
	
	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }
	
	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);
	
	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;
	
	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }
	
	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warnOnce(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes.'
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warnOnce(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements.'
	            );
	          }
	        }
	      }
	
	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else {
	          warnOnce(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      } else {
	        endPre(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },
	
	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      endPre(element);
	    },
	
	    chars: function chars (text) {
	      if (!currentParent) {
	        {
	          if (text === template) {
	            warnOnce(
	              'Component template requires a root element, rather than just text.'
	            );
	          } else if ((text = text.trim())) {
	            warnOnce(
	              ("text \"" + text + "\" outside root element will be ignored.")
	            );
	          }
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	          children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}
	
	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}
	
	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}
	
	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}
	
	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}
	
	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$2(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}
	
	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}
	
	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$2(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}
	
	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$2(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}
	
	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}
	
	function processOnce (el) {
	  var once$$1 = getAndRemoveAttr(el, 'v-once');
	  if (once$$1 != null) {
	    el.once = true;
	  }
	}
	
	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$2(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}
	
	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}
	
	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        var arg = argMatch && argMatch[1];
	        if (arg) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$2(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}
	
	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}
	
	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}
	
	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$2('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}
	
	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}
	
	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;
	
	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}
	
	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$2(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}
	
	/*  */
	
	var isStaticKey;
	var isPlatformReservedTag;
	
	var genStaticKeysCached = cached(genStaticKeys$1);
	
	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic$1(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}
	
	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}
	
	function markStatic$1 (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic$1(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}
	
	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}
	
	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}
	
	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}
	
	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}
	
	/*  */
	
	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};
	
	// #4868: modifiers that prevent the execution of the listener
	// need to explicitly return null so that we can determine whether to remove
	// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };
	
	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: genGuard("$event.target !== $event.currentTarget"),
	  ctrl: genGuard("!$event.ctrlKey"),
	  shift: genGuard("!$event.shiftKey"),
	  alt: genGuard("!$event.altKey"),
	  meta: genGuard("!$event.metaKey"),
	  left: genGuard("'button' in $event && $event.button !== 0"),
	  middle: genGuard("'button' in $event && $event.button !== 1"),
	  right: genGuard("'button' in $event && $event.button !== 2")
	};
	
	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}
	
	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  }
	
	  if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  }
	
	  var isMethodPath = simplePathRE.test(handler.value);
	  var isFunctionExpression = fnExpRE.test(handler.value);
	
	  if (!handler.modifiers) {
	    return isMethodPath || isFunctionExpression
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}") // inline statement
	  } else {
	    var code = '';
	    var genModifierCode = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        genModifierCode += modifierCode[key];
	        // left/right
	        if (keyCodes[key]) {
	          keys.push(key);
	        }
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code += genKeyFilter(keys);
	    }
	    // Make sure modifiers like prevent and stop get executed after key filtering
	    if (genModifierCode) {
	      code += genModifierCode;
	    }
	    var handlerCode = isMethodPath
	      ? handler.value + '($event)'
	      : isFunctionExpression
	        ? ("(" + (handler.value) + ")($event)")
	        : handler.value;
	    return ("function($event){" + code + handlerCode + "}")
	  }
	}
	
	function genKeyFilter (keys) {
	  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}
	
	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}
	
	/*  */
	
	function bind$1 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}
	
	/*  */
	
	var baseDirectives = {
	  bind: bind$1,
	  cloak: noop
	};
	
	/*  */
	
	// configurable state
	var warn$3;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;
	
	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$3 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}
	
	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);
	
	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}
	
	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}
	
	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$3(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}
	
	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}
	
	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }
	
	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }
	
	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}
	
	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	
	  if (
	    "development" !== 'production' &&
	    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
	  ) {
	    warn$3(
	      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	      "v-for should have explicit keys. " +
	      "See https://vuejs.org/guide/list.html#key for more info.",
	      true /* tip */
	    );
	  }
	
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}
	
	function genData (el) {
	  var data = '{';
	
	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }
	
	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // component v-model
	  if (el.model) {
	    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}
	
	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$3);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}
	
	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$3('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}
	
	function genScopedSlots (slots) {
	  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
	}
	
	function genScopedSlot (key, el) {
	  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}]"
	}
	
	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
	    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
	  }
	}
	
	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}
	
	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}
	
	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}
	
	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}
	
	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}
	
	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}
	
	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}
	
	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}
	
	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}
	
	/*  */
	
	// these keywords should not appear inside expressions, but operators like
	// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	
	// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
	  'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
	
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}
	
	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else if (onRE.test(name)) {
	            checkEvent(value, (name + "=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}
	
	function checkEvent (exp, text, errors) {
	  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
	  if (keywordMatch) {
	    errors.push(
	      "avoid using JavaScript unary operator as property name: " +
	      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	    );
	  }
	  checkExpression(exp, text, errors);
	}
	
	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}
	
	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
	  }
	}
	
	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	      );
	    } else {
	      errors.push(("invalid expression: " + (text.trim())));
	    }
	  }
	}
	
	/*  */
	
	function baseCompile (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}
	
	function makeFunction (code, errors) {
	  try {
	    return new Function(code)
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}
	
	function createCompiler (baseOptions) {
	  var functionCompileCache = Object.create(null);
	
	  function compile (
	    template,
	    options
	  ) {
	    var finalOptions = Object.create(baseOptions);
	    var errors = [];
	    var tips = [];
	    finalOptions.warn = function (msg, tip$$1) {
	      (tip$$1 ? tips : errors).push(msg);
	    };
	
	    if (options) {
	      // merge custom modules
	      if (options.modules) {
	        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
	      }
	      // merge custom directives
	      if (options.directives) {
	        finalOptions.directives = extend(
	          Object.create(baseOptions.directives),
	          options.directives
	        );
	      }
	      // copy other options
	      for (var key in options) {
	        if (key !== 'modules' && key !== 'directives') {
	          finalOptions[key] = options[key];
	        }
	      }
	    }
	
	    var compiled = baseCompile(template, finalOptions);
	    {
	      errors.push.apply(errors, detectErrors(compiled.ast));
	    }
	    compiled.errors = errors;
	    compiled.tips = tips;
	    return compiled
	  }
	
	  function compileToFunctions (
	    template,
	    options,
	    vm
	  ) {
	    options = options || {};
	
	    /* istanbul ignore if */
	    {
	      // detect possible CSP restriction
	      try {
	        new Function('return 1');
	      } catch (e) {
	        if (e.toString().match(/unsafe-eval|CSP/)) {
	          warn(
	            'It seems you are using the standalone build of Vue.js in an ' +
	            'environment with Content Security Policy that prohibits unsafe-eval. ' +
	            'The template compiler cannot work in this environment. Consider ' +
	            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	            'templates into render functions.'
	          );
	        }
	      }
	    }
	
	    // check cache
	    var key = options.delimiters
	      ? String(options.delimiters) + template
	      : template;
	    if (functionCompileCache[key]) {
	      return functionCompileCache[key]
	    }
	
	    // compile
	    var compiled = compile(template, options);
	
	    // check compilation errors/tips
	    {
	      if (compiled.errors && compiled.errors.length) {
	        warn(
	          "Error compiling template:\n\n" + template + "\n\n" +
	          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	          vm
	        );
	      }
	      if (compiled.tips && compiled.tips.length) {
	        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	      }
	    }
	
	    // turn code into functions
	    var res = {};
	    var fnGenErrors = [];
	    res.render = makeFunction(compiled.render, fnGenErrors);
	    var l = compiled.staticRenderFns.length;
	    res.staticRenderFns = new Array(l);
	    for (var i = 0; i < l; i++) {
	      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
	    }
	
	    // check function generation errors.
	    // this should only happen if there is a bug in the compiler itself.
	    // mostly for codegen development use
	    /* istanbul ignore if */
	    {
	      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	        warn(
	          "Failed to generate render function:\n\n" +
	          fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;
	
	            return ((err.toString()) + " in\n\n" + code + "\n");
	        }).join('\n'),
	          vm
	        );
	      }
	    }
	
	    return (functionCompileCache[key] = res)
	  }
	
	  return {
	    compile: compile,
	    compileToFunctions: compileToFunctions
	  }
	}
	
	/*  */
	
	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}
	
	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}
	
	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};
	
	/*  */
	
	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }
	
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}
	
	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}
	
	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};
	
	var modules$1 = [
	  klass$1,
	  style$1
	];
	
	/*  */
	
	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	/*  */
	
	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	var directives$1 = {
	  model: model,
	  text: text,
	  html: html
	};
	
	/*  */
	
	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  directives: directives$1,
	  isPreTag: isPreTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  canBeLeftOpenTag: canBeLeftOpenTag,
	  isReservedTag: isReservedTag,
	  getTagNamespace: getTagNamespace,
	  staticKeys: genStaticKeys(modules$1)
	};
	
	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;
	
	/*  */
	
	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});
	
	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);
	
	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }
	
	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile');
	      }
	
	      var ref = compileToFunctions(template, {
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile end');
	        measure(((this._name) + " compile"), 'compile', 'compile end');
	      }
	    }
	  }
	  return mount.call(this, el, hydrating)
	};
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}
	
	Vue$3.compile = compileToFunctions;
	
	return Vue$3;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = undefined;
	
	var _typeof2 = __webpack_require__(108);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _alert = __webpack_require__(43);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	var _plugin_helper = __webpack_require__(191);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $vm = void 0;
	
	var plugin = {
	  install: function install(Vue) {
	    if (!$vm) {
	      var Alert = Vue.extend(_alert2.default);
	      $vm = new Alert({
	        el: document.createElement('div')
	      });
	      document.body.appendChild($vm.$el);
	    }
	
	    var alert = {
	      show: function show() {
	        var _this = this;
	
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
	          (0, _plugin_helper.mergeOptions)($vm, options);
	        } else if (typeof options === 'string') {
	          $vm.content = options;
	        }
	        this.watcher && this.watcher();
	        this.watcher = $vm.$watch('showValue', function (val) {
	          val && options.onShow && options.onShow($vm);
	          if (val === false && options.onHide) {
	            options.onHide($vm);
	            _this.watcher && _this.watcher();
	          }
	        });
	        $vm.showValue = true;
	      },
	      hide: function hide() {
	        $vm.showValue = false;
	        this.watcher && this.watcher();
	        this.watcher = null;
	      }
	    };
	
	    if (!Vue.$vux) {
	      Vue.$vux = {
	        alert: alert
	      };
	    } else {
	      Vue.$vux.alert = alert;
	    }
	
	    Vue.mixin({
	      created: function created() {
	        this.$vux = Vue.$vux;
	      }
	    });
	  }
	};
	
	exports.default = plugin;
	var install = exports.install = plugin.install;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = undefined;
	
	var _typeof2 = __webpack_require__(108);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _toast = __webpack_require__(39);
	
	var _toast2 = _interopRequireDefault(_toast);
	
	var _plugin_helper = __webpack_require__(191);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $vm = void 0;
	var watcher = void 0;
	
	var plugin = {
	  install: function install(vue) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var Toast = vue.extend(_toast2.default);
	
	    if (!$vm) {
	      $vm = new Toast({
	        el: document.createElement('div')
	      });
	      document.body.appendChild($vm.$el);
	    }
	
	    var defaults = {};
	    for (var i in $vm.$options.props) {
	      if (i !== 'value') {
	        defaults[i] = $vm.$options.props[i].default;
	      }
	    }
	
	    var toast = {
	      show: function show() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        watcher && watcher();
	        if (typeof options === 'string') {
	          $vm.text = options;
	        } else if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
	          (0, _plugin_helper.mergeOptions)($vm, options);
	        }
	        if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object' && options.onShow || options.onHide) {
	          watcher = $vm.$watch('show', function (val) {
	            val && options.onShow && options.onShow($vm);
	            val === false && options.onHide && options.onHide($vm);
	          });
	        }
	        $vm.show = true;
	      },
	      hide: function hide() {
	        $vm.show = false;
	      }
	    };
	
	    if (!vue.$vux) {
	      vue.$vux = {
	        toast: toast
	      };
	    } else {
	      vue.$vux.toast = toast;
	    }
	
	    vue.mixin({
	      created: function created() {
	        this.$vux = vue.$vux;
	      }
	    });
	  }
	};
	
	exports.default = plugin;
	var install = exports.install = plugin.install;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * vue-resource v1.3.1
	 * https://github.com/pagekit/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;
	
	function Promise$1(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0, result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$1.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	/**
	 * Promise adapter.
	 */
	
	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}
	
	function PromiseObj(executor, context) {
	
	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};
	
	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};
	
	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};
	
	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};
	
	var p = PromiseObj.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return Promise.reject(reason);
	        }
	    );
	};
	
	/**
	 * Utility functions.
	 */
	
	var ref = {};
	var hasOwnProperty = ref.hasOwnProperty;
	
	var ref$1 = [];
	var slice = ref$1.slice;
	var debug = false;
	var ntick;
	
	var inBrowser = typeof window !== 'undefined';
	
	var Util = function (ref) {
	    var config = ref.config;
	    var nextTick = ref.nextTick;
	
	    ntick = nextTick;
	    debug = config.debug || !config.silent;
	};
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return ntick(cb, ctx);
	}
	
	function trim(str) {
	    return str ? str.replace(/^\s*|\s*$/g, '') : '';
	}
	
	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}
	
	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}
	
	var isArray = Array.isArray;
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}
	
	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = PromiseObj.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (isArray(obj)) {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	var assign = Object.assign || _assign;
	
	function merge(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });
	
	    return target;
	}
	
	function defaults(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	
	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	
	    });
	
	    return target;
	}
	
	function _assign(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	/**
	 * Root Prefix Transform.
	 */
	
	var root = function (options$$1, next) {
	
	    var url = next(options$$1);
	
	    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
	        url = options$$1.root + '/' + url;
	    }
	
	    return url;
	};
	
	/**
	 * Query Parameter Transform.
	 */
	
	var query = function (options$$1, next) {
	
	    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);
	
	    each(options$$1.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	};
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url), expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];
	
	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null, values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key], result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	/**
	 * URL Template (RFC 6570) Transform.
	 */
	
	var template = function (options) {
	
	    var variables = [], url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};
	
	/**
	 * Service for URL templating.
	 */
	
	function Url(url, params) {
	
	    var self = this || {}, options$$1 = url, transform;
	
	    if (isString(url)) {
	        options$$1 = {url: url, params: params};
	    }
	
	    options$$1 = merge({}, Url.options, self.$options, options$$1);
	
	    Url.transforms.forEach(function (handler) {
	
	        if (isString(handler)) {
	            handler = Url.transform[handler];
	        }
	
	        if (isFunction(handler)) {
	            transform = factory(handler, transform, self.$vm);
	        }
	
	    });
	
	    return transform(options$$1);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transform = {template: template, query: query, root: root};
	Url.transforms = ['template', 'query', 'root'];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [], escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    var el = document.createElement('a');
	
	    if (document.documentMode) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options$$1) {
	        return handler.call(vm, options$$1, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj), plain = isPlainObject(obj), hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	/**
	 * XDomain client (Internet Explorer).
	 */
	
	var xdrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xdr = new XDomainRequest(), handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            resolve(request.respondWith(xdr.responseText, {status: status}));
	        };
	
	        request.abort = function () { return xdr.abort(); };
	
	        xdr.open(request.method, request.getUrl());
	
	        if (request.timeout) {
	            xdr.timeout = request.timeout;
	        }
	
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	};
	
	/**
	 * CORS Interceptor.
	 */
	
	var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();
	
	var cors = function (request, next) {
	
	    if (inBrowser) {
	
	        var orgUrl = Url.parse(location.href);
	        var reqUrl = Url.parse(request.getUrl());
	
	        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {
	
	            request.crossOrigin = true;
	            request.emulateHTTP = false;
	
	            if (!SUPPORTS_CORS) {
	                request.client = xdrClient;
	            }
	        }
	    }
	
	    next();
	};
	
	/**
	 * Body Interceptor.
	 */
	
	var body = function (request, next) {
	
	    if (isFormData(request.body)) {
	
	        request.headers.delete('Content-Type');
	
	    } else if (isObject(request.body) || isArray(request.body)) {
	
	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }
	
	    next(function (response) {
	
	        Object.defineProperty(response, 'data', {
	
	            get: function get() {
	                return this.body;
	            },
	
	            set: function set(body) {
	                this.body = body;
	            }
	
	        });
	
	        return response.bodyText ? when(response.text(), function (text) {
	
	            var type = response.headers.get('Content-Type') || '';
	
	            if (type.indexOf('application/json') === 0 || isJson(text)) {
	
	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	
	            } else {
	                response.body = text;
	            }
	
	            return response;
	
	        }) : response;
	
	    });
	};
	
	function isJson(str) {
	
	    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};
	
	    return start && end[start[0]].test(str);
	}
	
	/**
	 * JSONP client (Browser).
	 */
	
	var jsonpClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;
	
	        handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            if (status && window[callback]) {
	                delete window[callback];
	                document.body.removeChild(script);
	            }
	
	            resolve(request.respondWith(body, {status: status}));
	        };
	
	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };
	
	        request.abort = function () {
	            handler({type: 'abort'});
	        };
	
	        request.params[name] = callback;
	
	        if (request.timeout) {
	            setTimeout(request.abort, request.timeout);
	        }
	
	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	};
	
	/**
	 * JSONP Interceptor.
	 */
	
	var jsonp = function (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next();
	};
	
	/**
	 * Before Interceptor.
	 */
	
	var before = function (request, next) {
	
	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }
	
	    next();
	};
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	var method = function (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }
	
	    next();
	};
	
	/**
	 * Header Interceptor.
	 */
	
	var header = function (request, next) {
	
	    var headers = assign({}, Http.headers.common,
	        !request.crossOrigin ? Http.headers.custom : {},
	        Http.headers[toLower(request.method)]
	    );
	
	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });
	
	    next();
	};
	
	/**
	 * XMLHttp client (Browser).
	 */
	
	var xhrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xhr = new XMLHttpRequest(), handler = function (event) {
	
	            var response = request.respondWith(
	                'response' in xhr ? xhr.response : xhr.responseText, {
	                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	                }
	            );
	
	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () { return xhr.abort(); };
	
	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }
	
	        xhr.open(request.method, request.getUrl(), true);
	
	        if (request.timeout) {
	            xhr.timeout = request.timeout;
	        }
	
	        if (request.responseType && 'responseType' in xhr) {
	            xhr.responseType = request.responseType;
	        }
	
	        if (request.withCredentials || request.credentials) {
	            xhr.withCredentials = true;
	        }
	
	        if (!request.crossOrigin) {
	            request.headers.set('X-Requested-With', 'XMLHttpRequest');
	        }
	
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = handler;
	        xhr.send(request.getBody());
	    });
	};
	
	/**
	 * Http client (Node).
	 */
	
	var nodeClient = function (request) {
	
	    var client = __webpack_require__(46);
	
	    return new PromiseObj(function (resolve) {
	
	        var url = request.getUrl();
	        var body = request.getBody();
	        var method = request.method;
	        var headers = {}, handler;
	
	        request.headers.forEach(function (value, name) {
	            headers[name] = value;
	        });
	
	        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {
	
	            var response = request.respondWith(resp.body, {
	                    status: resp.statusCode,
	                    statusText: trim(resp.statusMessage)
	                }
	            );
	
	            each(resp.headers, function (value, name) {
	                response.headers.set(name, value);
	            });
	
	            resolve(response);
	
	        }, function (error$$1) { return handler(error$$1.response); });
	    });
	};
	
	/**
	 * Base client.
	 */
	
	var Client = function (context) {
	
	    var reqHandlers = [sendRequest], resHandlers = [], handler;
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new PromiseObj(function (resolve) {
	
	            function exec() {
	
	                handler = reqHandlers.pop();
	
	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
	                    next();
	                }
	            }
	
	            function next(response) {
	
	                if (isFunction(response)) {
	
	                    resHandlers.unshift(response);
	
	                } else if (isObject(response)) {
	
	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });
	
	                    when(response, resolve);
	
	                    return;
	                }
	
	                exec();
	            }
	
	            exec();
	
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	};
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || (inBrowser ? xhrClient : nodeClient);
	
	    resolve(client(request));
	}
	
	/**
	 * HTTP Headers.
	 */
	
	var Headers = function Headers(headers) {
	    var this$1 = this;
	
	
	    this.map = {};
	
	    each(headers, function (value, name) { return this$1.append(name, value); });
	};
	
	Headers.prototype.has = function has (name) {
	    return getName(this.map, name) !== null;
	};
	
	Headers.prototype.get = function get (name) {
	
	    var list = this.map[getName(this.map, name)];
	
	    return list ? list.join() : null;
	};
	
	Headers.prototype.getAll = function getAll (name) {
	    return this.map[getName(this.map, name)] || [];
	};
	
	Headers.prototype.set = function set (name, value) {
	    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	};
	
	Headers.prototype.append = function append (name, value){
	
	    var list = this.map[getName(this.map, name)];
	
	    if (list) {
	        list.push(trim(value));
	    } else {
	        this.set(name, value);
	    }
	};
	
	Headers.prototype.delete = function delete$1 (name){
	    delete this.map[getName(this.map, name)];
	};
	
	Headers.prototype.deleteAll = function deleteAll (){
	    this.map = {};
	};
	
	Headers.prototype.forEach = function forEach (callback, thisArg) {
	        var this$1 = this;
	
	    each(this.map, function (list, name) {
	        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
	    });
	};
	
	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}
	
	function normalizeName(name) {
	
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	
	    return trim(name);
	}
	
	/**
	 * HTTP Response.
	 */
	
	var Response = function Response(body, ref) {
	    var url = ref.url;
	    var headers = ref.headers;
	    var status = ref.status;
	    var statusText = ref.statusText;
	
	
	    this.url = url;
	    this.ok = status >= 200 && status < 300;
	    this.status = status || 0;
	    this.statusText = statusText || '';
	    this.headers = new Headers(headers);
	    this.body = body;
	
	    if (isString(body)) {
	
	        this.bodyText = body;
	
	    } else if (isBlob(body)) {
	
	        this.bodyBlob = body;
	
	        if (isBlobText(body)) {
	            this.bodyText = blobText(body);
	        }
	    }
	};
	
	Response.prototype.blob = function blob () {
	    return when(this.bodyBlob);
	};
	
	Response.prototype.text = function text () {
	    return when(this.bodyText);
	};
	
	Response.prototype.json = function json () {
	    return when(this.text(), function (text) { return JSON.parse(text); });
	};
	
	function blobText(body) {
	    return new PromiseObj(function (resolve) {
	
	        var reader = new FileReader();
	
	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	
	    });
	}
	
	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}
	
	/**
	 * HTTP Request.
	 */
	
	var Request = function Request(options$$1) {
	
	    this.body = null;
	    this.params = {};
	
	    assign(this, options$$1, {
	        method: toUpper(options$$1.method || 'GET')
	    });
	
	    if (!(this.headers instanceof Headers)) {
	        this.headers = new Headers(this.headers);
	    }
	};
	
	Request.prototype.getUrl = function getUrl (){
	    return Url(this);
	};
	
	Request.prototype.getBody = function getBody (){
	    return this.body;
	};
	
	Request.prototype.respondWith = function respondWith (body, options$$1) {
	    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
	};
	
	/**
	 * Service for sending network requests.
	 */
	
	var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
	var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};
	
	function Http(options$$1) {
	
	    var self = this || {}, client = Client(self.$vm);
	
	    defaults(options$$1 || {}, self.$options, Http.options);
	
	    Http.interceptors.forEach(function (handler) {
	
	        if (isString(handler)) {
	            handler = Http.interceptor[handler];
	        }
	
	        if (isFunction(handler)) {
	            client.use(handler);
	        }
	
	    });
	
	    return client(new Request(options$$1)).then(function (response) {
	
	        return response.ok ? response : PromiseObj.reject(response);
	
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return PromiseObj.reject(response);
	    });
	}
	
	Http.options = {};
	
	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    common: COMMON_HEADERS,
	    custom: {}
	};
	
	Http.interceptor = {before: before, method: method, body: body, jsonp: jsonp, header: header, cors: cors};
	Http.interceptors = ['before', 'method', 'body', 'jsonp', 'header', 'cors'];
	
	['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
	    };
	
	});
	
	['post', 'put', 'patch'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, body$$1, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
	    };
	
	});
	
	/**
	 * Service for interacting with RESTful services.
	 */
	
	function Resource(url, params, actions, options$$1) {
	
	    var self = this || {}, resource = {};
	
	    actions = assign({},
	        Resource.actions,
	        actions
	    );
	
	    each(actions, function (action, name) {
	
	        action = merge({url: url, params: assign({}, params)}, options$$1, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options$$1 = assign({}, action), params = {}, body;
	
	    switch (args.length) {
	
	        case 2:
	
	            params = args[0];
	            body = args[1];
	
	            break;
	
	        case 1:
	
	            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
	    }
	
	    options$$1.body = body;
	    options$$1.params = assign({}, options$$1.params, params);
	
	    return options$$1;
	}
	
	Resource.actions = {
	
	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}
	
	};
	
	/**
	 * Install plugin.
	 */
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function get() {
	                var this$1 = this;
	
	                return function (executor) { return new Vue.Promise(executor, this$1); };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;


/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  mounted: function mounted() {
	    this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling');
	  },
	
	  methods: {
	    fixSafariOverflowScrolling: function fixSafariOverflowScrolling(type) {
	      if (!this.$overflowScrollingList.length) return;
	
	      for (var i = 0; i < this.$overflowScrollingList.length; i++) {
	        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
	      }
	    }
	  }
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(283);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(402), __esModule: true };

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports) {

	'use strict';
	
	var Cookie = module.exports;
	
	var decode = decodeURIComponent;
	var encode = encodeURIComponent;
	
	Cookie.get = function (name, options) {
	  validateCookieName(name);
	
	  if (typeof options === 'function') {
	    options = {
	      converter: options
	    };
	  } else {
	    options = options || {};
	  }
	
	  var cookies = parseCookieString(document.cookie, !options['raw']);
	  return (options.converter || same)(cookies[name]);
	};
	
	Cookie.set = function (name, value, options) {
	  validateCookieName(name);
	
	  options = options || {};
	  var expires = options['expires'];
	  var domain = options['domain'];
	  var path = options['path'];
	
	  if (!options['raw']) {
	    value = encode(String(value));
	  }
	
	  var text = name + '=' + value;
	
	  var date = expires;
	  if (typeof date === 'number') {
	    date = new Date();
	    date.setDate(date.getDate() + expires);
	  }
	  if (date instanceof Date) {
	    text += '; expires=' + date.toUTCString();
	  }
	
	  if (isNonEmptyString(domain)) {
	    text += '; domain=' + domain;
	  }
	
	  if (isNonEmptyString(path)) {
	    text += '; path=' + path;
	  }
	
	  if (options['secure']) {
	    text += '; secure';
	  }
	
	  document.cookie = text;
	  return text;
	};
	
	Cookie.remove = function (name, options) {
	  options = options || {};
	  options['expires'] = new Date(0);
	  return this.set(name, '', options);
	};
	
	function parseCookieString(text, shouldDecode) {
	  var cookies = {};
	
	  if (isString(text) && text.length > 0) {
	
	    var decodeValue = shouldDecode ? decode : same;
	    var cookieParts = text.split(/;\s/g);
	    var cookieName;
	    var cookieValue;
	    var cookieNameValue;
	
	    for (var i = 0, len = cookieParts.length; i < len; i++) {
	      cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
	      if (cookieNameValue instanceof Array) {
	        try {
	          cookieName = decode(cookieNameValue[1]);
	          cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length + 1));
	        } catch (ex) {}
	      } else {
	        cookieName = decode(cookieParts[i]);
	        cookieValue = '';
	      }
	
	      if (cookieName) {
	        cookies[cookieName] = cookieValue;
	      }
	    }
	  }
	
	  return cookies;
	}
	
	function isString(o) {
	  return typeof o === 'string';
	}
	
	function isNonEmptyString(s) {
	  return isString(s) && s !== '';
	}
	
	function validateCookieName(name) {
	  if (!isNonEmptyString(name)) {
	    throw new TypeError('Cookie name must be a non-empty string');
	  }
	}
	
	function same(s) {
	  return s;
	}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';
	
	var QueryString = exports;
	
	QueryString.escape = encodeURIComponent;
	
	QueryString.unescape = function (s) {
	  return decodeURIComponent(s.replace(/\+/g, ' '));
	};
	
	QueryString.stringify = function (obj, sep, eq, arrayKey) {
	  if (!isPlainObject(obj)) return '';
	
	  sep = sep || '&';
	  eq = eq || '=';
	  arrayKey = arrayKey || false;
	
	  var buf = [],
	      key,
	      val;
	  var escape = QueryString.escape;
	
	  for (key in obj) {
	    if (!hasOwnProperty.call(obj, key)) continue;
	
	    val = obj[key];
	    key = QueryString.escape(key);
	
	    if (isPrimitive(val)) {
	      buf.push(key, eq, escape(val + ''), sep);
	    } else if (isArray(val) && val.length) {
	        for (var i = 0; i < val.length; i++) {
	          if (isPrimitive(val[i])) {
	            buf.push(key, (arrayKey ? escape('[]') : '') + eq, escape(val[i] + ''), sep);
	          }
	        }
	      } else {
	          buf.push(key, eq, sep);
	        }
	  }
	
	  buf.pop();
	  return buf.join('');
	};
	
	QueryString.parse = function (str, sep, eq) {
	  if (typeof str === 'undefined') {
	    str = document.location.search;
	  }
	  var ret = {};
	
	  if (typeof str !== 'string' || trim(str).length === 0) {
	    return ret;
	  }
	
	  str = str.replace(/^\?/, '');
	
	  var pairs = str.split(sep || '&');
	  eq = eq || '=';
	  var unescape = QueryString.unescape;
	
	  for (var i = 0; i < pairs.length; i++) {
	
	    var pair = pairs[i].split(eq);
	    var key = unescape(trim(pair[0]));
	    var val = unescape(trim(pair.slice(1).join(eq)));
	
	    var m = key.match(/^(\w+)\[\]$/);
	    if (m && m[1]) {
	      key = m[1];
	    }
	
	    if (hasOwnProperty.call(ret, key)) {
	      if (!isArray(ret[key])) {
	        ret[key] = [ret[key]];
	      }
	      ret[key].push(val);
	    } else {
	      ret[key] = m ? [val] : val;
	    }
	  }
	
	  return ret;
	};
	
	var toString = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray || function (val) {
	  return toString.call(val) === '[object Array]';
	};
	var trim = String.prototype.trim ? function (str) {
	  return str == null ? '' : String.prototype.trim.call(str);
	} : function (str) {
	  return str == null ? '' : str.toString().replace(/^\s+/, '').replace(/\s+$/, '');
	};
	
	function isPlainObject(o) {
	  return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
	}
	
	function isPrimitive(o) {
	  return o !== Object(o);
	}

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(108);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.go = go;
	exports.getUrl = getUrl;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function go(url, $router) {
	  if (/^javas/.test(url) || !url) return;
	  var useRouter = (typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object' || $router && typeof url === 'string' && !/http/.test(url);
	  if (useRouter) {
	    $router.push(url);
	  } else {
	    window.location.href = url;
	  }
	}
	
	function getUrl(url, $router) {
	  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
	    return '#!' + url;
	  }
	  return url && (typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) !== 'object' ? url : 'javascript:void(0);';
	}

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return {
	    title: [String, Number],
	    value: [String, Number, Array],
	    isLink: Boolean,
	    isLoading: Boolean,
	    inlineDesc: [String, Number],
	    primary: {
	      type: String,
	      default: 'title'
	    },
	    link: [String, Object],
	    valueAlign: [String, Boolean, Number],
	    borderIntent: {
	      type: Boolean,
	      default: true
	    },
	    arrowDirection: String };
	};

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
		EMPTY = '';
	
	var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
		trim = String.prototype.trim;
	
	var _trim = trim ?
		function(str) {
			return str == null ? EMPTY : trim.call(str);
		} : function(str) {
			return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY);
		};
	
	function upperCase() {
		return arguments[1].toUpperCase();
	}
	
	function Empty() {}
	
	function createObject(proto, constructor) {
		var newProto;
		if (Object.create) {
			newProto = Object.create(proto);
		} else {
			Empty.prototype = proto;
			newProto = new Empty();
		}
		newProto.constructor = constructor;
		return newProto;
	}
	
	function getNodes(node, rootNode) {
		if (!node) return;
		if (node.nodeType) return [node];
		var rootNode = rootNode && rootNode.nodeType ? rootNode : document;
		if (node && typeof node === "string") {
			return rootNode.querySelectorAll(node);
		}
		return;
	}
	
	// Useful for temporary DOM ids.
	var idCounter = 0;
	
	var getOffsetTop = function(el) {
		var offset = el.offsetTop;
		if (el.offsetParent != null) offset += getOffsetTop(el.offsetParent);
		return offset;
	};
	var getOffsetLeft = function(el) {
		var offset = el.offsetLeft;
		if (el.offsetParent != null) offset += getOffsetLeft(el.offsetParent);
		return offset;
	};
	
	var Util = {
		// Is a given variable an object?
		isObject: function(obj) {
			return obj === Object(obj);
		},
		isArray: Array.isArray || function(obj) {
			return toString.call(obj) == '[object Array]';
		},
		// Is a given array, string, or object empty?
		// An "empty" object has no enumerable own-properties.
		isEmpty: function(obj) {
			if (obj == null) return true;
			if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
			for (var key in obj)
				if (this.has(obj, key)) return false;
			return true;
		},
		mix: function(to, from, deep) {
			for (var i in from) {
				to[i] = from[i];
			}
			return to;
		},
		extend: function(r, s, px, sx) {
			if (!s || !r) {
				return r;
			}
			var sp = s.prototype,
				rp;
			// add prototype chain
			rp = createObject(sp, r);
			r.prototype = this.mix(rp, r.prototype);
			r.superclass = createObject(sp, s);
			// add prototype overrides
			if (px) {
				this.mix(rp, px);
			}
			// add object overrides
			if (sx) {
				this.mix(r, sx);
			}
			return r;
		},
		/**
		 * test whether a string start with a specified substring
		 * @param {String} str the whole string
		 * @param {String} prefix a specified substring
		 * @return {Boolean} whether str start with prefix
		 * @member util
		 */
		startsWith: function(str, prefix) {
			return str.lastIndexOf(prefix, 0) === 0;
		},
	
		/**
		 * test whether a string end with a specified substring
		 * @param {String} str the whole string
		 * @param {String} suffix a specified substring
		 * @return {Boolean} whether str end with suffix
		 * @member util
		 */
		endsWith: function(str, suffix) {
			var ind = str.length - suffix.length;
			return ind >= 0 && str.indexOf(suffix, ind) === ind;
		},
		/**
		 * Removes the whitespace from the beginning and end of a string.
		 * @method
		 * @member util
		 */
		trim: _trim,
		/**
		 * Substitutes keywords in a string using an object/array.
		 * Removes undef keywords and ignores escaped keywords.
		 * @param {String} str template string
		 * @param {Object} o json data
		 * @member util
		 * @param {RegExp} [regexp] to match a piece of template string
		 */
		substitute: function(str, o, regexp) {
			if (typeof str !== 'string' || !o) {
				return str;
			}
	
			return str.replace(regexp || SUBSTITUTE_REG, function(match, name) {
				if (match.charAt(0) === '\\') {
					return match.slice(1);
				}
				return (o[name] === undefined) ? EMPTY : o[name];
			});
		},
		/**
		 * vendors
		 * @return { String } webkit|moz|ms|o
		 * @memberOf Util
		 */
		vendor: (function() {
			var el = document.createElement('div').style;
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
			}
			return false;
		})(),
		/**
		 *  add vendor to attribute
		 *  @memberOf Util
		 *  @param {String} attrName name of attribute
		 *  @return { String }
		 **/
		prefixStyle: function(attrName) {
			if (this.vendor === false) return false;
			if (this.vendor === '') return attrName;
			return this.vendor + attrName.charAt(0).toUpperCase() + attrName.substr(1);
		},
		/**
		 * judge if has class
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 * @return {Boolean}
		 */
		hasClass: function(el, className) {
			return el && el.className && className && el.className.indexOf(className) != -1;
		},
		/**
		 * add className for the element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 */
		addClass: function(el, className) {
			if (el && className && !this.hasClass(el, className)) {
				el.className += " " + className;
			}
		},
		/**
		 * remove className for the element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 */
		removeClass: function(el, className) {
			if (el && el.className && className) {
				el.className = el.className.replace(className, "");
			}
		},
		/**
		 * remove an element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 */
		remove: function(el) {
			if (!el || !el.parentNode) return;
			el.parentNode.removeChild(el);
		},
		/**
		 * get offset top
		 * @memberOf Util
		 * @param  {HTMLElement}   el
		 * @return {Number} offsetTop
		 */
		getOffsetTop: getOffsetTop,
		/**
		 * get offset left
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @return {Number} offsetLeft
		 */
		getOffsetLeft: getOffsetLeft,
		/**
		 * get offset left
		 * @memberOf Util
		 * @param  {HTMLElement} el
		 * @param  {String} selector
		 * @param  {HTMLElement} rootNode
		 * @return {HTMLElement} parent element
		 */
		findParentEl: function(el, selector, rootNode) {
			var rs = null,
				parent = null;
			var type = /^#/.test(selector) ? "id" : /^\./.test(selector) ? "class" : "tag";
			var sel = selector.replace(/\.|#/g, "");
			if (rootNode && typeof rootNode === "string") {
				rootNode = document.querySelector(rootNode);
			}
			rootNode = rootNode || document.body;
			if (!el || !selector) return;
			if (type == "class" && el.className && el.className.match(sel)) {
				return el;
			} else if (type == "id" && el.id && _trim(el.id) == sel) {
				return el;
			} else if (type == "tag" && el.tagName.toLowerCase() == sel) {
				return el;
			}
			while (!rs) {
				if (parent == rootNode) break;
				parent = el.parentNode;
				if (!parent) break;
				if ((type == "class" && parent.className && parent.className.match(sel)) || (type == "id" && parent.id && _trim(parent.id) == sel) || (type == "tag" && parent.tagName && parent.tagName.toLowerCase() == sel)) {
					rs = parent
					return rs;
					break;
				} else {
					el = parent;
				}
			}
			return null;
		},
		/**
		 * Generate a unique integer id (unique within the entire client session).
		 * @param  {String} prefix
		 * @return {String} guid
		 */
		guid: function(prefix) {
			var id = ++idCounter + '';
			return prefix ? prefix + id : id;
		},
		/**
		 * judge if is an android os
		 * @return {Boolean} [description]
		 */
		isAndroid: function() {
			return /Android /.test(window.navigator.appVersion);
		},
		/**
		 * judge if is an android device with low  performance
		 * @return {Boolean}
		 */
		isBadAndroid: function() {
			return /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion))
		},
		px2Num: function(px) {
			return Number(px.replace(/px/, ''));
		},
		getNodes: getNodes,
		getNode: function(node, rootNode) {
			var nodes = getNodes(node, rootNode);
			return nodes && nodes[0];
		},
		stringifyStyle: function(style) {
			var styleStr = "";
			for (var i in style) {
				styleStr += [i, ":", style[i], ";"].join("");
			}
			return styleStr;
		}
	}
	
	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	var names = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
	for (var i = 0; i < names.length; i++) {
		Util['is' + names[i]] = function(obj) {
			return toString.call(obj) == '[object ' + names[i] + ']';
		};
	}
	
	if (typeof module == 'object' && module.exports) {
		module.exports = Util;
	}
	/** ignored by jsdoc **/
	else {
		return Util;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(397), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(201)('wks')
	  , uid        = __webpack_require__(173)
	  , Symbol     = __webpack_require__(95).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(249);
	var isBuffer = __webpack_require__(506);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 96 */,
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Events = __webpack_require__(690);
	/** 
	      @constructor 
	      @mixes Events
	      */
	var Base = function() {}
	
	Util.mix(Base.prototype, Events);
	
	Util.mix(Base.prototype, {
		/**
		 * @memberof Base
		 * @param  {object} plugin plug a plugin
		 */
		plug: function(plugin) {
			var self = this;
			if (!plugin || !plugin.pluginId) return;
			if (!self.__plugins) {
				self.__plugins = [];
			}
			var __plugin = self.getPlugin(plugin.pluginId);
			__plugin && self.unplug(plugin.pluginId);
			plugin.pluginInitializer(self);
			self.__plugins.push(plugin);
			return self;
		},
		/**
		 * @memberof Base
		 * @param  {object|string} plugin unplug a plugin by pluginId or plugin instance
		 */
		unplug: function(plugin) {
			var self = this;
			if (!plugin || !self.__plugins) return;
			var _plugin = typeof plugin == "string" ? self.getPlugin(plugin) : plugin;
			_plugin.pluginDestructor(self);
			for (var i = 0, l = self.__plugins.length;i < l;i++) {
				if (self.__plugins[i] == _plugin) {
					return self.__plugins.splice(i, 1);
				}
			}
		},
		/**
		 * @memberof Base
		 * @param  {object|string} plugin get plugin by pluginId
		 */
		getPlugin: function(pluginId) {
			var self = this;
			var plugins = [];
			if(!self.__plugins) return;
			for (var i = 0, l = self.__plugins.length;i < l;i++) {
				if (self.__plugins[i] && self.__plugins[i].pluginId == pluginId) {
					plugins.push(self.__plugins[i])
				}
			}
			return plugins.length > 1 ? plugins : plugins[0] || null;
		}
	});
	
	if (typeof module == 'object' && module.exports) {
		module.exports = Base;
	}
	/** ignored by jsdoc **/
	else {
		return Base;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Base = __webpack_require__(97);
	var clsPrefix;
	var containerCls;
	var content = "Pull Down To Refresh";
	var loadingContent = "Loading...";
	/**
	 * A pulldown to refresh plugin for xscroll.
	 * @constructor
	 * @param {object} cfg
	 * @param {number} cfg.height
	 * @param {string} cfg.content default html for pulldown
	 * @param {string} cfg.downContent html for pulldown when scrollTop is smaller than cfg.height
	 * @param {string} cfg.upContent html for pulldown when scrollTop is larger than cfg.height
	 * @param {string} cfg.loadingContent html for pulldown when released
	 * @param {string} cfg.clsPrefix  class prefix which default value is "xs-plugin-pulldown-"
	 * @extends {Base}
	 */
	var PullDown = function(cfg) {
		PullDown.superclass.constructor.call(this, cfg);
		this.userConfig = Util.mix({
			content: content,
			height: 60,
			autoRefresh: true,
			downContent: "Pull Down To Refresh",
			upContent: "Release To Refresh",
			loadingContent: loadingContent,
			clsPrefix: "xs-plugin-pulldown-"
		}, cfg);
	}
	Util.extend(PullDown, Base, {
		/**
		 * a pluginId
		 * @memberOf PullDown
		 * @type {string}
		 */
		pluginId: "pulldown",
		/**
		 * plugin initializer
		 * @memberOf PullDown
		 * @override Base
		 * @return {PullDown}
		 */
		pluginInitializer: function(xscroll) {
			var self = this;
			self.xscroll = xscroll.render();
			clsPrefix = self.userConfig.clsPrefix;
			self.render();
			return self;
		},
		/**
		 * detroy the plugin
		 * @memberOf PullDown
		 * @override Base
		 * @return {PullDown}
		 */
		pluginDestructor: function() {
			var self = this;
			Util.remove(self.pulldown);
			self.xscroll.off("panstart", self._panStartHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.off("panend", self._panEndHandler, self);
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * render pulldown plugin
		 * @memberOf PullDown
		 * @return {PullDown}
		 */
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;
	
			if (!self.userConfig.container) {
				var containerCls = clsPrefix + "container";
				var height = self.userConfig.height || 60;
				var pulldown = self.pulldown = document.createElement("div");
				pulldown.className = containerCls;
				pulldown.style.position = "absolute";
				pulldown.style.width = "100%";
				pulldown.style.height = height + "px";
				pulldown.style.lineHeight = height + "px";
				pulldown.style.top = -height + "px";
				pulldown.style.textAlign = "center";
				self.xscroll.container.appendChild(pulldown);
				self.status = 'up';
				Util.addClass(pulldown, clsPrefix + self.status);
				pulldown.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
			} else {
				// has customed container
				self.pulldown = self.userConfig.container
			}
			
			self._bindEvt();
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self._evtBinded) return;
			self._evtBinded = true;
			var pulldown = self.pulldown;
			var xscroll = self.xscroll;
			xscroll.on("pan", self._panHandler, self);
			xscroll.on("panstart", self._panStartHandler, self);
			xscroll.on("panend", self._panEndHandler, self);
		},
		_changeStatus: function(status) {
			var prevVal = this.status;
			this.status = status;
			if (!this.userConfig.container) {
				Util.removeClass(this.pulldown, clsPrefix + prevVal)
				Util.addClass(this.pulldown, clsPrefix + status);
				if (this.userConfig[status + "Content"]) {
					this.pulldown.innerHTML = this.userConfig[status + "Content"];
				}
			}
			if (prevVal != status) {
				this.trigger("statuschange", {
					prevVal: prevVal,
					newVal: status
				});
				if (status == "loading") {
					this.trigger("loading");
				}
			}
		},
		/**
		 * reset the pulldown plugin
		 * @memberOf PullDown
		 * @param {function} callback
		 * @return {PullDown}
		 */
		reset: function(callback) {
			this.xscroll.boundry.resetTop()
			this.xscroll.boundryCheckY(callback);
			this._expanded = false;
			return this;
		},
		_panStartHandler: function(e) {
			clearTimeout(this.loadingItv);
		},
		_panHandler: function(e) {
			var self = this;
			var scrollTop = self.xscroll.getScrollTop();
			if (scrollTop > 0) return;
			self._changeStatus(Math.abs(scrollTop) < self.userConfig.height ? "down" : "up");
		},
		_panEndHandler: function(e) {
			var self = this;
			var xscroll = self.xscroll;
			var height = self.userConfig.height || 60;
			var scrollTop = xscroll.getScrollTop();
			if (scrollTop < -height) {
				//prevent default bounce
				e.preventDefault();
				xscroll.boundry.resetTop();
				self._changeStatus("loading");
				xscroll.boundry.expandTop(height);
				xscroll.boundryCheckY(function() {
				});
				if (self.userConfig.autoRefresh) {
					clearTimeout(self.loadingItv);
					self.loadingItv = setTimeout(function() {
						xscroll.boundry.resetTop();
						xscroll.boundryCheckY(function() {
							window.location.reload();
						})
					}, 800);
				}
			}
		}
	});
	
	if (typeof module == 'object' && module.exports) {
		module.exports = PullDown;
	}
	/** ignored by jsdoc **/
	else if (window.XScroll && window.XScroll.Plugins) {
		return XScroll.Plugins.PullDown = PullDown;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Base = __webpack_require__(97);
	var clsPrefix;
	var containerCls;
	var loadingContent = "Loading...";
	var upContent = "Pull Up To Refresh";
	var downContent = "Release To Refresh";
	var PULL_UP_HEIGHT = 60;
	var HEIGHT = 40;
	/**
	 * A pullup to load plugin for xscroll.
	 * @constructor
	 * @param {object} cfg
	 * @param {number} cfg.height
	 * @param {string} cfg.downContent
	 * @param {string} cfg.upContent
	 * @param {string} cfg.loadingContent
	 * @param {string} cfg.clsPrefix  class prefix which default value is "xs-plugin-pullup-"
	 * @param {number} cfg.bufferHeight preload data before scrolling to the bottom of the boundry
	 * @extends {Base}
	 */
	var PullUp = function(cfg) {
		PullUp.superclass.constructor.call(this);
		this.userConfig = Util.mix({
			upContent: upContent,
			downContent: downContent,
			pullUpHeight: PULL_UP_HEIGHT,
			height: HEIGHT,
			loadingContent: loadingContent,
			bufferHeight: 0,
			clsPrefix: "xs-plugin-pullup-"
		}, cfg);
	}
	Util.extend(PullUp, Base, {
		/**
		 * a pluginId
		 * @memberOf PullUp
		 * @type {string}
		 */
		pluginId: "pullup",
		/**
		 * plugin initializer
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginInitializer: function(xscroll) {
			var self = this;
			self.xscroll = xscroll.render();
			clsPrefix = self.userConfig.clsPrefix;
			self.render();
			return self;
		},
		/**
		 * detroy the plugin
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginDestructor: function() {
			var self = this;
			Util.remove(self.pullup);
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.boundry.resetBottom();
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * disable the plugin
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginDisable: function() {
			var self = this;
			self.userConfig.container || Util.remove(self.pullup)
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.boundry.resetBottom();
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * render pullup plugin
		 * @memberOf PullUp
		 * @return {PullUp}
		 */
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;
			if (!self.userConfig.container) {
				var containerCls = clsPrefix + "container";
				var height = self.userConfig.height;
				var pullup = self.pullup = document.createElement("div");
				pullup.className = containerCls;
				pullup.style.position = "absolute";
				pullup.style.width = "100%";
				pullup.style.height = height + "px";
				pullup.style.bottom = -height + "px";
				pullup.style.textAlign = "center";
				self.xscroll.container.appendChild(pullup);
				Util.addClass(pullup, clsPrefix + self.status);
				pullup.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
			} else {
				self.pullup = self.userConfig.container
			}
			self.xscroll.boundry.expandBottom(self.userConfig.height);
			self.status = 'up';
			self._bindEvt();
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self._evtBinded) return;
			self._evtBinded = true;
			var pullup = self.pullup;
			var xscroll = self.xscroll;
			xscroll.on("pan", self._panHandler, self);
			//load width a buffer
			if (self.userConfig.bufferHeight > 0) {
				xscroll.on("scroll", self._scrollHandler, self);
			}
			//bounce bottom
			xscroll.on("scrollend", self._scrollEndHandler, self);
			return self;
		},
		_scrollEndHandler: function(e) {
			var self = this,
				xscroll = self.xscroll,
				scrollTop = xscroll.getScrollTop();
			if (scrollTop == xscroll.containerHeight - xscroll.height + self.userConfig.height) {
				self._changeStatus("loading");
			}
			return self;
		},
		_scrollHandler: function(e) {
			var self = this,
				xscroll = self.xscroll;
			if (!self.isLoading && Math.abs(e.scrollTop) + xscroll.height + self.userConfig.height + self.userConfig.bufferHeight >= xscroll.containerHeight + xscroll.boundry._xtop + xscroll.boundry._xbottom) {
				self._changeStatus("loading");
			}
			return self;
		},
		_panHandler: function(e) {
			var self = this;
			var xscroll = self.xscroll;
			var offsetTop = -xscroll.getScrollTop();
			if (offsetTop < xscroll.height - xscroll.containerHeight - self.userConfig.pullUpHeight) {
				self._changeStatus("down")
			} else {
				self._changeStatus("up");
			}
			return self;
		},
		_changeStatus: function(status) {
			if (status != "loading" && this.isLoading) return;
			var prevVal = this.status;
			this.status = status;
			if (!this.userConfig.container) {
				Util.removeClass(this.pullup, clsPrefix + prevVal)
				Util.addClass(this.pullup, clsPrefix + status);
				this.pullup.innerHTML = this.userConfig[status + "Content"];
			}
			if (prevVal != status) {
				this.trigger("statuschange", {
					prevVal: prevVal,
					newVal: status
				});
				if (status == "loading") {
					this.isLoading = true;
					this.trigger("loading");
				}
			}
			return this;
		},
		/**
		 * notify pullup plugin to complete state after a remote data request
		 * @memberOf PullUp
		 * @return {PullUp}
		 */
		complete: function() {
			var self = this;
			var xscroll = self.xscroll;
			self.isLoading = false;
			self._changeStatus("up");
			return self;
		},
		stop: function() {
			var xscroll = this.xscroll;
			this.isLoading = false;
			this._changeStatus("stop");
			this.pluginDisable()
			return this;
		},
		restart: function() {
			var xscroll = this.xscroll;
			this.isLoading = false;
			this._changeStatus("default");
			this.render()
			return this;
		}
	});
	
	if (typeof module == 'object' && module.exports) {
		module.exports = PullUp;
	}
	/** ignored by jsdoc **/
	else if (window.XScroll && window.XScroll.Plugins) {
		return XScroll.Plugins.PullUp = PullUp;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90),
		Base = __webpack_require__(97),
		Timer = __webpack_require__(278),
		Animate = __webpack_require__(166),
		Hammer = __webpack_require__(242),
		SimuScroll = __webpack_require__(692),
		OriginScroll = __webpack_require__(691);
	var XScroll = function(cfg) {
			var _ = cfg && cfg.useOriginScroll ? OriginScroll : SimuScroll;
			return new _(cfg);
		}
	/**
	 * Util
	 * @namespace Util
	 * @type {Object}
	 */
	XScroll.Util = Util;
	/**
	 * Base
	 * @namespace Base
	 * @type {Base}
	 */
	XScroll.Base = Base;
	/**
	 * Timer
	 * @namespace Timer
	 * @type {Timer}
	 */
	XScroll.Timer = Timer;
	/**
	 * Animate
	 * @namespace Animate
	 * @type {Animate}
	 */
	XScroll.Animate = Animate;
	/**
	 * Hammer
	 * @namespace Hammer
	 * @type {Hammer}
	 */
	XScroll.Hammer = Hammer;
	/**
	 * plugins
	 * @namespace Plugins
	 * @type {Object}
	 */
	XScroll.Plugins = {};
	
	if (typeof module == 'object' && module.exports) {
		module.exports = XScroll;
	}
	/** ignored by jsdoc **/
	else {
		return window.XScroll = XScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(131)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(109)
	  , IE8_DOM_DEFINE = __webpack_require__(261)
	  , toPrimitive    = __webpack_require__(204)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(103) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(396);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(395);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(143);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(95)
	  , core      = __webpack_require__(92)
	  , ctx       = __webpack_require__(168)
	  , hide      = __webpack_require__(112)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(104)
	  , createDesc = __webpack_require__(171);
	module.exports = __webpack_require__(103) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(262)
	  , defined = __webpack_require__(195);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(265)
	  , enumBugKeys = __webpack_require__(197);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(401), __esModule: true };

/***/ }),
/* 142 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 143 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 144 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Timer = __webpack_require__(278);
	var Easing = __webpack_require__(277);
	var Base = __webpack_require__(97);
	//transform
	var vendorTransform = Util.prefixStyle("transform");
	//transition webkitTransition MozTransition OTransition msTtransition
	var vendorTransition = Util.prefixStyle("transition");
	
	var vendorTransitionDuration = Util.prefixStyle("transitionDuration");
	
	var vendorTransformOrigin = Util.prefixStyle("transformOrigin");
	
	var vendorTransitionEnd = Util.vendor ? Util.prefixStyle("transitionEnd") : "transitionend";
	
	var vendorTransformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";
	
	var translateTpl = 'translateX({translateX}px) translateY({translateY}px) translateZ(0)';
	//limit attrs
	var animAttrs = {
		'transform': true,
		'opacity': true,
		'scrollTop': true,
		'scrollLeft': true
	};
	
	function myParse(v) {
		return Math.round(parseFloat(v) * 1e5) / 1e5;
	}
	
	function defaultDecompose() {
		return {
			translateX: 0,
			translateY: 0,
			rotate: 0,
			skewX: 0,
			skewY: 0,
			scaleX: 1,
			scaleY: 1
		};
	}
	
	function toMatrixArray(matrix) {
		matrix = matrix.split(/,/);
		matrix = Array.prototype.map.call(matrix, function(v) {
			return myParse(v);
		});
		return matrix;
	}
	
	function decomposeMatrix(matrix) {
		matrix = toMatrixArray(matrix);
		var scaleX, scaleY, skew,
			A = matrix[0],
			B = matrix[1],
			C = matrix[2],
			D = matrix[3];
	
		// Make sure matrix is not singular
		if (A * D - B * C) {
			scaleX = Math.sqrt(A * A + B * B);
			skew = (A * C + B * D) / (A * D - C * B);
			scaleY = (A * D - B * C) / scaleX;
			// step (6)
			if (A * D < B * C) {
				skew = -skew;
				scaleX = -scaleX;
			}
			// matrix is singular and cannot be interpolated
		} else {
			// In this case the elem shouldn't be rendered, hence scale == 0
			scaleX = scaleY = skew = 0;
		}
	
		// The recomposition order is very important
		// see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
		return {
			translateX: myParse(matrix[4]),
			translateY: myParse(matrix[5]),
			rotate: myParse(Math.atan2(B, A) * 180 / Math.PI),
			skewX: myParse(Math.atan(skew) * 180 / Math.PI),
			skewY: 0,
			scaleX: myParse(scaleX),
			scaleY: myParse(scaleY)
		};
	}
	
	function getTransformInfo(transform) {
		transform = transform.split(')');
		var trim = Util.trim,
			i = -1,
			l = transform.length - 1,
			split, prop, val,
			ret = defaultDecompose();
	
		// Loop through the transform properties, parse and multiply them
		while (++i < l) {
			split = transform[i].split('(');
			prop = trim(split[0]);
			val = split[1];
			switch (prop) {
				case 'translateX':
				case 'translateY':
				case 'scaleX':
				case 'scaleY':
					ret[prop] = myParse(val);
					break;
				case 'translate':
				case 'translate3d':
					val = val.split(',');
					ret.translateX = myParse(val[0]);
					ret.translateY = myParse(val[1] || 0);
					break;
				case 'scale':
					val = val.split(',');
					ret.scaleX = myParse(val[0]);
					ret.scaleY = myParse(val[1] || val[0]);
					break;
				case 'matrix':
					return decomposeMatrix(val);
			}
		}
	
		return ret;
	}
	
	/**
	 * animate function
	 * @constructor
	 * @param {HTMLElement} el element to animate
	 * @param {Object} config config for animate
	 * @param {Object} config.css
	 * @param {Number} config.duration
	 * @param {String} config.easing
	 * @extends {Base}
	 */
	function Animate(el, cfg) {
		if (!el || !cfg || !cfg.css) return;
		var self = this;
		self.cfg = cfg;
		self.el = el;
		var duration = cfg.duration || 0,
			easing = cfg.easing || "ease",
			delay = cfg.delay || 0;
		//trigger run
		if (cfg.run) {
			//frame animate
			self.timer = self.timer || new Timer({
				duration: Math.round(duration),
				easing: easing,
			});
			self.timer.on("run", cfg.run);
		}
		self._bindEvt();
		return self;
	}
	
	function computeTransform(prevTransform, destTransform) {
		var transform = getTransformInfo(prevTransform);
		var dest = getTransformInfo(destTransform);
		var trans = {};
		for (var i in dest) {
			trans[i] = {
				prevVal: transform[i],
				newVal: dest[i]
			}
		}
		return trans;
	}
	
	//for scroll only
	function setStyle(el, styleName, prevVal, newVal, percent) {
		prevVal = isNaN(Number(prevVal)) ? 0 : Number(prevVal);
		var curVal = ((newVal - prevVal) * percent + prevVal);
		css(el, styleName, curVal);
	}
	
	function css(el, styleName, val) {
		switch (styleName) {
			case "scrollTop":
			case "scrollLeft":
				el[styleName] = val;
				break;
			case "transform":
				el.style[vendorTransform] = val;
			case "opacity":
				el.style[styleName] = val;
				break;
	
		}
	}
	
	Util.extend(Animate, Base, {
		/**
		 * to start the animation
		 * @memberof Animate
		 * @return {Animate}
		 */
		run: function() {
			var self = this;
			var cfg = self.cfg,
				el = self.el,
				duration = cfg.duration || 0,
				easing = cfg.easing || "ease",
				delay = cfg.delay || 0;
			self.__isTransitionEnd = false;
			clearTimeout(self.__itv)
			self.timer && self.timer.run();
			if (duration <= Timer.MIN_DURATION) {
				for (var i in cfg.css) {
					css(el, i, cfg.css[i]);
				}
				self.stop()
				self.__handlers.stop.call(self);
				return;
			}
	
			if(Util.isBadAndroid()){
				//use frame animate on bad android device
				cfg.useTransition = false;
			}
	
			if (cfg.useTransition) {
				//transition
				el.style[vendorTransition] = Util.substitute('all {duration}ms {easing} {delay}ms', {
					duration: Math.round(duration),
					easing: Easing.format(easing),
					delay: delay
				});
				for (var i in cfg.css) {
					//set css
					css(el, i, cfg.css[i]);
				}
				self.__itv = setTimeout(function() {
					if (!self.__isTransitionEnd) {
						self.__isTransitionEnd = true;
						self.trigger("transitionend");
					}
				}, Number(duration) + 60);
			} else {
				self.computeStyle = self.computeStyle || window.getComputedStyle(el);
				//transform
				if (cfg.css.transform && self.timer) {
					var transmap = self.transmap = computeTransform(self.computeStyle[vendorTransform], cfg.css.transform);
					self.timer.off("run", self.__handlers.transRun);
					self.timer.on("run", self.__handlers.transRun, self);
					self.timer.off("end",self.__handlers.transRun);
					self.timer.on("end", self.__handlers.transRun, self);
				}
			}
			return self;
		},
		_transitionEndHandler: function(e) {
			var self = this;
			self.stop();
			self.__handlers.stop.call(self);
		},
		__handlers: {
			transRun: function(e) {
				var self = this;
				var transmap = self.transmap;
				var el = self.el;
				var newTrans = {};
				for (var i in transmap) {
					newTrans[i] = (transmap[i].newVal - transmap[i].prevVal) * e.percent + transmap[i].prevVal
				}
				var ret = Util.substitute(translateTpl + ' ' +
					'scale({scaleX},{scaleY})', newTrans);
				el.style[vendorTransform] = ret;
			},
			stop: function(e) {
				var self = this;
				var cfg = self.cfg;
				cfg.end && cfg.end({
					percent: 1
				});
			}
		},
		_bindEvt: function() {
			var self = this;
			var cfg = self.cfg;
			var el = self.el;
			self.el.addEventListener(vendorTransitionEnd, function(e) {
				self.__isTransitionEnd = true;
				if (e.target !== e.currentTarget) return;
				self.trigger("transitionend", e);
			})
			self.on("transitionend", self._transitionEndHandler, self);
			var cssRun = function(e) {
				self.computeStyle = self.computeStyle || window.getComputedStyle(el);
				for (var i in cfg.css) {
					if (!/transform/.test(i)) {
						setStyle(self.el, i, self.computeStyle[i], cfg.css[i], e.percent);
					}
				}
			};
			self.timer && self.timer.on("run", cssRun);
			self.timer && self.timer.on("stop", self.__handlers.stop, self);
		},
		/**
		 * to stop the animation
		 * @memberof Animate
		 * @return {Animate}
		 */
		stop: function() {
			var self = this;
			if (self.cfg.useTransition && self.cfg.duration > Timer.MIN_DURATION) {
				var computeStyle = window.getComputedStyle(this.el);
				for (var i in self.cfg.css) {
					if (animAttrs[i]) {
						var value = /transform/.test(i) ? computeStyle[vendorTransform] : computeStyle[i];
						css(self.el, i, Util.substitute(translateTpl + ' ' + 'scale({scaleX},{scaleY})', getTransformInfo(value)));
					}
				}
				self.el.style[vendorTransition] = "none";
			}
			self.timer && self.timer.stop() && self.timer.reset();
			self.computeStyle = null;
			return self;
		},
		/**
		 * to reset the animation to a new state
		 * @memberof Animate
		 * @param {object} cfg cfg for new animation
		 * @return {Animate}
		 */
		reset: function(cfg) {
			var self = this;
			self.computeStyle = null;
			Util.mix(self.cfg, cfg);
			this.timer && self.timer.reset({
				duration: Math.round(self.cfg.duration),
				easing: self.cfg.easing
			});
			return self;
		}
	});
	
	
	if (typeof module == 'object' && module.exports) {
		module.exports = Animate;
	}
	/** ignored by jsdoc **/
	else {
		return Animate;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (element, options) {
	  options = options || {};
	
	  for (var i in defaults) {
	    if (options[i] == null) {
	      options[i] = defaults[i];
	    }
	  }
	
	  return new _horizontal2.default(element, options);
	};
	
	var _horizontal = __webpack_require__(377);
	
	var _horizontal2 = _interopRequireDefault(_horizontal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaults = {
	  callback: function callback() {},
	
	  decimal: false,
	  disable: false,
	  disableOpacity: null,
	  hideRange: false,
	  min: 0,
	  max: 100,
	  start: null,
	  step: null,
	  vertical: false
	};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(194);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 169 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 170 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(104).f
	  , has = __webpack_require__(111)
	  , TAG = __webpack_require__(93)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 173 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 174 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = assertString;
	function assertString(input) {
	  if (typeof input !== 'string') {
	    throw new TypeError('This library (validator.js) validates strings only');
	  }
	}
	module.exports = exports['default'];

/***/ }),
/* 175 */,
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(94);
	var normalizeHeaderName = __webpack_require__(297);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(245);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(245);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(509)))

/***/ }),
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	window.__$vuxPopups = window.__$vuxPopups || {};
	var popupDialog = function popupDialog(option) {
	  var _this = this;
	
	  this.uuid = Math.random().toString(36).substring(3, 8);
	  this.params = {};
	  this.isShow = false;
	  if (Object.prototype.toString.call(option) === '[object Object]') {
	    this.params = {
	      input: option.input || '',
	      container: document.querySelector(option.input) || '',
	      innerHTML: option.innerHTML || '',
	      hideOnBlur: option.hideOnBlur,
	      onOpen: option.onOpen || function () {},
	      onClose: option.onClose || function () {},
	      showMask: option.showMask
	    };
	  }
	  if (!!document.querySelectorAll('.vux-popup-mask').length <= 0) {
	    this.divMask = document.createElement('a');
	    this.divMask.className = 'vux-popup-mask';
	    this.divMask.dataset.uuid = '';
	    this.divMask.href = 'javascript:void(0)';
	    document.body.appendChild(this.divMask);
	  }
	  var div = void 0;
	  if (!option.container) {
	    div = document.createElement('div');
	  } else {
	    div = option.container;
	  }
	
	  div.className += ' vux-popup-dialog vux-popup-dialog-' + this.uuid;
	  if (!this.params.hideOnBlur) {
	    div.className += ' vux-popup-mask-disabled';
	  }
	
	  this.div = div;
	
	  if (!option.container) {
	    document.body.appendChild(div);
	  }
	  this.container = document.querySelector('.vux-popup-dialog-' + this.uuid);
	  this.mask = document.querySelector('.vux-popup-mask');
	  this.mask.dataset.uuid += ',' + this.uuid;
	  this._bindEvents();
	  option = null;
	  this.containerHandler = function () {
	    _this.mask && !/show/.test(_this.mask.className) && setTimeout(function () {
	      !/show/.test(_this.mask.className) && (_this.mask.style['zIndex'] = -1);
	    }, 200);
	  };
	
	  this.container.addEventListener('webkitTransitionEnd', this.containerHandler);
	  this.container.addEventListener('transitionend', this.containerHandler);
	
	  return this;
	};
	
	popupDialog.prototype.onClickMask = function () {
	  this.params.hideOnBlur && this.params.onClose();
	};
	
	popupDialog.prototype._bindEvents = function () {
	  this.params.hideOnBlur && this.mask.addEventListener('click', this.onClickMask.bind(this), false);
	};
	
	popupDialog.prototype.show = function () {
	  if (this.params.showMask) {
	    this.mask.classList.add('vux-popup-show');
	    this.mask.style['zIndex'] = 500;
	  }
	  this.container.classList.add('vux-popup-show');
	  if (this.container.classList.contains('vux-popup')) {
	    this.container.classList.remove('vux-popup');
	    this.container.classList.add('vux-popup-dialog');
	    this.container.classList.add('vux-popup-dialog' + this.uuid);
	  }
	  this.params.onOpen && this.params.onOpen(this);
	  this.isShow = true;
	  window.__$vuxPopups[this.uuid] = 1;
	};
	
	popupDialog.prototype.hide = function () {
	  var _this2 = this;
	
	  var shouldCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	  this.container.classList.remove('vux-popup-show');
	  if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
	    this.mask.classList.remove('vux-popup-show');
	    setTimeout(function () {
	      _this2.mask && !/show/.test(_this2.mask.className) && (_this2.mask.style['zIndex'] = -1);
	    }, 400);
	  }
	  if (this.container.classList.contains('vux-popup')) {
	    this.container.classList.remove('vux-popup');
	    this.container.classList.add('vux-popup-dialog');
	    this.container.classList.add('vux-popup-dialog' + this.uuid);
	  }
	  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this);
	  this.isShow = false;
	  delete window.__$vuxPopups[this.uuid];
	};
	
	popupDialog.prototype.html = function (html) {
	  this.container.innerHTML = html;
	};
	
	popupDialog.prototype.destroy = function () {
	  this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(',' + this.uuid, 'g'), '');
	  if (!this.mask.dataset.uuid) {
	    this.mask.removeEventListener('click', this.onClickMask.bind(this), false);
	    this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask);
	  } else {
	    this.hide();
	  }
	  this.container.removeEventListener('webkitTransitionEnd', this.containerHandler);
	  this.container.removeEventListener('transitionend', this.containerHandler);
	  delete window.__$vuxPopups[this.uuid];
	};
	
	exports.default = popupDialog;

/***/ }),
/* 188 */
/***/ (function(module, exports) {

	'use strict';
	
	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
	var unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
	var prefix = bind !== 'addEventListener' ? 'on' : '';
	
	exports.bind = function (el, type, fn, capture) {
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};
	
	exports.unbind = function (el, type, fn, capture) {
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value, list, delimiter) {
	  if (value && !list.length) {
	    return '';
	  }
	  if (!delimiter) {
	    delimiter = ' ';
	  }
	
	  var rs = (0, _arrayMap2.default)(value, function (one, index) {
	    if (list.length && Object.prototype.toString.call(list[0]) === '[object Array]') {
	      return (0, _arrayFind2.default)(list[index], function (item) {
	        return item.value === one;
	      });
	    } else {
	      return (0, _arrayFind2.default)(list, function (item) {
	        return item.value === one;
	      });
	    }
	  });
	  rs = rs.filter(function (one) {
	    return typeof one !== 'undefined';
	  });
	  return (0, _arrayMap2.default)(rs, function (one) {
	    return one.name;
	  }).join(delimiter).replace('--', '');
	};
	
	var _arrayMap = __webpack_require__(244);
	
	var _arrayMap2 = _interopRequireDefault(_arrayMap);
	
	var _arrayFind = __webpack_require__(243);
	
	var _arrayFind2 = _interopRequireDefault(_arrayFind);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin_uuid = __webpack_require__(253);
	
	var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_mixin_uuid2.default],
	  props: {
	    required: {
	      type: Boolean,
	      default: false
	    }
	  },
	  created: function created() {
	    this.handleChangeEvent = false;
	  },
	
	  computed: {
	    dirty: function dirty() {
	      return !this.prisine;
	    },
	    invalid: function invalid() {
	      return !this.valid;
	    }
	  },
	  methods: {
	    setTouched: function setTouched() {
	      this.touched = true;
	    }
	  },
	  watch: {
	    value: function value(newVal) {
	      if (this.prisine === true) {
	        this.prisine = false;
	      }
	      if (!this.handleChangeEvent) {
	        this.$emit('on-change', newVal);
	        this.$emit('input', newVal);
	      }
	    }
	  },
	  data: function data() {
	    return {
	      errors: {},
	      prisine: true,
	      touched: false
	    };
	  }
	};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeOptions = undefined;
	
	var _objectAssign = __webpack_require__(73);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mergeOptions = function mergeOptions($vm, options) {
	  var defaults = {};
	  for (var i in $vm.$options.props) {
	    if (i !== 'value') {
	      defaults[i] = $vm.$options.props[i].default;
	    }
	  }
	  var _options = (0, _objectAssign2.default)({}, defaults, options);
	  for (var _i in _options) {
	    $vm[_i] = _options[_i];
	  }
	};
	
	exports.mergeOptions = mergeOptions;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = undefined;
	
	var _typeof2 = __webpack_require__(108);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _confirm = __webpack_require__(233);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _plugin_helper = __webpack_require__(191);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $vm = void 0;
	
	var plugin = {
	  install: function install(vue) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var Confirm = vue.extend(_confirm2.default);
	
	    if (!$vm) {
	      $vm = new Confirm({
	        el: document.createElement('div'),
	        propsData: {
	          title: ''
	        }
	      });
	      document.body.appendChild($vm.$el);
	    }
	
	    var confirm = {
	      show: function show(options) {
	        if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
	          (0, _plugin_helper.mergeOptions)($vm, options);
	        }
	        if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object' && (options.onShow || options.onHide)) {
	          options.onShow && options.onShow();
	        }
	        this.$watcher && this.$watcher();
	        this.$watcher = $vm.$watch('showValue', function (val) {
	          if (!val && options && options.onHide) {
	            options.onHide();
	          }
	        });
	
	        $vm.$off('on-cancel');
	        $vm.$off('on-confirm');
	
	        $vm.$on('on-cancel', function () {
	          options && options.onCancel && options.onCancel();
	        });
	        $vm.$on('on-confirm', function () {
	          options && options.onConfirm && options.onConfirm();
	        });
	        $vm.showValue = true;
	      },
	      hide: function hide() {
	        $vm.showValue = false;
	      }
	    };
	
	    if (!vue.$vux) {
	      vue.$vux = {
	        confirm: confirm
	      };
	    } else {
	      vue.$vux.confirm = confirm;
	    }
	
	    vue.mixin({
	      created: function created() {
	        this.$vux = vue.$vux;
	      }
	    });
	  }
	};
	
	exports.default = plugin;
	var install = exports.install = plugin.install;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(256);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ }),
/* 194 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 195 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(143)
	  , document = __webpack_require__(95).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 197 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(109)
	  , dPs         = __webpack_require__(421)
	  , enumBugKeys = __webpack_require__(197)
	  , IE_PROTO    = __webpack_require__(200)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(196)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(260).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 199 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(201)('keys')
	  , uid    = __webpack_require__(173);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(95)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 202 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(195);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(143);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(95)
	  , core           = __webpack_require__(92)
	  , LIBRARY        = __webpack_require__(169)
	  , wksExt         = __webpack_require__(206)
	  , defineProperty = __webpack_require__(104).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(93);

/***/ }),
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	/*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge]
	 * @returns {Object} dest
	 */
	function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	function merge(dest, src) {
	    return extend(dest, src, true);
	}
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        extend(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument;
	    return (doc.defaultView || doc.parentWindow);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = last.deltaX - input.deltaX;
	        var deltaY = last.deltaY - input.deltaY;
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	    
	    if (abs(x) >= abs(y)) {
	        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.allow = true; // used by Input.TouchMouse to disable mouse events
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	        if (!this.pressed || !this.allow) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        // when we're in a touch event, so  block all upcoming mouse events
	        // most mobile browser also emit mouseevents, right after touchstart
	        if (isTouch) {
	            this.mouse.allow = false;
	        } else if (isMouse && !this.mouse.allow) {
	            return;
	        }
	
	        // reset the allowMouse when we're done
	        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	            this.mouse.allow = true;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        // not needed with native support for the touchAction property
	        if (NATIVE_TOUCH_ACTION) {
	            return;
	        }
	
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // pan-x and pan-y can be combined
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.id = uniqueId();
	
	    this.manager = null;
	    this.options = merge(options || {}, this.defaults);
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        extend(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(withState) {
	            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(true);
	        }
	
	        emit(); // simple 'eventName' events
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(true);
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = extend({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this._super.emit.call(this, input);
	    },
	    reset:function(){
	        
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        this._super.emit.call(this, input);
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            this.manager.emit(this.options.event + inOut, input);
	        }
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 500, // minimal time of the pointer to be pressed
	        threshold: 5 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.65,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.velocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.velocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.velocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.direction &&
	            input.distance > this.options.threshold &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 10, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED ) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create an manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.4';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, { enable: false }],
	        [PinchRecognizer, { enable: false }, ['rotate']],
	        [SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],
	        [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    options = options || {};
	
	    this.options = merge(options, Hammer.defaults);
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        extend(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        var recognizers = this.recognizers;
	        recognizer = this.get(recognizer);
	        recognizers.splice(inArray(recognizers, recognizer), 1);
	
	        this.touchAction.update();
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    each(manager.options.cssProps, function(value, name) {
	        element.style[prefixed(element.style, name)] = add ? value : '';
	    });
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	extend(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	if (typeof module == 'object' && module.exports) {
	    module.exports = Hammer;
	}
	/** ignored by jsdoc **/
	else {
	    return Hammer;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 243 */
/***/ (function(module, exports) {

	'use strict';
	
	function find(array, predicate, context) {
	  if (typeof Array.prototype.find === 'function') {
	    return array.find(predicate, context);
	  }
	
	  context = context || this;
	  var length = array.length;
	  var i;
	
	  if (typeof predicate !== 'function') {
	    throw new TypeError(predicate + ' is not a function');
	  }
	
	  for (i = 0; i < length; i++) {
	    if (predicate.call(context, array[i], i, array)) {
	      return array[i];
	    }
	  }
	}
	
	module.exports = find;


/***/ }),
/* 244 */
/***/ (function(module, exports) {

	module.exports = function (xs, f) {
	    if (xs.map) return xs.map(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = xs[i];
	        if (hasOwn.call(xs, i)) res.push(f(x, i, xs));
	    }
	    return res;
	};
	
	var hasOwn = Object.prototype.hasOwnProperty;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	var settle = __webpack_require__(289);
	var buildURL = __webpack_require__(292);
	var parseHeaders = __webpack_require__(298);
	var isURLSameOrigin = __webpack_require__(296);
	var createError = __webpack_require__(248);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(291);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (!window.XMLHttpRequest &&
	        ("production") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(294);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 246 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 247 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(288);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 249 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FlexboxItem = exports.Flexbox = undefined;
	
	var _flexbox = __webpack_require__(617);
	
	var _flexbox2 = _interopRequireDefault(_flexbox);
	
	var _flexboxItem = __webpack_require__(616);
	
	var _flexboxItem2 = _interopRequireDefault(_flexboxItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Flexbox = _flexbox2.default;
	exports.FlexboxItem = _flexboxItem2.default;

/***/ }),
/* 251 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.isNumber = function (num) {
	  return typeof num === 'number';
	};
	
	exports.of = function (perc, num) {
	  if (exports.isNumber(perc) && exports.isNumber(num)) return perc / 100 * num;
	};
	
	exports.from = function (part, target) {
	  if (exports.isNumber(part) && exports.isNumber(target)) return part / target * 100;
	};

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(257);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(258);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _arrayFrom = __webpack_require__(280);
	
	var _arrayFrom2 = _interopRequireDefault(_arrayFrom);
	
	var _objectAssign = __webpack_require__(73);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Swiper = function () {
	  function Swiper(options) {
	    (0, _classCallCheck3.default)(this, Swiper);
	
	    this._default = {
	      container: '.vux-swiper',
	      item: '.vux-swiper-item',
	      direction: 'vertical',
	      activeClass: 'active',
	      threshold: 50,
	      duration: 300,
	      auto: false,
	      loop: false,
	      interval: 3000,
	      height: 'auto',
	      minMovingDistance: 0
	    };
	    this._options = (0, _objectAssign2.default)(this._default, options);
	    this._options.height = this._options.height.replace('px', '');
	    this._start = {};
	    this._move = {};
	    this._end = {};
	    this._eventHandlers = {};
	    this._prev = this._current = this._goto = 0;
	    this._width = this._height = this._distance = 0;
	    this._offset = [];
	    this.$box = this._options.container;
	    this.$container = this._options.container.querySelector('.vux-swiper');
	    this.$items = this.$container.querySelectorAll(this._options.item);
	    this.count = this.$items.length;
	    this.realCount = this.$items.length;
	    this._position = [];
	    this._firstItemIndex = 0;
	    if (!this.count) {
	      return;
	    }
	    this._init();
	    this._auto();
	    this._bind();
	    this._onResize();
	    return this;
	  }
	
	  (0, _createClass3.default)(Swiper, [{
	    key: '_auto',
	    value: function _auto() {
	      var me = this;
	      me.stop();
	      if (me._options.auto) {
	        me.timer = setTimeout(function () {
	          me.next();
	        }, me._options.interval);
	      }
	    }
	  }, {
	    key: 'updateItemWidth',
	    value: function updateItemWidth() {
	      this._width = this.$box.offsetWidth || document.documentElement.offsetWidth;
	      this._distance = this._options.direction === 'horizontal' ? this._width : this._height;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.timer && clearTimeout(this.timer);
	    }
	  }, {
	    key: '_loop',
	    value: function _loop() {
	      return this._options.loop && this.realCount >= 3;
	    }
	  }, {
	    key: '_onResize',
	    value: function _onResize() {
	      var me = this;
	      this.resizeHandler = function () {
	        setTimeout(function () {
	          me.updateItemWidth();
	          me._setOffset();
	          me._setTransform();
	        }, 100);
	      };
	      window.addEventListener('orientationchange', this.resizeHandler, false);
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      if (this._options.loop) {
	        this._loopTwoItems();
	      }
	      this._height = this._options.height === 'auto' ? 'auto' : this._options.height - 0;
	      this.updateItemWidth();
	      this._initPosition();
	      this._activate(this._current);
	      this._setOffset();
	      this._setTransform();
	      if (this._loop()) {
	        this._loopRender();
	      }
	    }
	  }, {
	    key: '_initPosition',
	    value: function _initPosition() {
	      for (var i = 0; i < this.realCount; i++) {
	        this._position.push(i);
	      }
	    }
	  }, {
	    key: '_movePosition',
	    value: function _movePosition(position) {
	      var me = this;
	      if (position > 0) {
	        var firstIndex = me._position.splice(0, 1);
	        me._position.push(firstIndex[0]);
	      } else if (position < 0) {
	        var lastIndex = me._position.pop();
	        me._position.unshift(lastIndex);
	      }
	    }
	  }, {
	    key: '_setOffset',
	    value: function _setOffset() {
	      var me = this;
	      var index = me._position.indexOf(me._current);
	      me._offset = [];
	      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
	        me._offset.push((key - index) * me._distance);
	      });
	    }
	  }, {
	    key: '_setTransition',
	    value: function _setTransition(duration) {
	      duration = duration || this._options.duration || 'none';
	      var transition = duration === 'none' ? 'none' : duration + 'ms';
	      (0, _arrayFrom2.default)(this.$items).forEach(function ($item, key) {
	        $item.style.webkitTransition = transition;
	        $item.style.transition = transition;
	      });
	    }
	  }, {
	    key: '_setTransform',
	    value: function _setTransform(offset) {
	      var me = this;
	      offset = offset || 0;
	      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
	        var distance = me._offset[key] + offset;
	        var transform = 'translate3d(' + distance + 'px, 0, 0)';
	        if (me._options.direction === 'vertical') {
	          transform = 'translate3d(0, ' + distance + 'px, 0)';
	        }
	        $item.style.webkitTransform = transform;
	        $item.style.transform = transform;
	      });
	    }
	  }, {
	    key: '_bind',
	    value: function _bind() {
	      var me = this;
	      me.touchstartHandler = function (e) {
	        me.stop();
	        me._start.x = e.changedTouches[0].pageX;
	        me._start.y = e.changedTouches[0].pageY;
	        me._setTransition('none');
	      };
	      me.touchmoveHandler = function (e) {
	        me._move.x = e.changedTouches[0].pageX;
	        me._move.y = e.changedTouches[0].pageY;
	        var distanceX = me._move.x - me._start.x;
	        var distanceY = me._move.y - me._start.y;
	        var distance = distanceY;
	        var noScrollerY = Math.abs(distanceX) > Math.abs(distanceY);
	        if (me._options.direction === 'horizontal' && noScrollerY) {
	          distance = distanceX;
	        }
	        if ((me._options.minMovingDistance && Math.abs(distance) >= me._options.minMovingDistance || !me._options.minMovingDistance) && noScrollerY) {
	          me._setTransform(distance);
	        }
	
	        noScrollerY && e.preventDefault();
	      };
	
	      me.touchendHandler = function (e) {
	        me._end.x = e.changedTouches[0].pageX;
	        me._end.y = e.changedTouches[0].pageY;
	
	        var distance = me._end.y - me._start.y;
	        if (me._options.direction === 'horizontal') {
	          distance = me._end.x - me._start.x;
	        }
	
	        distance = me.getDistance(distance);
	        if (distance !== 0 && me._options.minMovingDistance && Math.abs(distance) < me._options.minMovingDistance) {
	          return;
	        }
	        if (distance > me._options.threshold) {
	          me.move(-1);
	        } else if (distance < -me._options.threshold) {
	          me.move(1);
	        } else {
	          me.move(0);
	        }
	
	        me._loopRender();
	      };
	
	      me.transitionEndHandler = function (e) {
	        me._activate(me._current);
	        var cb = me._eventHandlers.swiped;
	        cb && cb.apply(me, [me._prev % me.count, me._current % me.count]);
	        me._auto();
	        me._loopRender();
	        e.preventDefault();
	      };
	      me.$container.addEventListener('touchstart', me.touchstartHandler, false);
	      me.$container.addEventListener('touchmove', me.touchmoveHandler, false);
	      me.$container.addEventListener('touchend', me.touchendHandler, false);
	      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
	    }
	  }, {
	    key: '_loopTwoItems',
	    value: function _loopTwoItems() {
	      if (this.count === 2) {
	        var div = document.createElement('div');
	        var $item = void 0;
	        for (var i = this.$items.length - 1; i >= 0; i--) {
	          div.innerHTML = this.$items[i].outerHTML;
	          $item = div.querySelector(this._options.item);
	          $item.classList.add(this._options.item.replace('.', '') + '-clone');
	          this.$container.appendChild($item);
	        }
	        this.realCount = 4;
	      }
	    }
	  }, {
	    key: '_loopRender',
	    value: function _loopRender() {
	      var me = this;
	      if (me._loop()) {
	        if (me._offset[me._offset.length - 1] === 0) {
	          me.$container.appendChild(me.$items[0]);
	          me._loopEvent(1);
	        } else if (me._offset[0] === 0) {
	          me.$container.insertBefore(me.$items[me.$items.length - 1], me.$container.firstChild);
	          me._loopEvent(-1);
	        }
	      }
	    }
	  }, {
	    key: '_loopEvent',
	    value: function _loopEvent(num) {
	      var me = this;
	      me._itemDestoy();
	      me.$items = me.$container.querySelectorAll(me._options.item);
	      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
	      me._movePosition(num);
	      me._setOffset();
	      me._setTransform();
	    }
	  }, {
	    key: 'getDistance',
	    value: function getDistance(distance) {
	      if (this._loop()) {
	        return distance;
	      } else {
	        if (distance > 0 && this._current === 0) {
	          return 0;
	        } else if (distance < 0 && this._current === this.realCount - 1) {
	          return 0;
	        } else {
	          return distance;
	        }
	      }
	    }
	  }, {
	    key: '_moveIndex',
	    value: function _moveIndex(num) {
	      if (num !== 0) {
	        this._prev = this._current;
	        this._current += this.realCount;
	        this._current += num;
	        this._current %= this.realCount;
	      }
	    }
	  }, {
	    key: '_activate',
	    value: function _activate(index) {
	      var clazz = this._options.activeClass;
	      Array.prototype.forEach.call(this.$items, function ($item, key) {
	        $item.classList.remove(clazz);
	        if (index === Number($item.dataset.index)) {
	          $item.classList.add(clazz);
	        }
	      });
	    }
	  }, {
	    key: 'go',
	    value: function go(index) {
	      var me = this;
	      me.stop();
	
	      index = index || 0;
	      index += this.realCount;
	      index = index % this.realCount;
	      index = this._position.indexOf(index) - this._position.indexOf(this._current);
	
	      me._moveIndex(index);
	      me._setOffset();
	      me._setTransition();
	      me._setTransform();
	      me._auto();
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.move(1);
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move(num) {
	      this.go(this._current + num);
	      return this;
	    }
	  }, {
	    key: 'on',
	    value: function on(event, callback) {
	      if (this._eventHandlers[event]) {
	        console.error('[swiper] event ' + event + ' is already register');
	      }
	      if (typeof callback !== 'function') {
	        console.error('[swiper] parameter callback must be a function');
	      }
	      this._eventHandlers[event] = callback;
	      return this;
	    }
	  }, {
	    key: '_itemDestoy',
	    value: function _itemDestoy() {
	      var _this = this;
	
	      this.$items.length && (0, _arrayFrom2.default)(this.$items).forEach(function (item) {
	        item.removeEventListener('webkitTransitionEnd', _this.transitionEndHandler, false);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      this._current = 0;
	      this._setTransform(0);
	      window.removeEventListener('orientationchange', this.resizeHandler, false);
	      this.$container.removeEventListener('touchstart', this.touchstartHandler, false);
	      this.$container.removeEventListener('touchmove', this.touchmoveHandler, false);
	      this.$container.removeEventListener('touchend', this.touchendHandler, false);
	      this._itemDestoy();
	
	      if (this._options.loop && this.count === 2) {
	        var $item = this.$container.querySelector(this._options.item + '-clone');
	        $item && this.$container.removeChild($item);
	        $item = this.$container.querySelector(this._options.item + '-clone');
	        $item && this.$container.removeChild($item);
	      }
	    }
	  }]);
	  return Swiper;
	}();
	
	exports.default = Swiper;

/***/ }),
/* 253 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  created: function created() {
	    this.uuid = Math.random().toString(36).substring(3, 8);
	  }
	};

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.childMixin = exports.parentMixin = undefined;
	
	var _router = __webpack_require__(63);
	
	var parentMixin = {
	  mounted: function mounted() {
	    if (this.value >= 0) {
	      this.currentIndex = this.value;
	    }
	    this.updateIndex();
	  },
	
	  methods: {
	    updateIndex: function updateIndex() {
	      if (!this.$children || !this.$children.length) return;
	      this.number = this.$children.length;
	      var children = this.$children;
	      for (var i = 0; i < children.length; i++) {
	        children[i].currentIndex = i;
	        if (children[i].currentSelected) {
	          this.index = i;
	        }
	      }
	    }
	  },
	  props: {
	    value: Number
	  },
	  watch: {
	    currentIndex: function currentIndex(val, oldVal) {
	      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false);
	      val > -1 && this.$children[val] && (this.$children[val].currentSelected = true);
	      this.$emit('input', val);
	    },
	    index: function index(val) {
	      this.currentIndex = val;
	    },
	    value: function value(val) {
	      this.index = val;
	    }
	  },
	  data: function data() {
	    return {
	      index: -1,
	      currentIndex: this.index,
	      number: this.$children.length
	    };
	  }
	};
	
	var childMixin = {
	  props: {
	    selected: {
	      type: Boolean,
	      default: false
	    }
	  },
	  mounted: function mounted() {
	    this.$parent.updateIndex();
	  },
	  beforeDestroy: function beforeDestroy() {
	    var $parent = this.$parent;
	    this.$nextTick(function () {
	      $parent.updateIndex();
	    });
	  },
	
	  methods: {
	    onItemClick: function onItemClick(hasLink) {
	      var _this = this;
	
	      if (typeof this.disabled === 'undefined' || this.disabled === false) {
	        this.currentSelected = true;
	        this.$parent.currentIndex = this.currentIndex;
	        this.$nextTick(function () {
	          _this.$emit('on-item-click', _this.currentIndex);
	        });
	      }
	      if (hasLink === true) {
	        (0, _router.go)(this.link, this.$router);
	      }
	    }
	  },
	  watch: {
	    currentSelected: function currentSelected(val) {
	      if (val) {
	        this.$parent.index = this.currentIndex;
	      }
	    },
	    selected: function selected(val) {
	      this.currentSelected = val;
	    }
	  },
	  data: function data() {
	    return {
	      currentIndex: -1,
	      currentSelected: this.selected
	    };
	  }
	};
	
	exports.parentMixin = parentMixin;
	exports.childMixin = childMixin;

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lodash = __webpack_require__(508);
	
	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _lodash2.default;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(400), __esModule: true };

/***/ }),
/* 257 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(256);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(142)
	  , TAG = __webpack_require__(93)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(95).document && document.documentElement;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(103) && !__webpack_require__(131)(function(){
	  return Object.defineProperty(__webpack_require__(196)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(142);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(169)
	  , $export        = __webpack_require__(110)
	  , redefine       = __webpack_require__(266)
	  , hide           = __webpack_require__(112)
	  , has            = __webpack_require__(111)
	  , Iterators      = __webpack_require__(144)
	  , $iterCreate    = __webpack_require__(414)
	  , setToStringTag = __webpack_require__(172)
	  , getPrototypeOf = __webpack_require__(424)
	  , ITERATOR       = __webpack_require__(93)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(265)
	  , hiddenKeys = __webpack_require__(197).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(111)
	  , toIObject    = __webpack_require__(113)
	  , arrayIndexOf = __webpack_require__(407)(false)
	  , IE_PROTO     = __webpack_require__(200)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(112);

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(168)
	  , invoke             = __webpack_require__(410)
	  , html               = __webpack_require__(260)
	  , cel                = __webpack_require__(196)
	  , global             = __webpack_require__(95)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(142)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(202)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 269 */
/***/ (function(module, exports) {



/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(429)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(263)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(432);
	var global        = __webpack_require__(95)
	  , hide          = __webpack_require__(112)
	  , Iterators     = __webpack_require__(144)
	  , TO_STRING_TAG = __webpack_require__(93)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 272 */,
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEmail;
	
	var _assertString = __webpack_require__(174);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	var _merge = __webpack_require__(275);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _isByteLength = __webpack_require__(541);
	
	var _isByteLength2 = _interopRequireDefault(_isByteLength);
	
	var _isFQDN = __webpack_require__(542);
	
	var _isFQDN2 = _interopRequireDefault(_isFQDN);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var default_email_options = {
	  allow_display_name: false,
	  require_display_name: false,
	  allow_utf8_local_part: true,
	  require_tld: true
	};
	
	/* eslint-disable max-len */
	/* eslint-disable no-control-regex */
	var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
	var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
	var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
	var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
	var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
	/* eslint-enable max-len */
	/* eslint-enable no-control-regex */
	
	function isEmail(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_email_options);
	
	  if (options.require_display_name || options.allow_display_name) {
	    var display_email = str.match(displayName);
	    if (display_email) {
	      str = display_email[1];
	    } else if (options.require_display_name) {
	      return false;
	    }
	  }
	
	  var parts = str.split('@');
	  var domain = parts.pop();
	  var user = parts.join('@');
	
	  var lower_domain = domain.toLowerCase();
	  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
	    user = user.replace(/\./g, '').toLowerCase();
	  }
	
	  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
	    return false;
	  }
	
	  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
	    return false;
	  }
	
	  if (user[0] === '"') {
	    user = user.slice(1, user.length - 1);
	    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
	  }
	
	  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
	
	  var user_parts = user.split('.');
	  for (var i = 0; i < user_parts.length; i++) {
	    if (!pattern.test(user_parts[i])) {
	      return false;
	    }
	  }
	
	  return true;
	}
	module.exports = exports['default'];

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMobilePhone;
	
	var _assertString = __webpack_require__(174);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable max-len */
	var phones = {
	  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
	  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
	  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
	  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
	  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
	  'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
	  'da-DK': /^(\+?45)?(\d{8})$/,
	  'el-GR': /^(\+?30)?(69\d{8})$/,
	  'en-AU': /^(\+?61|0)4\d{8}$/,
	  'en-GB': /^(\+?44|0)7\d{9}$/,
	  'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
	  'en-IN': /^(\+?91|0)?[789]\d{9}$/,
	  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
	  'en-NZ': /^(\+?64|0)2\d{7,9}$/,
	  'en-ZA': /^(\+?27|0)\d{9}$/,
	  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
	  'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
	  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
	  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	  'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
	  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
	  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
	  'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
	  'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
	  'nb-NO': /^(\+?47)?[49]\d{7}$/,
	  'nl-BE': /^(\+?32|0)4?\d{8}$/,
	  'nn-NO': /^(\+?47)?[49]\d{7}$/,
	  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
	  'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
	  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
	  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
	  'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
	  'ru-RU': /^(\+?7|8)?9\d{9}$/,
	  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
	  'tr-TR': /^(\+?90|0)?5\d{9}$/,
	  'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
	  'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
	  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
	};
	/* eslint-enable max-len */
	
	// aliases
	phones['en-CA'] = phones['en-US'];
	phones['fr-BE'] = phones['nl-BE'];
	phones['zh-HK'] = phones['en-HK'];
	
	function isMobilePhone(str, locale) {
	  (0, _assertString2.default)(str);
	  if (locale in phones) {
	    return phones[locale].test(str);
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ }),
/* 275 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;
	function merge() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var defaults = arguments[1];
	
	  for (var key in defaults) {
	    if (typeof obj[key] === 'undefined') {
	      obj[key] = defaults[key];
	    }
	  }
	  return obj;
	}
	module.exports = exports['default'];

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90),
	    Base = __webpack_require__(97),
	    Animate = __webpack_require__(166),
	    Boundry = __webpack_require__(685),
	    Hammer = __webpack_require__(242),
	    Sticky = __webpack_require__(689),
	    Fixed = __webpack_require__(687);
	// boundry checked bounce effect
	var BOUNDRY_CHECK_DURATION = 500;
	var BOUNDRY_CHECK_EASING = "ease";
	var BOUNDRY_CHECK_ACCELERATION = 0.1;
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @param {number} cfg.SCROLL_ACCELERATION  acceleration for scroll, min value make the scrolling smoothly
	 * @param {number} cfg.BOUNDRY_CHECK_DURATION duration for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_EASING easing for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_ACCELERATION acceleration for boundry bounce
	 * @param {boolean} cfg.lockX just like overflow-x:hidden
	 * @param {boolean} cfg.lockY just like overflow-y:hidden
	 * @param {boolean} cfg.scrollbarX config if the scrollbar-x is visible
	 * @param {boolean} cfg.scrollbarY config if the scrollbar-y is visible
	 * @param {boolean} cfg.useTransition config if use css3 transition or raf for scroll animation
	 * @param {boolean} cfg.useOriginScroll config if use simulate or origin scroll
	 * @param {boolean} cfg.bounce config if use has the bounce effect when scrolling outside of the boundry
	 * @param {boolean} cfg.boundryCheck config if scrolling inside of the boundry
	 * @param {boolean} cfg.preventDefault prevent touchstart
	 * @param {boolean} cfg.preventTouchMove prevent touchmove
	 * @param {string|HTMLElement}  cfg.container config for scroller's container which default value is ".xs-container"
	 * @param {string|HTMLElement}  cfg.content config for scroller's content which default value is ".xs-content"
	 * @param {object}  cfg.indicatorInsets  config scrollbars position {top: number, left: number, bottom: number, right: number}
	 * @param {string}  cfg.stickyElements config for sticky-positioned elements
	 * @param {string}  cfg.fixedElements config for fixed-positioned elements
	 * @param {string}  cfg.touchAction config for touchAction of the scroller
	 * @extends XScroll
	 * @example
	 * var xscroll = new XScroll({
	 *    renderTo:"#scroll",
	 *    lockX:false,
	 *    scrollbarX:true
	 * });
	 * xscroll.render();
	 */
	function XScroll(cfg) {
	    XScroll.superclass.constructor.call(this);
	    this.userConfig = cfg;
	    this.init();
	}
	
	Util.extend(XScroll, Base, {
	    /**
	     * version
	     * @memberof XScroll
	     * @type {string}
	     */
	    version: "3.0.13",
	    /**
	     * init scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    init: function() {
	        var self = this;
	        var defaultCfg = {
	            preventDefault: true,
	            bounce: true,
	            boundryCheck: true,
	            useTransition: true,
	            gpuAcceleration: true,
	            BOUNDRY_CHECK_EASING: BOUNDRY_CHECK_EASING,
	            BOUNDRY_CHECK_DURATION: BOUNDRY_CHECK_DURATION,
	            BOUNDRY_CHECK_ACCELERATION: BOUNDRY_CHECK_ACCELERATION,
	            useOriginScroll: false,
	            zoomType: "y",
	            indicatorInsets: {
	                top: 3,
	                bottom: 3,
	                left: 3,
	                right: 3,
	                width: 3,
	                spacing: 5
	            },
	            container: ".xs-container",
	            content: ".xs-content",
	            stickyElements: ".xs-sticky",
	            fixedElements: ".xs-fixed",
	            touchAction: "auto"
	        };
	        //generate guid
	        self.guid = Util.guid();
	        self.renderTo = Util.getNode(self.userConfig.renderTo);
	        //timer for animtion
	        self.__timers = {};
	        //config attributes on element
	        var elCfg = JSON.parse(self.renderTo.getAttribute('xs-cfg'));
	        var userConfig = self.userConfig = Util.mix(Util.mix(defaultCfg, elCfg), self.userConfig);
	        self.container = Util.getNode(userConfig.container,self.renderTo);
	        self.content = Util.getNode(userConfig.content,self.renderTo);
	        self.boundry = new Boundry();
	        self.boundry.refresh();
	        return self;
	    },
	    /**
	     * destroy scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    destroy: function() {
	        var self = this;
	        self.mc && self.mc.destroy();
	        self.sticky && self.sticky.destroy();
	        self.fixed && self.fixed.destroy();
	    },
	    _initContainer: function() {},
	    /**
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    enableGPUAcceleration: function() {
	        this.userConfig.gpuAcceleration = true;
	        return this;
	    },
	    /**
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    disableGPUAcceleration: function() {
	        this.userConfig.gpuAcceleration = false;
	        return this;
	    },
	    /**
	     * get scroll offset
	     * @memberof XScroll
	     * @return {Object} {scrollTop:scrollTop,scrollLeft:scrollLeft}
	     */
	    getScrollPos: function() {
	        var self = this;
	        return {
	            scrollLeft: self.getScrollLeft(),
	            scrollTop: self.getScrollTop()
	        }
	    },
	    /**
	     * get scroll top value
	     * @memberof XScroll
	     * @return {number} scrollTop
	     */
	    getScrollTop: function() {},
	    /**
	     * get scroll left value
	     * @memberof XScroll
	     * @return {number} scrollLeft
	     */
	    getScrollLeft: function() {},
	    /**
	     * scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTo: function(scrollLeft, scrollTop, duration, easing, callback) {
	        var self = this;
	        var scrollLeft = (undefined === scrollLeft || isNaN(scrollLeft)) ? -self.getScrollLeft() : scrollLeft;
	        var scrollTop = (undefined === scrollTop || isNaN(scrollTop)) ? -self.getScrollTop() : scrollTop;
	        self.scrollLeft(scrollLeft, duration, easing, callback);
	        self.scrollTop(scrollTop, duration, easing, callback);
	    },
	    /**
	     * scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollBy: function(scrollLeft, scrollTop, duration, easing, callback) {
	        this.scrollByX(scrollLeft, duration, easing, callback);
	        this.scrollByY(scrollTop, duration, easing, callback);
	    },
	    /**
	     * horizontal scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeftBy: function(scrollLeft, duration, easing, callback) {
	        this.scrollLeft(Number(scrollLeft) + Number(this.getScrollLeft()), duration, easing, callback);
	    },
	    /**
	     * vertical scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTopBy: function(scrollTop, duration, easing, callback) {
	        this.scrollTop(Number(scrollTop) + Number(this.getScrollTop()), duration, easing, callback);
	    },
	    /**
	     * horizontal scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeft: function(scrollLeft, duration, easing, callback) {},
	    /**
	     * vertical scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTop: function(scrollTop, duration, easing, callback) {},
	    /**
	     * reset the boundry size
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    resetSize: function() {
	        var self = this;
	        if(!self.container || !self.content) return;
	        var userConfig = self.userConfig;
	        var renderToStyle = getComputedStyle(self.renderTo);
	        var width = self.width = (userConfig.width || self.renderTo.offsetWidth) - Util.px2Num(renderToStyle['padding-left']) - Util.px2Num(renderToStyle['padding-right']);
	        var height = self.height = (userConfig.height || self.renderTo.offsetHeight) - Util.px2Num(renderToStyle['padding-top']) - Util.px2Num(renderToStyle['padding-bottom']);;
	        var containerWidth = userConfig.containerWidth || self.content.offsetWidth;
	        var containerHeight = userConfig.containerHeight || self.content.offsetHeight;
	        self.containerWidth = containerWidth < self.width ? self.width : containerWidth;
	        self.containerHeight = containerHeight < self.height ? self.height : containerHeight;
	        self.boundry.refresh({
	            width: self.width,
	            height: self.height
	        });
	        return self;
	    },
	    /**
	     * render scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    render: function() {
	        var self = this;
	        self.resetSize();
	        //init stickies
	        self.initSticky();
	        //init fixed elements
	        self.initFixed();
	
	        self.trigger("afterrender", {
	            type: "afterrender"
	        });
	        self._bindEvt();
	        //update touch-action 
	        self.initTouchAction();
	        return self;
	    },
	    /**
	     * init touch action
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    initTouchAction: function() {
	        var self = this;
	        self.mc.set({
	            touchAction: self.userConfig.touchAction
	        });
	        return self;
	    },
	    initFixed: function() {
	        var self = this,
	            userConfig = self.userConfig;
	        self.fixed = self.fixed || new Fixed({
	            fixedElements:userConfig.fixedElements,
	            xscroll:self,
	            fixedRenderTo:userConfig.fixedRenderTo
	        });
	        self.fixed.render();
	        self.resetSize();
	        return self;
	    },
	    initSticky:function(){
	        var self = this,userConfig = self.userConfig;
	        var sticky = self.sticky = self.sticky || new Sticky({
	            xscroll:self,
	            zoomType:userConfig.zoomType,
	            stickyRenderTo:userConfig.stickyRenderTo
	        });
	        sticky.render();
	    },
	    /**
	     * bounce to the boundry vertical and horizontal
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheck: function() {
	        return this;
	    },
	    /**
	     * bounce to the boundry horizontal
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheckX: function() {
	        return this;
	    },
	    /**
	     * bounce to the boundry vertical
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheckY: function() {
	        return this;
	    },
	    _bindEvt: function() {
	        var self = this;
	        if (self.___isEvtBind) return;
	        self.___isEvtBind = true;
	        var mc = self.mc = new Hammer.Manager(self.renderTo);
	        var tap = new Hammer.Tap();
	        var pan = new Hammer.Pan();
	        var pinch = new Hammer.Pinch();
	        mc.add([tap, pan]);
	        //trigger all events 
	        self.mc.on("panstart pan panend pancancel pinchstart pinchmove pinchend pinchcancel pinchin pinchout", function(e) {
	            self.trigger(e.type, e);
	        });
	        //trigger touch events
	        var touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel','mousedown'];
	        for (var i = 0, l = touchEvents.length; i < l; i++) {
	            self.renderTo.addEventListener(touchEvents[i], function(e) {
	                self.trigger(e.type, e);
	            });
	        }
	        self.mc.on("tap", function(e) {
	            if (e.tapCount == 1) {
	                e.type = "tap";
	                self.trigger(e.type, e);
	            } else if (e.tapCount == 2) {
	                e.type = "doubletap";
	                self.trigger("doubletap", e);
	            }
	        });
	        return self;
	    },
	    _resetLockConfig: function() {},
	    stop: function() {}
	});
	
	if (typeof module == 'object' && module.exports) {
	    module.exports = XScroll;
	}
	/** ignored by jsdoc **/
	else {
	    return XScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	//easing
	var Easing = {
		"linear": [0, 0, 1, 1],
		"ease": [.25, .1, .25, 1],
		"ease-in":[.42,0,1,1],
		"ease-out": [0, 0, .58, 1],
		"ease-in-out": [.42, 0, .58, 1],
		"quadratic": [0.33, 0.66, 0.66, 1],
		"circular": [0.1, 0.57, 0.1, 1],
		"bounce": [.71, 1.35, .47, 1.41],
		format: function(easing) {
			if (!easing) return;
			if (typeof easing === "string" && this[easing]) {
				return this[easing] instanceof Array ? [" cubic-bezier(", this[easing], ") "].join("") : this[easing];
			}
			if (easing instanceof Array) {
				return [" cubic-bezier(", easing, ") "].join("");
			}
			return easing;
		}
	}
	if (typeof module == 'object' && module.exports) {
		module.exports = Easing;
	}
	/** ignored by jsdoc **/
	 else {
		return Easing;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Base = __webpack_require__(97);
	var Easing = __webpack_require__(277);
	
	var RAF = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	
	var vendors = ['webkit', 'moz', 'ms', 'o'];
	var cancelRAF = window.cancelAnimationFrame;
	for (var i = 0; i < vendors.length; i++) {
		if (window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']) {
			cancelRAF = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
		}
	}
	cancelRAF = cancelRAF || window.clearTimeout;
	
	function Bezier(x1, y1, x2, y2, epsilon) {
		var curveX = function(t) {
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};
	
		var curveY = function(t) {
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};
	
		var derivativeCurveX = function(t) {
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
		};
	
		return function(t) {
	
			var x = t,
				t0, t1, t2, x2, d2, i;
	
			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++) {
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}
	
			t0 = 0, t1 = 1, t2 = x;
	
			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);
	
			// Fallback to the bisection method for reliability.
			while (t0 < t1) {
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}
	
			// Failure
			return curveY(t2);
	
		};
	
	};
	
	
	
	function Timer(cfg) {
		var self = this;
		self.cfg = Util.mix({
			easing: "linear"
		}, cfg)
	}
	
	Timer.MIN_DURATION = 1;
	
	Util.extend(Timer, Base, {
		reset: function(cfg) {
			var self = this;
			Util.mix(self.cfg, cfg);
			self.isfinished = false;
			self.percent = 0;
			self._stop = null;
		},
		run: function() {
			var self = this;
			var duration = self.cfg.duration;
			if (duration <= Timer.MIN_DURATION) {
				self.isfinished = true;
				self.trigger("run", {
					percent: 1
				});
				self.trigger("end", {
					percent: 1
				});
			}
			if (self.isfinished) return;
			self._hasFinishedPercent = self._stop && self._stop.percent || 0;
			self._stop = null;
			self.start = Date.now();
			self.percent = 0;
			// epsilon determines the precision of the solved values
			var epsilon = (1000 / 60 / duration) / 4;
			var b = Easing[self.cfg.easing];
			self.easingFn = Bezier(b[0], b[1], b[2], b[3], epsilon);
			self._run();
		},
		_run: function() {
			var self = this;
			cancelRAF(self._raf);
			self._raf = RAF(function() {
				self.now = Date.now();
				self.duration = self.now - self.start >= self.cfg.duration ? self.cfg.duration : self.now - self.start;
				self.progress = self.easingFn(self.duration / self.cfg.duration);
				self.percent = self.duration / self.cfg.duration + self._hasFinishedPercent;
				if (self.percent >= 1 || self._stop) {
					self.percent = self._stop && self._stop.percent ? self._stop.percent : 1;
					self.duration = self._stop && self._stop.duration ? self._stop.duration : self.duration;
					var param = {
						percent: self.percent
					};
					self.trigger("stop", param);
					if (self.percent >= 1) {
						self.isfinished = true;
						self.trigger("end", {
							percent: 1
						});
					}
					return;
				}
				self.trigger("run", {
					percent: self.progress,
					originPercent:self.percent
				});
				self._run();
			})
		},
		stop: function() {
			var self = this;
			self._stop = {
				percent: self.percent,
				now: self.now
			};
			cancelRAF(self._raf)
		}
	});
	
	
	if (typeof module == 'object' && module.exports) {
		module.exports = Timer;
	}
	/** ignored by jsdoc **/
	else {
		return Timer;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 279 */
/***/ (function(module, exports) {

	
	/**
	 * Array#filter.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object=} self
	 * @return {Array}
	 * @throw TypeError
	 */
	
	module.exports = function (arr, fn, self) {
	  if (arr.filter) return arr.filter(fn, self);
	  if (void 0 === arr || null === arr) throw new TypeError;
	  if ('function' != typeof fn) throw new TypeError;
	  var ret = [];
	  for (var i = 0; i < arr.length; i++) {
	    if (!hasOwn.call(arr, i)) continue;
	    var val = arr[i];
	    if (fn.call(self, val, i, arr)) ret.push(val);
	  }
	  return ret;
	};
	
	var hasOwn = Object.prototype.hasOwnProperty;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = (typeof Array.from === 'function' ?
	  Array.from :
	  __webpack_require__(281)
	);


/***/ }),
/* 281 */
/***/ (function(module, exports) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
	module.exports = (function() {
	  var isCallable = function(fn) {
	    return typeof fn === 'function';
	  };
	  var toInteger = function (value) {
	    var number = Number(value);
	    if (isNaN(number)) { return 0; }
	    if (number === 0 || !isFinite(number)) { return number; }
	    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	  };
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	  var toLength = function (value) {
	    var len = toInteger(value);
	    return Math.min(Math.max(len, 0), maxSafeInteger);
	  };
	  var iteratorProp = function(value) {
	    if(value != null) {
	      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
	        return Symbol.iterator;
	      } else if (
	        (typeof Symbol !== 'undefined') &&
	        ('iterator' in Symbol) &&
	        (Symbol.iterator in value)
	      ) {
	        return Symbol.iterator;
	      }
	      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
	      else if ('@@iterator' in value) {
	        return '@@iterator';
	      }
	    }
	  };
	  var getMethod = function(O, P) {
	    // Assert: IsPropertyKey(P) is true.
	    if (O != null && P != null) {
	      // Let func be GetV(O, P).
	      var func = O[P];
	      // ReturnIfAbrupt(func).
	      // If func is either undefined or null, return undefined.
	      if(func == null) {
	        return void 0;
	      }
	      // If IsCallable(func) is false, throw a TypeError exception.
	      if (!isCallable(func)) {
	        throw new TypeError(func + ' is not a function');
	      }
	      return func;
	    }
	  };
	  var iteratorStep = function(iterator) {
	    // Let result be IteratorNext(iterator).
	    // ReturnIfAbrupt(result).
	    var result = iterator.next();
	    // Let done be IteratorComplete(result).
	    // ReturnIfAbrupt(done).
	    var done = Boolean(result.done);
	    // If done is true, return false.
	    if(done) {
	      return false;
	    }
	    // Return result.
	    return result;
	  };
	
	  // The length property of the from method is 1.
	  return function from(items /*, mapFn, thisArg */ ) {
	    'use strict';
	
	    // 1. Let C be the this value.
	    var C = this;
	
	    // 2. If mapfn is undefined, let mapping be false.
	    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
	
	    var T;
	    if (typeof mapFn !== 'undefined') {
	      // 3. else
	      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
	      if (!isCallable(mapFn)) {
	        throw new TypeError(
	          'Array.from: when provided, the second argument must be a function'
	        );
	      }
	
	      //   b. If thisArg was supplied, let T be thisArg; else let T
	      //      be undefined.
	      if (arguments.length > 2) {
	        T = arguments[2];
	      }
	      //   c. Let mapping be true (implied by mapFn)
	    }
	
	    var A, k;
	
	    // 4. Let usingIterator be GetMethod(items, @@iterator).
	    // 5. ReturnIfAbrupt(usingIterator).
	    var usingIterator = getMethod(items, iteratorProp(items));
	
	    // 6. If usingIterator is not undefined, then
	    if (usingIterator !== void 0) {
	      // a. If IsConstructor(C) is true, then
	      //   i. Let A be the result of calling the [[Construct]]
	      //      internal method of C with an empty argument list.
	      // b. Else,
	      //   i. Let A be the result of the abstract operation ArrayCreate
	      //      with argument 0.
	      // c. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C()) : [];
	
	      // d. Let iterator be GetIterator(items, usingIterator).
	      var iterator = usingIterator.call(items);
	
	      // e. ReturnIfAbrupt(iterator).
	      if (iterator == null) {
	        throw new TypeError(
	          'Array.from requires an array-like or iterable object'
	        );
	      }
	
	      // f. Let k be 0.
	      k = 0;
	
	      // g. Repeat
	      var next, nextValue;
	      while (true) {
	        // i. Let Pk be ToString(k).
	        // ii. Let next be IteratorStep(iterator).
	        // iii. ReturnIfAbrupt(next).
	        next = iteratorStep(iterator);
	
	        // iv. If next is false, then
	        if (!next) {
	
	          // 1. Let setStatus be Set(A, "length", k, true).
	          // 2. ReturnIfAbrupt(setStatus).
	          A.length = k;
	
	          // 3. Return A.
	          return A;
	        }
	        // v. Let nextValue be IteratorValue(next).
	        // vi. ReturnIfAbrupt(nextValue)
	        nextValue = next.value;
	
	        // vii. If mapping is true, then
	        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
	        //   2. If mappedValue is an abrupt completion, return
	        //      IteratorClose(iterator, mappedValue).
	        //   3. Let mappedValue be mappedValue.[[value]].
	        // viii. Else, let mappedValue be nextValue.
	        // ix.  Let defineStatus be the result of
	        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
	        // x. [TODO] If defineStatus is an abrupt completion, return
	        //    IteratorClose(iterator, defineStatus).
	        if (mapFn) {
	          A[k] = mapFn.call(T, nextValue, k);
	        }
	        else {
	          A[k] = nextValue;
	        }
	        // xi. Increase k by 1.
	        k++;
	      }
	      // 7. Assert: items is not an Iterable so assume it is
	      //    an array-like object.
	    } else {
	
	      // 8. Let arrayLike be ToObject(items).
	      var arrayLike = Object(items);
	
	      // 9. ReturnIfAbrupt(items).
	      if (items == null) {
	        throw new TypeError(
	          'Array.from requires an array-like object - not null or undefined'
	        );
	      }
	
	      // 10. Let len be ToLength(Get(arrayLike, "length")).
	      // 11. ReturnIfAbrupt(len).
	      var len = toLength(arrayLike.length);
	
	      // 12. If IsConstructor(C) is true, then
	      //     a. Let A be Construct(C, «len»).
	      // 13. Else
	      //     a. Let A be ArrayCreate(len).
	      // 14. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C(len)) : new Array(len);
	
	      // 15. Let k be 0.
	      k = 0;
	      // 16. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = arrayLike[k];
	        if (mapFn) {
	          A[k] = mapFn.call(T, kValue, k);
	        }
	        else {
	          A[k] = kValue;
	        }
	        k++;
	      }
	      // 17. Let setStatus be Set(A, "length", len, true).
	      // 18. ReturnIfAbrupt(setStatus).
	      A.length = len;
	      // 19. Return A.
	    }
	    return A;
	  };
	})();


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		Autosize 3.0.20
		license: MIT
		http://www.jacklmoore.com/autosize
	*/
	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
			factory(exports, module);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, mod);
			global.autosize = mod.exports;
		}
	})(this, function (exports, module) {
		'use strict';
	
		var map = typeof Map === "function" ? new Map() : (function () {
			var keys = [];
			var values = [];
	
			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				'delete': function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				}
			};
		})();
	
		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
		};
		try {
			new Event('test');
		} catch (e) {
			// IE does not support `new Event()`
			createEvent = function (name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}
	
		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;
	
			var heightOffset = null;
			var clientWidth = ta.clientWidth;
			var cachedHeight = null;
	
			function init() {
				var style = window.getComputedStyle(ta, null);
	
				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}
	
				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				// Fix when a textarea is not on document body and heightOffset is Not a Number
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}
	
				update();
			}
	
			function changeOverflow(value) {
				{
					// Chrome/Safari-specific fix:
					// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
					// made available by removing the scrollbar. The following forces the necessary text reflow.
					var width = ta.style.width;
					ta.style.width = '0px';
					// Force reflow:
					/* jshint ignore:start */
					ta.offsetWidth;
					/* jshint ignore:end */
					ta.style.width = width;
				}
	
				ta.style.overflowY = value;
			}
	
			function getParentOverflows(el) {
				var arr = [];
	
				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
					}
					el = el.parentNode;
				}
	
				return arr;
			}
	
			function resize() {
				var originalHeight = ta.style.height;
				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)
	
				ta.style.height = 'auto';
	
				var endHeight = ta.scrollHeight + heightOffset;
	
				if (ta.scrollHeight === 0) {
					// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
					ta.style.height = originalHeight;
					return;
				}
	
				ta.style.height = endHeight + 'px';
	
				// used to check if an update is actually necessary on window.resize
				clientWidth = ta.clientWidth;
	
				// prevents scroll-position jumping
				overflows.forEach(function (el) {
					el.node.scrollTop = el.scrollTop;
				});
	
				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}
	
			function update() {
				resize();
	
				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);
				var actualHeight = Math.round(parseFloat(computed.height));
	
				// The actual height not matching the style height (set via the resize method) indicates that
				// the max-height has been exceeded, in which case the overflow should be set to visible.
				if (actualHeight !== styleHeight) {
					if (computed.overflowY !== 'visible') {
						changeOverflow('visible');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				} else {
					// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				}
	
				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
						// Firefox will throw an error on dispatchEvent for a detached element
						// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
					}
				}
			}
	
			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};
	
			var destroy = (function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);
	
				Object.keys(style).forEach(function (key) {
					ta.style[key] = style[key];
				});
	
				map['delete'](ta);
			}).bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap
			});
	
			ta.addEventListener('autosize:destroy', destroy, false);
	
			// IE9 does not fire onpropertychange or oninput for deletions,
			// so binding to onkeyup to catch most of those events.
			// There is no way that I know of to detect something like 'cut' in IE9.
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}
	
			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
	
			map.set(ta, {
				destroy: destroy,
				update: update
			});
	
			init();
		}
	
		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}
	
		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}
	
		var autosize = null;
	
		// Do nothing in Node.js environment and IE8 (or lower)
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function (el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function (el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], function (x) {
						return assign(x, options);
					});
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}
	
		module.exports = autosize;
	});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	var bind = __webpack_require__(249);
	var Axios = __webpack_require__(285);
	var defaults = __webpack_require__(176);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(246);
	axios.CancelToken = __webpack_require__(284);
	axios.isCancel = __webpack_require__(247);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(299);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(246);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(176);
	var utils = __webpack_require__(94);
	var InterceptorManager = __webpack_require__(286);
	var dispatchRequest = __webpack_require__(287);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	var transformData = __webpack_require__(290);
	var isCancel = __webpack_require__(247);
	var defaults = __webpack_require__(176);
	var isAbsoluteURL = __webpack_require__(295);
	var combineURLs = __webpack_require__(293);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 288 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(248);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 291 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 293 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 295 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 299 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */
/***/ (function(module, exports) {

	'use strict';
	
	var time = Date.now || function () {
	  return +new Date();
	};
	
	var running = {};
	var counter = 1;
	var desiredFrames = 60;
	var millisecondsPerSecond = 1000;(function () {
	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];
	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }
	
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function (callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }
	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	      clearTimeout(id);
	    };
	  }
	})();
	
	module.exports = {
	  requestAnimationFrame: function () {
	    var requestFrame = window.requestAnimationFrame;
	    return function (callback, root) {
	      requestFrame(callback, root);
	    };
	  }(),
	
	  stop: function stop(id) {
	    var cleared = running[id] != null;
	    if (cleared) {
	      running[id] = null;
	    }
	    return cleared;
	  },
	  isRunning: function isRunning(id) {
	    return running[id] != null;
	  },
	  start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
	    var _this = this;
	    var start = time();
	    var lastFrame = start;
	    var percent = 0;
	    var dropCounter = 0;
	    var id = counter++;
	
	    if (!root) {
	      root = document.body;
	    }
	
	    if (id % 20 === 0) {
	      var newRunning = {};
	      for (var usedId in running) {
	        newRunning[usedId] = true;
	      }
	      running = newRunning;
	    }
	
	    var step = function step(virtual) {
	      var render = virtual !== true;
	
	      var now = time();
	
	      if (!running[id] || verifyCallback && !verifyCallback(id)) {
	        running[id] = null;
	        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
	        return;
	      }
	
	      if (render) {
	        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
	        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
	          step(true);
	          dropCounter++;
	        }
	      }
	
	      if (duration) {
	        percent = (now - start) / duration;
	        if (percent > 1) {
	          percent = 1;
	        }
	      }
	
	      var value = easingMethod ? easingMethod(percent) : percent;
	      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
	        running[id] = null;
	        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
	      } else if (render) {
	        lastFrame = now;
	        _this.requestAnimationFrame(step, root);
	      }
	    };
	
	    running[id] = true;
	
	    _this.requestAnimationFrame(step, root);
	
	    return id;
	  }
	};

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(91);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _classCallCheck2 = __webpack_require__(257);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(258);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _arrayFilter = __webpack_require__(279);
	
	var _arrayFilter2 = _interopRequireDefault(_arrayFilter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Manager = function () {
	  function Manager(data, count, fixedColumns) {
	    (0, _classCallCheck3.default)(this, Manager);
	
	    this.data = data;
	    this.count = count;
	    if (fixedColumns) {
	      this.fixedColumns = fixedColumns;
	    }
	  }
	
	  (0, _createClass3.default)(Manager, [{
	    key: 'getChildren',
	    value: function getChildren(value) {
	      return (0, _arrayFilter2.default)(this.data, function (one) {
	        return one.parent === value;
	      });
	    }
	  }, {
	    key: 'getFirstColumn',
	    value: function getFirstColumn() {
	      return (0, _arrayFilter2.default)(this.data, function (one) {
	        return !one.parent || one.parent === 0 || one.parent === '0';
	      });
	    }
	  }, {
	    key: 'getPure',
	    value: function getPure(obj) {
	      return JSON.parse((0, _stringify2.default)(obj));
	    }
	  }, {
	    key: 'getColumns',
	    value: function getColumns(value) {
	      var _this = this;
	
	      if (value.length > 0) {
	        var matchCount = this.getPure(this.data).filter(function (item) {
	          return _this.getPure(value).indexOf(item.value) > -1;
	        }).length;
	        if (matchCount < this.getPure(value).length) {
	          value = [];
	        }
	      }
	      var datas = [];
	      var max = this.fixedColumns || 8;
	      for (var i = 0; i < max; i++) {
	        if (i === 0) {
	          datas.push(this.getFirstColumn());
	        } else {
	          if (!value[i]) {
	            if (typeof datas[i - 1][0] === 'undefined') {
	              break;
	            } else {
	              var topValue = datas[i - 1][0].value;
	              datas.push(this.getChildren(topValue));
	            }
	          } else {
	            datas.push(this.getChildren(value[i - 1]));
	          }
	        }
	      }
	      var list = datas.filter(function (item) {
	        return item.length > 0;
	      });
	
	      this.count = list.length;
	      return list;
	    }
	  }]);
	  return Manager;
	}();
	
	exports.default = Manager;

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var TEMPLATE = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n';
	
	var Animate = __webpack_require__(373);
	
	var _require = __webpack_require__(376),
	    getElement = _require.getElement,
	    getComputedStyle = _require.getComputedStyle,
	    easeOutCubic = _require.easeOutCubic,
	    easeInOutCubic = _require.easeInOutCubic;
	
	var Scroller = function Scroller(container, options) {
	  var self = this;
	
	  options = options || {};
	
	  self.options = {
	    itemClass: 'scroller-item',
	    onSelect: function onSelect() {},
	
	    defaultValue: 0,
	    data: []
	  };
	
	  for (var key in options) {
	    if (options[key] !== undefined) {
	      self.options[key] = options[key];
	    }
	  }
	
	  self.__container = getElement(container);
	
	  var tempContainer = document.createElement('div');
	  tempContainer.innerHTML = options.template || TEMPLATE;
	
	  var component = self.__component = tempContainer.querySelector('[data-role=component]');
	  var content = self.__content = component.querySelector('[data-role=content]');
	  var indicator = component.querySelector('[data-role=indicator]');
	
	  var data = self.options.data;
	  var html = '';
	  if (data.length && data[0].constructor === Object) {
	    data.forEach(function (row) {
	      html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + '</div>';
	    });
	  } else {
	    data.forEach(function (val) {
	      html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + '</div>';
	    });
	  }
	  content.innerHTML = html;
	
	  self.__container.appendChild(component);
	
	  self.__itemHeight = parseInt(getComputedStyle(indicator, 'height'), 10);
	
	  self.__callback = options.callback || function (top) {
	    content.style.webkitTransform = 'translate3d(0, ' + -top + 'px, 0)';
	  };
	
	  var rect = component.getBoundingClientRect();
	
	  self.__clientTop = rect.top + component.clientTop || 0;
	
	  self.__setDimensions(component.clientHeight, content.offsetHeight);
	
	  if (component.clientHeight === 0) {
	    self.__setDimensions(parseInt(getComputedStyle(component, 'height'), 10), 204);
	  }
	  self.select(self.options.defaultValue, false);
	
	  var touchStartHandler = function touchStartHandler(e) {
	    if (e.target.tagName.match(/input|textarea|select/i)) {
	      return;
	    }
	    e.preventDefault();
	    self.__doTouchStart(e, e.timeStamp);
	  };
	
	  var touchMoveHandler = function touchMoveHandler(e) {
	    self.__doTouchMove(e, e.timeStamp);
	  };
	
	  var touchEndHandler = function touchEndHandler(e) {
	    self.__doTouchEnd(e.timeStamp);
	  };
	
	  component.addEventListener('touchstart', touchStartHandler, false);
	  component.addEventListener('mousedown', touchStartHandler, false);
	
	  component.addEventListener('touchmove', touchMoveHandler, false);
	  component.addEventListener('mousemove', touchMoveHandler, false);
	
	  component.addEventListener('touchend', touchEndHandler, false);
	  component.addEventListener('mouseup', touchEndHandler, false);
	};
	
	var members = {
	  value: null,
	  __prevValue: null,
	  __isSingleTouch: false,
	  __isTracking: false,
	  __didDecelerationComplete: false,
	  __isGesturing: false,
	  __isDragging: false,
	  __isDecelerating: false,
	  __isAnimating: false,
	  __clientTop: 0,
	  __clientHeight: 0,
	  __contentHeight: 0,
	  __itemHeight: 0,
	  __scrollTop: 0,
	  __minScrollTop: 0,
	  __maxScrollTop: 0,
	  __scheduledTop: 0,
	  __lastTouchTop: null,
	  __lastTouchMove: null,
	  __positions: null,
	  __minDecelerationScrollTop: null,
	  __maxDecelerationScrollTop: null,
	  __decelerationVelocityY: null,
	
	  __setDimensions: function __setDimensions(clientHeight, contentHeight) {
	    var self = this;
	
	    self.__clientHeight = clientHeight;
	    self.__contentHeight = contentHeight;
	
	    var totalItemCount = self.options.data.length;
	    var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);
	
	    self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
	    self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - 0.1;
	  },
	  selectByIndex: function selectByIndex(index, animate) {
	    var self = this;
	    if (index < 0 || index > self.__content.childElementCount - 1) {
	      return;
	    }
	    self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;
	
	    self.scrollTo(self.__scrollTop, animate);
	
	    self.__selectItem(self.__content.children[index]);
	  },
	  select: function select(value, animate) {
	    var self = this;
	
	    var children = self.__content.children;
	    for (var i = 0, len = children.length; i < len; i++) {
	      if (children[i].dataset.value === value) {
	        self.selectByIndex(i, animate);
	        return;
	      }
	    }
	
	    self.selectByIndex(0, animate);
	  },
	  getValue: function getValue() {
	    return this.value;
	  },
	  scrollTo: function scrollTo(top, animate) {
	    var self = this;
	
	    animate = animate === undefined ? true : animate;
	
	    if (self.__isDecelerating) {
	      Animate.stop(self.__isDecelerating);
	      self.__isDecelerating = false;
	    }
	
	    top = Math.round(top / self.__itemHeight) * self.__itemHeight;
	    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);
	
	    if (top === self.__scrollTop || !animate) {
	      self.__publish(top);
	      self.__scrollingComplete();
	      return;
	    }
	    self.__publish(top, 250);
	  },
	  destroy: function destroy() {
	    this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
	  },
	  __selectItem: function __selectItem(selectedItem) {
	    var self = this;
	
	    var selectedItemClass = self.options.itemClass + '-selected';
	    var lastSelectedElem = self.__content.querySelector('.' + selectedItemClass);
	    if (lastSelectedElem) {
	      lastSelectedElem.classList.remove(selectedItemClass);
	    }
	    selectedItem.classList.add(selectedItemClass);
	
	    if (self.value !== null) {
	      self.__prevValue = self.value;
	    }
	
	    self.value = selectedItem.dataset.value;
	  },
	  __scrollingComplete: function __scrollingComplete() {
	    var self = this;
	
	    var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);
	
	    self.__selectItem(self.__content.children[index]);
	
	    if (self.__prevValue !== null && self.__prevValue !== self.value) {
	      self.options.onSelect(self.value);
	    }
	  },
	  __doTouchStart: function __doTouchStart(ev, timeStamp) {
	    var touches = ev.touches;
	    var self = this;
	    var target = ev.touches ? ev.touches[0] : ev;
	    var isMobile = !!ev.touches;
	
	    if (ev.touches && touches.length == null) {
	      throw new Error('Invalid touch list: ' + touches);
	    }
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	
	    self.__interruptedAnimation = true;
	
	    if (self.__isDecelerating) {
	      Animate.stop(self.__isDecelerating);
	      self.__isDecelerating = false;
	      self.__interruptedAnimation = true;
	    }
	
	    if (self.__isAnimating) {
	      Animate.stop(self.__isAnimating);
	      self.__isAnimating = false;
	      self.__interruptedAnimation = true;
	    }
	
	    var currentTouchTop;
	    var isSingleTouch = isMobile && touches.length === 1 || !isMobile;
	    if (isSingleTouch) {
	      currentTouchTop = target.pageY;
	    } else {
	      currentTouchTop = Math.abs(target.pageY + touches[1].pageY) / 2;
	    }
	
	    self.__initialTouchTop = currentTouchTop;
	    self.__lastTouchTop = currentTouchTop;
	    self.__lastTouchMove = timeStamp;
	    self.__lastScale = 1;
	    self.__enableScrollY = !isSingleTouch;
	    self.__isTracking = true;
	    self.__didDecelerationComplete = false;
	    self.__isDragging = !isSingleTouch;
	    self.__isSingleTouch = isSingleTouch;
	    self.__positions = [];
	  },
	  __doTouchMove: function __doTouchMove(ev, timeStamp, scale) {
	    var self = this;
	    var touches = ev.touches;
	    var target = ev.touches ? ev.touches[0] : ev;
	    var isMobile = !!ev.touches;
	
	    if (touches && touches.length == null) {
	      throw new Error('Invalid touch list: ' + touches);
	    }
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	
	    if (!self.__isTracking) {
	      return;
	    }
	
	    var currentTouchTop;
	
	    if (isMobile && touches.length === 2) {
	      currentTouchTop = Math.abs(target.pageY + touches[1].pageY) / 2;
	    } else {
	      currentTouchTop = target.pageY;
	    }
	
	    var positions = self.__positions;
	
	    if (self.__isDragging) {
	      var moveY = currentTouchTop - self.__lastTouchTop;
	      var scrollTop = self.__scrollTop;
	
	      if (self.__enableScrollY) {
	        scrollTop -= moveY;
	
	        var minScrollTop = self.__minScrollTop;
	        var maxScrollTop = self.__maxScrollTop;
	
	        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
	          if (scrollTop > maxScrollTop) {
	            scrollTop = maxScrollTop;
	          } else {
	            scrollTop = minScrollTop;
	          }
	        }
	      }
	
	      if (positions.length > 40) {
	        positions.splice(0, 20);
	      }
	
	      positions.push(scrollTop, timeStamp);
	
	      self.__publish(scrollTop);
	    } else {
	      var minimumTrackingForScroll = 0;
	      var minimumTrackingForDrag = 5;
	
	      var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
	
	      self.__enableScrollY = distanceY >= minimumTrackingForScroll;
	
	      positions.push(self.__scrollTop, timeStamp);
	
	      self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;
	
	      if (self.__isDragging) {
	        self.__interruptedAnimation = false;
	      }
	    }
	
	    self.__lastTouchTop = currentTouchTop;
	    self.__lastTouchMove = timeStamp;
	    self.__lastScale = scale;
	  },
	  __doTouchEnd: function __doTouchEnd(timeStamp) {
	    var self = this;
	
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	
	    if (!self.__isTracking) {
	      return;
	    }
	
	    self.__isTracking = false;
	
	    if (self.__isDragging) {
	      self.__isDragging = false;
	
	      if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
	        var positions = self.__positions;
	        var endPos = positions.length - 1;
	        var startPos = endPos;
	
	        for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
	          startPos = i;
	        }
	
	        if (startPos !== endPos) {
	          var timeOffset = positions[endPos] - positions[startPos];
	          var movedTop = self.__scrollTop - positions[startPos - 1];
	
	          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
	
	          var minVelocityToStartDeceleration = 4;
	
	          if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
	            self.__startDeceleration(timeStamp);
	          }
	        }
	      }
	    }
	
	    if (!self.__isDecelerating) {
	      self.scrollTo(self.__scrollTop);
	    }
	
	    self.__positions.length = 0;
	  },
	  __publish: function __publish(top, animationDuration) {
	    var self = this;
	
	    var wasAnimating = self.__isAnimating;
	    if (wasAnimating) {
	      Animate.stop(wasAnimating);
	      self.__isAnimating = false;
	    }
	
	    if (animationDuration) {
	      self.__scheduledTop = top;
	
	      var oldTop = self.__scrollTop;
	      var diffTop = top - oldTop;
	
	      var step = function step(percent, now, render) {
	        self.__scrollTop = oldTop + diffTop * percent;
	
	        if (self.__callback) {
	          self.__callback(self.__scrollTop);
	        }
	      };
	
	      var verify = function verify(id) {
	        return self.__isAnimating === id;
	      };
	
	      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
	        if (animationId === self.__isAnimating) {
	          self.__isAnimating = false;
	        }
	        if (self.__didDecelerationComplete || wasFinished) {
	          self.__scrollingComplete();
	        }
	      };
	
	      self.__isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
	    } else {
	      self.__scheduledTop = self.__scrollTop = top;
	
	      if (self.__callback) {
	        self.__callback(top);
	      }
	    }
	  },
	  __startDeceleration: function __startDeceleration(timeStamp) {
	    var self = this;
	
	    self.__minDecelerationScrollTop = self.__minScrollTop;
	    self.__maxDecelerationScrollTop = self.__maxScrollTop;
	
	    var step = function step(percent, now, render) {
	      self.__stepThroughDeceleration(render);
	    };
	
	    var minVelocityToKeepDecelerating = 0.5;
	
	    var verify = function verify() {
	      var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
	      if (!shouldContinue) {
	        self.__didDecelerationComplete = true;
	      }
	      return shouldContinue;
	    };
	
	    var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
	      self.__isDecelerating = false;
	      if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
	        self.scrollTo(self.__scrollTop);
	        return;
	      }
	      if (self.__didDecelerationComplete) {
	        self.__scrollingComplete();
	      }
	    };
	
	    self.__isDecelerating = Animate.start(step, verify, completed);
	  },
	  __stepThroughDeceleration: function __stepThroughDeceleration(render) {
	    var self = this;
	
	    var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
	
	    var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
	    if (scrollTopFixed !== scrollTop) {
	      scrollTop = scrollTopFixed;
	      self.__decelerationVelocityY = 0;
	    }
	
	    if (Math.abs(self.__decelerationVelocityY) <= 1) {
	      if (Math.abs(scrollTop % self.__itemHeight) < 1) {
	        self.__decelerationVelocityY = 0;
	      }
	    } else {
	      self.__decelerationVelocityY *= 0.95;
	    }
	
	    self.__publish(scrollTop);
	  }
	};
	
	for (var key in members) {
	  Scroller.prototype[key] = members[key];
	}
	
	module.exports = Scroller;

/***/ }),
/* 376 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getElement = getElement;
	exports.getComputedStyle = getComputedStyle;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	function getElement(expr) {
	  return typeof expr === 'string' ? document.querySelector(expr) : expr;
	}
	
	function getComputedStyle(el, key) {
	  var computedStyle = window.getComputedStyle(el);
	  return computedStyle[key] || '';
	}
	
	function easeOutCubic(pos) {
	  return Math.pow(pos - 1, 3) + 1;
	}
	
	function easeInOutCubic(pos) {
	  if ((pos /= 0.5) < 1) {
	    return 0.5 * Math.pow(pos, 3);
	  }
	  return 0.5 * (Math.pow(pos - 2, 3) + 2);
	}

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _super = __webpack_require__(388);
	
	var _main = __webpack_require__(389);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var closest = __webpack_require__(379);
	var percentage = __webpack_require__(251);
	
	exports.default = Horizontal;
	
	
	function getWidth(el) {
	  var width = window.getComputedStyle(el, null)['width'];
	  if (width === '100%' || width === 'auto') {
	    return 0;
	  }
	  return parseInt(width, 10);
	}
	
	function Horizontal() {
	  _main2.default.apply(this, arguments);
	  if (this.options.step) {
	    this.step(getWidth(this.slider) || this.options.initialBarWidth, getWidth(this.handle));
	  }
	  this.setStart(this.options.start);
	}
	
	(0, _super.inherits)(Horizontal, _main2.default);
	
	Horizontal.prototype.setStart = function (start) {
	  var begin = start === null ? this.options.min : start;
	  var part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0;
	  var offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth);
	  var position = this.options.step ? closest.find(offset, this.steps) : offset;
	
	  this.setPosition(position);
	  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
	};
	
	Horizontal.prototype.setPosition = function (val) {
	  this.handle.style.left = val + 'px';
	  this.slider.querySelector('.range-quantity').style.width = val + 'px';
	};
	
	Horizontal.prototype.onmousedown = function (e) {
	  if (e.touches) e = e.touches[0];
	  this.startX = e.clientX;
	  this.handleOffsetX = this.handle.offsetLeft;
	  this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth;
	  this.unselectable(this.slider, true);
	};
	
	Horizontal.prototype.onmousemove = function (e) {
	  e.preventDefault();
	  if (e.touches) e = e.touches[0];
	
	  var leftOffset = this.handleOffsetX + e.clientX - this.startX;
	  var position = this.steps ? closest.find(leftOffset, this.steps) : leftOffset;
	
	  if (leftOffset <= 0) {
	    this.setPosition(0);
	  } else if (leftOffset >= this.restrictHandleX) {
	    this.setPosition(this.restrictHandleX);
	  } else {
	    this.setPosition(position);
	  }
	
	  this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
	};
	
	Horizontal.prototype.onmouseup = function (e) {
	  this.unselectable(this.slider, false);
	};

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var index = __webpack_require__(384);
	
	var re = /\s+/;
	
	var toString = Object.prototype.toString;
	
	module.exports = function (el) {
	  return new ClassList(el);
	};
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	ClassList.prototype.add = function (name) {
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	ClassList.prototype.remove = function (name) {
	  if (toString.call(name) === '[object RegExp]') {
	    return this.removeMatching(name);
	  }
	
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	ClassList.prototype.removeMatching = function (re) {
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	ClassList.prototype.toggle = function (name, force) {
	  if (this.list) {
	    if (typeof force !== 'undefined') {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name);
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  if (typeof force !== 'undefined') {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	ClassList.prototype.array = function () {
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if (arr[0] === '') arr.shift();
	  return arr;
	};
	
	ClassList.prototype.has = ClassList.prototype.contains = function (name) {
	  return this.list ? this.list.contains(name) : !!~index(this.array(), name);
	};

/***/ }),
/* 379 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.find = function (target, points) {
	  var diff = null;
	  var current = null;
	  var closest = points[0];
	
	  for (var i = 0; i < points.length; i++) {
	    diff = Math.abs(target - closest);
	    current = Math.abs(target - points[i]);
	    if (current < diff) {
	      closest = points[i];
	    }
	  }
	
	  return closest;
	};

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var matches = __webpack_require__(385);
	
	module.exports = closest;
	
	function closest(el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  return matches(el, selector) ? el : null;
	}

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var closest = __webpack_require__(380);
	var event = __webpack_require__(188);
	
	exports.bind = function (el, selector, type, fn, capture) {
	  return event.bind(el, type, function (e) {
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};
	
	exports.unbind = function (el, type, fn, capture) {
	  event.unbind(el, type, fn, capture);
	};

/***/ }),
/* 382 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = Emitter;
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};(this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	  return this;
	};
	
	Emitter.prototype.once = function (event, fn) {
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};
	
	  if (!arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  if (arguments.length === 1) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	Emitter.prototype.emit = function (event) {
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1);
	  var callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	Emitter.prototype.listeners = function (event) {
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	Emitter.prototype.hasListeners = function (event) {
	  return !!this.listeners(event).length;
	};

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var events = __webpack_require__(188);
	var delegate = __webpack_require__(381);
	
	module.exports = Events;
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	Events.prototype.sub = function (event, method, cb) {
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	Events.prototype.bind = function (event, method) {
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  var cb = function cb() {
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  };
	
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	Events.prototype.unbind = function (event, method) {
	  if (arguments.length === 0) return this.unbindAll();
	  if (arguments.length === 1) return this.unbindAllOf(event);
	
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	Events.prototype.unbindAll = function () {
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	Events.prototype.unbindAllOf = function (event) {
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  };
	}

/***/ }),
/* 384 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (arr, obj) {
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var query = __webpack_require__(387);
	
	var proto = window.Element.prototype;
	
	var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
	
	module.exports = match;
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] === el) return true;
	  }
	  return false;
	}

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var emitter = __webpack_require__(382);
	var event = __webpack_require__(188);
	
	module.exports = function (el, obj) {
	  return new Mouse(el, obj);
	};
	
	function Mouse(el, obj) {
	  this.obj = obj || {};
	  this.el = el;
	}
	
	emitter(Mouse.prototype);
	
	Mouse.prototype.bind = function () {
	  var obj = this.obj;
	  var self = this;
	
	  function up(e) {
	    obj.onmouseup && obj.onmouseup(e);
	    event.unbind(document, 'mousemove', move);
	    event.unbind(document, 'mouseup', up);
	    self.emit('up', e);
	  }
	
	  function move(e) {
	    obj.onmousemove && obj.onmousemove(e);
	    self.emit('move', e);
	  }
	
	  self.down = function (e) {
	    obj.onmousedown && obj.onmousedown(e);
	    event.bind(document, 'mouseup', up);
	    event.bind(document, 'mousemove', move);
	    self.emit('down', e);
	  };
	
	  event.bind(this.el, 'mousedown', self.down);
	
	  return this;
	};
	
	Mouse.prototype.unbind = function () {
	  event.unbind(this.el, 'mousedown', this.down);
	  this.down = null;
	};

/***/ }),
/* 387 */
/***/ (function(module, exports) {

	'use strict';
	
	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function (selector, el) {
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function (selector, el) {
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function (obj) {
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	
	  exports.all = obj.all;
	  return exports;
	};

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inherits = undefined;
	
	var _create = __webpack_require__(394);
	
	var _create2 = _interopRequireDefault(_create);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var slice = Array.prototype.slice;
	
	function super_() {
	  var args = slice.call(arguments);
	  if (!args.length) return;
	  if (typeof args[0] !== 'function') return super_.merge(args);
	  super_.inherits.apply(null, args);
	}
	
	super_.extend = function (proto, klass) {
	  var self = this;
	  var child = function child() {
	    return self.apply(this, arguments);
	  };
	  super_.merge([child, this]);
	  super_.inherits(child, this);
	  if (proto) super_.merge([child.prototype, proto]);
	  if (klass) super_.merge([child, klass]);
	  child.extend = this.extend;
	  return child;
	};
	
	super_.inherits = function (ctor, SuperCtor) {
	  ctor.super_ = SuperCtor;
	  if (_create2.default) {
	    ctor.prototype = (0, _create2.default)(SuperCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  } else {
	    ctor.prototype = new SuperCtor();
	    ctor.prototype.constructor = ctor;
	  }
	};
	
	super_.merge = function (arr) {
	  var main = arr.length === 2 ? arr.shift() : {};
	  var obj = null;
	
	  for (var i = 0, len = arr.length; i < len; i++) {
	    obj = arr[i];
	    for (var p in obj) {
	      if (!obj.hasOwnProperty(p)) continue;
	      main[p] = obj[p];
	    }
	  }
	
	  return main;
	};
	
	exports.default = super_;
	var inherits = exports.inherits = super_.inherits;

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	
	var mouse = __webpack_require__(386);
	var events = __webpack_require__(383);
	var classes = __webpack_require__(378);
	var percentage = __webpack_require__(251);
	
	exports.default = Powerange;
	
	
	function Powerange(element, options) {
	  if (!(this instanceof Powerange)) return new Powerange(element, options);
	
	  this.element = element;
	  this.options = options || {};
	  this.slider = this.create('span', 'range-bar');
	  this.hasAppend = false;
	
	  if (this.element !== null && this.element.type === 'text') this.init();
	}
	
	Powerange.prototype.bindEvents = function () {
	  this.handle = this.slider.querySelector('.range-handle');
	  this.touch = events(this.handle, this);
	  this.touch.bind('touchstart', 'onmousedown');
	  this.touch.bind('touchmove', 'onmousemove');
	  this.touch.bind('touchend', 'onmouseup');
	  this.mouse = mouse(this.handle, this);
	  this.mouse.bind();
	};
	
	Powerange.prototype.hide = function () {
	  this.element.style.display = 'none';
	};
	
	Powerange.prototype.append = function () {
	  if (!this.hasAppend) {
	    var slider = this.generate();
	    this.insertAfter(this.element, slider);
	  }
	  this.hasAppend = true;
	};
	
	Powerange.prototype.generate = function () {
	  var elems = {
	    'handle': {
	      'type': 'span',
	      'selector': 'range-handle'
	    },
	    'min': {
	      'type': 'span',
	      'selector': 'range-min'
	    },
	    'max': {
	      'type': 'span',
	      'selector': 'range-max'
	    },
	    'quantity': {
	      'type': 'span',
	      'selector': 'range-quantity'
	    }
	  };
	
	  for (var key in elems) {
	    if (elems.hasOwnProperty(key)) {
	      var temp = this.create(elems[key].type, elems[key].selector);
	      this.slider.appendChild(temp);
	    }
	  }
	
	  return this.slider;
	};
	
	Powerange.prototype.create = function (type, name) {
	  var elem = document.createElement(type);
	  elem.className = name;
	
	  return elem;
	};
	
	Powerange.prototype.insertAfter = function (reference, target) {
	  reference.parentNode.insertBefore(target, reference.nextSibling);
	};
	
	Powerange.prototype.setRange = function (min, max) {
	  if (typeof min === 'number' && typeof max === 'number' && !this.options.hideRange) {
	    this.slider.querySelector('.range-min').innerHTML = this.options.minHTML || min;
	    this.slider.querySelector('.range-max').innerHTML = this.options.maxHTML || max;
	  }
	};
	
	Powerange.prototype.setValue = function (offset, size) {
	  var part = percentage.from(parseFloat(offset), size);
	  if (offset === '0px' || size === 0) {
	    value = this.options.min;
	  } else {
	    var value = percentage.of(part, this.options.max - this.options.min) + this.options.min;
	    value = this.options.decimal ? Math.round(value * 100) / 100 : Math.round(value);
	
	    if (value > this.options.max) {
	      value = this.options.max;
	    }
	  }
	
	  var changed = false;
	
	  changed = this.element.value !== value;
	
	  this.element.value = value;
	  this.options.callback(value);
	  if (changed) this.changeEvent();
	};
	
	Powerange.prototype.step = function (sliderSize, handleSize) {
	  var dimension = sliderSize - handleSize;
	  var part = percentage.from(this.checkStep(this.options.step), this.options.max - this.options.min);
	  var interval = percentage.of(part, dimension);
	  var steps = [];
	
	  for (var i = 0; i <= dimension; i += interval) {
	    steps.push(i);
	  }
	
	  this.steps = steps;
	  for (var _i = 10; _i >= 0; _i--) {
	    this.steps[steps.length - _i] = dimension - interval * _i;
	  }
	
	  return this.steps;
	};
	
	Powerange.prototype.checkValues = function (start) {
	  if (start < this.options.min) this.options.start = this.options.min;
	  if (start > this.options.max) this.options.start = this.options.max;
	  if (this.options.min >= this.options.max) this.options.min = this.options.max;
	};
	
	Powerange.prototype.checkStep = function (value) {
	  if (value < 0) value = Math.abs(value);
	  this.options.step = value;
	  return this.options.step;
	};
	
	Powerange.prototype.disable = function (force) {
	  if (this.options.disable || force) {
	    this.mouse.unbind();
	    this.touch.unbind();
	  }
	  if (this.options.disable) {
	    if (this.options.disableOpacity) {
	      this.slider.style.opacity = this.options.disableOpacity;
	    }
	    classes(this.slider).add('range-bar-disabled');
	  }
	};
	
	Powerange.prototype.unselectable = function (element, set) {
	  if (!classes(this.slider).has('unselectable') && set === true) {
	    classes(this.slider).add('unselectable');
	  } else {
	    classes(this.slider).remove('unselectable');
	  }
	};
	
	Powerange.prototype.changeEvent = function (state) {
	  if (typeof Event === 'function' || !document.fireEvent) {
	    var event = document.createEvent('HTMLEvents');
	    event.initEvent('change', false, true);
	    this.element.dispatchEvent(event);
	  } else {
	    this.element.fireEvent('onchange');
	  }
	};
	
	Powerange.prototype.init = function () {
	  this.hide();
	  this.append();
	  this.bindEvents();
	  this.checkValues(this.options.start);
	  this.setRange(this.options.min, this.options.max);
	  this.disable();
	};
	
	Powerange.prototype.reInit = function (opts) {
	  this.options.start = opts.value;
	  this.options.min = opts.min;
	  this.options.max = opts.max;
	  this.disable(true);
	  this.init();
	};

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectAssign = __webpack_require__(73);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getTarget(node) {
	  if (node === void 0) {
	    node = document.body;
	  }
	  if (node === true) {
	    return document.body;
	  }
	  return node instanceof window.Node ? node : document.querySelector(node);
	}
	
	var directive = {
	  inserted: function inserted(el, _ref, vnode) {
	    var value = _ref.value;
	
	    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom';
	    var parentNode = el.parentNode;
	    var home = document.createComment('');
	    var hasMovedOut = false;
	
	    if (value !== false) {
	      parentNode.replaceChild(home, el);
	      getTarget(value).appendChild(el);
	      hasMovedOut = true;
	    }
	    if (!el.__transferDomData) {
	      el.__transferDomData = {
	        parentNode: parentNode,
	        home: home,
	        target: getTarget(value),
	        hasMovedOut: hasMovedOut
	      };
	    }
	  },
	  componentUpdated: function componentUpdated(el, _ref2) {
	    var value = _ref2.value;
	
	    var ref$1 = el.__transferDomData;
	
	    var parentNode = ref$1.parentNode;
	    var home = ref$1.home;
	    var hasMovedOut = ref$1.hasMovedOut;
	
	    if (!hasMovedOut && value) {
	      parentNode.replaceChild(home, el);
	
	      getTarget(value).appendChild(el);
	      el.__transferDomData = (0, _objectAssign2.default)({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) });
	    } else if (hasMovedOut && value === false) {
	      parentNode.replaceChild(el, home);
	      el.__transferDomData = (0, _objectAssign2.default)({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) });
	    } else if (value) {
	      getTarget(value).appendChild(el);
	    }
	  },
	
	  unbind: function unbind(el, binding) {
	    el.className = el.className.replace('v-transfer-dom', '');
	    if (el.__transferDomData.hasMovedOut === true) {
	      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el);
	    }
	    el.__transferDomData = null;
	  }
	};
	
	exports.default = directive;

/***/ }),
/* 391 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (array) {
	  return array.length === 1 ? array[0] : array.join(' ');
	};

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (name, list) {
	  var rs = (0, _arrayMap2.default)(name, function (one, index) {
	    var parent = '';
	    if (index === 2) {
	      parent = (0, _arrayFind2.default)(list, function (item) {
	        return item.name === name[1];
	      }) || { value: '__' };
	
	      if (specialMap[name[0]]) {
	        parent = {
	          value: specialMap[name[0]]
	        };
	      }
	      return (0, _arrayFind2.default)(list, function (item) {
	        return item.name === one && item.parent === parent.value;
	      });
	    } else {
	      if (index === 1 && specialMap[name[0]]) {
	        return {
	          value: specialMap[name[0]]
	        };
	      }
	      return (0, _arrayFind2.default)(list, function (item) {
	        return item.name === one;
	      });
	    }
	  });
	
	  return (0, _arrayMap2.default)(rs, function (one) {
	    return one ? one.value : '__';
	  }).join(' ');
	};
	
	var _arrayMap = __webpack_require__(244);
	
	var _arrayMap2 = _interopRequireDefault(_arrayMap);
	
	var _arrayFind = __webpack_require__(243);
	
	var _arrayFind2 = _interopRequireDefault(_arrayFind);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var specialMap = {
	  '北京市': '110100',
	  '天津市': '120100',
	  '上海市': '310100',
	  '重庆市': '500100'
	};

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(398), __esModule: true };

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(399), __esModule: true };

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(403), __esModule: true };

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(404), __esModule: true };

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(92)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(433);
	module.exports = __webpack_require__(92).Object.assign;

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(434);
	var $Object = __webpack_require__(92).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(435);
	var $Object = __webpack_require__(92).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(436);
	module.exports = __webpack_require__(92).Object.keys;

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(437);
	module.exports = __webpack_require__(92).Promise;

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(438);
	__webpack_require__(269);
	__webpack_require__(439);
	__webpack_require__(440);
	module.exports = __webpack_require__(92).Symbol;

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(270);
	__webpack_require__(271);
	module.exports = __webpack_require__(206).f('iterator');

/***/ }),
/* 405 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 406 */
/***/ (function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(113)
	  , toLength  = __webpack_require__(268)
	  , toIndex   = __webpack_require__(430);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(132)
	  , gOPS    = __webpack_require__(199)
	  , pIE     = __webpack_require__(170);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(168)
	  , call        = __webpack_require__(413)
	  , isArrayIter = __webpack_require__(411)
	  , anObject    = __webpack_require__(109)
	  , toLength    = __webpack_require__(268)
	  , getIterFn   = __webpack_require__(431)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ }),
/* 410 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
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
	  } return              fn.apply(that, args);
	};

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(144)
	  , ITERATOR   = __webpack_require__(93)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(142);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(109);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(198)
	  , descriptor     = __webpack_require__(171)
	  , setToStringTag = __webpack_require__(172)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(112)(IteratorPrototype, __webpack_require__(93)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(93)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),
/* 416 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(132)
	  , toIObject = __webpack_require__(113);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(173)('meta')
	  , isObject = __webpack_require__(143)
	  , has      = __webpack_require__(111)
	  , setDesc  = __webpack_require__(104).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(131)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(95)
	  , macrotask = __webpack_require__(267).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(142)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(132)
	  , gOPS     = __webpack_require__(199)
	  , pIE      = __webpack_require__(170)
	  , toObject = __webpack_require__(203)
	  , IObject  = __webpack_require__(262)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(131)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(104)
	  , anObject = __webpack_require__(109)
	  , getKeys  = __webpack_require__(132);
	
	module.exports = __webpack_require__(103) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(170)
	  , createDesc     = __webpack_require__(171)
	  , toIObject      = __webpack_require__(113)
	  , toPrimitive    = __webpack_require__(204)
	  , has            = __webpack_require__(111)
	  , IE8_DOM_DEFINE = __webpack_require__(261)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(103) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(113)
	  , gOPN      = __webpack_require__(264).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(111)
	  , toObject    = __webpack_require__(203)
	  , IE_PROTO    = __webpack_require__(200)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(110)
	  , core    = __webpack_require__(92)
	  , fails   = __webpack_require__(131);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(112);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(95)
	  , core        = __webpack_require__(92)
	  , dP          = __webpack_require__(104)
	  , DESCRIPTORS = __webpack_require__(103)
	  , SPECIES     = __webpack_require__(93)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(109)
	  , aFunction = __webpack_require__(194)
	  , SPECIES   = __webpack_require__(93)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(202)
	  , defined   = __webpack_require__(195);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(202)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(259)
	  , ITERATOR  = __webpack_require__(93)('iterator')
	  , Iterators = __webpack_require__(144);
	module.exports = __webpack_require__(92).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(405)
	  , step             = __webpack_require__(416)
	  , Iterators        = __webpack_require__(144)
	  , toIObject        = __webpack_require__(113);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(263)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(110);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(420)});

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(110)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(198)});

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(110);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(103), 'Object', {defineProperty: __webpack_require__(104).f});

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(203)
	  , $keys    = __webpack_require__(132);
	
	__webpack_require__(425)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(169)
	  , global             = __webpack_require__(95)
	  , ctx                = __webpack_require__(168)
	  , classof            = __webpack_require__(259)
	  , $export            = __webpack_require__(110)
	  , isObject           = __webpack_require__(143)
	  , aFunction          = __webpack_require__(194)
	  , anInstance         = __webpack_require__(406)
	  , forOf              = __webpack_require__(409)
	  , speciesConstructor = __webpack_require__(428)
	  , task               = __webpack_require__(267).set
	  , microtask          = __webpack_require__(419)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(93)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(426)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(172)($Promise, PROMISE);
	__webpack_require__(427)(PROMISE);
	Wrapper = __webpack_require__(92)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(415)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(95)
	  , has            = __webpack_require__(111)
	  , DESCRIPTORS    = __webpack_require__(103)
	  , $export        = __webpack_require__(110)
	  , redefine       = __webpack_require__(266)
	  , META           = __webpack_require__(418).KEY
	  , $fails         = __webpack_require__(131)
	  , shared         = __webpack_require__(201)
	  , setToStringTag = __webpack_require__(172)
	  , uid            = __webpack_require__(173)
	  , wks            = __webpack_require__(93)
	  , wksExt         = __webpack_require__(206)
	  , wksDefine      = __webpack_require__(205)
	  , keyOf          = __webpack_require__(417)
	  , enumKeys       = __webpack_require__(408)
	  , isArray        = __webpack_require__(412)
	  , anObject       = __webpack_require__(109)
	  , toIObject      = __webpack_require__(113)
	  , toPrimitive    = __webpack_require__(204)
	  , createDesc     = __webpack_require__(171)
	  , _create        = __webpack_require__(198)
	  , gOPNExt        = __webpack_require__(423)
	  , $GOPD          = __webpack_require__(422)
	  , $DP            = __webpack_require__(104)
	  , $keys          = __webpack_require__(132)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(264).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(170).f  = $propertyIsEnumerable;
	  __webpack_require__(199).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(169)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(112)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(205)('asyncIterator');

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(205)('observable');

/***/ }),
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 507 */,
/* 508 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = debounce;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 509 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = isByteLength;
	
	var _assertString = __webpack_require__(174);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable prefer-rest-params */
	function isByteLength(str, options) {
	  (0, _assertString2.default)(str);
	  var min = void 0;
	  var max = void 0;
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    min = options.min || 0;
	    max = options.max;
	  } else {
	    // backwards compatibility: isByteLength(str, min [, max])
	    min = arguments[1];
	    max = arguments[2];
	  }
	  var len = encodeURI(str).split(/%..|./).length - 1;
	  return len >= min && (typeof max === 'undefined' || len <= max);
	}
	module.exports = exports['default'];

/***/ }),
/* 542 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFDQN;
	
	var _assertString = __webpack_require__(174);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	var _merge = __webpack_require__(275);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var default_fqdn_options = {
	  require_tld: true,
	  allow_underscores: false,
	  allow_trailing_dot: false
	};
	
	function isFDQN(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_fqdn_options);
	
	  /* Remove the optional trailing dot before checking validity */
	  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	    str = str.substring(0, str.length - 1);
	  }
	  var parts = str.split('.');
	  if (options.require_tld) {
	    var tld = parts.pop();
	    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	      return false;
	    }
	  }
	  for (var part, i = 0; i < parts.length; i++) {
	    part = parts[i];
	    if (options.allow_underscores) {
	      part = part.replace(/_/g, '');
	    }
	    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	      return false;
	    }
	    if (/[\uff01-\uff5e]/.test(part)) {
	      // disallow full-width chars
	      return false;
	    }
	    if (part[0] === '-' || part[part.length - 1] === '-') {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ }),
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	 var Util = __webpack_require__(90);
	
	 function Boundry(cfg) {
	     this.cfg = Util.mix({
	         width: 0,
	         height: 0
	     }, cfg)
	     this.init();
	 }
	 Util.mix(Boundry.prototype, {
	     init: function() {
	         var self = this;
	         self._xtop = 0;
	         self._xright = 0;
	         self._xleft = 0;
	         self._xbottom = 0;
	         self.refresh({
	             width: self.cfg.width,
	             height: self.cfg.height
	         });
	     },
	     reset: function() {
	         this.resetTop();
	         this.resetLeft();
	         this.resetBottom();
	         this.resetRight();
	         return this;
	     },
	     resetTop: function() {
	         this._xtop = 0;
	         this.refresh();
	         return this;
	     },
	     resetLeft: function() {
	         this._xleft = 0;
	         this.refresh();
	         return this;
	     },
	     resetBottom: function() {
	         this._xbottom = 0;
	         this.refresh();
	         return this;
	     },
	     resetRight: function() {
	         this._xright = 0;
	         this.refresh();
	         return this;
	     },
	     expandTop: function(top) {
	         this._xtop = top;
	         this.refresh();
	         return this;
	     },
	     expandLeft: function(left) {
	         this._xleft = left;
	         this.refresh();
	         return this;
	     },
	     expandRight: function(right) {
	         this._xright = right;
	         this.refresh();
	         return this;
	     },
	     expandBottom: function(bottom) {
	         this._xbottom = bottom;
	         this.refresh();
	         return this;
	     },
	     refresh: function(cfg) {
	         Util.mix(this.cfg, cfg);
	         this.top = this._xtop;
	         this.left = this._xleft;
	         this.bottom = (cfg && cfg.height || this.cfg.height || 0) - this._xbottom;
	         this.right = (cfg && cfg.width || this.cfg.width || 0) - this._xright;
	         this.width = this.right - this.left > 0 ? this.right - this.left : 0;
	         this.height = this.bottom - this.top > 0 ? this.bottom - this.top : 0;
	         return this;
	     }
	 });
	
	
	 if (typeof module == 'object' && module.exports) {
	     module.exports = Boundry;
	 }
	 /** ignored by jsdoc **/
	 else{
	    return Boundry;
	 }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 686 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	/*
		wrapped scroll controller
	*/
	"use strict";
	var Util = __webpack_require__(90),
		Base = __webpack_require__(97);
	
	var Controller = function(cfg) {
		Controller.superclass.constructor.call(this, cfg);
		this.userConfig = Util.mix({}, cfg);
		this.init();
	}
	
	Util.extend(Controller, Base, {
		init: function() {
			var self = this;
			self.xscroll = self.userConfig.xscroll;
		},
		add: function(scroll, cfg) {
			var self = this;
			cfg = Util.extend({
				captureBounce: false,
				stopPropagation: true
			}, cfg)
			if (!self.__scrolls) {
				self.__scrolls = {};
			}
			if (scroll.guid && !self.__scrolls[scroll.guid]) {
				scroll.parentscroll = self.xscroll;
				self._bind(scroll);
				return self.__scrolls[scroll.guid] = scroll;
			}
			return;
		},
		remove: function(scroll) {
			var self = this;
			if (!scroll || !scroll.guid) return;
			var subscroll = self.__scrolls[scroll.guid];
			if (subscroll) {
				subscroll.parentscroll = null;
				self._unbind(scroll);
				subscroll = null;
			}
		},
		get: function(guid) {
			if (guid) {
				return this.__scrolls[guid];
			}
			return this.__scrolls;
		},
	
		_unbind: function(sub) {
	
		},
	
		_bind: function(sub) {
			var self = this,
				xscroll = self.xscroll;
			xscroll.renderTo.addEventListener("touchstart", function() {
				xscroll._resetLockConfig();
			});
			sub.renderTo.addEventListener("touchstart", function() {
				sub._resetLockConfig();
			});
			xscroll.on("panend", xscroll._resetLockConfig);
			sub.on("panend", sub._resetLockConfig);
			sub.on("panstart", function(e) {
				//vertical scroll enabled
				if (!sub.userConfig.lockY && !xscroll.userConfig.lockY) {
					//outside of boundry
					if (sub.isBoundryOut()) {
						xscroll.userConfig.lockY = true;
						return;
					}
					if (e.direction == 16 && sub.getBoundryOutTop() >= 0) {
						sub.userConfig.lockY = true;
					} else if (e.direction == 8 && sub.getBoundryOutTop() >= 0 && sub.getBoundryOutBottom() < 0) {
						xscroll.userConfig.lockY = true;
					}
					if (e.direction == 8 && sub.getBoundryOutBottom() >= 0) {
						sub.userConfig.lockY = true;
					} else if (e.direction == 16 && sub.getBoundryOutBottom() >= 0 && sub.getBoundryOutTop() < 0) {
						xscroll.userConfig.lockY = true;
					}
					if (sub.getBoundryOutTop() < 0 && sub.getBoundryOutBottom() < 0) {
						xscroll.userConfig.lockY = true;
					}
				}
				//horizontal scroll enabled
				if (!sub.userConfig.lockX && !xscroll.userConfig.lockX) {
					if (sub.isBoundryOut()) {
						xscroll.userConfig.lockX = true;
						return;
					}
					if (e.direction == 4 && sub.getBoundryOutLeft() >= 0) {
						sub.userConfig.lockX = true;
					} else if (e.direction == 2 && sub.getBoundryOutLeft() >= 0 && sub.getBoundryOutRight() < 0) {
						xscroll.userConfig.lockX = true;
					}
					if (e.direction == 2 && sub.getBoundryOutRight() >= 0) {
						sub.userConfig.lockX = true;
					} else if (e.direction == 4 && sub.getBoundryOutRight() >= 0 && sub.getBoundryOutLeft() < 0) {
						xscroll.userConfig.lockX = true;
					}
					if (sub.getBoundryOutLeft() < 0 && sub.getBoundryOutRight() < 0) {
						xscroll.userConfig.lockX = true;
					}
				}
	
				if (!sub.userConfig.lockX && xscroll.userConfig.lockX) {
					//pan x
					if (e.direction == 2 || e.direction == 4) {
						xscroll.userConfig.lockY = true;
					} else {
						sub.userConfig.lockX = true;
					}
				}
	
				if (!sub.userConfig.lockY && xscroll.userConfig.lockY) {
					//pan y
					if (e.direction == 8 || e.direction == 16) {
						xscroll.userConfig.lockX = true;
					} else {
						sub.userConfig.lockY = true;
					}
				}
			});
		}
	});
	
	if (typeof module == 'object' && module.exports) {
		module.exports = Controller;
	}
	/** ignored by jsdoc **/
	else {
		return Controller;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 687 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Base = __webpack_require__(97);
	var transform = Util.prefixStyle("transform");
	
	var Fixed = function(cfg) {
	  Fixed.superclass.constructor.call(this, cfg);
	  this.userConfig = Util.mix({
	    fixedRenderTo: undefined,
	    fixedElements: ".xs-fixed",
	    prefix: "xs-fixed-container",
	    zoomType: "y"
	  }, cfg);
	  this.init();
	}
	
	Util.extend(Fixed, Base, {
	  fixedElements: [],
	  init: function() {
	    var self = this,
	      userConfig = self.userConfig,
	      xscroll = self.xscroll = userConfig.xscroll,
	      xscrollConfig = self.xscrollConfig = xscroll.userConfig;
	    self.isY = !!(userConfig.zoomType == "y");
	    self._ = self.isY ? {
	      top: "top",
	      height: "height",
	      width: "width",
	      offsetTop:"offsetTop"
	    } : {
	      top: "left",
	      height: "width",
	      width: "height",
	      offsetTop:"offsetLeft"
	    };
	    self.fixedRenderTo = Util.getNode(userConfig.fixedRenderTo);
	    return self;
	  },
	  render: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    self.infinite = xscroll.getPlugin("infinite");
	    if (!self.fixedRenderTo) {
	      self.fixedRenderTo = document.createElement('div');
	      xscroll.renderTo.appendChild(self.fixedRenderTo);
	    }
	    Util.addClass(self.fixedRenderTo, self.userConfig.prefix);
	    var originalFixedElements = self.originalFixedElements = self.getFixedElements();
	    for (var i = 0, l = originalFixedElements.length; i < l; i++) {
	      self.renderFixedElement(originalFixedElements[i], i,self.fixedRenderTo);
	    }
	    return self;
	  },
	  getFixedElements: function() {
	    var self = this;
	    var infinite = self.infinite;
	    var userConfig = self.userConfig;
	    if (infinite) {
	      var els = [];
	      for (var i in infinite.__serializedData) {
	        var data = infinite.__serializedData[i];
	        if (data && data.style && data.style.position == "fixed") {
	          els.push(data);
	        }
	      }
	      return els;
	    } else {
	      return Util.getNodes(userConfig.fixedElements, self.xscroll.content);
	    }
	  },
	  renderFixedElement: function(el, fixedIndex,fixedRenderTo) {
	    var self = this;
	    var isRender = true;
	    var _ = self._;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var xscrollConfig = self.xscrollConfig;
	    var useOriginScroll = xscrollConfig.useOriginScroll;
	    var infinite = self.infinite;
	    var fixedElement = self.fixedElements[fixedIndex];
	    if (!self.fixedElements[fixedIndex]) {
	      isRender = false;
	      if (useOriginScroll && !infinite) {
	        //use original position:fixed stylesheet
	        el.style.position = "fixed";
	        el.style.display = "block";
	      } else {
	        //deep clone fixed nodes and hide original nodes
	        fixedElement = document.createElement("div");
	        if (infinite) {
	          fixedElement.setAttribute("style", Util.stringifyStyle(Util.mix(el.style, {
	            display: "block",
	            width: "100%"
	          })));
	          fixedElement.style[_.top] = (el.style[_.top] >= 0 ? el.style[_.top] : el._top) + "px";
	          if (el.style[_.height]) {
	            fixedElement.style[_.height] = el.style[_.height] + "px";
	          }
	          infinite.userConfig.renderHook.call(self, fixedElement, el);
	        } else {
	          fixedElement.style.display = "block";
	          fixedElement.style.position = "absolute";
	          fixedElement.style[_.width] = "100%";
	          fixedElement.innerHTML = el.innerHTML;
	          fixedElement.className = el.className;
	          fixedElement.setAttribute("style", el.getAttribute("style"));
	          fixedElement.style[_.top] = el[_.offsetTop] + "px";
	          el.style.display = "none";
	        }
	        fixedRenderTo.appendChild(fixedElement);
	        self.fixedElements.push(fixedElement);
	      }
	    }
	    xscroll.trigger("fixedchange", {
	      fixedIndex: fixedIndex,
	      fixedElement: useOriginScroll ? el : fixedElement,
	      originalFixedElement: el,
	      isRender: isRender
	    });
	  },
	  destroy: function() {
	    var self = this;
	    self.fixedElements = undefined;
	  }
	});
	
	if (typeof module == 'object' && module.exports) {
	  module.exports = Fixed;
	}
	/** ignored by jsdoc **/
	else {
	  return Fixed;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 688 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Animate = __webpack_require__(166);
	var MAX_BOUNCE_DISTANCE = 40;
	var MIN_BAR_SCROLLED_SIZE = 10;
	var MIN_BAR_SIZE = 50;
	var transform = Util.prefixStyle("transform");
	var transformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";
	var transition = Util.prefixStyle("transition");
	var borderRadius = Util.prefixStyle("borderRadius");
	var transitionDuration = Util.prefixStyle("transitionDuration");
	
	var ScrollBar = function(cfg) {
		this.userConfig = Util.mix({
			MIN_BAR_SCROLLED_SIZE:MIN_BAR_SCROLLED_SIZE,
			MIN_BAR_SIZE:MIN_BAR_SIZE,
			MAX_BOUNCE_DISTANCE:MAX_BOUNCE_DISTANCE,
			spacing:5
		}, cfg);
		this.init(cfg.xscroll);
	}
	
	Util.mix(ScrollBar.prototype, {
		init: function(xscroll) {
			var self = this;
			self.xscroll = xscroll;
			self.type = self.userConfig.type;
			self.isY = self.type == "y" ? true : false;
			self.scrollTopOrLeft = self.isY ? "scrollTop" : "scrollLeft";
		},
		destroy: function() {
			var self = this;
			Util.remove(self.scrollbar);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
		},
		render: function() {
			var self = this;
			var xscroll = self.xscroll;
			var boundry = xscroll.boundry;
			var indicatorInsets = self.xscroll.userConfig.indicatorInsets;
			var translateZ = xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			var transform = translateZ ? transformStr + ":" + translateZ + ";" : "";
			var commonCss = "opacity:0;position:absolute;z-index:999;overflow:hidden;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;" + transform;
			indicatorInsets._xright =  indicatorInsets.right + indicatorInsets.spacing;
			indicatorInsets._xbottom =  indicatorInsets.bottom + indicatorInsets.spacing;
			var css = self.isY ?
				Util.substitute("width:{width}px;bottom:{_xbottom}px;top:{top}px;right:{right}px;", indicatorInsets) + commonCss :
				Util.substitute("height:{width}px;left:{left}px;right:{_xright}px;bottom:{bottom}px;",indicatorInsets) + commonCss;
			
	
			if(!self.scrollbar){
				self.scrollbar = document.createElement("div");	
				self.indicate = document.createElement("div");
				xscroll.renderTo.appendChild(self.scrollbar);
				self.scrollbar.appendChild(self.indicate);
			}
			self.scrollbar.style.cssText = css;
			var size = self.isY ? "width:100%;" : "height:100%;";
			self.indicate.style.cssText = size + "position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;"
			self._update();
			self.hide(0);
			self._bindEvt();
		},
		_update: function(pos, duration, easing, callback) {
			var self = this;
			var pos = undefined === pos ? (self.isY ? self.xscroll.getScrollTop() : self.xscroll.getScrollLeft()) : pos;
			var barInfo = self.computeScrollBar(pos);
			var size = self.isY ? "height" : "width";
			self.indicate.style[size] = Math.round(barInfo.size) + "px";
			if (duration && easing) {
				self.scrollTo(barInfo.pos, duration, easing, callback);
			} else {
				self.moveTo(barInfo.pos);
			}
		},
		//compute the position and size of the scrollbar
		computeScrollBar: function(pos) {
			var self = this;
			var type = self.isY ? "y" : "x";
			var spacing = self.userConfig.spacing;
			var xscroll = self.xscroll;
			var boundry = xscroll.boundry;
			var userConfig = self.userConfig;
			var pos = self.isY ? Math.round(pos) + boundry._xtop : Math.round(pos) + boundry._xleft;
			var MIN_BAR_SCROLLED_SIZE = userConfig.MIN_BAR_SCROLLED_SIZE;
			var MIN_BAR_SIZE = userConfig.MIN_BAR_SIZE;
			var MAX_BOUNCE_DISTANCE = userConfig.MAX_BOUNCE_DISTANCE;
			self.containerSize = self.isY ? xscroll.containerHeight + boundry._xtop + boundry._xbottom : self.xscroll.containerWidth + boundry._xright + boundry._xleft;
			self.size = self.isY ? boundry.cfg.height : boundry.cfg.width;
			self.indicateSize = self.isY ? boundry.cfg.height - spacing * 2 : boundry.cfg.width - spacing * 2;
			var indicateSize = self.indicateSize;
			var containerSize = self.containerSize;
			var barPos = indicateSize * pos / containerSize;
			var barSize = Math.round(indicateSize * self.size / containerSize);
			var overTop = self.isY ? xscroll.getBoundryOutTop() : xscroll.getBoundryOutLeft();
			var overBottom = self.isY ? xscroll.getBoundryOutBottom() : xscroll.getBoundryOutRight();
			var barShiftSize = MIN_BAR_SIZE - barSize > 0 ? MIN_BAR_SIZE - barSize : 0;
			barSize = barSize < MIN_BAR_SIZE ? MIN_BAR_SIZE : barSize;
			barPos = (indicateSize - barShiftSize) * pos / containerSize;
			if (overTop >= 0) {
				var pct = overTop / MAX_BOUNCE_DISTANCE;
				pct = pct > 1 ? 1 : pct;
				barPos = - pct * (barSize -  MIN_BAR_SCROLLED_SIZE)
			}
			if (overBottom >= 0) {
				var pct = overBottom / MAX_BOUNCE_DISTANCE;
				pct = pct > 1 ? 1 : pct;
				barPos = pct * (barSize - MIN_BAR_SCROLLED_SIZE) + indicateSize - barSize; 
			}
			self.barPos = Math.round(barPos);
			return {
				size: Math.round(barSize),
				pos: self.barPos
			};
		},
		scrollTo: function(pos, duration, easing, callback) {
			var self = this;
			self.show();
			var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			var config = {
				css: {
					transform: self.isY ? "translateY(" + pos + "px)" + translateZ : "translateX(" + pos + "px)" + translateZ
				},
				duration: duration,
				easing: easing,
				useTransition: self.xscroll.userConfig.useTransition,
				end: callback
			};
			self.__timer = self.__timer || new Animate(self.indicate, config);
			//run
			self.__timer.stop();
			self.__timer.reset(config);
			self.__timer.run();
		},
		moveTo: function(pos) {
			var self = this;
			self.show();
			var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			self.isY ? self.indicate.style[transform] = "translateY(" + pos + "px) " + translateZ : self.indicate.style[transform] = "translateX(" + pos + "px) " + translateZ
			self.indicate.style[transition] = "";
		},
		_scrollHandler: function(e) {
			var self = this;
			self._update(e[self.scrollTopOrLeft]);
			return self;
		},
		isBoundryOut: function() {
			var self = this;
			return !self.isY ? (self.xscroll.isBoundryOutLeft() || self.xscroll.isBoundryOutRight()) : (self.xscroll.isBoundryOutTop() || self.xscroll.isBoundryOutBottom());
		},
		_scrollEndHandler: function(e) {
			var self = this;
			if (!self.isBoundryOut()) {
				self._update(e[self.scrollTopOrLeft]);
				self.hide();
			}
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self.__isEvtBind) return;
			self.__isEvtBind = true;
			self.xscroll.on("scroll", self._scrollHandler, self);
			self.xscroll.on("scrollend", self._scrollEndHandler, self);
		},
		reset: function() {
			var self = this;
			self.pos = 0;
			self._update();
		},
		hide: function(duration, easing, delay) {
			var self = this;
			var duration = duration >= 0 ? duration : 300;
			var easing = easing || "ease-out";
			var delay = delay >= 0 ? delay : 100;
			self.scrollbar.style.opacity = 0;
			self.scrollbar.style[transition] = ["opacity ", duration, "ms ", " ease-out ", delay, "ms"].join("");
		},
		show: function() {
			var self = this;
			self.scrollbar.style.opacity = 1;
			self.scrollbar.style[transition] = "";
		}
	});
	
	if (typeof module == 'object' && module.exports) {
		module.exports = ScrollBar;
	}
	/** ignored by jsdoc **/
	else {
		return ScrollBar;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 689 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	var Base = __webpack_require__(97);
	//transform
	var transform = Util.prefixStyle("transform");
	// default render function for position:sticky elements
	var defaultStickyRenderFunc = function(e) {
	  var stickyElement = e.stickyElement;
	  var curStickyElement = e.curStickyElement;
	  var xscroll = e.xscroll;
	  var _ = e._;
	  var infinite = xscroll.getPlugin("infinite");
	  if (infinite) {
	    infinite.userConfig.renderHook.call(self, stickyElement, curStickyElement);
	    stickyElement.setAttribute("xs-guid", curStickyElement.guid);
	    Util.addClass(stickyElement, curStickyElement.className);
	    for (var attrName in curStickyElement.style) {
	      if (attrName != "display" && attrName != "position") {
	        //copy styles
	        stickyElement.style[attrName] = attrName == _.height ? curStickyElement.style[attrName] + 'px' : curStickyElement.style[attrName];
	      }
	    }
	  } else {
	    var style = curStickyElement.getAttribute("style");
	    stickyElement.innerHTML = curStickyElement.innerHTML;
	    stickyElement.className = curStickyElement.className;
	    style && stickyElement.setAttribute("style", style);
	  }
	}
	
	var Sticky = function(cfg) {
	  Sticky.superclass.constructor.call(this, cfg);
	  this.userConfig = Util.mix({
	    stickyRenderTo: undefined,
	    forceSticky: true,
	    prefix: "xs-sticky-container",
	    stickyRenderFunc: defaultStickyRenderFunc,
	    zoomType: "y"
	  }, cfg);
	  this.init();
	}
	
	Util.extend(Sticky, Base, {
	  init: function() {
	    var self = this,
	      userConfig = self.userConfig,
	      xscroll = self.xscroll = userConfig.xscroll;
	    var isY = self.isY = !!(userConfig.zoomType == "y");
	    self._ = {
	      top: self.isY ? "top" : "left",
	      left: self.isY ? "left" : "bottom",
	      right: self.isY ? "right" : "top",
	      height: self.isY ? "height" : "width",
	      width: self.isY ? "width" : "height"
	    };
	    self.stickyRenderTo = Util.getNode(userConfig.stickyRenderTo);
	    self._handlers = [];
	    return self;
	  },
	  getStickiesPos: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    var isInfinite = self.isInfinite;
	    var isY = self.isY;
	    var _ = self._;
	    var stickiesPos = [];
	    var getPos = function(sticky) {
	      var pos = {};
	      if (isInfinite) {
	        pos[_.top] = isY ? sticky._top : sticky._left;
	        pos[_.height] = isY ? sticky._height : sticky._width;
	      } else {
	        pos[_.top] = self.isY ? Util.getOffsetTop(sticky) : Util.getOffsetLeft(sticky);
	        pos[_.height] = self.isY ? sticky.offsetHeight : sticky.offsetWidth;
	      }
	      return pos;
	    }
	    for (var i = 0; i < self.stickiesNum; i++) {
	      var pos = getPos(self.stickyElements[i]);
	      self._handlers[i] = self._handlers[i] || self.createStickyEl();
	      pos.el = self._handlers[i];
	      pos.isRender = false;
	      stickiesPos.push(pos);
	    }
	    return stickiesPos
	  },
	  getStickyElements: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var isInfinite = self.isInfinite;
	    var infinite = xscroll.getPlugin("infinite");
	    if (infinite) {
	      var stickyElements = [],
	        serializedData = infinite.__serializedData;
	      for (var i in serializedData) {
	        var rowData = serializedData[i];
	        if (rowData && rowData.style && "sticky" == rowData.style.position) {
	          stickyElements.push(rowData);
	        }
	      }
	      return stickyElements;
	    } else {
	      return Util.getNodes(xscroll.userConfig.stickyElements, xscroll.content);
	    }
	  },
	  render: function(force) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var xscroll = self.xscroll;
	    self.isInfinite = !!xscroll.getPlugin("infinite");
	    var _ = self._;
	    self.stickyElements = self.getStickyElements();
	    self.stickiesNum = self.stickyElements && self.stickyElements.length;
	    if (!self.stickiesNum) return;
	    if (!self.stickyRenderTo) {
	      self.stickyRenderTo = document.createElement('div');
	      xscroll.renderTo.appendChild(self.stickyRenderTo);
	    }
	    self.stickiesPos = self.getStickiesPos();
	    var stickyRenderTo = self.stickyRenderTo;
	    stickyRenderTo.style[_.top] = 0;
	    stickyRenderTo.style[_.left] = 0;
	    stickyRenderTo.style[_.right] = 0;
	    stickyRenderTo.style.position = xscroll.userConfig.useOriginScroll ? "fixed" : "absolute";
	    Util.addClass(self.stickyRenderTo, userConfig.prefix);
	    self.stickyHandler(force);
	    self._bindEvt();
	  },
	  createStickyEl: function() {
	    var self = this;
	    var el = document.createElement('div');
	    el.style.display = "none";
	    Util.addClass(el, "xs-sticky-handler");
	    self.stickyRenderTo.appendChild(el);
	    return el;
	  },
	  _bindEvt: function() {
	    var self = this,
	      xscroll = self.xscroll;
	    xscroll.on("scroll", self.stickyHandler, self);
	  },
	  stickyHandler: function(force) {
	    var self = this;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var scrollTop = self.isY ? xscroll.getScrollTop() : xscroll.getScrollLeft();
	    var stickiesPos = self.stickiesPos;
	    var _ = self._;
	    var indexes = [];
	    for (var i = 0, l = stickiesPos.length; i < l; i++) {
	      var top = stickiesPos[i][_.top];
	      if (scrollTop > top) {
	        indexes.push(i);
	      }
	    }
	    if (!indexes.length) {
	      if (self.stickyElement) {
	        self.stickyElement.style.display = "none";
	      }
	      self.curStickyIndex = undefined;
	      return;
	    }
	
	    var curStickyIndex = Math.max.apply(null, indexes);
	    if (self.curStickyIndex != curStickyIndex || force) {
	      var prevStickyIndex = self.curStickyIndex;
	      self.curStickyIndex = curStickyIndex;
	      self.curStickyElement = self.stickyElements[curStickyIndex];
	      self.curStickyPos = stickiesPos[curStickyIndex];
	      self.stickyElement = self.curStickyPos.el;
	      for (var i = 0, l = stickiesPos.length; i < l; i++) {
	        stickiesPos[i].el.style.display = "none";
	      }
	      var eventsObj = {
	        stickyElement: self.stickyElement,
	        curStickyIndex: self.curStickyIndex,
	        prevStickyIndex: prevStickyIndex,
	        curStickyPos: self.curStickyPos,
	        isRender: self.curStickyPos.isRender
	      };
	      xscroll.trigger("beforestickychange", eventsObj);
	      self._stickyRenderFunc(self);
	      xscroll.trigger("stickychange", eventsObj);
	    }
	
	    var trans = 0;
	    if (self.stickiesPos[self.curStickyIndex + 1]) {
	      var cur = self.stickiesPos[self.curStickyIndex];
	      var next = self.stickiesPos[self.curStickyIndex + 1];
	      if (scrollTop + cur[_.height] > next[_.top] && scrollTop + cur[_.height] < next[_.top] + cur[_.height]) {
	        trans = cur[_.height] + scrollTop - next[_.top];
	      } else {
	        trans = 0;
	      }
	    }
	    self.stickyElement.style[transform] = self.isY ? "translateY(-" + (trans) + "px) translateZ(0)" : "translateX(-" + (trans) + "px) translateZ(0)";
	  },
	  _stickyRenderFunc: function(e) {
	    var self = this;
	    var _ = self._;
	    var stickyRenderFunc = self.userConfig.stickyRenderFunc;
	    var el = self.curStickyPos.el;
	    if (!self.curStickyPos.isRender) {
	      el.style[_.left] = 0;
	      el.style[_.right] = 0;
	      stickyRenderFunc && stickyRenderFunc.call(self, e);
	    }
	    el.style.display = "block";
	    self.curStickyPos.isRender = true;
	  },
	  destroy: function() {
	    var self = this;
	    self.stickyElements = undefined;
	    self.stickiesNum = undefined;
	    self.stickiesPos = undefined;
	    Util.remove(self.stickyElement);
	    self.stickyElement = undefined;
	  }
	});
	
	if (typeof module == 'object' && module.exports) {
	  module.exports = Sticky;
	}
	/** ignored by jsdoc **/
	else {
	  return Sticky;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 690 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90);
	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	var _once = function(func) {
	  var ran = false,
	    memo;
	  return function() {
	    if (ran) return memo;
	    ran = true;
	    memo = func.apply(this, arguments);
	    func = null;
	    return memo;
	  };
	};
	
	
	/**
	 * @discription events
	 * @mixin
	 */
	var Events = {
	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  on: function(name, callback, context) {
	    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	    this._events || (this._events = {});
	    var events = this._events[name] || (this._events[name] = []);
	    events.push({
	      callback: callback,
	      context: context,
	      ctx: context || this
	    });
	    return this;
	  },
	
	
	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, it will be removed.
	  once: function(name, callback, context) {
	    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	    var self = this;
	    var once = _once(function() {
	      self.off(name, once);
	      callback.apply(this, arguments);
	    });
	    once._callback = callback;
	    return this.on(name, once, context);
	  },
	
	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  off: function(name, callback, context) {
	    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	
	    // Remove all callbacks for all events.
	    if (!name && !callback && !context) {
	      this._events = void 0;
	      return this;
	    }
	
	    var names = name ? [name] : Object.keys(this._events);
	    for (var i = 0, length = names.length; i < length; i++) {
	      name = names[i];
	
	      // Bail out if there are no events stored.
	      var events = this._events[name];
	      if (!events) continue;
	
	      // Remove all callbacks for this event.
	      if (!callback && !context) {
	        delete this._events[name];
	        continue;
	      }
	
	      // Find any remaining events.
	      var remaining = [];
	      for (var j = 0, k = events.length; j < k; j++) {
	        var event = events[j];
	        if (
	          callback && callback !== event.callback &&
	          callback !== event.callback._callback ||
	          context && context !== event.context
	        ) {
	          remaining.push(event);
	        }
	      }
	
	      // Replace events if there are any remaining.  Otherwise, clean up.
	      if (remaining.length) {
	        this._events[name] = remaining;
	      } else {
	        delete this._events[name];
	      }
	    }
	
	    return this;
	  },
	
	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  trigger: function(name) {
	    if (!this._events) return this;
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (!eventsApi(this, 'trigger', name, args)) return this;
	    var events = this._events[name];
	    var allEvents = this._events.all;
	    if (events) triggerEvents(events, args);
	    if (allEvents) triggerEvents(allEvents, arguments);
	    return this;
	  },
	
	  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
	  // listen to an event in another object ... keeping track of what it's
	  // listening to.
	  listenTo: function(obj, name, callback) {
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var id = obj._listenId || (obj._listenId = Util.guid('l'));
	    listeningTo[id] = obj;
	    if (!callback && typeof name === 'object') callback = this;
	    obj.on(name, callback, this);
	    return this;
	  },
	
	  listenToOnce: function(obj, name, callback) {
	    if (typeof name === 'object') {
	      for (var event in name) this.listenToOnce(obj, event, name[event]);
	      return this;
	    }
	    var cb = _once(function() {
	      this.stopListening(obj, name, cb);
	      callback.apply(this, arguments);
	    });
	    cb._callback = callback;
	    return this.listenTo(obj, name, cb);
	  },
	
	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  stopListening: function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;
	    var remove = !name && !callback;
	    if (!callback && typeof name === 'object') callback = this;
	    if (obj)(listeningTo = {})[obj._listenId] = obj;
	    for (var id in listeningTo) {
	      obj = listeningTo[id];
	      obj.off(name, callback, this);
	      if (remove || Util.isEmpty(obj._events)) delete this._listeningTo[id];
	    }
	    return this;
	  }
	
	};
	
	// Regular expression used to split event strings.
	var eventSplitter = /\s+/;
	
	// Implement fancy features of the Events API such as multiple event
	// names `"change blur"` and jQuery-style event maps `{change: action}`
	// in terms of the existing API.
	var eventsApi = function(obj, action, name, rest) {
	  if (!name) return true;
	
	  // Handle event maps.
	  if (typeof name === 'object') {
	    for (var key in name) {
	      obj[action].apply(obj, [key, name[key]].concat(rest));
	    }
	    return false;
	  }
	
	  // Handle space separated event names.
	  if (eventSplitter.test(name)) {
	    var names = name.split(eventSplitter);
	    for (var i = 0, length = names.length; i < length; i++) {
	      obj[action].apply(obj, [names[i]].concat(rest));
	    }
	    return false;
	  }
	
	  return true;
	};
	
	// A difficult-to-believe, but optimized internal dispatch function for
	// triggering events. Tries to keep the usual cases speedy (most internal
	var triggerEvents = function(events, args) {
	  var ev, i = -1,
	    l = events.length,
	    a1 = args[0],
	    a2 = args[1],
	    a3 = args[2];
	  switch (args.length) {
	    case 0:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx);
	      return;
	    case 1:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
	      return;
	    case 2:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
	      return;
	    case 3:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	      return;
	    default:
	      while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
	      return;
	  }
	};
	
	// Aliases for backwards compatibility.
	Events.bind = Events.on;
	Events.unbind = Events.off;
	
	if (typeof module == 'object' && module.exports) {
	  module.exports = Events;
	}
	/** ignored by jsdoc **/
	else {
	  return Events;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 691 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90),
	    Base = __webpack_require__(97),
	    Core = __webpack_require__(276),
	    Animate = __webpack_require__(166);
	
	var transformOrigin = Util.prefixStyle("transformOrigin");
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @extends XScroll
	 * @example
	 * var xscroll = new OriginScroll({
	 *    renderTo:"#scroll"
	 * });
	 * xscroll.render();
	 */
	function OriginScroll(cfg) {
	    OriginScroll.superclass.constructor.call(this, cfg);
	}
	
	Util.extend(OriginScroll, Core, {
	    init: function() {
	        var self = this;
	        OriginScroll.superclass.init.call(this);
	        self.resetSize();
	    },
	    /**
	     * get scroll top value
	     * @memberof OriginScroll
	     * @return {number} scrollTop
	     */
	    getScrollTop: function() {
	        return this.renderTo.scrollTop;
	    },
	    /**
	     * get scroll left value
	     * @memberof OriginScroll
	     * @return {number} scrollLeft
	     */
	    getScrollLeft: function() {
	        return this.renderTo.scrollLeft;
	    },
	    /**
	     * vertical scroll absolute to the destination
	     * @memberof SimuScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTop: function(y, duration, easing, callback) {
	        var self = this;
	        var y = Math.round(y);
	        if (self.userConfig.lockY) return;
	        var duration = duration || 0;
	        var easing = easing || "quadratic";
	        var config = {
	            css: {
	                scrollTop: y
	            },
	            duration: duration,
	            easing: easing,
	            run: function(e) {
	                //trigger scroll event
	                self.trigger("scroll", {
	                    scrollTop: self.getScrollTop(),
	                    scrollLeft: self.getScrollLeft()
	                });
	            },
	            useTransition: false, //scrollTop 
	            end: callback
	        };
	        self.__timers.y = self.__timers.y || new Animate(self.renderTo, config);
	        //run
	        self.__timers.y.stop();
	        self.__timers.y.reset(config);
	        self.__timers.y.run();
	    },
	    /**
	     * horizontal scroll absolute to the destination
	     * @memberof SimuScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeft: function(x, duration, easing, callback) {
	        var self = this;
	        var x = Math.round(x);
	        if (self.userConfig.lockX) return;
	        var duration = duration || 0;
	        var easing = easing || "quadratic";
	        var config = {
	            css: {
	                scrollLeft: x
	            },
	            duration: duration,
	            easing: easing,
	            run: function(e) {
	                //trigger scroll event
	                self.trigger("scroll", {
	                    scrollTop: self.getScrollTop(),
	                    scrollLeft: self.getScrollLeft()
	                });
	            },
	            useTransition: false, //scrollTop 
	            end: callback
	        };
	        self.__timers.x = self.__timers.x || new Animate(self.renderTo, config);
	        //run
	        self.__timers.x.stop();
	        self.__timers.x.reset(config);
	        self.__timers.x.run();
	    },
	    _bindEvt: function() {
	        OriginScroll.superclass._bindEvt.call(this);
	        var self = this;
	        if (self.__isEvtBind) return;
	        self.__isEvtBind = true;
	        self.renderTo.addEventListener("scroll", function(e) {
	            self.trigger("scroll", {
	                type: "scroll",
	                scrollTop: self.getScrollTop(),
	                scrollLeft: self.getScrollLeft()
	            })
	        }, false)
	    }
	});
	
	if (typeof module == 'object' && module.exports) {
	    module.exports = OriginScroll;
	}
	/** ignored by jsdoc **/
	else {
	    return OriginScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 692 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(90),
	  Base = __webpack_require__(97),
	  Core = __webpack_require__(276),
	  Animate = __webpack_require__(166),
	  Hammer = __webpack_require__(242),
	  ScrollBar = __webpack_require__(688),
	  Controller = __webpack_require__(686);
	//reduced boundry pan distance
	var PAN_RATE = 1 - 0.618;
	//constant for scrolling acceleration
	var SCROLL_ACCELERATION = 0.0005;
	//constant for outside of boundry acceleration
	var BOUNDRY_ACCELERATION = 0.03;
	//transform-origin
	var transformOrigin = Util.prefixStyle("transformOrigin");
	//transform
	var transform = Util.prefixStyle("transform");
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @param {number} cfg.SCROLL_ACCELERATION  acceleration for scroll, min value make the scrolling smoothly
	 * @param {number} cfg.BOUNDRY_CHECK_DURATION duration for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_EASING easing for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_ACCELERATION acceleration for boundry bounce
	 * @param {boolean} cfg.lockX just like overflow-x:hidden
	 * @param {boolean} cfg.lockY just like overflow-y:hidden
	 * @param {boolean} cfg.scrollbarX config if the scrollbar-x is visible
	 * @param {boolean} cfg.scrollbarY config if the scrollbar-y is visible
	 * @param {boolean} cfg.useTransition config if use css3 transition or raf for scroll animation
	 * @param {boolean} cfg.bounce config if use has the bounce effect when scrolling outside of the boundry
	 * @param {boolean} cfg.boundryCheck config if scrolling inside of the boundry
	 * @param {boolean} cfg.preventDefault prevent touchstart
	 * @param {boolean} cfg.preventTouchMove prevent touchmove
	 * @param {string|HTMLElement}  cfg.container config for scroller's container which default value is ".xs-container"
	 * @param {string|HTMLElement}  cfg.content config for scroller's content which default value is ".xs-content"
	 * @param {object}  cfg.indicatorInsets  config scrollbars position {top: number, left: number, bottom: number, right: number}
	 * @param {string}  cfg.stickyElements config for sticky-positioned elements
	 * @param {string}  cfg.fixedElements config for fixed-positioned elements
	 * @param {string}  cfg.touchAction config for touchAction of the scroller
	 * @extends XScroll
	 * @example
	 * var xscroll = new SimuScroll({
	 *    renderTo:"#scroll",
	 *    lockX:false,
	 *    scrollbarX:true
	 * });
	 * xscroll.render();
	 */
	function SimuScroll(cfg) {
	  SimuScroll.superclass.constructor.call(this, cfg);
	}
	
	Util.extend(SimuScroll, Core, {
	  /** 
	   * @memberof SimuScroll
	   * @override
	   */
	  init: function() {
	    var self = this;
	    var defaultCfg = {
	      preventDefault: true,
	      preventTouchMove: true
	    };
	    SimuScroll.superclass.init.call(this);
	    self.userConfig = Util.mix(defaultCfg, self.userConfig);
	    self.SCROLL_ACCELERATION = self.userConfig.SCROLL_ACCELERATION || SCROLL_ACCELERATION;
	    self.BOUNDRY_ACCELERATION = self.userConfig.BOUNDRY_ACCELERATION || BOUNDRY_ACCELERATION;
	    self._initContainer();
	    self.resetSize();
	    //set overflow behaviors
	    self._setOverflowBehavior();
	    self.defaltConfig = {
	      lockY: self.userConfig.lockY,
	      lockX: self.userConfig.lockX
	    }
	    return self;
	  },
	  destroy: function() {
	    var self = this;
	    SimuScroll.superclass.destroy.call(this);
	    self.renderTo.style.overflow = "";
	    self.renderTo.style.touchAction = "";
	    self.container.style.transform = "";
	    self.container.style.transformOrigin = "";
	    self.content.style.transform = "";
	    self.content.style.transformOrigin = "";
	    self.off("touchstart mousedown", self._ontouchstart);
	    self.off("touchmove", self._ontouchmove);
	    window.removeEventListener("resize", self.resizeHandler, self);
	    self.destroyScrollBars();
	  },
	  /**
	   * set overflow behavior
	   * @return {boolean} [description]
	   */
	  _setOverflowBehavior: function() {
	    var self = this;
	    var renderTo = self.renderTo;
	    var computeStyle = getComputedStyle(renderTo);
	    self.userConfig.lockX = undefined === self.userConfig.lockX ? ((computeStyle['overflow-x'] == "hidden" || self.width == self.containerWidth) ? true : false) : self.userConfig.lockX;
	    self.userConfig.lockY = undefined === self.userConfig.lockY ? ((computeStyle['overflow-y'] == "hidden" || self.height == self.containerHeight) ? true : false) : self.userConfig.lockY;
	    self.userConfig.scrollbarX = undefined === self.userConfig.scrollbarX ? (self.userConfig.lockX ? false : true) : self.userConfig.scrollbarX;
	    self.userConfig.scrollbarY = undefined === self.userConfig.scrollbarY ? (self.userConfig.lockY ? false : true) : self.userConfig.scrollbarY;
	    return self;
	  },
	  /**
	   * reset lockX or lockY config to the default value
	   */
	  _resetLockConfig: function() {
	    var self = this;
	    self.userConfig.lockX = self.defaltConfig.lockX;
	    self.userConfig.lockY = self.defaltConfig.lockY;
	    return self;
	  },
	  /**
	   * init container
	   * @override
	   * @return {SimuScroll}
	   */
	  _initContainer: function() {
	    var self = this;
	    SimuScroll.superclass._initContainer.call(self);
	    if (self.__isContainerInited || !self.container || !self.content) return;
	    self.container.style[transformOrigin] = "0 0";
	    self.content.style[transformOrigin] = "0 0";
	    self.translate(0, 0);
	    self.__isContainerInited = true;
	    return self;
	  },
	  /**
	   * get scroll top value
	   * @memberof SimuScroll
	   * @return {number} scrollTop
	   */
	  getScrollTop: function() {
	    var transY = window.getComputedStyle(this.container)[transform].match(/[-\d\.*\d*]+/g);
	    return transY ? Math.round(transY[5]) === 0 ? 0 : -Math.round(transY[5]) : 0;
	  },
	  /**
	   * get scroll left value
	   * @memberof SimuScroll
	   * @return {number} scrollLeft
	   */
	  getScrollLeft: function() {
	    var transX = window.getComputedStyle(this.content)[transform].match(/[-\d\.*\d*]+/g);
	    return transX ? Math.round(transX[4]) === 0 ? 0 : -Math.round(transX[4]) : 0;
	  },
	  /**
	   * horizontal scroll absolute to the destination
	   * @memberof SimuScroll
	   * @param scrollLeft {number} scrollLeft
	   * @param duration {number} duration for animte
	   * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	   **/
	  scrollLeft: function(x, duration, easing, callback) {
	    if (this.userConfig.lockX) return;
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.x = (undefined === x || isNaN(x) || 0 === x) ? 0 : -Math.round(x);
	    this._animate("x", "translateX(" + this.x + "px) scale(" + this.scale + ")" + translateZ, duration, easing, callback);
	    return this;
	  },
	  /**
	   * vertical scroll absolute to the destination
	   * @memberof SimuScroll
	   * @param scrollTop {number} scrollTop
	   * @param duration {number} duration for animte
	   * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	   **/
	  scrollTop: function(y, duration, easing, callback) {
	    if (this.userConfig.lockY) return;
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.y = (undefined === y || isNaN(y) || 0 === y) ? 0 : -Math.round(y);
	    this._animate("y", "translateY(" + this.y + "px) " + translateZ, duration, easing, callback);
	    return this;
	  },
	  /**
	   * translate the scroller to a new destination includes x , y , scale
	   * @memberof SimuScroll
	   * @param x {number} x
	   * @param y {number} y
	   * @param scale {number} scale
	   **/
	  translate: function(x, y, scale) {
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.x = x || this.x || 0;
	    this.y = y || this.y || 0;
	    this.scale = scale || this.scale || 1;
	    this.content.style[transform] = "translate(" + this.x + "px,0px) scale(" + this.scale + ") " + translateZ;
	    this.container.style[transform] = "translate(0px," + this.y + "px) " + translateZ;
	    return this;
	  },
	  _animate: function(type, transform, duration, easing, callback) {
	    var self = this;
	    var duration = duration || 0;
	    var easing = easing || "quadratic";
	    var el = type == "y" ? self.container : self.content;
	    var config = {
	      css: {
	        transform: transform
	      },
	      duration: duration,
	      easing: easing,
	      run: function(e) {
	        /**
	         * @event {@link SimuScroll#"scroll"}
	         */
	        self.trigger("scroll", {
	          scrollTop: self.getScrollTop(),
	          scrollLeft: self.getScrollLeft(),
	          type: "scroll"
	        });
	      },
	      useTransition: self.userConfig.useTransition,
	      end: function(e) {
	        callback && callback();
	        if ((self["_bounce" + type] === 0 || self["_bounce" + type] === undefined) && easing != "linear") {
	          self['isScrolling' + type.toUpperCase()] = false;
	          self['isRealScrolling' + type.toUpperCase()] = false;
	          self.trigger("scrollend", {
	            type: "scrollend",
	            scrollTop: self.getScrollTop(),
	            scrollLeft: self.getScrollLeft(),
	            zoomType: type,
	            duration: duration,
	            easing: easing
	          });
	        }
	      }
	    };
	    var timer = self.__timers[type] = self.__timers[type] || new Animate(el, config);
	    timer.stop();
	    timer.reset(config);
	    timer.run();
	    self.trigger("scrollanimate", {
	      type: "scrollanimate",
	      scrollTop: -self.y,
	      scrollLeft: -self.x,
	      duration: duration,
	      easing: easing,
	      zoomType: type
	    })
	    return this;
	  },
	  _ontap: function(e) {
	    var self = this;
	    self.boundryCheck();
	    self._unPreventHref(e);
	    if (!self.isRealScrollingX && !self.isRealScrollingY) {
	      // self._triggerClick(e);
	    }
	    self._preventHref(e);
	    self.isRealScrollingY = false;
	    self.isRealScrollingY = false;
	  },
	  _bindEvt: function() {
	    SimuScroll.superclass._bindEvt.call(this);
	    var self = this;
	    if (self.__isEvtBind) return;
	    self.__isEvtBind = true;
	    var pinch = new Hammer.Pinch();
	    self.mc.add(pinch);
	    self.on("touchstart mousedown", self._ontouchstart, self);
	    self.on("touchmove", self._ontouchmove, self);
	    self.on("tap", self._ontap, self);
	    self.on("panstart", self._onpanstart, self);
	    self.on("pan", self._onpan, self);
	    self.on("panend", self._onpanend, self);
	    self.resizeHandler = function(e) {
	      setTimeout(function() {
	        self.resetSize();
	        self.boundryCheck(0);
	        self.render();
	      }, 100);
	    }
	    //window resize
	    window.addEventListener("resize", self.resizeHandler, self);
	
	    return this;
	  },
	  _ontouchstart: function(e) {
	    var self = this;
	    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(e.target.tagName) && self.userConfig.preventDefault) {
	      e.preventDefault();
	    }
	    self.stop();
	  },
	  _ontouchmove: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	  },
	  _onpanstart: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	    var self = this;
	    var scrollLeft = self.getScrollLeft();
	    var scrollTop = self.getScrollTop();
	    self.stop();
	    self.translate(-scrollLeft, -scrollTop);
	    var threshold = self.mc.get("pan").options.threshold;
	    self.thresholdY = e.direction == "8" ? threshold : e.direction == "16" ? -threshold : 0;
	    self.thresholdX = e.direction == "2" ? threshold : e.direction == "4" ? -threshold : 0;
	    return self;
	  },
	  _onpan: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	    var self = this;
	    var boundry = self.boundry;
	    var userConfig = self.userConfig;
	    var boundryCheck = userConfig.boundryCheck;
	    var bounce = userConfig.bounce;
	    var scrollTop = self.__topstart || (self.__topstart = -self.getScrollTop());
	    var scrollLeft = self.__leftstart || (self.__leftstart = -self.getScrollLeft());
	    var y = userConfig.lockY ? Number(scrollTop) : Number(scrollTop) + (e.deltaY + self.thresholdY);
	    var x = userConfig.lockX ? Number(scrollLeft) : Number(scrollLeft) + (e.deltaX + self.thresholdX);
	    var containerWidth = self.containerWidth;
	    var containerHeight = self.containerHeight;
	    if (boundryCheck) {
	      //over top
	      y = y > boundry.top ? bounce ? (y - boundry.top) * PAN_RATE + boundry.top : boundry.top : y;
	      //over bottom
	      y = y < boundry.bottom - containerHeight ? bounce ? y + (boundry.bottom - containerHeight - y) * PAN_RATE : boundry.bottom - containerHeight : y;
	      //over left
	      x = x > boundry.left ? bounce ? (x - boundry.left) * PAN_RATE + boundry.left : boundry.left : x;
	      //over right
	      x = x < boundry.right - containerWidth ? bounce ? x + (boundry.right - containerWidth - x) * PAN_RATE : boundry.right - containerWidth : x;
	    }
	    //move to x,y
	    self.translate(x, y);
	    //pan trigger the opposite direction
	    self.directionX = e.type == 'panleft' ? 'right' : e.type == 'panright' ? 'left' : '';
	    self.directionY = e.type == 'panup' ? 'down' : e.type == 'pandown' ? 'up' : '';
	    self.trigger("scroll", {
	      scrollTop: -y,
	      scrollLeft: -x,
	      triggerType: "pan",
	      type: "scroll"
	    });
	    return self;
	  },
	  _onpanend: function(e) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var transX = self.computeScroll("x", e.velocityX);
	    var transY = self.computeScroll("y", e.velocityY);
	    var scrollLeft = transX ? transX.pos : 0;
	    var scrollTop = transY ? transY.pos : 0;
	    var duration;
	    if (transX && transY && transX.status == "inside" && transY.status == "inside" && transX.duration && transY.duration) {
	      //ensure the same duration
	      duration = Math.max(transX.duration, transY.duration);
	    }
	    transX && self.scrollLeft(scrollLeft, duration || transX.duration, transX.easing, function(e) {
	      self.boundryCheckX();
	    });
	    transY && self.scrollTop(scrollTop, duration || transY.duration, transY.easing, function(e) {
	      self.boundryCheckY();
	    });
	    //judge the direction
	    self.directionX = e.velocityX < 0 ? "left" : "right";
	    self.directionY = e.velocityY < 0 ? "up" : "down";
	    //clear start
	    self.__topstart = null;
	    self.__leftstart = null;
	    return self;
	  },
	  /**
	   * judge the scroller is out of boundry horizontally and vertically
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOut: function() {
	    return this.isBoundryOutLeft() || this.isBoundryOutRight() || this.isBoundryOutTop() || this.isBoundryOutBottom();
	  },
	  /**
	   * judge if the scroller is outsideof left
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutLeft: function() {
	    return this.getBoundryOutLeft() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof right
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutRight: function() {
	    return this.getBoundryOutRight() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof top
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutTop: function() {
	    return this.getBoundryOutTop() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof bottom
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutBottom: function() {
	    return this.getBoundryOutBottom() > 0 ? true : false;
	  },
	  /**
	   * get the offset value outsideof top
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutTop: function() {
	    return -this.boundry.top - this.getScrollTop();
	  },
	  /**
	   * get the offset value outsideof left
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutLeft: function() {
	    return -this.boundry.left - this.getScrollLeft();
	  },
	  /**
	   * get the offset value outsideof bottom
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutBottom: function() {
	    return this.boundry.bottom - this.containerHeight + this.getScrollTop();
	  },
	  /**
	   * get the offset value outsideof right
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutRight: function() {
	    return this.boundry.right - this.containerWidth + this.getScrollLeft();
	  },
	  /**
	   * compute scroll transition by zoomType and velocity
	   * @memberof SimuScroll
	   * @param {string} zoomType zoomType of scrolling
	   * @param {number} velocity velocity after panend
	   * @example
	   * var info = xscroll.computeScroll("x",2);
	   * // return {pos:90,easing:"easing",status:"inside",duration:500}
	   * @return {Object}
	   **/
	  computeScroll: function(type, v) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var boundry = self.boundry;
	    var pos = type == "x" ? self.getScrollLeft() : self.getScrollTop();
	    var boundryStart = type == "x" ? boundry.left : boundry.top;
	    var boundryEnd = type == "x" ? boundry.right : boundry.bottom;
	    var innerSize = type == "x" ? self.containerWidth : self.containerHeight;
	    var maxSpeed = userConfig.maxSpeed || 2;
	    var boundryCheck = userConfig.boundryCheck;
	    var bounce = userConfig.bounce;
	    var transition = {};
	    var status = "inside";
	    if (boundryCheck) {
	      if (type == "x" && (self.isBoundryOutLeft() || self.isBoundryOutRight())) {
	        self.boundryCheckX();
	        return;
	      } else if (type == "y" && (self.isBoundryOutTop() || self.isBoundryOutBottom())) {
	        self.boundryCheckY();
	        return;
	      }
	    }
	    if (type == "x" && self.userConfig.lockX) return;
	    if (type == "y" && self.userConfig.lockY) return;
	    v = v > maxSpeed ? maxSpeed : v < -maxSpeed ? -maxSpeed : v;
	    var a = self.SCROLL_ACCELERATION * (v / (Math.abs(v) || 1));
	    var a2 = self.BOUNDRY_ACCELERATION;
	    var t = isNaN(v / a) ? 0 : v / a;
	    var s = Number(pos) + t * v / 2;
	    //over top boundry check bounce
	    if (s < -boundryStart && boundryCheck) {
	      var _s = -boundryStart - pos;
	      var _t = (Math.sqrt(-2 * a * _s + v * v) + v) / a;
	      var v0 = v - a * _t;
	      var _t2 = Math.abs(v0 / a2);
	      var s2 = v0 / 2 * _t2;
	      t = _t + _t2;
	      s = bounce ? -boundryStart + s2 : -boundryStart;
	      status = "outside";
	    } else if (s > innerSize - boundryEnd && boundryCheck) {
	      var _s = (boundryEnd - innerSize) + pos;
	      var _t = (Math.sqrt(-2 * a * _s + v * v) - v) / a;
	      var v0 = v - a * _t;
	      var _t2 = Math.abs(v0 / a2);
	      var s2 = v0 / 2 * _t2;
	      t = _t + _t2;
	      s = bounce ? innerSize - boundryEnd + s2 : innerSize - boundryEnd;
	      status = "outside";
	    }
	    if (isNaN(s) || isNaN(t)) return;
	    transition.pos = s;
	    transition.duration = t;
	    transition.easing = Math.abs(v) > 2 ? "circular" : "quadratic";
	    transition.status = status;
	    var Type = type.toUpperCase();
	    self['isScrolling' + Type] = true;
	    self['isRealScrolling' + Type] = true;
	    return transition;
	  },
	  /**
	   * bounce to the boundry horizontal
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheckX: function(duration, easing, callback) {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    if (typeof arguments[0] == "function") {
	      callback = arguments[0];
	      duration = self.userConfig.BOUNDRY_CHECK_DURATION;
	      easing = self.userConfig.BOUNDRY_CHECK_EASING;
	    } else {
	      duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION,
	        easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
	    }
	    if (!self.userConfig.bounce || self.userConfig.lockX) return;
	    var boundry = self.boundry;
	    if (self.isBoundryOutLeft()) {
	      self.scrollLeft(-boundry.left, duration, easing, callback);
	    } else if (self.isBoundryOutRight()) {
	      self.scrollLeft(self.containerWidth - boundry.right, duration, easing, callback);
	    }
	    return self;
	  },
	  /**
	   * bounce to the boundry vertical
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheckY: function(duration, easing, callback) {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    if (typeof arguments[0] == "function") {
	      callback = arguments[0];
	      duration = self.userConfig.BOUNDRY_CHECK_DURATION;
	      easing = self.userConfig.BOUNDRY_CHECK_EASING;
	    } else {
	      duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION,
	        easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
	    }
	    if (!self.userConfig.boundryCheck || self.userConfig.lockY) return;
	    var boundry = self.boundry;
	    if (self.isBoundryOutTop()) {
	      self.scrollTop(-boundry.top, duration, easing, callback);
	    } else if (self.isBoundryOutBottom()) {
	      self.scrollTop(self.containerHeight - boundry.bottom, duration, easing, callback);
	    }
	    return self;
	  },
	  /**
	   * bounce to the boundry vertical and horizontal
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheck: function(duration, easing, callback) {
	    this.boundryCheckX(duration, easing, callback);
	    this.boundryCheckY(duration, easing, callback);
	    return this;
	  },
	  /**
	   * stop scrolling immediatelly
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  stop: function() {
	    var self = this;
	    self.__timers.x && self.__timers.x.stop();
	    self.__timers.y && self.__timers.y.stop();
	    if (self.isScrollingX || self.isScrollingY) {
	      var scrollTop = self.getScrollTop(),
	        scrollLeft = self.getScrollLeft();
	      self.trigger("scrollend", {
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft
	      });
	      self.trigger("stop", {
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft
	      })
	      self.isScrollingX = false;
	      self.isScrollingY = false;
	    }
	    return self;
	  },
	  /**
	   * render scroll
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  render: function() {
	    var self = this;
	    SimuScroll.superclass.render.call(this);
	    //fixed for scrollbars
	    if (getComputedStyle(self.renderTo).position == "static") {
	      self.renderTo.style.position = "relative";
	    }
	    self.renderTo.style.overflow = "hidden";
	    self.initScrollBars();
	    self.initController();
	    return self;
	  },
	  /**
	   * init scrollbars
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  initScrollBars: function() {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    var indicatorInsets = self.userConfig.indicatorInsets;
	    if (self.userConfig.scrollbarX) {
	      self.scrollbarX = self.scrollbarX || new ScrollBar({
	        xscroll: self,
	        type: "x",
	        spacing: indicatorInsets.spacing
	      });
	      self.scrollbarX.render();
	      self.scrollbarX._update();
	      self.scrollbarX.hide();
	    }
	    if (self.userConfig.scrollbarY) {
	      self.scrollbarY = self.scrollbarY || new ScrollBar({
	        xscroll: self,
	        type: "y",
	        spacing: indicatorInsets.spacing
	      });
	      self.scrollbarY.render();
	      self.scrollbarY._update();
	      self.scrollbarY.hide();
	    }
	    return self;
	  },
	  /**
	   * destroy scrollbars
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  destroyScrollBars: function() {
	    this.scrollbarX && this.scrollbarX.destroy();
	    this.scrollbarY && this.scrollbarY.destroy();
	    return this;
	  },
	  /**
	   * init controller for multi-scrollers
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  initController: function() {
	    var self = this;
	    self.controller = self.controller || new Controller({
	      xscroll: self
	    });
	    return self;
	  },
	  _unPreventHref: function(e) {
	    var target = Util.findParentEl(e.target,'a',this.renderTo);
	    if(!target) return;
	    if (target.tagName.toLowerCase() == "a") {
	      var href = target.getAttribute("data-xs-href");
	      if (href) {
	        target.setAttribute("href", href);
	      }
	    }
	  },
	  _preventHref: function(e) {
	    var target = Util.findParentEl(e.target,'a',this.renderTo);
	    if(!target) return;
	    if (target.tagName.toLowerCase() == "a") {
	      var href = target.getAttribute("href");
	      href && target.setAttribute("href", "javascript:void(0)");
	      href && target.setAttribute("data-xs-href", href);
	    }
	  },
	  _triggerClick: function(e) {
	    var target = e.target;
	    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
	      var ev = document.createEvent('MouseEvents');
	      ev.initMouseEvent('click', true, true, e.view, 1,
	        target.screenX, target.screenY, target.clientX, target.clientY,
	        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	        0, null);
	      target.dispatchEvent(ev);
	    }
	  }
	});
	
	if (typeof module == 'object' && module.exports) {
	  module.exports = SimuScroll;
	}
	/** ignored by jsdoc **/
	else {
	  return SimuScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 693 */
/***/ (function(module, exports) {

	// THIS FILE IS ONLY FOR IDE ENTRY CHECKING NOT FOR REAL USAGE
	
	import Actionsheet from './src/components/actionsheet/index.vue'
	import Agree from './src/components/agree/index.vue'
	import AjaxPlugin from './src/plugins/ajax/index.js'
	import Alert from './src/components/alert/index.vue'
	import AlertPlugin from './src/plugins/alert/index.js'
	import AppPlugin from './src/plugins/app/index.js'
	import Array2stringFilter from './src/filters/array2String.js'
	import Badge from './src/components/badge/index.vue'
	import base64 from './src/tools/base64/index.js'
	import Blur from './src/components/blur/index.vue'
	import Box from './src/components/box/index.vue'
	import ButtonTab from './src/components/button-tab/button-tab.vue'
	import ButtonTabItem from './src/components/button-tab/button-tab-item.vue'
	import Calendar from './src/components/calendar/index.vue'
	import Card from './src/components/card/index.vue'
	import Cell from './src/components/cell/index.vue'
	import CellBox from './src/components/cell-box/index.vue'
	import CellFormPreview from './src/components/cell-form-preview/index.vue'
	import Checker from './src/components/checker/checker.vue'
	import CheckerItem from './src/components/checker/checker-item.vue'
	import CheckIcon from './src/components/check-icon/index.vue'
	import Checklist from './src/components/checklist/index.vue'
	import ChinaAddressData from './src/datas/china_address.json'
	import ChinaAddressV1Data from './src/datas/china_address_v1.json'
	import ChinaAddressV2Data from './src/datas/china_address_v2.json'
	import ChinaAddressV3Data from './src/datas/china_address_v3.json'
	import ClickOutsideDirective from './src/directives/click-outside/index.js'
	import Clocker from './src/components/clocker/index.vue'
	import ColorPicker from './src/components/color-picker/index.vue'
	import Confirm from './src/components/confirm/index.vue'
	import ConfirmPlugin from './src/plugins/confirm/index.js'
	import cookie from './src/tools/cookie/index.js'
	import Countdown from './src/components/countdown/index.vue'
	import Countup from './src/components/countup/index.vue'
	import dateFormat from './src/tools/date/format.js'
	import dateRange from './src/tools/date/range.js'
	import Datetime from './src/components/datetime/index.vue'
	import DatetimeRange from './src/components/datetime-range/index.vue'
	import debounce from './src/tools/debounce/index.js'
	import Demobasic from './src/components/fullpage/DemoBasic.vue'
	import Demoindex from './src/components/popover/DemoIndex.vue'
	import DevicePlugin from './src/plugins/device/index.js'
	import DevTip from './src/components/dev-tip/index.vue'
	import Divider from './src/components/divider/index.vue'
	import Flexbox from './src/components/flexbox/flexbox.vue'
	import FlexboxItem from './src/components/flexbox/flexbox-item.vue'
	import FormatTimeFilter from './src/filters/format-time.js'
	import FormPreview from './src/components/form-preview/index.vue'
	import FriendlyTimeFilter from './src/filters/friendly-time.js'
	import Fullpage from './src/components/fullpage/index.vue'
	import Grid from './src/components/grid/grid.vue'
	import GridItem from './src/components/grid/grid-item.vue'
	import Group from './src/components/group/index.vue'
	import GroupTitle from './src/components/group-title/index.vue'
	import Icon from './src/components/icon/index.vue'
	import InlineCalendar from './src/components/inline-calendar/index.vue'
	import InlineDesc from './src/components/inline-desc/index.vue'
	import InlineXNumber from './src/components/inline-x-number/index.vue'
	import InviewDirective from './src/directives/inview/index.js'
	import Loading from './src/components/loading/index.vue'
	import LoadingPlugin from './src/plugins/loading/index.js'
	import LoadMore from './src/components/load-more/index.vue'
	import LocalePlugin from './src/plugins/locale/index.js'
	import Marquee from './src/components/marquee/marquee.vue'
	import MarqueeItem from './src/components/marquee/marquee-item.vue'
	import Masker from './src/components/masker/index.vue'
	import md5 from './src/tools/md5/index.js'
	import Msg from './src/components/msg/index.vue'
	import Name2valueFilter from './src/filters/name2value.js'
	import numberComma from './src/tools/number/comma.js'
	import numberPad from './src/tools/number/pad.js'
	import numberRandom from './src/tools/number/random.js'
	import numberRange from './src/tools/number/range.js'
	import NumberRoller from './src/components/number-roller/index.vue'
	import Panel from './src/components/panel/index.vue'
	import Picker from './src/components/picker/index.vue'
	import Popover from './src/components/popover/index.vue'
	import Popup from './src/components/popup/index.vue'
	import PopupPicker from './src/components/popup-picker/index.vue'
	import PopupRadio from './src/components/popup-radio/index.vue'
	import Previewer from './src/components/previewer/index.vue'
	import Qrcode from './src/components/qrcode/index.vue'
	import querystring from './src/tools/querystring/index.js'
	import Radio from './src/components/radio/index.vue'
	import Range from './src/components/range/index.vue'
	import Rater from './src/components/rater/index.vue'
	import Scroller from './src/components/scroller/index.vue'
	import Search from './src/components/search/index.vue'
	import Selector from './src/components/selector/index.vue'
	import Shake from './src/components/shake/index.vue'
	import Spinner from './src/components/spinner/index.vue'
	import Step from './src/components/step/step.vue'
	import StepItem from './src/components/step/step-item.vue'
	import Sticky from './src/components/sticky/index.vue'
	import stringTrim from './src/tools/string/trim.js'
	import Swipeout from './src/components/swipeout/swipeout.vue'
	import SwipeoutButton from './src/components/swipeout/swipeout-button.vue'
	import SwipeoutItem from './src/components/swipeout/swipeout-item.vue'
	import Swiper from './src/components/swiper/swiper.vue'
	import SwiperItem from './src/components/swiper/swiper-item.vue'
	import Tab from './src/components/tab/tab.vue'
	import Tabbar from './src/components/tabbar/tabbar.vue'
	import TabbarItem from './src/components/tabbar/tabbar-item.vue'
	import TabItem from './src/components/tab/tab-item.vue'
	import throttle from './src/tools/throttle/index.js'
	import Timeline from './src/components/timeline/timeline.vue'
	import TimelineItem from './src/components/timeline/timeline-item.vue'
	import Tip from './src/components/tip/index.vue'
	import Toast from './src/components/toast/index.vue'
	import ToastPlugin from './src/plugins/toast/index.js'
	import TransferDom from './src/directives/transfer-dom/index.js'
	import TransferDomDirective from './src/directives/transfer-dom/index.js'
	import Value2nameFilter from './src/filters/value2name.js'
	import Video from './src/components/video/index.vue'
	import ViewBox from './src/components/view-box/index.vue'
	import VuxComponentListData from './src/datas/vux_component_list.json'
	import WechatEmotion from './src/components/wechat-emotion/index.vue'
	import WechatPlugin from './src/plugins/wechat/index.js'
	import WepayInput from './src/components/wepay-input/index.vue'
	import XAddress from './src/components/x-address/index.vue'
	import XButton from './src/components/x-button/index.vue'
	import XCircle from './src/components/x-circle/index.vue'
	import XDialog from './src/components/x-dialog/index.vue'
	import XHeader from './src/components/x-header/index.vue'
	import XHr from './src/components/x-hr/index.vue'
	import XImg from './src/components/x-img/index.vue'
	import XInput from './src/components/x-input/index.vue'
	import XNumber from './src/components/x-number/index.vue'
	import XProgress from './src/components/x-progress/index.vue'
	import XSwitch from './src/components/x-switch/index.vue'
	import XTable from './src/components/x-table/index.vue'
	import XTextarea from './src/components/x-textarea/index.vue'
	
	export {
	  Actionsheet,
	  Agree,
	  AjaxPlugin,
	  Alert,
	  AlertPlugin,
	  AppPlugin,
	  Array2stringFilter,
	  Badge,
	  base64,
	  Blur,
	  Box,
	  ButtonTab,
	  ButtonTabItem,
	  Calendar,
	  Card,
	  Cell,
	  CellBox,
	  CellFormPreview,
	  Checker,
	  CheckerItem,
	  CheckIcon,
	  Checklist,
	  ChinaAddressData,
	  ChinaAddressV1Data,
	  ChinaAddressV2Data,
	  ChinaAddressV3Data,
	  ClickOutsideDirective,
	  Clocker,
	  ColorPicker,
	  Confirm,
	  ConfirmPlugin,
	  cookie,
	  Countdown,
	  Countup,
	  dateFormat,
	  dateRange,
	  Datetime,
	  DatetimeRange,
	  debounce,
	  Demobasic,
	  Demoindex,
	  DevicePlugin,
	  DevTip,
	  Divider,
	  Flexbox,
	  FlexboxItem,
	  FormatTimeFilter,
	  FormPreview,
	  FriendlyTimeFilter,
	  Fullpage,
	  Grid,
	  GridItem,
	  Group,
	  GroupTitle,
	  Icon,
	  InlineCalendar,
	  InlineDesc,
	  InlineXNumber,
	  InviewDirective,
	  Loading,
	  LoadingPlugin,
	  LoadMore,
	  LocalePlugin,
	  Marquee,
	  MarqueeItem,
	  Masker,
	  md5,
	  Msg,
	  Name2valueFilter,
	  numberComma,
	  numberPad,
	  numberRandom,
	  numberRange,
	  NumberRoller,
	  Panel,
	  Picker,
	  Popover,
	  Popup,
	  PopupPicker,
	  PopupRadio,
	  Previewer,
	  Qrcode,
	  querystring,
	  Radio,
	  Range,
	  Rater,
	  Scroller,
	  Search,
	  Selector,
	  Shake,
	  Spinner,
	  Step,
	  StepItem,
	  Sticky,
	  stringTrim,
	  Swipeout,
	  SwipeoutButton,
	  SwipeoutItem,
	  Swiper,
	  SwiperItem,
	  Tab,
	  Tabbar,
	  TabbarItem,
	  TabItem,
	  throttle,
	  Timeline,
	  TimelineItem,
	  Tip,
	  Toast,
	  ToastPlugin,
	  TransferDom,
	  TransferDomDirective,
	  Value2nameFilter,
	  Video,
	  ViewBox,
	  VuxComponentListData,
	  WechatEmotion,
	  WechatPlugin,
	  WepayInput,
	  XAddress,
	  XButton,
	  XCircle,
	  XDialog,
	  XHeader,
	  XHr,
	  XImg,
	  XInput,
	  XNumber,
	  XProgress,
	  XSwitch,
	  XTable,
	  XTextarea
	}

/***/ }),
/* 694 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 695 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ })
]);