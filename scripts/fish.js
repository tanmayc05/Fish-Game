"use strict";

import { WIDTH } from "./main.js";

export const defaultStartingPositionY = 100;

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
        this.#body.restitution = 0.1;
        this.#body.friction = 0.0000001;
        this.#body.slop = 0;
        this.#body.render.sprite.xScale = 0.1;
        this.#body.render.sprite.yScale = 0.1;
    }
    getName() {
        return this.#name;
    }
    getRadius() {
        return this.#radius;
    }
    getBody() {
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
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Fish Egg";
        const imagePath = "assets/fishPicsUsed/fishEgg.png";
        const radius = 8;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Minnow;
        super(name, imagePath, radius, body, next);
    }
}

export class Minnow extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Minnow";
        const imagePath = "assets/fishPicsUsed/minnow.png";
        const radius = 10;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Clownfish;
        super(name, imagePath, radius, body, next);
    }
}

export class Clownfish extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Clownfish";
        const imagePath = "assets/fishInspiration/clownFish/clownfish1.png";
        const radius = 17;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new MoorishIdol;
        super(name, imagePath, radius, body, next);
    }
}

export class MoorishIdol extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Moorish Idol";
        const imagePath = "assets/fishInspiration/moorishIdol/mi3.png";
        const radius = 22;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Otter;
        super(name, imagePath, radius, body, next);
    }
}

export class Otter extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Otter";
        const imagePath = "assets/fishInspiration/seaOtter/otter1.png";
        const radius = 30;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Turtle;
        super(name, imagePath, radius, body, next);
    }
}

export class Turtle extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Turtles";
        const imagePath = "assets/fishInspiration/turtle/turtle1.png";
        const radius = 38;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Manatee;
        super(name, imagePath, radius, body, next);
    }
}

export class Manatee extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Manatee";
        const imagePath = "assets/fishInspiration/manatee/manatee2.png";
        const radius = 46;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Dolphin;
        super(name, imagePath, radius, body, next);
    }
}

export class Dolphin extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Dolphin";
        const imagePath = "assets/fishInspiration/dolphin/dolphin4.png";
        const radius = 54;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Shark;
        super(name, imagePath, radius, body, next);
    }
}

export class Shark extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Shark";
        const imagePath = "assets/fishInspiration/shark/shark1.png";
        const radius = 62;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Orca;
        super(name, imagePath, radius, body, next);
    }
}

export class Orca extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Orca";
        const imagePath = "assets/fishInspiration/orca/orca1.png";
        const radius = 70;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Whale;
        super(name, imagePath, radius, body, next);
    }
}

export class Whale extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Whale";
        const imagePath = "assets/fishInspiration/blueWhale/whale2.png";
        const radius = 80;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        super(name, imagePath, radius, body, null);
    }
}
