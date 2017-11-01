
// Lagacy Code
const frame = document.createElement('div');
const button = document.createElement('button');
let player, obts;
let loop;

const FRAME_WIDTH = 500,
      FRAME_HEIGHT = 400;

const OBT_HEIGHT = 100,
    OBT_WIDTH = 25, // obt
    OBT_TERM = 60, // bot manager
    OBT_SPEED = 5; // obt

const PLAYER_WIDTH = 25,
    PLAYER_HEIGHT = 25,
    PLAYER_COLOR = '#f00';

const JUMP_HEIGHT = 150;
const JUMP_PER_INIT = 5;
let jumpFlag = false,
    jumpPerFrame = JUMP_PER_INIT;

const runObts = () => {
    [].forEach.call(obts, one => {
        const left = parseInt(one.style.left);
        left < -OBT_WIDTH ? frame.removeChild(one) : (one.style.left = left - OBT_SPEED + "px")
    });
};

const makeObtElement = () => {
    const obt = document.createElement('div');
    obt.className = 'obstacle';
    obt.style.cssText = `
            width:${OBT_WIDTH}px; height:${~~(Math.random() * OBT_HEIGHT) + 1}px;
            background-color:black; position:absolute; left:${FRAME_WIDTH}px; bottom:0px;`;

    return obt;
}

const makeObt = () => frame.appendChild(makeObtElement());

const jumpUp = () => { jumpFlag = true; }

const jumpFlagCheck = () => {
    let bottom = parseInt(player.style.bottom);
    bottom += jumpPerFrame;
    player.style.bottom = bottom + "px";

    (bottom > JUMP_HEIGHT || bottom <= 0) && (jumpPerFrame *= -1);
    (bottom <= 0) && (jumpFlag = false);
}

const toggleRun = () => {
    loop ? (cancelAnimationFrame(loop), loop = null) : run();
}

let cnt = 0;
const run = () => {
    cnt = 0;
    const gogo = () => {
        if (obtCheck()) { cnt = 0; return; }
        runObts();
        jumpFlag && jumpFlagCheck();
        (cnt++ % OBT_TERM === 0) && (makeObt(), cnt = 1);
        loop = requestAnimationFrame(gogo);
    }
    gogo();
}

const obtCheck = () => {
    if (!obts[0]) return;

    const obt0 = obts[0].style,
        p = player.style;

    const [oLeft, oHeight, oWidth] = [parseInt(obt0.left), parseInt(obt0.height), parseInt(obt0.width)];
    const [pWidth, pBottom] = [parseInt(p.width), parseInt(p.bottom)];

    if (oLeft <= pWidth && oHeight >= pBottom && oLeft > -oWidth) {
        let a;
        if (confirm("game over 다시 하시겠습니까?")) { init(); }
        else { cancelAnimationFrame(loop), loop = null; console.log("스탑!", a); return "stop" }
    }
}

const init = () => {
    obts = document.getElementsByClassName("obstacle");


    frame.innerHTML = "";
    frame.style.cssText = `
            width:${FRAME_WIDTH}px; height:${FRAME_HEIGHT}px; border:1px solid black; position:relative; overflow:hidden`;

    player = document.createElement('div');
    player.style.cssText = `
            width:${PLAYER_WIDTH}px; height:${PLAYER_HEIGHT}px; background-color:${PLAYER_COLOR};
            position:absolute; bottom:0; left:0; z-index:1000`;

    jumpFlag = false;
    jumpPerFrame = JUMP_PER_INIT;

    if (!button.innerText) {
        button.style.cssText = `width:100px; height:30px; margin-top:10px; background-color:#eee;`;
        button.innerText = "시작/멈춤";
        button.onclick = () => { console.log("버튼으로 중지!"); toggleRun(); };

        document.addEventListener('keydown', e => e.keyCode == 38 && jumpUp());
    }

    frame.appendChild(player);
    document.body.appendChild(frame);
    document.body.appendChild(button);

}