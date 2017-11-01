// Player
class Player {
    constructor({height, width, color, jumpHeight, jumpPerFrame, isJump}) {
        this.height =  height;
        this.width = width;
        this.position = {x:0,y:0};
        this.color = color;
        this.jumpHeight = jumpHeight;
        this.jumpPerFrame = jumpPerFrame;
        this.isJump = isJump;
    }
    jump() {
        if(this.isJump === false) return;
        const p = this.position;
        p.y += this.jumpPerFrame;
        debugger;
        switch(true) {
            case p.y <= 0 : 
                p.y = 0; this.isJump = false;

            case p.y >= this.jumpHeight : 
                this.jumpPerFrame *= -1; break;
        }
    }
    toggleJump() {
        this.isJump = !this.isJump;
    }
}

/* TestCode
const playerStyle = {
    height : 25, 
    width : 25, 
    color : '#f00', 
    jumpHeight : 10, 
    jumpPerFrame : 5, 
    isJump : false
}

const player = new Player({
    height : 25, 
    width : 25, 
    color : '#f00', 
    jumpHeight : 10, 
    jumpPerFrame : 5, 
    isJump : false
});

player.toggleJump();
player.jump();
console.log(player.isJump, player.position);

*/

// Obstacle
class Obstacle {
    constructor({height, width, color, speed, position = {x:0,y:0}}) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.speed = speed;
        this.position = position;
    }
    move() {
        const p = this.position;
        p.x -= this.speed;
    }
    crashCheck(player) {

    }
    areaCheck() {

    }
}

/* Test
const obt = new Obstacle({
    height : 100, 
    width : 100, 
    color : '#fff', 
    speed : 100, 
    position : {x:1000,y:0}
});
console.log(obt.position);

obt.move();
console.log(obt.position);
*/

// ObstacleManager
class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.obstacleStyle = {
            height : 100, 
            width : 100, 
            color : '#fff', 
            speed : 100, 
        };
    }
    get len() {return this.obstacles.length;}

    get first() {return this.obstacles[0];}

    add(one) {this.obstacles.push(new Obstacle(one));}

    removeFirst(){this.obstacles.shift();}

    move() {debugger;
        const list = this.obstacles;
        list.forEach( o=> o.move());
    }

    getOne(i){return this.obstacles[i];}

    makeRandomObstacle() {
        const temp = Object.create(this.obstacleStyle);
        temp.speed = Math.floor(Math.random()*100);
        temp.height = Math.floor(Math.random()*100);
        temp.position = {x:1000, y:0}
        this.add(temp);
    }
}

// Controller
class Controller {
    constructor(player, element) {
        this.player = new Player(player);
        this.list = new ObstacleManager();
        this.render = new Renderer(element);
        this.requestId;
    }
    run() {
        this.player.jump();
        this.list.move();
        //this.firstObstacleCheck();
        //this.crashCheck();
        this.showObt();

        this.requestId = requestAnimationFrame(this.run.bind(this));
    }
    addObstacle(style) {
        if(style) this.list.addOne(style);
        else this.list.makeRandomObstacle();
    }
    removeObstacle() {
        this.list.removeFirst();
    }
    jump() {
        this.player.toggleJump();
    }
    crashCheck() {
        this.list.first.crashCheck();
    }
    firstObstacleCheck() {
        this.list.first.areaCheck();
    }
    showObt() {
        let str = this.player.position.y
            + this.list.obstacles.reduce( (p,a) => `${p} ${a.position.x}-${a.speed}`, "");
        // this.list.obstacles.forEach(o => console.log(o.position.x, o.speed));
        console.log(str);
    }
}

// Renderer
class Renderer {
    constructor(element) {
        this.element = element;
        this.frame = document.createElement('div');
        this.button = document.createElement('button');

        
    }
    render() {

    }
}


