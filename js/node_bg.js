let imgNum = 7;
let record = false;
let md = false;
let numberOfNodes = 500;
let nodes = new Array(numberOfNodes);
var w = window.innerWidth;
var h = window.innerHeight;  

let mic;
function setup() {
    //randomSeed(millis());
    canvas=createCanvas(w, h);
    //smooth();
    strokeWeight(4);
    background(0);
    mic = new p5.AudioIn();

    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
    for (let i = 0; i < numberOfNodes; i++) {
        let x = random(width),
            y = random(height);
        nodes[i] = new Node(
            x + (noise(x * 0.001, y * 0.001) * 2 - 1) * 10,
            y + (noise(x * 0.001, y * 0.001) * 2 - 1) * 10
        );
    }
}
function draw() {
    //if(record) {
    //  beginRecord(PDF, "nodes4.pdf");
    //}
    let vol = mic.getLevel();
    // Draw an ellipse with height based on volume
    let r = map(vol, 0, 0.05, 1, 10);
    background(0);
    for (let t = 0; t < numberOfNodes; t++) {
        nodes[t].display();
    }
    for (let i = 0; i < numberOfNodes - 1; i++) {
        for (let c = i + 1; c < numberOfNodes; c++) {

            let d = sq(nodes[c].x - nodes[i].x) + sq(nodes[c].y - nodes[i].y);
            if (d < pow(90, 2)) {
                stroke(255, map(d, 0, pow(100, 2), 100, 0));
                line(nodes[c].x, nodes[c].y, nodes[i].x, nodes[i].y);
                nodes[c].radius=r+3;
                
                nodes[i].xv +=
                    (0.00001 * (nodes[c].x - nodes[i].x) * nodes[c].radius) /
                    nodes[i].radius;
                nodes[i].yv +=
                    (0.00001 * (nodes[c].y - nodes[i].y) * nodes[c].radius) /
                    nodes[i].radius;
            }
        }
    } //if(record) {
    //endRecord();
    //record = false;
    //}
}


class Node {
    x;
    y;
    xv;
    yv;
    radius;
    constructor(xp, yp) {
        this.radius = random(1, 5);
        this.x = xp;
        this.y = yp;
        this.xv = random(-1, 1);
        this.yv = random(-1, 1);
    }
    display() {
        this.xv *= 1;
        this.yv *= 1;
        this.x += this.xv;
        this.y += this.yv;
        if (this.x < 0) {
            this.xv += 0.1;
        }
        if (this.x > width) {
            this.xv += -0.1;
        }
        if (this.y < 0) {
            this.yv += 0.1;
        }
        if (this.y > height) {
            this.yv += -0.1;
        }
        if (this.xv < -5) {
            this.xv = -5;
        }
        if (this.xv > 5) {
            this.xv = 5;
        }
        if (this.yv < -5) {
            this.yv = -5;
        }
        if (this.yv > 5) {
            this.yv = 5;
        }
        fill(255);
        stroke(255);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}