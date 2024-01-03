
"use strict";
var Engine = Matter.Engine


export function createUnderwaterEngine() {
    const engine = Engine.create();
    engine.world.gravity.y = 0.25;
    return engine;
}