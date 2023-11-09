import { Engine, Render, Runner, World, Bodies, Body, Events } from 'matter-js';
import { Fish } from './fish.js';

let Fish = new Fish('fish', 'images/fish.png', 20, engine, {x: 380, y: 100}, {density: 0.001, frictionAir: 0.01, restitution: 0.5, friction: 0.1, originalSize: 250});
Fish.addToWorld(engine.world);

Engine.run(engine);
Render.run(render);