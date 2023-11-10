import { createUnderwaterEngine } from './physics.js';
import { initializeFollowingFish } from './controls.js';

var Engine = Matter.Engine,
    Render = Matter.Render;

// create your engine
const engine = createUnderwaterEngine();

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Engine.run(engine);
Render.run(render);

initializeFollowingFish();

export {engine};