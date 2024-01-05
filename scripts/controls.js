"use strict";

import * as fish from "./fish.js";
import { WIDTH } from "./main.js";

var World = Matter.World;

let followFish = null;
let dropping = false;
let allowInput = true;
let playerPoints = 0;

const fishClasses = [
    fish.FishEgg,
    fish.Minnow,
    fish.Clownfish,
    fish.MoorishIdol,
    fish.Otter,
];

const fishPoints = {
    FishEgg: 1,
    Minnow: 2,
    Clownfish: 4,
    MoorishIdol: 8,
    Otter: 16,
    Turtle: 32,
    Manatee: 64,
    Dolphin: 128,
    Shark: 256,
    Orca: 512,
    Whale: 1024
};

export function initializeControls(engineInstance) {
    engine = engineInstance;
}


function initializePointsText() {
    const pointsContainer = document.createElement('div');
    pointsContainer.id = 'points-text-container';
    
    const pointsText = document.createElement('div');
    pointsText.id = 'points-text';
    pointsText.textContent = playerPoints;

    const pointsBackground = document.createElement('div');
    pointsBackground.id = 'points-background';

    pointsContainer.appendChild(pointsBackground);
    pointsContainer.appendChild(pointsText);

    const gameContainer = document.getElementById('game-container');
    gameContainer.appendChild(pointsContainer);

    return pointsText;
}

const pointsText = initializePointsText();

export function addFishToDrop(engine, position) {
    const randomFishClass =
        fishClasses[Math.floor(Math.random() * fishClasses.length)];
    const newFish = new randomFishClass(position);
    World.add(engine.world, newFish.getBody());
    Matter.Body.setStatic(newFish.getBody(), true);
    const fishBody = newFish.getBody();
    fishBody.owner = newFish;
    followFish = newFish;
    dropping = false;
    return newFish;
}


export function addMergedFish(engine, position, fishClass) {
    const newFish = new fishClass(position);
    World.add(engine.world, newFish.getBody());
    Matter.Body.setStatic(newFish.getBody(), false);

    const fishBody = newFish.getBody();
    fishBody.owner = newFish;
    
    playerPoints += fishPoints[fishClass.name];
    pointsText.textContent = playerPoints;

    return newFish;
}

export function moveFish(direction) {
    if (followFish && !dropping) {
        const currentX = followFish.getBody().position.x;
        const newX = direction === "left" ? currentX - 10 : currentX + 10;
        if (
            newX - followFish.getRadius() < 0 ||
            newX + followFish.getRadius() > WIDTH
        ) {
            // Bring the fish back within bounds
            const boundedX = Math.max(
                followFish.getRadius() + 2,
                Math.min(newX, WIDTH - followFish.getRadius() - 2)
            );
            Matter.Body.setPosition(followFish.getBody(), {
                x: boundedX,
                y: followFish.getBody().position.y,
            });
        }
        else {
            Matter.Body.setPosition(followFish.getBody(), {
                x: newX,
                y: followFish.getBody().position.y,
            });
        }
    }
}


export function handleMouseMove(event) {
    if (followFish && !dropping) {
        const mouseX = event.clientX;
        const fishX = followFish.getBody().position.x;
        const newX = Math.min(WIDTH - followFish.getRadius(), Math.max(followFish.getRadius(), mouseX));

        Matter.Body.setPosition(followFish.getBody(), { x: newX, y: followFish.getBody().position.y });
    
        if (newX - (followFish.getRadius()) < 0 || newX + (followFish.getRadius()) > WIDTH) {
            // Bring the fish back within bounds
            const boundedX = Math.max(followFish.getRadius() + 2, Math.min(newX, WIDTH - followFish.getRadius() - 2));
            Matter.Body.setPosition(followFish.getBody(), { x: boundedX, y: followFish.getBody().position.y });
        } else {
            // Fish is within bounds, move normally
            Matter.Body.setPosition(followFish.getBody(), {
                x: newX,
                y: followFish.getBody().position.y,
            });
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
        moveFish("left");
    }
    // Right arrow key
    else if (keyCode === 39) {
        moveFish("right");
    }
    // Down arrow key
    else if (keyCode === 40 || keyCode == 32) {
        dropFish(event, engine);
    }
}

export function dropFish(event, engine) {
    if (followFish && allowInput) {
        dropping = true;
        Matter.Body.setStatic(followFish.getBody(), false);

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
            followFish = addFishToDrop(engine);
        });

        // Re-enable user input after the delay
        setTimeout(() => {
            allowInput = true;
        }, delay);
    }
}
