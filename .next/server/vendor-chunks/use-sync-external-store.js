"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-sync-external-store";
exports.ids = ["vendor-chunks/use-sync-external-store"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * @license React\n * use-sync-external-store-shim.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  (function() {\n\n          'use strict';\n\n/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\nif (\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===\n    'function'\n) {\n  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());\n}\n          var React = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\nvar ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n\nfunction error(format) {\n  {\n    {\n      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n        args[_key2 - 1] = arguments[_key2];\n      }\n\n      printWarning('error', format, args);\n    }\n  }\n}\n\nfunction printWarning(level, format, args) {\n  // When changing this logic, you might want to also\n  // update consoleWithStackDev.www.js as well.\n  {\n    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n    var stack = ReactDebugCurrentFrame.getStackAddendum();\n\n    if (stack !== '') {\n      format += '%s';\n      args = args.concat([stack]);\n    } // eslint-disable-next-line react-internal/safe-string-coercion\n\n\n    var argsWithFormat = args.map(function (item) {\n      return String(item);\n    }); // Careful: RN currently depends on this prefix\n\n    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it\n    // breaks IE9: https://github.com/facebook/react/issues/13610\n    // eslint-disable-next-line react-internal/no-production-logging\n\n    Function.prototype.apply.call(console[level], console, argsWithFormat);\n  }\n}\n\n/**\n * inlined Object.is polyfill to avoid requiring consumers ship their own\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n */\nfunction is(x, y) {\n  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare\n  ;\n}\n\nvar objectIs = typeof Object.is === 'function' ? Object.is : is;\n\n// dispatch for CommonJS interop named imports.\n\nvar useState = React.useState,\n    useEffect = React.useEffect,\n    useLayoutEffect = React.useLayoutEffect,\n    useDebugValue = React.useDebugValue;\nvar didWarnOld18Alpha = false;\nvar didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works\n// because of a very particular set of implementation details and assumptions\n// -- change any one of them and it will break. The most important assumption\n// is that updates are always synchronous, because concurrent rendering is\n// only available in versions of React that also have a built-in\n// useSyncExternalStore API. And we only use this shim when the built-in API\n// does not exist.\n//\n// Do not assume that the clever hacks used by this hook also work in general.\n// The point of this shim is to replace the need for hacks by other libraries.\n\nfunction useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of\n// React do not expose a way to check if we're hydrating. So users of the shim\n// will need to track that themselves and return the correct value\n// from `getSnapshot`.\ngetServerSnapshot) {\n  {\n    if (!didWarnOld18Alpha) {\n      if (React.startTransition !== undefined) {\n        didWarnOld18Alpha = true;\n\n        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');\n      }\n    }\n  } // Read the current snapshot from the store on every render. Again, this\n  // breaks the rules of React, and only works here because of specific\n  // implementation details, most importantly that updates are\n  // always synchronous.\n\n\n  var value = getSnapshot();\n\n  {\n    if (!didWarnUncachedGetSnapshot) {\n      var cachedValue = getSnapshot();\n\n      if (!objectIs(value, cachedValue)) {\n        error('The result of getSnapshot should be cached to avoid an infinite loop');\n\n        didWarnUncachedGetSnapshot = true;\n      }\n    }\n  } // Because updates are synchronous, we don't queue them. Instead we force a\n  // re-render whenever the subscribed state changes by updating an some\n  // arbitrary useState hook. Then, during render, we call getSnapshot to read\n  // the current value.\n  //\n  // Because we don't actually use the state returned by the useState hook, we\n  // can save a bit of memory by storing other stuff in that slot.\n  //\n  // To implement the early bailout, we need to track some things on a mutable\n  // object. Usually, we would put that in a useRef hook, but we can stash it in\n  // our useState hook instead.\n  //\n  // To force a re-render, we call forceUpdate({inst}). That works because the\n  // new object always fails an equality check.\n\n\n  var _useState = useState({\n    inst: {\n      value: value,\n      getSnapshot: getSnapshot\n    }\n  }),\n      inst = _useState[0].inst,\n      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated\n  // in the layout phase so we can access it during the tearing check that\n  // happens on subscribe.\n\n\n  useLayoutEffect(function () {\n    inst.value = value;\n    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the\n    // commit phase if there was an interleaved mutation. In concurrent mode\n    // this can happen all the time, but even in synchronous mode, an earlier\n    // effect may have mutated the store.\n\n    if (checkIfSnapshotChanged(inst)) {\n      // Force a re-render.\n      forceUpdate({\n        inst: inst\n      });\n    }\n  }, [subscribe, value, getSnapshot]);\n  useEffect(function () {\n    // Check for changes right before subscribing. Subsequent changes will be\n    // detected in the subscription handler.\n    if (checkIfSnapshotChanged(inst)) {\n      // Force a re-render.\n      forceUpdate({\n        inst: inst\n      });\n    }\n\n    var handleStoreChange = function () {\n      // TODO: Because there is no cross-renderer API for batching updates, it's\n      // up to the consumer of this library to wrap their subscription event\n      // with unstable_batchedUpdates. Should we try to detect when this isn't\n      // the case and print a warning in development?\n      // The store changed. Check if the snapshot changed since the last time we\n      // read from the store.\n      if (checkIfSnapshotChanged(inst)) {\n        // Force a re-render.\n        forceUpdate({\n          inst: inst\n        });\n      }\n    }; // Subscribe to the store and return a clean-up function.\n\n\n    return subscribe(handleStoreChange);\n  }, [subscribe]);\n  useDebugValue(value);\n  return value;\n}\n\nfunction checkIfSnapshotChanged(inst) {\n  var latestGetSnapshot = inst.getSnapshot;\n  var prevValue = inst.value;\n\n  try {\n    var nextValue = latestGetSnapshot();\n    return !objectIs(prevValue, nextValue);\n  } catch (error) {\n    return true;\n  }\n}\n\nfunction useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {\n  // Note: The shim does not use getServerSnapshot, because pre-18 versions of\n  // React do not expose a way to check if we're hydrating. So users of the shim\n  // will need to track that themselves and return the correct value\n  // from `getSnapshot`.\n  return getSnapshot();\n}\n\nvar canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');\n\nvar isServerEnvironment = !canUseDOM;\n\nvar shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;\nvar useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;\n\nexports.useSyncExternalStore = useSyncExternalStore$2;\n          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\nif (\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===\n    'function'\n) {\n  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());\n}\n        \n  })();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUvY2pzL3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlLXNoaW0uZGV2ZWxvcG1lbnQuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUksSUFBcUM7QUFDekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLHdHQUFPOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpR0FBaUcsZUFBZTtBQUNoSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0EsS0FBSyxHQUFHOztBQUVSLGtEQUFrRDtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxLQUFLO0FBQ3JEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOzs7QUFHUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWktZmxhc2hjYXJkcy8uL25vZGVfbW9kdWxlcy91c2Utc3luYy1leHRlcm5hbC1zdG9yZS9janMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUtc2hpbS5kZXZlbG9wbWVudC5qcz80ZDc0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgUmVhY3RcbiAqIHVzZS1zeW5jLWV4dGVybmFsLXN0b3JlLXNoaW0uZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICovXG5pZiAoXG4gIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0YXJ0ID09PVxuICAgICdmdW5jdGlvbidcbikge1xuICBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0YXJ0KG5ldyBFcnJvcigpKTtcbn1cbiAgICAgICAgICB2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSBSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDtcblxuZnVuY3Rpb24gZXJyb3IoZm9ybWF0KSB7XG4gIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGxldmVsLCBmb3JtYXQsIGFyZ3MpIHtcbiAgLy8gV2hlbiBjaGFuZ2luZyB0aGlzIGxvZ2ljLCB5b3UgbWlnaHQgd2FudCB0byBhbHNvXG4gIC8vIHVwZGF0ZSBjb25zb2xlV2l0aFN0YWNrRGV2Lnd3dy5qcyBhcyB3ZWxsLlxuICB7XG4gICAgdmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgZm9ybWF0ICs9ICclcyc7XG4gICAgICBhcmdzID0gYXJncy5jb25jYXQoW3N0YWNrXSk7XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvc2FmZS1zdHJpbmctY29lcmNpb25cblxuXG4gICAgdmFyIGFyZ3NXaXRoRm9ybWF0ID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBTdHJpbmcoaXRlbSk7XG4gICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTsgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAvLyBicmVha3MgSUU5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZVtsZXZlbF0sIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcbiAgfVxufVxuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIHJldHVybiB4ID09PSB5ICYmICh4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSkgfHwgeCAhPT0geCAmJiB5ICE9PSB5IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIDtcbn1cblxudmFyIG9iamVjdElzID0gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGlzO1xuXG4vLyBkaXNwYXRjaCBmb3IgQ29tbW9uSlMgaW50ZXJvcCBuYW1lZCBpbXBvcnRzLlxuXG52YXIgdXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZSxcbiAgICB1c2VFZmZlY3QgPSBSZWFjdC51c2VFZmZlY3QsXG4gICAgdXNlTGF5b3V0RWZmZWN0ID0gUmVhY3QudXNlTGF5b3V0RWZmZWN0LFxuICAgIHVzZURlYnVnVmFsdWUgPSBSZWFjdC51c2VEZWJ1Z1ZhbHVlO1xudmFyIGRpZFdhcm5PbGQxOEFscGhhID0gZmFsc2U7XG52YXIgZGlkV2FyblVuY2FjaGVkR2V0U25hcHNob3QgPSBmYWxzZTsgLy8gRGlzY2xhaW1lcjogVGhpcyBzaGltIGJyZWFrcyBtYW55IG9mIHRoZSBydWxlcyBvZiBSZWFjdCwgYW5kIG9ubHkgd29ya3Ncbi8vIGJlY2F1c2Ugb2YgYSB2ZXJ5IHBhcnRpY3VsYXIgc2V0IG9mIGltcGxlbWVudGF0aW9uIGRldGFpbHMgYW5kIGFzc3VtcHRpb25zXG4vLyAtLSBjaGFuZ2UgYW55IG9uZSBvZiB0aGVtIGFuZCBpdCB3aWxsIGJyZWFrLiBUaGUgbW9zdCBpbXBvcnRhbnQgYXNzdW1wdGlvblxuLy8gaXMgdGhhdCB1cGRhdGVzIGFyZSBhbHdheXMgc3luY2hyb25vdXMsIGJlY2F1c2UgY29uY3VycmVudCByZW5kZXJpbmcgaXNcbi8vIG9ubHkgYXZhaWxhYmxlIGluIHZlcnNpb25zIG9mIFJlYWN0IHRoYXQgYWxzbyBoYXZlIGEgYnVpbHQtaW5cbi8vIHVzZVN5bmNFeHRlcm5hbFN0b3JlIEFQSS4gQW5kIHdlIG9ubHkgdXNlIHRoaXMgc2hpbSB3aGVuIHRoZSBidWlsdC1pbiBBUElcbi8vIGRvZXMgbm90IGV4aXN0LlxuLy9cbi8vIERvIG5vdCBhc3N1bWUgdGhhdCB0aGUgY2xldmVyIGhhY2tzIHVzZWQgYnkgdGhpcyBob29rIGFsc28gd29yayBpbiBnZW5lcmFsLlxuLy8gVGhlIHBvaW50IG9mIHRoaXMgc2hpbSBpcyB0byByZXBsYWNlIHRoZSBuZWVkIGZvciBoYWNrcyBieSBvdGhlciBsaWJyYXJpZXMuXG5cbmZ1bmN0aW9uIHVzZVN5bmNFeHRlcm5hbFN0b3JlKHN1YnNjcmliZSwgZ2V0U25hcHNob3QsIC8vIE5vdGU6IFRoZSBzaGltIGRvZXMgbm90IHVzZSBnZXRTZXJ2ZXJTbmFwc2hvdCwgYmVjYXVzZSBwcmUtMTggdmVyc2lvbnMgb2Zcbi8vIFJlYWN0IGRvIG5vdCBleHBvc2UgYSB3YXkgdG8gY2hlY2sgaWYgd2UncmUgaHlkcmF0aW5nLiBTbyB1c2VycyBvZiB0aGUgc2hpbVxuLy8gd2lsbCBuZWVkIHRvIHRyYWNrIHRoYXQgdGhlbXNlbHZlcyBhbmQgcmV0dXJuIHRoZSBjb3JyZWN0IHZhbHVlXG4vLyBmcm9tIGBnZXRTbmFwc2hvdGAuXG5nZXRTZXJ2ZXJTbmFwc2hvdCkge1xuICB7XG4gICAgaWYgKCFkaWRXYXJuT2xkMThBbHBoYSkge1xuICAgICAgaWYgKFJlYWN0LnN0YXJ0VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpZFdhcm5PbGQxOEFscGhhID0gdHJ1ZTtcblxuICAgICAgICBlcnJvcignWW91IGFyZSB1c2luZyBhbiBvdXRkYXRlZCwgcHJlLXJlbGVhc2UgYWxwaGEgb2YgUmVhY3QgMTggdGhhdCAnICsgJ2RvZXMgbm90IHN1cHBvcnQgdXNlU3luY0V4dGVybmFsU3RvcmUuIFRoZSAnICsgJ3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlIHNoaW0gd2lsbCBub3Qgd29yayBjb3JyZWN0bHkuIFVwZ3JhZGUgJyArICd0byBhIG5ld2VyIHByZS1yZWxlYXNlLicpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBSZWFkIHRoZSBjdXJyZW50IHNuYXBzaG90IGZyb20gdGhlIHN0b3JlIG9uIGV2ZXJ5IHJlbmRlci4gQWdhaW4sIHRoaXNcbiAgLy8gYnJlYWtzIHRoZSBydWxlcyBvZiBSZWFjdCwgYW5kIG9ubHkgd29ya3MgaGVyZSBiZWNhdXNlIG9mIHNwZWNpZmljXG4gIC8vIGltcGxlbWVudGF0aW9uIGRldGFpbHMsIG1vc3QgaW1wb3J0YW50bHkgdGhhdCB1cGRhdGVzIGFyZVxuICAvLyBhbHdheXMgc3luY2hyb25vdXMuXG5cblxuICB2YXIgdmFsdWUgPSBnZXRTbmFwc2hvdCgpO1xuXG4gIHtcbiAgICBpZiAoIWRpZFdhcm5VbmNhY2hlZEdldFNuYXBzaG90KSB7XG4gICAgICB2YXIgY2FjaGVkVmFsdWUgPSBnZXRTbmFwc2hvdCgpO1xuXG4gICAgICBpZiAoIW9iamVjdElzKHZhbHVlLCBjYWNoZWRWYWx1ZSkpIHtcbiAgICAgICAgZXJyb3IoJ1RoZSByZXN1bHQgb2YgZ2V0U25hcHNob3Qgc2hvdWxkIGJlIGNhY2hlZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wJyk7XG5cbiAgICAgICAgZGlkV2FyblVuY2FjaGVkR2V0U25hcHNob3QgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBCZWNhdXNlIHVwZGF0ZXMgYXJlIHN5bmNocm9ub3VzLCB3ZSBkb24ndCBxdWV1ZSB0aGVtLiBJbnN0ZWFkIHdlIGZvcmNlIGFcbiAgLy8gcmUtcmVuZGVyIHdoZW5ldmVyIHRoZSBzdWJzY3JpYmVkIHN0YXRlIGNoYW5nZXMgYnkgdXBkYXRpbmcgYW4gc29tZVxuICAvLyBhcmJpdHJhcnkgdXNlU3RhdGUgaG9vay4gVGhlbiwgZHVyaW5nIHJlbmRlciwgd2UgY2FsbCBnZXRTbmFwc2hvdCB0byByZWFkXG4gIC8vIHRoZSBjdXJyZW50IHZhbHVlLlxuICAvL1xuICAvLyBCZWNhdXNlIHdlIGRvbid0IGFjdHVhbGx5IHVzZSB0aGUgc3RhdGUgcmV0dXJuZWQgYnkgdGhlIHVzZVN0YXRlIGhvb2ssIHdlXG4gIC8vIGNhbiBzYXZlIGEgYml0IG9mIG1lbW9yeSBieSBzdG9yaW5nIG90aGVyIHN0dWZmIGluIHRoYXQgc2xvdC5cbiAgLy9cbiAgLy8gVG8gaW1wbGVtZW50IHRoZSBlYXJseSBiYWlsb3V0LCB3ZSBuZWVkIHRvIHRyYWNrIHNvbWUgdGhpbmdzIG9uIGEgbXV0YWJsZVxuICAvLyBvYmplY3QuIFVzdWFsbHksIHdlIHdvdWxkIHB1dCB0aGF0IGluIGEgdXNlUmVmIGhvb2ssIGJ1dCB3ZSBjYW4gc3Rhc2ggaXQgaW5cbiAgLy8gb3VyIHVzZVN0YXRlIGhvb2sgaW5zdGVhZC5cbiAgLy9cbiAgLy8gVG8gZm9yY2UgYSByZS1yZW5kZXIsIHdlIGNhbGwgZm9yY2VVcGRhdGUoe2luc3R9KS4gVGhhdCB3b3JrcyBiZWNhdXNlIHRoZVxuICAvLyBuZXcgb2JqZWN0IGFsd2F5cyBmYWlscyBhbiBlcXVhbGl0eSBjaGVjay5cblxuXG4gIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZSh7XG4gICAgaW5zdDoge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZ2V0U25hcHNob3Q6IGdldFNuYXBzaG90XG4gICAgfVxuICB9KSxcbiAgICAgIGluc3QgPSBfdXNlU3RhdGVbMF0uaW5zdCxcbiAgICAgIGZvcmNlVXBkYXRlID0gX3VzZVN0YXRlWzFdOyAvLyBUcmFjayB0aGUgbGF0ZXN0IGdldFNuYXBzaG90IGZ1bmN0aW9uIHdpdGggYSByZWYuIFRoaXMgbmVlZHMgdG8gYmUgdXBkYXRlZFxuICAvLyBpbiB0aGUgbGF5b3V0IHBoYXNlIHNvIHdlIGNhbiBhY2Nlc3MgaXQgZHVyaW5nIHRoZSB0ZWFyaW5nIGNoZWNrIHRoYXRcbiAgLy8gaGFwcGVucyBvbiBzdWJzY3JpYmUuXG5cblxuICB1c2VMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICBpbnN0LmdldFNuYXBzaG90ID0gZ2V0U25hcHNob3Q7IC8vIFdoZW5ldmVyIGdldFNuYXBzaG90IG9yIHN1YnNjcmliZSBjaGFuZ2VzLCB3ZSBuZWVkIHRvIGNoZWNrIGluIHRoZVxuICAgIC8vIGNvbW1pdCBwaGFzZSBpZiB0aGVyZSB3YXMgYW4gaW50ZXJsZWF2ZWQgbXV0YXRpb24uIEluIGNvbmN1cnJlbnQgbW9kZVxuICAgIC8vIHRoaXMgY2FuIGhhcHBlbiBhbGwgdGhlIHRpbWUsIGJ1dCBldmVuIGluIHN5bmNocm9ub3VzIG1vZGUsIGFuIGVhcmxpZXJcbiAgICAvLyBlZmZlY3QgbWF5IGhhdmUgbXV0YXRlZCB0aGUgc3RvcmUuXG5cbiAgICBpZiAoY2hlY2tJZlNuYXBzaG90Q2hhbmdlZChpbnN0KSkge1xuICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuXG4gICAgICBmb3JjZVVwZGF0ZSh7XG4gICAgICAgIGluc3Q6IGluc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW3N1YnNjcmliZSwgdmFsdWUsIGdldFNuYXBzaG90XSk7XG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ2hlY2sgZm9yIGNoYW5nZXMgcmlnaHQgYmVmb3JlIHN1YnNjcmliaW5nLiBTdWJzZXF1ZW50IGNoYW5nZXMgd2lsbCBiZVxuICAgIC8vIGRldGVjdGVkIGluIHRoZSBzdWJzY3JpcHRpb24gaGFuZGxlci5cbiAgICBpZiAoY2hlY2tJZlNuYXBzaG90Q2hhbmdlZChpbnN0KSkge1xuICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuXG4gICAgICBmb3JjZVVwZGF0ZSh7XG4gICAgICAgIGluc3Q6IGluc3RcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVTdG9yZUNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRPRE86IEJlY2F1c2UgdGhlcmUgaXMgbm8gY3Jvc3MtcmVuZGVyZXIgQVBJIGZvciBiYXRjaGluZyB1cGRhdGVzLCBpdCdzXG4gICAgICAvLyB1cCB0byB0aGUgY29uc3VtZXIgb2YgdGhpcyBsaWJyYXJ5IHRvIHdyYXAgdGhlaXIgc3Vic2NyaXB0aW9uIGV2ZW50XG4gICAgICAvLyB3aXRoIHVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzLiBTaG91bGQgd2UgdHJ5IHRvIGRldGVjdCB3aGVuIHRoaXMgaXNuJ3RcbiAgICAgIC8vIHRoZSBjYXNlIGFuZCBwcmludCBhIHdhcm5pbmcgaW4gZGV2ZWxvcG1lbnQ/XG4gICAgICAvLyBUaGUgc3RvcmUgY2hhbmdlZC4gQ2hlY2sgaWYgdGhlIHNuYXBzaG90IGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgdGltZSB3ZVxuICAgICAgLy8gcmVhZCBmcm9tIHRoZSBzdG9yZS5cbiAgICAgIGlmIChjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpKSB7XG4gICAgICAgIC8vIEZvcmNlIGEgcmUtcmVuZGVyLlxuICAgICAgICBmb3JjZVVwZGF0ZSh7XG4gICAgICAgICAgaW5zdDogaW5zdFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9OyAvLyBTdWJzY3JpYmUgdG8gdGhlIHN0b3JlIGFuZCByZXR1cm4gYSBjbGVhbi11cCBmdW5jdGlvbi5cblxuXG4gICAgcmV0dXJuIHN1YnNjcmliZShoYW5kbGVTdG9yZUNoYW5nZSk7XG4gIH0sIFtzdWJzY3JpYmVdKTtcbiAgdXNlRGVidWdWYWx1ZSh2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2hlY2tJZlNuYXBzaG90Q2hhbmdlZChpbnN0KSB7XG4gIHZhciBsYXRlc3RHZXRTbmFwc2hvdCA9IGluc3QuZ2V0U25hcHNob3Q7XG4gIHZhciBwcmV2VmFsdWUgPSBpbnN0LnZhbHVlO1xuXG4gIHRyeSB7XG4gICAgdmFyIG5leHRWYWx1ZSA9IGxhdGVzdEdldFNuYXBzaG90KCk7XG4gICAgcmV0dXJuICFvYmplY3RJcyhwcmV2VmFsdWUsIG5leHRWYWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlU3luY0V4dGVybmFsU3RvcmUkMShzdWJzY3JpYmUsIGdldFNuYXBzaG90LCBnZXRTZXJ2ZXJTbmFwc2hvdCkge1xuICAvLyBOb3RlOiBUaGUgc2hpbSBkb2VzIG5vdCB1c2UgZ2V0U2VydmVyU25hcHNob3QsIGJlY2F1c2UgcHJlLTE4IHZlcnNpb25zIG9mXG4gIC8vIFJlYWN0IGRvIG5vdCBleHBvc2UgYSB3YXkgdG8gY2hlY2sgaWYgd2UncmUgaHlkcmF0aW5nLiBTbyB1c2VycyBvZiB0aGUgc2hpbVxuICAvLyB3aWxsIG5lZWQgdG8gdHJhY2sgdGhhdCB0aGVtc2VsdmVzIGFuZCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWVcbiAgLy8gZnJvbSBgZ2V0U25hcHNob3RgLlxuICByZXR1cm4gZ2V0U25hcHNob3QoKTtcbn1cblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG52YXIgaXNTZXJ2ZXJFbnZpcm9ubWVudCA9ICFjYW5Vc2VET007XG5cbnZhciBzaGltID0gaXNTZXJ2ZXJFbnZpcm9ubWVudCA/IHVzZVN5bmNFeHRlcm5hbFN0b3JlJDEgOiB1c2VTeW5jRXh0ZXJuYWxTdG9yZTtcbnZhciB1c2VTeW5jRXh0ZXJuYWxTdG9yZSQyID0gUmVhY3QudXNlU3luY0V4dGVybmFsU3RvcmUgIT09IHVuZGVmaW5lZCA/IFJlYWN0LnVzZVN5bmNFeHRlcm5hbFN0b3JlIDogc2hpbTtcblxuZXhwb3J0cy51c2VTeW5jRXh0ZXJuYWxTdG9yZSA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlJDI7XG4gICAgICAgICAgLyogZ2xvYmFsIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAqL1xuaWYgKFxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICE9PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdG9wID09PVxuICAgICdmdW5jdGlvbidcbikge1xuICBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AobmV3IEVycm9yKCkpO1xufVxuICAgICAgICBcbiAgfSkoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ \"(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUvc2hpbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUMsQ0FBQztBQUNGLEVBQUUsOExBQThFO0FBQ2hGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWktZmxhc2hjYXJkcy8uL25vZGVfbW9kdWxlcy91c2Utc3luYy1leHRlcm5hbC1zdG9yZS9zaGltL2luZGV4LmpzP2Q2YTgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2Nqcy91c2Utc3luYy1leHRlcm5hbC1zdG9yZS1zaGltLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2Nqcy91c2Utc3luYy1leHRlcm5hbC1zdG9yZS1zaGltLmRldmVsb3BtZW50LmpzJyk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sync-external-store/shim/index.js\n");

/***/ })

};
;