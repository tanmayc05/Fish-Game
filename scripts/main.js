import { Fish } from './fish.js';
import * as physics from './physics.js';
import * as controls from './controls.js';

const Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

const engine = physics.createUnderwaterEngine();

document.addEventListener('click', handleFishDrop);
document.addEventListener('keydown', controls.handleKeyPress);
document.addEventListener('DOMContentLoaded', function () {
    Matter.Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            const bodyA = pair.bodyA;
            const bodyB = pair.bodyB;

            // Check if bodies are instances of Fish (so it doesn't detect collision with walls or ground)
            // also check if the fish is NOT a whale
            if (bodyA.owner instanceof Fish && bodyB.owner instanceof Fish && bodyA.owner.getName() !== 'Whale' && bodyB.owner.getName() !== 'Whale') {
                const fishA = bodyA.owner;
                const fishB = bodyB.owner;

                console.log(fishA.getName() + ' collided with ' + fishB.getName());

                // Check if fish can merge
                if (fishA.getName() === fishB.getName()) {
                    // Merge the fish
                    const mergedFish = (fishA.getNext());
                    Matter.World.remove(engine.world, [bodyA, bodyB]);
                    //use addNewFish to add the new fish to the world
                    //make the new fish's position in the middle of the two fish that merged
                    const position = {x: (bodyA.position.x + bodyB.position.x) / 2, y: (bodyA.position.y + bodyB.position.y) / 2};
                    controls.addMergedFish(engine, position, mergedFish.constructor);
                }
            }
        }
    });
});

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 500,
        height: 600,
        wireframes: false,
        background: '#0077BE'
    }
});

export const WIDTH = render.options.width;
const HEIGHT = render.options.height;


const wallOptions = { 
    isStatic: true,
    render: {
        fillStyle: '#0077BE',
        strokeStyle: '#0077BE',
        lineWidth: 10
    }
};
const wallThickness = 10;

Matter.World.add(engine.world, [
    Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, wallThickness, wallOptions), // bottom
    Bodies.rectangle(0, HEIGHT/2, wallThickness, HEIGHT, wallOptions), // left
    Bodies.rectangle(WIDTH, HEIGHT/2, wallThickness, HEIGHT, wallOptions) // right
]);

controls.addFishToDrop(engine);

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

function gameLoop() {
    Runner.tick(runner, engine);
    Render.world(render);

    requestAnimationFrame(gameLoop);
}

gameLoop();

controls.initializeControls(engine);

function handleFishDrop(event) {
    controls.dropFish(event, engine);
}
