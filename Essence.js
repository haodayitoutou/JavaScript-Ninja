// function overload
function overload (obj, fcnName, fcn) {
    var old = obj[fcnName];
    obj[fcnName] = function () {
        if (fcn.length == arguments.length) {
            fcn.apply(this, arguments);
        } else if (typeof old === 'function') {
            old.apply(this, arguments);
        }
    };
}

// checking for functions
function isFunction (fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}

// bind
Function.prototype.bind = function () {
    var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
    return function () {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
    };
};
