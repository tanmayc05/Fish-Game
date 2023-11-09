import * as Matter from '../matter-js-0.19.0/build/matter.min.js';
import { createUnderwaterEngine } from './physics.js';
import { initializeFollowingFish } from './controls.js';

const { Engine, Render } = Matter;

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