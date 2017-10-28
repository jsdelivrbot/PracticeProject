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
        requestAnimationFrame(this.loop.bind(this));
        // 2d 배열을 모두 0으로 초기화함
        // for(let row=0; row < this.rows; row++) {
        //     this.board.push(new Array(this.cols).fill(row%2));
        // }
        
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

            if(!this.isMovable()) {
                this.addBlockToBoard();
                this.makeNewBlock(0, this.cols/2);
            }
        }

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
        this.block.position.row += row;
        this.block.position.col += col;
    }

    isMovable() {
        let block = this.block;
        for(let c = 0; c < block.cols; c++) {
            console.log(111, block.rows-1, block.shape[1][c] );
            // 각 열의 맨 아래 칸을 찾는다.
            for(let r = block.rows-1; r >= 0 && block.shape[r][c] === 0; r--) {
                let col = block.position.col + c,
                    row = block.position.row + r;
                console.log(c, r, col, row);
                if(row >= this.rows -1 ||  // 바닥에 닿음
                    this.board[row + 1][col] > 0) { // 한칸 아래 다른 블록
                    console.log("닿았음");
                    return false;
                }
            }
        }
        return true;
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
