"use strict";

import { Fish } from "./fish.js";
import * as physics from "./physics.js";
import * as controls from "./controls.js";

const Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

export let engine = physics.createUnderwaterEngine();

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
        background: "#0077BE",
        showAngleIndicator: false, 
        showCollisions: false, 
    },
});

const loseBoundary = 150;
// Attach an event listener to the renderer for drawing the line
Matter.Events.on(render, "afterRender", function () {
    const context = render.context; // Get the context from the renderer
    context.beginPath();
    context.moveTo(0, loseBoundary); // Start of the line at the left edge
    context.lineTo(render.options.width, loseBoundary); // End of the line at the right edge
    context.strokeStyle = "red"; // Set the line color
    context.lineWidth = 1; // Set the line thickness
    context.stroke(); // Draw the line
});

export const WIDTH = render.options.width;
const HEIGHT = render.options.height;

const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: "#0077BE",
        strokeStyle: "#0077BE",
        lineWidth: 10,
    },
};
const wallThickness = 10;

export const ground = Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, wallThickness, wallOptions);
export const rightWall = Bodies.rectangle(WIDTH+(wallThickness/2), HEIGHT / 2, wallThickness, HEIGHT, wallOptions);
export const leftWall = Bodies.rectangle(-wallThickness/2, HEIGHT / 2, wallThickness, HEIGHT, wallOptions);

Matter.World.add(engine.world, [
    ground, // bottom
    leftWall, // left
    rightWall, // right
]);

// Attach an event listener to draw the line

controls.addFishToDrop();

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

export function gameLoop() {
    const delta = 16; // Fixed timestep of 16 milliseconds (60 FPS)
    Runner.tick(runner, engine, delta);
    Render.world(render);

    if (isCanvasFilled()) {
        console.log("Game Over");
        controls.gameOver();
        return;
    }

    requestAnimationFrame(gameLoop);    
}

const fishTimeouts = new Map(); // Map to store timeouts for each fish

function isCanvasFilled() {
    let fishSettledAboveLine = false;
    let canvasFilledBelowLine = true;

    engine.world.bodies.forEach((body) => {
        if (body.owner instanceof Fish && !body.isStatic) {
            const fish = body.owner;
            const bottomOfFish = body.position.y + body.circleRadius;

            // Check if the fish has settled above the line
            if (
                bottomOfFish < loseBoundary &&
                Matter.Vector.magnitude(body.velocity) < 0.1 &&
                Math.abs(body.angularVelocity) < 0.1
            ) {
                if (!fishTimeouts.has(fish)) {
                    // If the fish is settled above the line for the first time, set a timeout
                    const timeout = setTimeout(() => {
                        fishSettledAboveLine = true;
                        // Remove the fish from the timeout map
                        fishTimeouts.delete(fish);
                        // Check if all fish are settled above the line
                        if ([...fishTimeouts.values()].length === 0 && canvasFilledBelowLine) {
                            console.log("Game Over");
                            controls.gameOver();
                        }
                    }, 1500);
                    fishTimeouts.set(fish, timeout);
                }
            }

            // Check if the fish is below the line and moving
            if (
                bottomOfFish >= loseBoundary &&
                (Matter.Vector.magnitude(body.velocity) > 0.25 ||
                    Math.abs(body.angularVelocity) > 0.25)
            ) {
                canvasFilledBelowLine = false;
                // If the fish goes below the line, clear its timeout
                const timeout = fishTimeouts.get(fish);
                if (timeout) {
                    clearTimeout(timeout);
                    fishTimeouts.delete(fish);
                }
            }
        }
    });

    return fishSettledAboveLine && canvasFilledBelowLine;
}

gameLoop();

function handleFishDrop(event) {
    controls.dropFish(event);
}
