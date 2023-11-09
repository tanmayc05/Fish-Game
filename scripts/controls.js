import { Fish } from './fish.js';

let dropX = 200;
const dropY = 100;


document.addEventListener('click', function(event) {
    dropFish(event.clientX, dropY);
});

document.addEventListener('keydown', function(event) {
    const step = 5;
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        dropX -= step;
    }
    else if (event.key === 'ArrowRight' || event.key === 'd') {
        dropX += step;
    }
    else if (event.key === 'ArrowDown' || event.key === 's') {
        dropFish(dropX, dropY);
    }
});



function dropFish(x, y) {
    const fish = new Fish('fish', 'images/fish.png', 20, {x: x, y: y}, {density: 0.001, frictionAir: 0.01, restitution: 0.5, friction: 0.1, originalSize: 250});
    // fish.body.force.y = 0.05;
    // fish.body.force.x = 0.05;
    fish.addToWorld(engine.world);
}