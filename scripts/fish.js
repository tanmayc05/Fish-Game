import {WIDTH} from './main.js';



export class Fish {
    #name;
    #imagePath;
    #radius;
    #body;
    #next;
    constructor(name, imagePath, radius, body, next) {
        this.#name = name;
        this.#imagePath = imagePath;
        this.#radius = radius;
        this.#body = body;
        this.#next = next;
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
    getNext() {
        return this.#next;
    }
}

export class FishEgg extends Fish {
    constructor(position={x: WIDTH / 2, y: 100}) {
        const name = "Fish Egg";
        const imagePath = "fishEgg.jpg";
        const radius = 10;
        const body = Matter.Bodies.circle(position.x , position.y, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        const next = new Minnow;
        super(name, imagePath, radius, body, next);
    }
}

export class Minnow extends Fish {
    constructor(position={x: WIDTH / 2, y: 100}) {
        const name = "Minnow";
        const imagePath = "minnow.jpg";
        const radius = 20;
        const body = Matter.Bodies.circle(position.x , position.y, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        const next = new Clownfish;
        super(name, imagePath, radius, body, next);
    }
}

export class Clownfish extends Fish {
    constructor(position={x: WIDTH / 2, y: 100}) {
        const name = "Clownfish";
        const imagePath = "clownfish.jpg";
        const radius = 30;
        const body = Matter.Bodies.circle(position.x , position.y, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        const next = new MoorishIdol;
        super(name, imagePath, radius, body, next);
    }
}

export class MoorishIdol extends Fish {
    constructor(position={x: WIDTH / 2, y: 100}) {
        const name = "Moorish Idol";
        const imagePath = "moorishIdol.jpg";
        const radius = 40;
        const body = Matter.Bodies.circle(position.x , position.y, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        const next = new Otter;
        super(name, imagePath, radius, body, next);
    }
}

export class Otter extends Fish {
    constructor(position={x: WIDTH / 2, y: 100}) {
        const name = "Otter";
        const imagePath = "otter.jpg";
        const radius = 50;
        const body = Matter.Bodies.circle(position.x , position.y, radius, {
            restitution: 0.1, // bounciness
            friction: 0.00001, // friction against other objects
        });
        super(name, imagePath, radius, body, null);
    }
}