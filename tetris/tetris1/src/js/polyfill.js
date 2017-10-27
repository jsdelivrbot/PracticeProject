// requestAnimationFrame 폴리필
const requestAnimationFrame = (()=>{
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        (callback => window.setTimeout(callback, 1000/60));
})();

const cancelAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        clearTimeout;
})();
