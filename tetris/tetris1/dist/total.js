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

            this.addKeyControl();
            requestAnimationFrame(this.loop.bind(this));

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

                if (!this.isMovable({ row: 1, col: 0 })) {
                    this.addBlockToBoard();
                    this.makeNewBlock(0, this.cols / 2);
                }
            }
            this.removeCompleteRow();
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
            if (!this.isMovable({ row: row, col: col })) {
                return;
            }
            this.block.position.row += row;
            this.block.position.col += col;
        }
    }, {
        key: "isMovable",
        value: function isMovable(offset) {
            var block = this.block,
                newBlockPosition = {
                row: block.position.row + offset.row,
                col: block.position.col + offset.col
            };
            var row = void 0,
                col = void 0,
                isOverlap = void 0,
                isOutOfBoundary = void 0;

            // 1. 각 열의 가장 아래 칸만 확인하던 로직을 수정하여 블록의 모든 칸을 확인한다.
            for (var _row = 0; _row < block.rows; _row++) {
                for (var _col = 0; _col < block.cols; _col++) {
                    // 2. 화면에 벗어나는지 확인
                    isOutOfBoundary = !this.blockIsWithinBoundary(offset);
                    // 3. 다른 블록과 겹치는지 확인
                    isOverlap = !isOutOfBoundary && block.shape[_row][_col] > 0 && this.board[newBlockPosition.row + _row][newBlockPosition.col + _col] > 0;

                    // 2 또는 3 둘 중 하나라도 해당하면 false를 반환
                    if (isOutOfBoundary || isOverlap) {
                        return false;
                    }
                }
            }
            return true;
        }
    }, {
        key: "blockIsWithinBoundary",
        value: function blockIsWithinBoundary(offset) {
            var thisBlock = this.block;
            var tempPosition = {
                row: thisBlock.position.row + offset.row,
                col: thisBlock.position.col + offset.col
            };

            return tempPosition.row >= 0 && tempPosition.col >= 0 && tempPosition.row + thisBlock.rows <= this.rows && tempPosition.col + thisBlock.cols <= this.cols;
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
        key: "addKeyControl",
        value: function addKeyControl() {
            var _this2 = this;

            document.body.addEventListener('keydown', function (e) {
                var bPosition = _this2.block.position,
                    rightEnd = _this2.cols - _this2.block.cols;

                switch (e.keyCode) {
                    case 37:
                        // left
                        e.preventDefault();
                        _this2.moveBlock(0, -1);
                        break;
                    case 38:
                        // up
                        e.preventDefault();
                        _this2.rotateBlock();
                        break;
                    case 39:
                        // right
                        e.preventDefault();
                        _this2.moveBlock(0, 1);
                        break;
                    case 40:
                        // down
                        e.preventDefault();
                        _this2.moveBlock(1, 0);
                        break;
                    default:
                        break;
                }
            });
        }
    }, {
        key: "rotateBlock",
        value: function rotateBlock() {
            var newShape = [],
                oldCols = this.block.cols,
                oldRows = this.block.rows,
                oldShape = this.block.shape;

            // 회전 후에는 원래의 가로 * 세로 사이즈가 뒤바뀌기 때문에 새로운 사이즈의 shape 배열을 생성
            for (var row = 0; row < oldCols; row++) {
                newShape.push([]);
            }

            for (var _row2 = 0; _row2 < oldCols; _row2++) {
                for (var col = 0; col < oldRows; col++) {
                    // 회전 로직은 새 배열의 row, col 좌표에 원래 배열의 col역순, row 값을 넣는다.
                    newShape[_row2][col] = this.block.shape[oldRows - 1 - col][_row2];
                }
            }

            // 새 shape 배열과 행 수, 열 수를 블록에 저장
            this.block.shape = newShape;
            this.block.rows = oldCols;
            this.block.cols = oldRows;

            // 만약 회전시킨 블록이 화면 밖으로 벗어나거나 다른 블록과 겹치면 원래대로 되돌림
            if (!this.isMovable({ row: 0, col: 0 })) {
                this.block.shape = oldShape;
                this.block.rows = oldRows;
                this.block.cols = oldCols;
            }
        }
    }, {
        key: "removeCompleteRow",
        value: function removeCompleteRow() {
            for (var row = 0; row < this.rows; row++) {
                // [].every메소드를 이용해 행의 모든값이 1이상인지 체크
                if (this.board[row].every(function (v) {
                    return v > 0;
                })) {
                    // 해당하는 행을 삭제
                    this.board.splice(row, 1);
                    // 제일 위에 한줄 추가
                    this.board.splice(0, 0, Array(this.cols).fill(0));
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