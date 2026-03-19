"use strict";

//variables
let x = 450;
let y = 0;
let yOffset = 300;
let isGlitched = false;
let clickCount = 0;
let lockTimer = 0;
let poorTimer = 0;

let bearCount = 0;
let dogCount = 0;
let tigerCount = 0;
let rhinoCount = 0;

let bearAlive = true;
let bearHitReady = true;

let dogAlive = true;
let dogHitReady = true;

let tigerAlive = true;
let tigerHitReady = true;

let rhinoAlive = true;
let rihnoHitReady = true;

let bearColor1;
let bearColor2;
let dogColor1;
let tigerColor1;
let rhinoColor1
let rhinoColor2;

//speed of the animals and initial position
// Bear
let bx = 150, by = 100, bspeedX = 0.4, bspeedY = 1;
// Dog
let dx = 600, dy = 450, dspeedX = -1, dspeedY = 0.8;
// Tiger
let tx = 500, ty = 100, tspeedX = 2, tspeedY = -1;
// Rhino
let rx = 300, ry = 270, rspeedX = 1, rspeedY = 3;


//setup and original colors of the animals
function setup() {
    createCanvas(900, 600);
    bearColor1 = color(94, 56, 10);
    dogColor1 = color(247, 213, 158);
    tigerColor1 = color(240, 150, 41);
    rhinoColor1 = color(150);

    bearColor2 = color(130, 80, 30); // bear details color
    rhinoColor2 = color(220); // rhino horn
}


function draw() {
    background(0);

    //move the animals and check for overlaps
    moveAnimals();
    checkOverlap();

    //if the animal is alive, draw the animal of the canvas
    if (bearAlive) {
        drawBear();
    }
    if (dogAlive) {
        drawDog();
    }
    if (tigerAlive) {
        drawTiger();
    }
    if (rhinoAlive) {
        drawRhino();
    }

    //draw the grid (green dot)
    drawGrid();
}

//function to draw the grid
function drawGrid() {
    //moveGrid();

    //the grid remains a poor image fro 2 seconds
    let squareGrid = millis() - poorTimer < 2000;

    // if the user clicks twice on the grid, they have to wait 10 seconds before the grid can become a poor image again
    if (clickCount >= 2 && millis() - lockTimer > 10000) {
        clickCount = 0;
        isGlitched = false;
    }

    x = mouseX //random(width);
    y = mouseY //random(height);

    // Draw the surveillance light
    if (squareGrid) {
        fill(0, 255, 0, 50);
        rect(x - 12.5, y - 12.5, 35, 35); // poor image of grid (square)
    } else {
        fill(0, 255, 0);
        circle(x, y, 20); // initial grid (circle)
    }
}

//move the grid in a wave motion across the screen
function moveGrid() {
    x += 1.5;
    if (x > width + 10) {
        x = 0 - 10;
        yOffset = random(100, 500); // the position of middle height of the wave is limited between 100 and 500
    }

    let waveSpeed = 0.02; // number of waves
    let waveHeight = 100;  // height of waves
    y = yOffset + sin(x * waveSpeed) * waveHeight;

}

//check for overlaps
function checkOverlap() {
    let squareActive = (isGlitched === true || millis() - poorTimer < 2000);

    //bear
    if (bearAlive) {
        // gets hit by the grid
        if (x > bx && x < bx + 80 && y > by && y < by + 80 && !squareActive) {
            if (bearHitReady) {
                bearCount++; // hit count goes up
                bearHitReady = false; // only counts as one hit
            }
            bearColor1 = color(138, 50, 21);
            bearColor2 = color(163, 57, 21);
        }
        else {
            bearHitReady = true;
            isGlitched = false;
            bearColor1 = color(94, 56, 10);
            bearColor2 = color(130, 80, 30);
        }
    }

    //dog
    if (dogAlive) {
        // gets hit by the grid
        if (x > dx && x < dx + 80 && y > dy && y < dy + 80 && !squareActive) {
            if (dogHitReady) {
                dogCount++;
                dogHitReady = false;
                dogColor1 = color(196, 132, 27);
            }
        }
        else {
            isGlitched = false;
            dogHitReady = true;
            dogColor1 = color(247, 213, 158);
        }
    }

    //tiger
    if (tigerAlive) {
        if (x > tx && x < tx + 80 && y > ty && y < ty + 80 && !squareActive) {
            if (tigerHitReady) {
                // gets hit by the grid
                tigerCount++;
                tigerHitReady = false;
                tigerColor1 = color(255);
            }
        }
        else {
            isGlitched = false;
            tigerHitReady = true;
            tigerColor1 = color(240, 150, 41);
        }
    }

    //rhino
    if (rhinoAlive) {
        if (x > rx && x < rx + 80 && y > ry && y < ry + 80 && !squareActive) {
            if (rihnoHitReady) {
                // gets hit by the grid
                rhinoCount++;
                rihnoHitReady = false;
                rhinoColor1 = color(50);
                rhinoColor2 = color(117);
            }
        }
        else {
            isGlitched = false;
            rihnoHitReady = true;
            rhinoColor1 = color(150);
            rhinoColor2 = color(220);
        }
    }

    //overlap counter
    // if the animal is hti 3 times, it "dies"
    if (bearCount === 3) {
        bearAlive = false;
    }
    if (dogCount === 3) {
        dogAlive = false;
    }
    if (tigerCount === 3) {
        tigerAlive = false;
    }
    if (rhinoCount === 3) {
        rhinoAlive = false;
    }
}


//move the animals
function moveAnimals() {
    // Move Bear
    bx += bspeedX;
    by += bspeedY;
    // bounces off the borders
    if (bx < 0 || bx > width - 80) bspeedX *= -1;
    if (by < 0 || by > height - 80) bspeedY *= -1;

    // Move Dog
    dx += dspeedX;
    dy += dspeedY;
    if (dx < 0 || dx > width - 80) dspeedX *= -1;
    if (dy < 0 || dy > height - 80) dspeedY *= -1;

    // Move Tiger
    tx += tspeedX;
    ty += tspeedY;
    if (tx < 0 || tx > width - 80) tspeedX *= -1;
    if (ty < 0 || ty > height - 80) tspeedY *= -1;

    // Move Rhino
    rx += rspeedX;
    ry += rspeedY;
    if (rx < 0 || rx > width - 80) rspeedX *= -1;
    if (ry < 0 || ry > height - 80) rspeedY *= -1;
}


// mouse press function
function mousePressed() {
    let locked = (clickCount >= 2 && millis() - lockTimer < 10000);

    if (locked) return;
    let d = dist(mouseX, mouseY, x, y);
    if (d < 20) {
        isGlitched = true;
        clickCount++;
        poorTimer = millis();
    }
    if (clickCount === 2) {
        lockTimer = millis();
    }
}



function drawBear() {
    fill(bearColor1);
    push();
    noStroke();

    // 1. EARS (Outer and Inner)
    fill(bearColor1); // Dark brown
    circle(bx + 15, by + 10, 28); // Left outer
    circle(bx + 65, by + 10, 28); // Right outer


    // 2. MAIN BODY
    fill(bearColor1);
    rect(bx, by, 80, 80, 20); // Rounded "Head"

    // 3. THE SNOUT AREA (Muzzle)
    fill(bearColor2); // Lighter brown muzzle
    ellipse(bx + 40, by + 58, 45, 35);

    // Actual Nose
    fill(20);
    ellipse(bx + 40, by + 50, 15, 10);

    // Mouth line
    stroke(20);
    strokeWeight(2);
    line(bx + 40, by + 55, bx + 40, by + 65); // Vertical line under nose
    noStroke();

    // 4. EYES & BROWS
    fill(255, 50); // Small white highlights behind eyes
    circle(bx + 25, by + 30, 15);
    circle(bx + 55, by + 30, 15);

    fill(0);
    circle(bx + 25, by + 32, 8); // Pupils
    circle(bx + 55, by + 32, 8);
    pop();
}

function drawDog() {
    noStroke();
    fill(dogColor1);
    rect(dx, dy, 80, 80, 15);
    // Floppy Ears
    rect(dx - 10, dy + 10, 20, 40, 10);
    rect(dx + 70, dy + 10, 20, 40, 10);
    // Eyes & Nose
    fill(0);
    circle(dx + 25, dy + 30, 8);
    circle(dx + 55, dy + 30, 8);
    ellipse(dx + 40, dy + 55, 15, 10);
}


function drawTiger() {
    noStroke();
    push();

    // 1. EARS
    stroke(tigerColor1);
    strokeWeight(9);
    strokeJoin(ROUND);
    fill(tigerColor1);
    triangle(tx + 3.75, ty + 20, tx + 20, ty - 15, tx + 40, ty + 20); // Left
    triangle(tx + 40, ty + 20, tx + 60, ty - 15, tx + 76.25, ty + 20); // Right

    noStroke();
    // 2. MAIN HEAD
    fill(tigerColor1);
    rect(tx, ty, 80, 80, 15);

    // 3. WHITE SNOUT & EYE PATCHES
    fill(255, 255, 255, 180);
    ellipse(tx + 40, ty + 60, 45, 30); // Snout area
    circle(tx + 25, ty + 28, 20); // Left eye patch
    circle(tx + 55, ty + 28, 20); // Right eye patch

    // 4. STRIPES (Side and Forehead)
    stroke(0);
    strokeWeight(3);
    // Side stripes (Tapered look using triangles or lines)
    line(tx, ty + 40, tx + 15, ty + 40);
    line(tx, ty + 50, tx + 12, ty + 50);
    line(tx + 80, ty + 40, tx + 65, ty + 40);
    line(tx + 80, ty + 50, tx + 68, ty + 50);
    // Forehead stripes
    line(tx + 35, ty + 5, tx + 45, ty + 5);
    line(tx + 32, ty + 12, tx + 48, ty + 12);
    line(tx + 40, ty, tx + 40, ty + 15);

    // 5. FACE FEATURES
    noStroke();
    fill(0);
    circle(tx + 25, ty + 30, 8); // Pupils
    circle(tx + 55, ty + 30, 8);

    // Nose
    fill(0);
    triangle(tx + 35, ty + 52, tx + 45, ty + 52, tx + 40, ty + 58);

    // Whiskers
    stroke(255, 150); // Faint white whiskers
    strokeWeight(1);
    line(tx + 25, ty + 60, tx + 10, ty + 65);
    line(tx + 25, ty + 63, tx + 10, ty + 70);
    line(tx + 55, ty + 60, tx + 70, ty + 65);
    line(tx + 55, ty + 63, tx + 70, ty + 70);

    pop();
}


function drawRhino() {
    noStroke();
    fill(rhinoColor1);
    rect(rx, ry, 80, 80, 10);
    // Horn
    fill(rhinoColor2);
    triangle(rx + 30, ry + 40, rx + 40, ry + 10, rx + 50, ry + 40);
    // Ears
    fill(rhinoColor1);
    circle(rx + 15, ry + 5, 15);
    circle(rx + 65, ry + 5, 15);
    // Eyes
    fill(0);
    circle(rx + 25, ry + 35, 6);
    circle(rx + 55, ry + 35, 6);
}