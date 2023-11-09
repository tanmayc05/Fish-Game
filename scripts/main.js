import { Engine, Render, World, Bodies} from 'matter-js';
import { Fish } from './fish.js';
import './controls.js';
import './physics.js';
import { initializeFollowingFish } from './controls.js';

// create your engine
const engine = createUnderwaterEngine();

//const engine = Engine.create();
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