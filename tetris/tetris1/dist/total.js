"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SHAPE = {
    I: [[1, 1, 1, 1]],
    J: [[1, 1, 1], [0, 0, 1]],
    L: [[1, 1, 1], [1, 0, 0]],
    O: [[1, 1], [1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    T: [[1, 1, 1], [0, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]]
};

var randomProperty = function randomProperty(obj) {
    var keys = Object.keys(obj),
        randomKeyIndex = Math.floor(keys.length * Math.random());
    return obj[keys[randomKeyIndex]];
};

var Tetris = function () {
    function Tetris(options) {
        _classCallCheck(this, Tetris);

        this.canvas = options.canvas;
        this.context = this.canvas.getContext("2d");
        this.rows = 20; // 행
        this.cols = 10; // 열
        this.board = [];
        this.requestId = 0;
        this.blockSize = { w: 0, h: 0 };
        this.tickSize = 500; // millisecond
        this.prevTick = Date.now(); // 게임 처음 시작 시각으로 초기화

        this.init();
    }

    _createClass(Tetris, [{
        key: "init",
        value: function init() {
            var _this = this;

            requestAnimationFrame(this.loop.bind(this));
            // 2d 배열을 모두 0으로 초기화함
            // for(let row=0; row < this.rows; row++) {
            //     this.board.push(new Array(this.cols).fill(row%2));
            // }

            // board 배열을 정해진 rows * cols 에 맞도록 추기화 하고 그 값으 0으로 채워넣는다.
            var rowsArray = Array(this.rows).fill();
            this.board = rowsArray.map(function (_) {
                return Array(_this.cols).fill(0);
            });

            this.makeNewBlock(0, this.cols / 2);

            this.blockSize = {
                w: this.canvas.width / this.cols,
                h: this.canvas.height / this.rows
            };
        }
    }, {
        key: "loop",
        value: function loop() {
            var now = Date.now();
            if (now - this.prevTick > this.tickSize) {
                this.moveBlock(1, 0);
                this.prevTick = now;

                if (!this.isMovable()) {
                    this.addBlockToBoard();
                    this.makeNewBlock(0, this.cols / 2);
                }
            }

            this.render();
            this.requestId = requestAnimationFrame(this.loop.bind(this));
        }
    }, {
        key: "makeNewBlock",
        value: function makeNewBlock(row, col) {
            // 랜덤한 블럭 하나를 선택
            var randomShape = randomProperty(SHAPE),
                _ref = [randomShape.length, randomShape[0].length],
                rows = _ref[0],
                cols = _ref[1];


            this.block = {
                shape: randomShape,
                position: { row: row, col: ~~(col - cols / 2) },
                rows: rows, cols: cols
            };
        }
    }, {
        key: "moveBlock",
        value: function moveBlock(row, col) {
            this.block.position.row += row;
            this.block.position.col += col;
        }
    }, {
        key: "isMovable",
        value: function isMovable() {
            var block = this.block;
            for (var c = 0; c < block.cols; c++) {
                console.log(111, block.rows - 1, block.shape[1][c]);
                // 각 열의 맨 아래 칸을 찾는다.
                for (var r = block.rows - 1; r >= 0 && block.shape[r][c] === 0; r--) {
                    var col = block.position.col + c,
                        row = block.position.row + r;
                    console.log(c, r, col, row);
                    if (row >= this.rows - 1 || // 바닥에 닿음
                    this.board[row + 1][col] > 0) {
                        // 한칸 아래 다른 블록
                        console.log("닿았음");
                        return false;
                    }
                }
            }
            return true;
        }
    }, {
        key: "addBlockToBoard",
        value: function addBlockToBoard() {
            for (var row = 0; row < this.block.rows; row++) {
                for (var col = 0; col < this.block.cols; col++) {
                    if (this.block.shape[row][col] > 0) {
                        this.board[this.block.position.row + row][this.block.position.col + col] = this.block.shape[row][col];
                    }
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            var blockSize = this.blockSize,
                color = void 0;

            // 배경색을 검정색으로 채워서 이전의 화면을 지운다.
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // board 배열을 순회하면서 값이 0보다 크면 붉은색 사각형으로 채운다.
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.board.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        row = _step$value[0],
                        rowArray = _step$value[1];

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = rowArray.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _step3$value = _slicedToArray(_step3.value, 2),
                                col = _step3$value[0],
                                cell = _step3$value[1];

                            if (cell > 0) {
                                this.context.fillStyle = "red";
                                this.context.fillRect(col * blockSize.w, row * blockSize.h, blockSize.w, blockSize.h);
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }

                // 1. 블록 렌더링
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.block.shape.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        row = _step2$value[0],
                        rowArray = _step2$value[1];

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = rowArray.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _step4$value = _slicedToArray(_step4.value, 2),
                                col = _step4$value[0],
                                cell = _step4$value[1];

                            if (cell > 0) {
                                this.context.fillStyle = "red";
                                this.context.fillRect((this.block.position.col + col) * blockSize.w, (this.block.position.row + row) * blockSize.h, blockSize.w, blockSize.h);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Tetris;
}();
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
'use strict';

var game = new Tetris({
    canvas: document.getElementById('tetris-board')
});