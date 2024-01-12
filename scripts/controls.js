"use strict";

import * as fish from "./fish.js";
import { WIDTH, engine} from "./main.js";
import {defaultStartingPositionY} from "./fish.js";
import {ground, rightWall, leftWall, gameLoop, background}from "./main.js";

const gameOverScreen = document.getElementById('game-over-screen');
const restartButton = document.getElementById('restart-button');

var World = Matter.World;

let followFish = null;
let dropping = false;
let allowInput = true;
let playerPoints = 0;
let isGameOver = false;

const fishClasses = [
    fish.FishEgg,
    fish.Minnow,
    fish.Clownfish,
    fish.MoorishIdol,
    fish.Otter,
];

const fishPoints = {
    FishEgg: 1,
    Minnow: 3,
    Clownfish: 6,
    MoorishIdol: 10,
    Otter: 15,
    Turtle: 21,
    Manatee: 28,
    Dolphin: 36,
    Shark: 45,
    Orca: 55
};

function initializePointsText() {
    const pointsContainer = document.createElement('div');
    pointsContainer.id = 'points-text-container';
    
    const pointsText = document.createElement('div');
    pointsText.id = 'points-text';
    pointsText.textContent = playerPoints;
    pointsText.style.fontFamily = "'Amaranth', sans-serif";

    const pointsBackground = document.createElement('div');
    pointsBackground.id = 'points-background';

    pointsContainer.appendChild(pointsBackground);
    pointsContainer.appendChild(pointsText);

    const gameContainer = document.getElementById('game-container');
    gameContainer.appendChild(pointsContainer);

    return pointsText;
}

const pointsText = initializePointsText();

export function zoomIn(body) {
    const zoomFactor = 1.1;
    let currentScale = body.render.sprite.xScale;
    const zoomInterval = setInterval(() => {
        if (currentScale < 1) {
            Matter.Body.scale(body, zoomFactor, zoomFactor);
            currentScale *= zoomFactor;
        } else {
            clearInterval(zoomInterval);
        }
    }, 2);
}

export function addFishToDrop(event, position) {
    const randomFishClass = fishClasses[Math.floor(Math.random() * fishClasses.length)];
    const newFish = new randomFishClass(position);
    if (event){
        const mouseX = event.clientX;
        Matter.Body.setPosition(newFish.getBody(), { x: mouseX, y: defaultStartingPositionY});
    }
    Matter.Body.scale(newFish.getBody(), 0.1, 0.1);
    World.add(engine.world, newFish.getBody());

    zoomIn(newFish.getBody(), 1);
    
    Matter.Body.setStatic(newFish.getBody(), true);
    const fishBody = newFish.getBody();
    fishBody.owner = newFish;
    followFish = newFish;
    dropping = false;
    isGameOver = false;
    return newFish;
}


export function addMergedFish(position, fishClass) {
    const newFish = new fishClass(position);
    Matter.Body.scale(newFish.getBody(), 0.1, 0.1);
    World.add(engine.world, newFish.getBody());

    zoomIn(newFish.getBody(), 1);

    Matter.Body.setStatic(newFish.getBody(), false);

    allowInput = true;

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
                followFish.getRadius(),
                Math.min(newX, WIDTH - followFish.getRadius())
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
    if (followFish && !dropping && !isGameOver) {
        const mouseX = event.clientX;
        const fishX = followFish.getBody().position.x;
        const newX = Math.min(WIDTH - followFish.getRadius(), Math.max(followFish.getRadius(), mouseX));

        Matter.Body.setPosition(followFish.getBody(), { x: newX, y: followFish.getBody().position.y });
    
        if (newX - (followFish.getRadius()) < 0 || newX + (followFish.getRadius()) > WIDTH) {
            // Bring the fish back within bounds
            const boundedX = Math.max(followFish.getRadius(), Math.min(newX, WIDTH - followFish.getRadius()));
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
    if (allowInput && !isGameOver) {
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
            dropFish();
        }
    }
}


export function dropFish(event) {
    if (followFish && allowInput && !isGameOver) {
        //console.log("dropFish");
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
            followFish = addFishToDrop(event);
        });

        // Re-enable user input after the delay
        setTimeout(() => {
            allowInput = true;
        }, delay);
    }
}

export function gameOver() {
    isGameOver = true;
    //remove ground
    Matter.World.remove(engine.world, ground);
    gameOverScreen.style.display = "block";
}

export function resetGame() {
    // Remove the existing event listener from the restart button
    restartButton.removeEventListener("click", restartButtonClickHandler);

    Matter.World.clear(engine.world);

    Matter.World.add(engine.world, [
        ground, // bottom
        leftWall, // left
        rightWall, // right
        background
        
    ]);
    addFishToDrop();
    
    // Reset player points
    playerPoints = 0;
    pointsText.textContent = playerPoints;

    // Hide the game over screen
    gameOverScreen.style.display = "none";

    // Add the event listener to the restart button
    restartButton.addEventListener("click", restartButtonClickHandler);

    // Start the game loop again
    requestAnimationFrame(gameLoop);
}

function restartButtonClickHandler(event) {
    event.stopPropagation(); // Prevents the event from propagating further
    resetGame();
}

// Add the initial event listener to the restart button
restartButton.addEventListener("click", restartButtonClickHandler);