
"use strict";
var Engine = Matter.Engine


export function createEngine() {
    const engine = Engine.create();
    engine.world.gravity.y = 0.25;
    return engine;
}