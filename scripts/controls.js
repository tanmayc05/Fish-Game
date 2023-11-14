import * as fish from './fish.js';

var World = Matter.World;

let followFish = null;
let newFish = null;
let engine;
let dropping = false;
let collision = false;

export function initializeControls(engineInstance) {
    engine = engineInstance;
}

export function addNewFish(x, y, engine) {
    newFish = new fish.Fish('fish', 'assets/circle.png', 20, engine, { x: x, y: y }, {density: 0.1,mass: 10, frictionAir: 0.01, restitution: 0, friction: 0.01, originalSize: 250 });
    World.add(engine.world, newFish.getBody());
    Matter.Body.setStatic(newFish.getBody(), true);
    dropping = false;
    followFish = newFish;
    return newFish;
}

export function moveFish(direction) {
    if (followFish && !dropping) {
        const currentX = followFish.getBody().position.x;
        const newX = direction === 'left' ? currentX - 10 : currentX + 10;

        if (newX - followFish.getRadius() < 0 || newX + followFish.getRadius() > 800) {
            // Fish is out of bounds
            collision = true;

            // Bring the fish back within bounds
            const boundedX = Math.max(0, Math.min(newX, 800));
            Matter.Body.setPosition(followFish.getBody(), { x: boundedX, y: followFish.getBody().position.y });

            // Reset the collision flag once the fish is back within bounds
            collision = false;
        } else {
            // Fish is within bounds, move normally
            Matter.Body.setPosition(followFish.getBody(), { x: newX, y: followFish.getBody().position.y });
        }
    }
}


export function handleKeyPress(event) {
    const keyCode = event.keyCode;
    
    // Left arrow key
    if (keyCode === 37) {
        moveFish('left');
    }
    // Right arrow key
    else if (keyCode === 39) {
        moveFish('right');
    }
    // Down arrow key
    else if (keyCode === 40 || keyCode == 32) {
        dropFish(event, engine);
    }
}

export function dropFish(event, engine) {
    if (newFish) {
        dropping = true;
        Matter.Body.setStatic(newFish.getBody(), false);
    }
    const delay = 800;
    setTimeout(() => {
        followFish = addNewFish(event.clientX, event.clientY, engine);
    }, delay);
}
