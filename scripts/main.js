import * as physics from './physics.js';
import * as controls from './controls.js';
//import { Composite, Vector } from 'matter-js';

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;
    //Body = Matter.Body;
    //Composite = Matter.Composite;
    //Events = Matter.Events;
    //Vector = Matter.Vector;

// create your engine
const engine = physics.createUnderwaterEngine();

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

let ground = Bodies.rectangle(400, 600, 800, 50, { isStatic: true });
World.add(engine.world, ground);
controls.initializeFollowingFish();

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);
