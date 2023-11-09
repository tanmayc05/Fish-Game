class Fish {
    #name;
    #imagePath;
    #radius;
    #position;
    #options;
    #body;
    #engine;
    constructor(name, imagePath, radius, engine, position, options = {}) {
        this.#name = name;
        this.#imagePath = imagePath;
        this.#radius = radius;
        this.#position = position;
        this.#options = options;
        this.#engine = engine;
        this.#body = Matter.Bodies.circle(380, 100, this.#radius, {
            // set the fish's attributes
            density: options.density || 0.001, // mass by unit area
            frictionAir: options.frictionAir || 0.01, // resistance to movement
            restitution: options.restitution || 0.5, // bounciness
            friction: options.friction || 0.1, // friction against other objects
            // render is actually drawing out the shape to the screen
            // only visual - doesn't affect physics
            render:{
                // sprite is for drawing the specified fish
                sprite:{
                    texture: imagePath,
                    // stretch or squeeze image
                    xScale: this.#radius*2/options.originalSize, 
                    yScale: this.#radius*2/options.originalSize
                }
            }
        });
        // add the fish to the world
        World.add(engine.world, this.#body);
    }
    getName() {
        return this.#name;
    }
    getPosition(){
        return this.#position;
    }
    // access the Matter.js body object directly
    getBody(){
        return this.#body;
    }

}