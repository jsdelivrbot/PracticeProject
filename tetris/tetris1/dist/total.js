"use strict";

// requestAnimationFrame 폴리필
var requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
}();

var cancelAnimationFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;
}();
"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetris = function () {
    function Tetris(options) {
        _classCallCheck(this, Tetris);

        this.canvas = options.canvas;
        this.context = this.canvas.getContext("2d");

        this.rows = 20; // 행
        this.cols = 10; // 열
        this.board = [];
        this.requestId = 0;

        this.init();
    }

    _createClass(Tetris, [{
        key: "init",
        value: function init() {
            var _this = this;

            requestAnimationFrame(this.loop.bind(this));
            // 2d 배열을 모두 0으로 초기화함
            var rowsArray = Array(this.rows).fill();
            this.board = rowsArray.map(function (_) {
                return Array(_this.cols).fill(0);
            });
        }
    }, {
        key: "loop",
        value: function loop() {
            console.log("we are in the loop!");
            this.requestId = requestAnimationFrame(this.loop.bind(this));
        }
    }]);

    return Tetris;
}();