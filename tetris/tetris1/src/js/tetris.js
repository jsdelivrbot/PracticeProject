const SHAPE = {
    I:[[1, 1, 1, 1]],
    J:[[1, 1, 1], [0, 0, 1]],
    L:[[1, 1, 1], [1, 0, 0]],
    O:[[1, 1], [1, 1]],
    S:[[0, 1, 1], [1, 1, 0]],
    T:[[1, 1, 1], [0, 1, 0]],
    Z:[[1, 1, 0], [0, 1, 1]]
}

const randomProperty = obj => {
    let keys = Object.keys(obj),
        randomKeyIndex = Math.floor(keys.length * Math.random());
    return obj[keys[randomKeyIndex]];
}

class Tetris {
    constructor(options) {
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

    init() {
        this.addKeyControl();
        requestAnimationFrame(this.loop.bind(this));
        
        // board 배열을 정해진 rows * cols 에 맞도록 추기화 하고 그 값으 0으로 채워넣는다.
        let rowsArray = Array(this.rows).fill();
        this.board = rowsArray.map(_=> Array(this.cols).fill(0));

        this.makeNewBlock(0,this.cols/2);

        this.blockSize = {
            w: this.canvas.width / this.cols,
            h: this.canvas.height / this.rows
        }
    }
 
    loop() {
        let now = Date.now();
        if(now - this.prevTick > this.tickSize) {
            this.moveBlock(1,0);
            this.prevTick = now;

            if(!this.isMovable({row: 1, col: 0})) {
                this.addBlockToBoard();
                this.makeNewBlock(0, this.cols/2);
            }
        }
        this.removeCompleteRow();
        this.render();
        this.requestId = requestAnimationFrame(this.loop.bind(this));
    }

    makeNewBlock(row, col) {
        // 랜덤한 블럭 하나를 선택
        let randomShape = randomProperty(SHAPE),
            [rows, cols] = [randomShape.length, randomShape[0].length];
            
        this.block = {
            shape: randomShape,
            position: {row, col:~~(col - cols/2)},
            rows, cols
        }
    }

    moveBlock(row, col) {
        if(!this.isMovable({row, col})) {
            return;
        }
        this.block.position.row += row;
        this.block.position.col += col;
    }

    isMovable(offset) {
        let block = this.block,
            newBlockPosition = {
                row: block.position.row + offset.row,
                col: block.position.col + offset.col 
            };
        let row, col, isOverlap, isOutOfBoundary;
        
        // 1. 각 열의 가장 아래 칸만 확인하던 로직을 수정하여 블록의 모든 칸을 확인한다.
        for(let row = 0; row < block.rows; row++) {
            for(let col = 0; col < block.cols; col++) {
                // 2. 화면에 벗어나는지 확인
                isOutOfBoundary = !this.blockIsWithinBoundary(offset);
                // 3. 다른 블록과 겹치는지 확인
                isOverlap = !isOutOfBoundary 
                            && block.shape[row][col] > 0 
                            && this.board[newBlockPosition.row + row][newBlockPosition.col + col] > 0;
                
                // 2 또는 3 둘 중 하나라도 해당하면 false를 반환
                if(isOutOfBoundary || isOverlap) {
                    return false;
                }

            }
        }
        return true;
    }

    blockIsWithinBoundary(offset) {
        let thisBlock = this.block;
        let tempPosition = {
            row: thisBlock.position.row + offset.row,
            col: thisBlock.position.col + offset.col
        };

        return tempPosition.row >= 0
               && tempPosition.col >= 0
               && tempPosition.row + thisBlock.rows <= this.rows
               && tempPosition.col + thisBlock.cols <= this.cols;
    }

    addBlockToBoard() {
        for(let row = 0; row < this.block.rows; row++ ) {
            for(let col = 0; col < this.block.cols; col++) {
                if(this.block.shape[row][col] > 0) {
                    this.board[this.block.position.row + row][this.block.position.col+col] = this.block.shape[row][col];
                }
            }
        }
    }

    addKeyControl() {
        document.body.addEventListener('keydown', e => {
            const bPosition = this.block.position, 
                  rightEnd = this.cols - this.block.cols;

            switch(e.keyCode) {
                case 37: // left
                    e.preventDefault();
                    this.moveBlock(0,-1);
                    break;
                case 38: // up
                    e.preventDefault();
                    this.rotateBlock();
                    break;
                case 39: // right
                    e.preventDefault();
                    this.moveBlock(0,1);
                    break;
                case 40: // down
                    e.preventDefault();
                    this.moveBlock(1,0);
                    break;
                default: break;
            }
        });
    }

    rotateBlock() {
        let newShape = [],
            oldCols = this.block.cols,
            oldRows = this.block.rows,
            oldShape = this.block.shape;

        // 회전 후에는 원래의 가로 * 세로 사이즈가 뒤바뀌기 때문에 새로운 사이즈의 shape 배열을 생성
        for(let row = 0; row < oldCols; row++) {
            newShape.push([]);
        }

        for(let row = 0; row < oldCols; row++) {
            for( let col = 0; col < oldRows; col++) {
                // 회전 로직은 새 배열의 row, col 좌표에 원래 배열의 col역순, row 값을 넣는다.
                newShape[row][col] = this.block.shape[oldRows -1 -col][row];
            }
        }

        // 새 shape 배열과 행 수, 열 수를 블록에 저장
        this.block.shape = newShape;
        this.block.rows = oldCols;
        this.block.cols = oldRows;

        // 만약 회전시킨 블록이 화면 밖으로 벗어나거나 다른 블록과 겹치면 원래대로 되돌림
        if(!this.isMovable({row:0, col:0})) {
            this.block.shape = oldShape;
            this.block.rows = oldRows;
            this.block.cols = oldCols;
        }
    }

    removeCompleteRow() {
        for(let row = 0; row < this.rows; row++) {
            // [].every메소드를 이용해 행의 모든값이 1이상인지 체크
            if(this.board[row].every(v => v > 0)) {
                // 해당하는 행을 삭제
                this.board.splice(row, 1);
                // 제일 위에 한줄 추가
                this.board.splice(0, 0, Array(this.cols).fill(0));
            }
        }
    }

    render() {
        let blockSize = this.blockSize,
            color;

        // 배경색을 검정색으로 채워서 이전의 화면을 지운다.
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // board 배열을 순회하면서 값이 0보다 크면 붉은색 사각형으로 채운다.
        for(let [row, rowArray] of this.board.entries()) {
            for(let [col, cell] of rowArray.entries()) {
                if(cell > 0) {
                    this.context.fillStyle = "red";
                    this.context.fillRect(
                        col * blockSize.w, row * blockSize.h, 
                        blockSize.w, blockSize.h
                    );
                }
            }
        }

        // 1. 블록 렌더링
        for(let [row, rowArray] of this.block.shape.entries()) {
            for(let [col, cell] of rowArray.entries()) {
                if(cell > 0) {
                    this.context.fillStyle = "red";
                    this.context.fillRect(
                        (this.block.position.col + col) * blockSize.w,
                        (this.block.position.row + row) * blockSize.h,
                        blockSize.w,
                        blockSize.h
                    )
                }
            }
        }

    }
} 
