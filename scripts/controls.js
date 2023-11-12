import * as fish from './fish.js';

var World = Matter.World;

let followFish = null;
let newFish = null;
let engine;
let dropping = false;

export function initializeControls(engineInstance) {
    engine = engineInstance;
}

export function addNewFish(x, y, engine) {
    newFish = new fish.Fish('fish', 'assets/circle.png', 20, engine, { x: x, y: y }, { density: 0.001, frictionAir: 0.01, restitution: 0.5, friction: 0.1, originalSize: 250 });
    World.add(engine.world, newFish.getBody());
    Matter.Body.setStatic(newFish.getBody(), true);
    dropping = false;
    followFish = newFish;
    return newFish;
}

export function updatePosition(event, engine) {
    if (followFish) {
        followFish.setPosition(event.clientX, event.clientY);
    }
}

export function moveFish(direction) {
    if (followFish && !dropping) {
        const currentX = followFish.getBody().position.x;
        const newX = direction === 'left' ? currentX - 10 : currentX + 10;
        Matter.Body.setPosition(followFish.getBody(), { x: newX, y: followFish.getBody().position.y });
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
    else if (keyCode === 40) {
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
