function assert (value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}

function isPalindrome (text) {
    if (text.length <= 1) return true;
    if (text.charAt(0) != text.charAt(text.length - 1)) return false;
    return isPalindrome(text.substr(1, text.length - 2));
}

// inline function
function testInlineFunc () {
    var ninja = {
        chirp: function signal (n) {
            return n > 1 ? signal(n - 1) + "-chirp" : "chirp";
        }
    };
    assert(ninja.chirp(3) === "chirp-chirp-chirp", "ninja chirp Works");
    var samurai = { chirp: ninja.chirp };
    assert(samurai.chirp(3) === "chirp-chirp-chirp", "The method calls itself");

    assert(true, "");
    assert(true, "Scope of inline function");
    var name = function myName () {
        assert(name === myName, "This function has two names");
    };
    name();
    console.log(typeof myName);
    assert(typeof myName === "undefined", "But myName isn't defined outside of the function");
}

// store independent functions
function testStoreFuncs () {
    var store = {
        nextId: 1,
        cache: {},
        add: function (fn) {
            if (!fn.id) {
                fn.id = store.nextId++;
                return !!(store.cache[fn.id] = fn);
            }
        }
    };
    function ninja () {}
    assert(store.add(ninja), "Function was safely added");
    assert(store.add(ninja), "But it was only added once");
}

// memoization
function testMemoization () {
    function isPrime (value) {
        if (!isPrime.answers) isPrime.answers = {};
        if (isPrime.answers[value]) {
            return isPrime.answers[value];
        }
        var prime = value != 1; // 1 can never be prime
        for (var i = 2; i < value; i ++) {
            if (value % i == 0) {
                prime = false;
                break;
            }
        }
        isPrime.answers[value] = prime;
        return prime;
    }
    assert(isPrime(5), "5 is prime");
    assert(isPrime.answers[5], "The answer is cached");
}

// store dom elements
function testStoreDOM () {
    function getElements (name) {
        if (!getElements.cache) getElements.cache = {};
        return getElements.cache[name] = getElements.cache[name] || document.getElementsByTagName(name);
    }
}

// simulate array
function testArraySimulation () {
    var elems = {
        length: 0,
        add: function (elem) {
            Array.prototype.push.call(this, elem);
        },
        gather: function (id) {
            this.add(document.getElementById(id));
        }
    };
    elems.gather("first");
    assert(elems.length == 1 && elems[0].nodeType, "Verify that we have an element");
    elems.gather("second");
    assert(elems.length == 2 && elems[0].nodeType, "Verify that we have another element");
}

// min/max of an array
function testArrayMinMax () {
    // Assigning Math as context is not necessary
    // Math.min/max will work regardless of the context
    function minimum (array) {
        return Math.min.apply(Math, array);
    }
    function maximum (array) {
        return Math.max.apply(Math, array);
    }
    assert(minimum([0, 1, 2, 3]) === 0, "Located  the smallest value");
    assert(maximum([0, 1, 2, 3]) === 3, "Located  the largest value");
}

// function overload
function testFuncOverload () {
    function merge (root) {
        for (var i = 1; i < arguments.length; i ++) {
            for (var key in arguments[i]) {
                root[key] = arguments[i][key];
            }
        }
        return root;
    }
    function multiMax (multi) {
        return multi * Math.max.apply(
            Math,
            Array.prototype.slice.call(arguments, 1)
        );
    }
    function addMethod (object, name, fn) {
        var old = object[name];
        object[name] = function () {
            if (fn.length == arguments.length) {
                return fn.apply(this, arguments);
            } else if (typeof old == 'function') {
                return old.apply(this, arguments);
            }
        };
    }
    function testMerge () {
        var merged = merge(
            { name: "Batou" },
            { city: "Niihama"}
        );
        assert(merged.name == "Batou", "The original name is intact");
        assert(merged.city == "Niihama", "And the city has been copied over");
    }
    function testSliceArguments () {
        assert(multiMax(3, 1, 2, 3) == 9, "3 * 3 = 9");
    }
    function testAddMethod () {
        var ninjas = {
            values: ["Dean Edwards", "Sam Stephen", "Alex Russell"]
        };
        addMethod(ninjas, "find", function () {
            return this.values;
        });
        addMethod(ninjas, "find", function (name) {
            var ret = [];
            for (var i = 0; i < this.values.length; i ++) {
                if (this.values[i].indexOf(name) == 0) {
                    ret.push(this.values[i]);
                }
            }
            return ret;
        });
        addMethod(ninjas, "find", function (first, last) {
            var ret = [];
            for (var i = 0; i < this.values.length; i++) {
                if (this.values[i] == (first + " " + last)) {
                    ret.push(this.values[i]);
                }
            }
            return ret;
        });
        assert(ninjas.find().length === 3, "Found all ninjas");
        assert(ninjas.find("Sam").length === 1, "Found ninja by first name");
        assert(ninjas.find("Dean", "Edwards").length === 1, "Found ninja by first and last name");
        assert(ninjas.find("Alex", "Russell", "Jr") == null, "Found nothing");
    }
    testMerge();
    testSliceArguments();
    testAddMethod();
}

window.onload = function () {
    // testInlineFunc();
    // testStoreFuncs();
    // testMemoization();
    // testArraySimulation();
    // testArrayMinMax();
    testFuncOverload();
};
