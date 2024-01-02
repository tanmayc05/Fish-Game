import * as fish from './fish.js';

var World = Matter.World;

let followFish = null;
let newFish = null;
let engine;
let dropping = false;
let collision = false;
let allowInput = true;

let radii = [20, 30, 40, 50, 60];

export function initializeControls(engineInstance) {
    engine = engineInstance;
}

export function addNewFish(x, y, engine) {
    const chosenRadius = radii[Math.floor(Math.random() * radii.length)];
    newFish = new fish.Fish('fish', 'assets/circle.png', chosenRadius, engine);
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

        if (newX - (followFish.getRadius()) < 0 || newX + (followFish.getRadius()) > 800) {
            // Fish is out of bounds
            collision = true;

            // Bring the fish back within bounds
            const boundedX = Math.max(followFish.getRadius() + 2, Math.min(newX, 800 - followFish.getRadius() - 2));
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
    if (!allowInput) {
        return;
    }
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
    if (newFish && allowInput) {
        dropping = true;
        Matter.Body.setStatic(newFish.getBody(), false);

        // Disable user input during the delay
        allowInput = false;

        const delay = 500;

        // Use a Promise to ensure proper sequencing
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, delay);
        });

        promise.then(() => {
            followFish = addNewFish(event.clientX, event.clientY, engine);
        });

        // Re-enable user input after the delay
        setTimeout(() => {
            allowInput = true;
        }, delay);
    }
}
