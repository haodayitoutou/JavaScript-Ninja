// assert
function assertion () {
    function assert (value, desc) {
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        document.getElementById("results").appendChild(li);
    }
    
    window.onload = function () {
        assert(true, "The test suite is running");
        assert(false, "Fail!");
    };
}

// test group
function testGroup () {
    (function () {
        var results;
        this.assert = function (value, desc) {
            var li = document.createElement("li");
            li.className = value ? "pass" : "fail";
            li.appendChild(document.createTextNode(desc));
            results.appendChild(li);
            return li;
        };
        this.test = function (name, fn) {
            results = document.getElementById("results");
            results = assert(true, name).appendChild(
                document.createElement("ul")
            );
            fn();
        };
    }());
    
    window.onload = function () {
        test("A test", function () {
            assert(true, "First assetion completed");
            assert(true, "Second assertion completed");
            assert(true, "Third assertion completed");
        });
        test("Second test", function () {
            assert(true, "First test completed");
            assert(false, "Second test failed");
        });
        test("Third test", function () {
            assert(null, "fail");
            assert(5, "pass");
        });
    };
}

// asynchronous test
function asyncTest () {
    (function () {
        var queue = [], paused = false, results;
        this.test = function (name, fn) {
            queue.push(function() {
                results = document.getElementById("results");
                results = assert(true, name).appendChild(
                    document.createElement('ul')
                );
                fn();
            });
            runTest();
        };
        this.pause = function () {
            paused = true;
        };
        this.resume = function () {
            paused = false;
            setTimeout(runTest, 1);
        };
        function runTest () {
            if (!paused && queue.length) {
                queue.shift()();
                if (!paused) {
                    resume();
                }
            }
        }
        this.assert = function (value, desc) {
            var li = document.createElement("li");
            li.className = value ? "pass" : "fail";
            li.appendChild(document.createTextNode(desc));
            results.appendChild(li);
            return li;
        };
    }());
    window.onload = function () {
        test("Async Test #1", function () {
            pause();
            setTimeout(function () {
                assert(true, "First test completed");
                resume();
            }, 1000);
        });
        test("Async Test #2", function () {
            pause();
            setTimeout(function () {
                assert(true, "Second test completed");
                assert(false, "Second test - second assertion fail");
                resume();
            }, 1000);
        });
    };
}

// assertion();
// testGroup();
asyncTest();
