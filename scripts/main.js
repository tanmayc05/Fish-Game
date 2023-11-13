import * as physics from './physics.js';
import * as controls from './controls.js';

const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

const engine = physics.createUnderwaterEngine();

document.addEventListener('click', handleFishDrop);
document.addEventListener('keydown', controls.handleKeyPress);

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#0077BE'
    }
});

const WIDTH = render.options.width;
const HEIGHT = render.options.height;

function setup() {
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
        Bodies.rectangle(WIDTH/2, 0, WIDTH, wallThickness, wallOptions), // top
        Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, wallThickness, wallOptions), // bottom
        Bodies.rectangle(0, HEIGHT/2, wallThickness, HEIGHT, wallOptions), // left
        Bodies.rectangle(WIDTH, HEIGHT/2, wallThickness, HEIGHT, wallOptions) // right
    ]);
}

setup();

const initialFish = controls.addNewFish(380, 100, engine);
World.add(engine.world, [initialFish.getBody()]);

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

controls.initializeControls(engine);

function handleFishDrop(event) {
    controls.dropFish(event, engine);
}
