import {WIDTH} from './main.js';

export class Fish {
    #name;
    #imagePath;
    #radius;
    #body;
    constructor(name, imagePath, radius, body) {
        this.#name = name;
        this.#imagePath = imagePath;
        this.#radius = radius;
        this.#body = body;
    }
    getName() {
        return this.#name;
    }
    getRadius() {
        return this.#radius;
    }
    getBody(){
        return this.#body;
    }
    getImagePath() {
        return this.#imagePath;
    }
}

export class FishEgg extends Fish {
    constructor() {
        const name = "Fish Egg";
        const imagePath = "fishEgg.jpg";
        const radius = 10;
        const body = Matter.Bodies.circle(WIDTH/2 , 100, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body);
    }
}

export class Minnow extends Fish {
    constructor() {
        const name = "Minnow";
        const imagePath = "minnow.jpg";
        const radius = 20;
        const body = Matter.Bodies.circle(WIDTH/2 , 100, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body);
    }
}

export class Clownfish extends Fish {
    constructor() {
        const name = "Clownfish";
        const imagePath = "clownfish.jpg";
        const radius = 30;
        const body = Matter.Bodies.circle(WIDTH/2 , 100, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body);
    }
}

export class MoorishIdol extends Fish {
    constructor() {
        const name = "Moorish Idol";
        const imagePath = "moorishIdol.jpg";
        const radius = 40;
        const body = Matter.Bodies.circle(WIDTH/2 , 100, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body);
    }
}

export class Otter extends Fish {
    constructor() {
        const name = "Otter";
        const imagePath = "otter.jpg";
        const radius = 50;
        const body = Matter.Bodies.circle(WIDTH/2 , 100, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body);
    }
}