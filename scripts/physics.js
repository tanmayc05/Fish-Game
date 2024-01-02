var Engine = Matter.Engine,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Vector = Matter.Vector;

export function createUnderwaterEngine() {
    const engine = Engine.create();
    engine.world.gravity.y = 0.25;
    return engine;
}









//initialize matter.js
// const Engine = Matter.Engine;
// const Render = Matter.Render;
// const World = Matter.World;
// const Bodies = Matter.Bodies;
// const Body = Matter.Body;


// //create your engine
// const engine = Engine.create();

// //create a renderer
// const render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         width: 800,
//         height: 600,
//         wireframes: false
//     }
// });