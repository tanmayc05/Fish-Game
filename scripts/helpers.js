// make fish zoom out when added to world

export function zoomOut(fish, engine) {
    const body = fish.getBody();
    const position = body.position;
    const scale = body.render.sprite.xScale;
    const newScale = scale - 0.01;
    const newRadius = fish.getRadius() * newScale;
    const newBody = Matter.Bodies.circle(position.x, position.y, newRadius, {
        render: {
            sprite: {
                texture: fish.getSprite(),
                xScale: newScale,
                yScale: newScale,
            },
        },
    });
    newBody.owner = fish;
    Matter.World.add(engine.world, newBody);
    Matter.World.remove(engine.world, body);
    fish.setBody(newBody);
    
} 