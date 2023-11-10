
var Engine = Matter.Engine,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Vector = Matter.Vector;

export function setUpPhysics(engine) {
    engine.world.gravity.y = 0.5;

    Events.on(engine, 'beforeUpdate', (event) => {
        const bodies = Composite.allBodies(engine.world);

        bodies.forEach((body) => {
            if (body.isStatic) return;

            const speed = Vector.magnitude(body.velocity);
            const dragCoefficient = 0.0001;
            const dragMagnitude = speed * speed * dragCoefficient;
            const dragForce = Vector.mult(Vector.normalise(body.velocity), -dragMagnitude);

            // apply drag force
            Body.applyForce(body, body.position, dragForce);
        });
    });
}

export function createUnderwaterEngine() {
    const engine = Engine.create();
    setUpPhysics(engine);
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