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
        this.#body.restitution = 0;
        this.#body.friction = 0.0000001;
        this.#body.slop = 0;
        this.#body.render.sprite.xScale = .33;
        this.#body.render.sprite.yScale = .33;
        this.#body.render.sprite.texture = imagePath;
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
        const radius = 30;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Minnow;
        super(name, imagePath, radius, body, next);
    }
}

export class Minnow extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Minnow";
        const imagePath = "assets/fishPicsUsed/minnow.png";
        const radius = 50;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Clownfish;
        super(name, imagePath, radius, body, next);
    }
}

export class Clownfish extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Clownfish";
        const imagePath = "assets/fishPicsUsed/clownfish.png";
        const radius = 60;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new MoorishIdol;
        super(name, imagePath, radius, body, next);
    }
}

export class MoorishIdol extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Moorish Idol";
        const imagePath = "assets/fishPicsUsed/moorishIdol.png";
        const radius = 70;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Otter;
        super(name, imagePath, radius, body, next);
    }
}

export class Otter extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Otter";
        const imagePath = "assets/fishPicsUsed/otter.png";
        const radius = 90;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Turtle;
        super(name, imagePath, radius, body, next);
    }
}

export class Turtle extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Turtles";
        const imagePath = "assets/fishPicsUsed/turtle.png";
        const radius = 100;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Manatee;
        super(name, imagePath, radius, body, next);
    }
}

export class Manatee extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Manatee";
        const imagePath = "assets/fishPicsUsed/manatee.png";
        const radius = 110;
        const body = Matter.Bodies.circle(position.x , position.y, radius);
        const next = new Dolphin;
        super(name, imagePath, radius, body, next);
    }
}

export class Dolphin extends Fish {
    constructor(position = { x: WIDTH / 2, y: defaultStartingPositionY }) {
        const name = "Dolphin";
        const imagePath = "assets/fishPicsUsed/dolphin.png";
        const radius = 140;
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
