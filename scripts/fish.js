var World = Matter.World;

export class Fish {
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
            restitution: options.restitution || 0.1, // bounciness
            friction: options.friction || 0.00001, // friction against other objects
        });
    }
    getName() {
        return this.#name;
    }
    getPosition(){
        return this.#position;
    }
    getRadius() {
        return this.#radius;
    }
    // access the Matter.js body object directly
    getBody(){
        return this.#body;
    }

}