// assert
function assert (value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}

function testClosure () {
    var outerValue = "ninja";
    var later;
    function outerFcn () {
        var innerValue = "samurai";
        function innerFcn (paramValue) {
            assert(outerValue, "Inner can see the ninja");
            assert(innerValue, "Inner can see the samurai");
            assert(paramValue, "Inner can see the waki");
            assert(tooLate, "Inner can the the ronin");
        }
        later = innerFcn;
    }
    assert(!tooLate, "Outer cannot see the ronin");
    var tooLate = "ronin";
    outerFcn();
    later('waki');
}

function testPrivateParams () {
    function Ninja () {
        var feints = 0;
        this.getFeints = function () {
            return feints;
        };
        this.feint = function () {
            feints++;
        };
    }
    var ninja = new Ninja();
    ninja.feint();
    assert(ninja.getFeints() === 1, "Able to access the internal feint count");
    assert(ninja.feints === undefined, "Not able to access the private data");
}

function testChangeContext () {
    function bind (context, method) {
        return function () {
            return context[method].apply(context, arguments);
        };
    }
    var button = {
        clicked: false,
        click: function () {
            this.clicked = true;
            assert(button.clicked, "The button has been clicked");
            console.log(this);
        }
    };
    var elem = document.getElementById("test");
    elem.addEventListener("click", bind(button, "click"), false);
}

function testBind () {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
    var myObject = { name: "my" };
    function myFcn () {
        return this == myObject;
    }
    assert(!myFcn(), "Context is not set yet");
    var aFcn = myFcn.bind(myObject);
    assert(aFcn(), "Context is set");
}

function testCurrying () {
    Function.prototype.curry = function () {
        var fn = this, args = Array.prototype.slice.call(arguments); // 预填充参数
        return function () {
            return fn.apply(
                this,
                args.concat(Array.prototype.slice.call(arguments)) // + 刚传入的参数
            );
        };
    };
    Function.prototype.partial = function () {
        var fn = this, args = Array.prototype.slice.call(arguments);
        return function () {
            var arg = 0;
            for (var i = 0; i < args.length && arg < arguments.length; i ++ ) {
                if (args[i] === undefined) {
                    args[i] = arguments[arg++];
                }
            }
            return fn.apply(this, args);
        };
    };
    String.prototype.csv = String.prototype.split.partial(/,\s*/);
    var results = ("Mugan, Jin, Fuu").csv();
    assert(results[0] === "Mugan" && results[1] === "Jin" && results[2] === "Fuu", "The text values were split properly");

}

window.onload = function () {
    // testClosure();
    // testPrivateParams();
    // testChangeContext();
    // testBind();
    testCurrying();
};
