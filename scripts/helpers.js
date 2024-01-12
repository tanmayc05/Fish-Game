import { Fish } from "./fish.js";


export const fishSettledTimes = new Map(); // Map to store timeouts for each fish

export function isCanvasFilled(engine, loseBoundary, lineBoundary, drawLineSettled) {
    engine.world.bodies.forEach((body) => {
        if (body.owner instanceof Fish && !body.isStatic) {
            const fish = body.owner;
            const bottomOfFish = body.position.y + body.circleRadius;

            // Check if the fish has settled above the line
            if (
                bottomOfFish < loseBoundary &&
                Matter.Vector.magnitude(body.velocity) < 0.1 &&
                Math.abs(body.angularVelocity) < 0.1
            ) {

                if (!fishSettledTimes.has(fish)) {
                    // If the fish is settled above the line for the first time, record the timestamp
                    fishSettledTimes.set(fish, Date.now());
                }
            } 
            if (
                bottomOfFish < lineBoundary &&

                Matter.Vector.magnitude(body.velocity) < 0.1 &&
                Math.abs(body.angularVelocity) < 0.1
            ) {
                drawLineSettled = true;
            }
            else {
                // If the fish is not above the line, remove it from the settled times map
                fishSettledTimes.delete(fish);
            }
        }
    });
    const currentTime = Date.now();
    const settledFish = [...fishSettledTimes.entries()].find(
        ([, timestamp]) => currentTime - timestamp >= 1000
    );

    return {
        isGameOver: settledFish !== undefined,
        shouldDrawLine: drawLineSettled,
    };
}