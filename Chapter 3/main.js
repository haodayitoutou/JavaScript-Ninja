function assert (value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}

// scope
function testScope () {
    window.onload = function () {
        assert(true, "| --- BEFORE OUTER");
        assert(typeof outer === 'function', "outer() is in scope");
        assert(typeof inner === 'function', "inner() is in scope");
        assert(typeof a === 'number', "a is in scope");
        assert(typeof b === 'number', "b is in scope");
        assert(typeof c === 'number', "c is in scope");
        function outer () {
            assert(true, "| --- INSIDE OUTER, BEFORE a");
            assert(typeof outer === 'function', "outer() is in scope");
            assert(typeof inner === 'function', "inner() is in scope");
            assert(typeof a === 'number', "a is in scope");
            assert(typeof b === 'number', "b is in scope");
            assert(typeof c === 'number', "c is in scope");
            var a = 1;
            assert(true, "| --- INSIDE OUTER, AFTER a");
            assert(typeof outer === 'function', "outer() is in scope");
            assert(typeof inner === 'function', "inner() is in scope");
            assert(typeof a === 'number', "a is in scope");
            assert(typeof b === 'number', "b is in scope");
            assert(typeof c === 'number', "c is in scope");
            function inner () {}
            var b = 2;
            assert(true, "| --- INSIDE OUTER, AFTER inner AND b");
            assert(typeof outer === 'function', "outer() is in scope");
            assert(typeof inner === 'function', "inner() is in scope");
            assert(typeof a === 'number', "a is in scope");
            assert(typeof b === 'number', "b is in scope");
            assert(typeof c === 'number', "c is in scope");
            if (a == 1) {
                assert(true, "| --- INSIDE OUTER, INSIDE if");
                assert(typeof outer === 'function', "outer() is in scope");
                assert(typeof inner === 'function', "inner() is in scope");
                assert(typeof a === 'number', "a is in scope");
                assert(typeof b === 'number', "b is in scope");
                assert(typeof c === 'number', "c is in scope");
                var c = 3;
            }
            assert(true, "| --- INSIDE OUTER, OUTSIDE if");
            assert(typeof outer === 'function', "outer() is in scope");
            assert(typeof inner === 'function', "inner() is in scope");
            assert(typeof a === 'number', "a is in scope");
            assert(typeof b === 'number', "b is in scope");
            assert(typeof c === 'number', "c is in scope");
        }
        outer();
        assert(true, "| --- AFTER OUTER");
        assert(typeof outer === 'function', "outer() is in scope");
        assert(typeof inner === 'function', "inner() is in scope");
        assert(typeof a === 'number', "a is in scope");
        assert(typeof b === 'number', "b is in scope");
        assert(typeof c === 'number', "c is in scope");
    };
}

// as function vs as method
function testThis () {
    window.onload = function () {
        function creep () {
            return this;
        }
        assert(creep() === window, "Creeping in the window");
        var sneak = creep;
        assert(sneak() === window, "Sneaking in the window");
        var ninja1 = {
            skulk: creep,
        };
        assert(ninja1.skulk() === ninja1, "The first ninja is skulking");
    };
}

// constructor
function testConstructor () {
    window.onload = function () {
        function Ninja () {
            this.skulk = function () {
                return this;
            };
        }
        var ninja1 = new Ninja();
        var ninja2 = new Ninja();
        assert(ninja1.skulk() === ninja1, "The 1st ninja is skulking");
        assert(ninja2.skulk() === ninja2, "The 2st ninja is skulking");
    };
}

// apply & call
function testApplyAndCall () {
    window.onload = function () {
        function juggle () {
            var result = 0;
            for (var n = 0; n < arguments.length; n += 1) {
                result += arguments[n];
            }
            this.result = result;
        }
        var ninja1 = {};
        var ninja2 = {};
        juggle.apply(ninja1, [1, 2, 3, 4]);
        juggle.call(ninja2, 5, 6, 7, 8);
        assert(ninja1.result === 10, "juggled via apply");
        assert(ninja2.result === 26, "juggled via call");
    };
}

// forEach
function testForEach () {
    window.onload = function () {
        function forEach (list, callback) {
            for (var n = 0; n < list.length; n += 1) {
                callback.call(list[n], n);
            }
        }
        var weapons = ['shuriken', 'katana', 'nunchucks'];
        forEach(
            weapons,
            function (index) {
                assert(this == weapons[index], "Got the expected value of " + weapons[index]);
            }
        );
    };
}

// testScope();
// testThis();
// testConstructor();
// testApplyAndCall();
testForEach();
