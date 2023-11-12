import * as physics from './physics.js';
import * as controls from './controls.js';

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint;

// create your engine
const engine = physics.createUnderwaterEngine();

document.addEventListener('mousemove', (event) => controls.updatePosition(event, engine));
document.addEventListener('click', (event) => controls.dropFish(event, engine));
document.addEventListener('keydown', (event) => controls.handleKeyPress(event)); // Add this line

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#0077BE'
    }
});

let ground = Bodies.rectangle(400, 600, 800, 10, { isStatic: true });
const initialFish = controls.addNewFish(380, 100, engine);
World.add(engine.world, [ground, initialFish.getBody()]);

const mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

controls.initializeControls(engine); // Add this line
