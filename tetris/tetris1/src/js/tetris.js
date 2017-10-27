class Tetris {
    constructor(options) {
        this.canvas = options.canvas;
        this.context = this.canvas.getContext("2d");

        this.rows = 20; // 행
        this.cols = 10; // 열
        this.board = [];
        this.requestId = 0;

        this.init();
    }

    init() {
        requestAnimationFrame(this.loop.bind(this));
        // 2d 배열을 모두 0으로 초기화함
        let rowsArray = Array(this.rows).fill();
        this.board = rowsArray.map(_=>Array(this.cols).fill(0));
    }

    loop() {
        console.log("we are in the loop!");
        this.requestId = requestAnimationFrame(this.loop.bind(this));
    }
}