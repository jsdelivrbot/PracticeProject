# 테트리스

책 [웹으로 시작하는 모바일게임 : HTML5](http://book.naver.com/bookdb/book_detail.nhn?bid=12344224) 을 참고로 한 테트리스 게임이다.
책 내부의 테트리스 코드 전부를 구현하지는 않았고 일부만 구현했다.



### 게임 룰
1. 7가지 모양의 블록이 있다.
2. 7가지 모양중 랜덤한 모양의 블록이 생성된다.
3. 일정한 시간간격으로 블록이 떨어진다.
4. 블록이 화면의 바닥에 닿거나, 다른 블록에 닿으면 블록이 멈추고 그 위치에 쌓인다.
5. 화면에 쌓인 블록이 한 줄을 채우면 다 채워진 줄은 없어진다.
6. 특정한 키를 누르면 블록이 회전한다.
7. 좌/우 방향키를 누르면 블록이 좌/우로 움직인다.
8. 특정키를 누르면 블록이 빠르게 내려간다.
9. 다음에 생성될 랜덤 블록을 미리 화면에 보여준다.



### 구조

```
const SHAPE  : 개별 블록의 모양을 나타낸다.

function randomProperty(obj)  : 객체내부의 랜덤한 프로퍼티를 반환한다.

class Tetris
    this.canvas     : 캔버스 엘리먼트를 저장한다.
    this.context    : 캔버스 엘리먼트에서 2d context를 가져온다.
    this.rows       : 전체 행 값
    this.cols       : 전체 열 값
    this.board      : 행과 열을 적용한 0행렬
    this.requestId  : requstAnimationFrame을 했을때 리턴 포인터를 저장
    this.blockSize  : 1단위 블록사이즈를 설정. 캔버스 전체 길이 / 행 or 열
    this.tickSize   : 블록이 내려오는 시간 길이
    this.prevTick   : 이전에 블록이 내려온 시각 저장
    
    init()                       : 초기화, 키이벤트리스너, board, 블록생성 등을 한다.
    loop()                       : 블록 내리기, 블록 생성, 랜더, 완성줄 삭제등을 반복.
    makeNewBlock(row, col)       : 랜덤한 블럭 하나를 새로 생성한다.
    moveBlock(row, col)          : 이동 가능한 범위내에서 row,col 값에 따라 이동한다.
    isMoveable(offset)           : 이동 가능한지를 확인한다.
    blockIsWithinBoundary(offset): offset 더한 이후에 범위안에 있는지 확인한다.
    addBlockToBoard()            : 블록이 쌓이게 처리한다.
    addKeyControl()              : 키보드 키이벤트를 받아서 처리한다.
    rotateBlock()                : 블록을 회전시킨다
    removeCompleteRow()          : 완성된 줄은 삭제한다.
    render()                     : 배경 렌더링과 블록 렌더링을 한다.

```



