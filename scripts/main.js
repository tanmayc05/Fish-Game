"use strict";

import { Fish } from "./fish.js";
import * as physics from "./physics.js";
import * as controls from "./controls.js";
import { isCanvasFilled, fishSettledTimes } from "./helpers.js";

const Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

export let engine = physics.createEngine();

document.addEventListener('click', handleFishDrop);
document.addEventListener('keydown', (event) => controls.handleKeyPress(event));
document.addEventListener('mousemove', controls.handleMouseMove);
document.addEventListener('DOMContentLoaded', function () {
    Matter.Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            const bodyA = pair.bodyA;
            const bodyB = pair.bodyB;

            // Check if bodies are instances of Fish (so it doesn't detect collision with walls or ground)
            // also check if the fish is NOT a whale
            if (
                bodyA.owner instanceof Fish &&
                bodyB.owner instanceof Fish &&
                bodyA.owner.getName() !== "Whale" &&
                bodyB.owner.getName() !== "Whale"
            ) {
                const fishA = bodyA.owner;
                const fishB = bodyB.owner;
              
                // Check if fish are the same
                if (fishA.getName() === fishB.getName()) {
                    // Merge the fish
                    const mergedFish = fishA.getNext();
                    Matter.World.remove(engine.world, [bodyA, bodyB]);
                    //use addNewFish to add the new fish to the world
                    //make the new fish's position in the middle of the two fish that merged
                    const position = {
                        x: (bodyA.position.x + bodyB.position.x) / 2,
                        y: (bodyA.position.y + bodyB.position.y) / 2,
                    };
                    controls.addMergedFish(
                        position,
                        mergedFish.constructor
                    );
                }
            }
        }
    });
});

const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
document.body.appendChild(gameContainer);

const render = Render.create({
    element: gameContainer,
    engine: engine,
    options: {
        width: 350,
        height: 500,
        wireframes: false,
        showAngleIndicator: false, 
        showCollisions: false, 
    },
});

const loseBoundary = 450;
const lineBoundary = loseBoundary + 75;
let lineDrawn = false;
// Attach an event listener to the renderer for drawing the line
Matter.Events.on(render, "afterRender", function () {
    if (lineDrawn) {
        const context = render.context;
        context.beginPath();
        context.moveTo(0, loseBoundary);
        context.lineTo(render.options.width, loseBoundary);
        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.stroke();
    }
});


export const WIDTH = render.options.width;
const HEIGHT = render.options.height;

const groundOptions = {
    isStatic: true,
    render: {
        lineWidth: 10,
    },
};
const wallOptions = {
    isStatic: true,
    render: {
        strokeStyle: "#0077BE",
        fillStyle: "#0077BE",
        lineWidth: 10,
        }
};
const wallThickness = 10;

export const ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, wallThickness, groundOptions);
export const rightWall = Bodies.rectangle(WIDTH+(wallThickness/2), HEIGHT / 2, wallThickness, HEIGHT, wallOptions);
export const leftWall = Bodies.rectangle(-wallThickness/2, HEIGHT / 2, wallThickness, HEIGHT, wallOptions);
export var background = Bodies.rectangle(WIDTH/2, HEIGHT/2, 1, 1, {
    isStatic: true,
    isSensor: true,
    render: {
        sprite: {
            texture: "assets/other/oceanBackground.png",
            xScale: 0.75,
            yScale: 0.75,
        },
    }
    
});

Matter.World.add(engine.world, [
    ground, // bottom
    leftWall, // left
    rightWall, // right
    background
]);

// Attach an event listener to draw the line

controls.addFishToDrop();

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

let drawLineSettled = false;

export function gameLoop() {
    const delta = 16; // Fixed timestep of 16 milliseconds (60 FPS)
    Runner.tick(runner, engine, delta);
    Render.world(render);

    const result = isCanvasFilled(engine, loseBoundary, lineBoundary, drawLineSettled);

    if (result.isGameOver) {
        controls.gameOver();
        drawLineSettled = false;
        lineDrawn = false;
        fishSettledTimes.clear();
        return;
    }

    if (result.shouldDrawLine) {
        drawLoseBoundaryLine(); // Draw the line
    }
    requestAnimationFrame(gameLoop);    
}

function drawLoseBoundaryLine() {
    lineDrawn = true;
}

gameLoop();

function handleFishDrop(event) {
    controls.dropFish(event);
}
