import * as Matter from '../matter-js-0.19.0/build/matter.min.js';
import './fish.js';
import {engine} from './main.js';


let followFish = null; // if following mouse (yes/no)
let fishInWorld = false;

// create first fish
export function initializeFollowingFish() {
    followFish = new Fish('fish', 'images/fish.png', 20, engine, {x: 380, y: 100}, {density: 0.001, frictionAir: 0.01, restitution: 0.5, friction: 0.1, originalSize: 250});
}

// update fish position to follow mouse
function updatePosition(event){
    if (followFish & !fishInWorld) {
        followFish.setPosition(event.clientX, event.clientY);
    }
}
// drop fish into world by click
function dropFish(event) {
    if (followFish && !fishInWorld) {
        Matter.World.add(engine.world, followFish.getBody());
        fishInWorld = true;
    }
}

// add event listeners for mouse movement and click
document.addEventListener('mousemove', updatePosition);
document.addEventListener('click', dropFish);

export{dropFish};

// document.addEventListener('click', function(event) {
//     dropFish(event.clientX, dropY);
// });

// document.addEventListener('keydown', function(event) {
//     const step = 5;
//     if (event.key === 'ArrowLeft' || event.key === 'a') {
//         dropX -= step;
//     }
//     else if (event.key === 'ArrowRight' || event.key === 'd') {
//         dropX += step;
//     }
//     else if (event.key === 'ArrowDown' || event.key === 's') {
//         dropFish(dropX, dropY);
//     }
// });