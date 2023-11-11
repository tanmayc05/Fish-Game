import * as fish from './fish.js';
import { createUnderwaterEngine } from './physics.js';

var World = Matter.World;

let followFish = null; // if following mouse (yes/no)
let fishInWorld = false;

// create first fish
export function initializeFollowingFish() {
    const engine = createUnderwaterEngine();
    followFish = new fish.Fish('fish', 'assets/circle.png', 20, engine, {x: 380, y: 100}, {density: 0.001, frictionAir: 0.01, restitution: 0.5, friction: 0.1, originalSize: 250});
}

// update fish position to follow mouse
export function updatePosition(event){
    if (followFish & !fishInWorld) {
        followFish.setPosition(event.clientX, event.clientY);
    }
}
// drop fish into world by click
export function dropFish(event) {
    if (followFish && !fishInWorld) {
        World.add(engine.world, followFish.getBody());
        fishInWorld = true;
    }
}

// add event listeners for mouse movement and click
document.addEventListener('mousemove', updatePosition);
document.addEventListener('click', dropFish);

// export{dropFish};
// export{updatePosition};
// export{fishInWorld};
// export{followFish};
