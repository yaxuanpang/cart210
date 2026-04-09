//variables
let x = 450;
let y = 0;
let yOffset = 300;
let isGlitched = false;
let clickCount = 0;
let lockTimer = 0;
let poorTimer = 0;
let elapsedTime = 0;
let finalTime = 0;

let bearCount = 0;
let dogCount = 0;
let tigerCount = 0;
let rhinoCount = 0;
let pandaCount = 0;
let pigeonCount = 0;

let bearAlive = true;
let bearHitReady = true;

let dogAlive = true;
let dogHitReady = true;

let tigerAlive = true;
let tigerHitReady = true;

let rhinoAlive = true;
let rihnoHitReady = true;

let pandaAlive = false;
let pandaHitReady = true;

let pigeonAlive = false;
let pigeonHitReady = true;

let extraAnimals = false;

let startTime;
let pandaTimer;
let pigeonTimer;

let bearColor1;
let bearColor2;
let bearColor3;
let bearColor4;

let dogColor1;
let tigerColor1;

let rhinoColor1
let rhinoColor2;

let pandaColor1;
let pandaColor2;

let pigeonColor1;
let pigeonColor2;

let showPanda = false;
let showPigeon = false;

let showGrid = false;
let showStart = true;

let gridSize = 20;
let targetSize = 20;
let lastSizeChange = 0;

let digitalize = false;

let showEnd = false;


let showBearTag = false;
let showDogTag = false;
let showTigerTag = false;
let showRhinoTag = false;
let showPandaTag = false;
let showPigeonTag = false;

let showRule = false;
let showPageOne = false;
let showPageTwo = false;

//speed of the animals and initial position
// Bear
let bx = 150, by = 100, bspeedX = 0.4, bspeedY = 1;
// Dog
let dx = 600, dy = 450, dspeedX = -1, dspeedY = 0.8;
// Tiger
let tx = 500, ty = 100, tspeedX = 2, tspeedY = -1;
// Rhino
let rx = 300, ry = 270, rspeedX = 1, rspeedY = 3;
//Panda
let px = 550, py = 300, pspeedX = 0.5, pspeedY = 1;
//Pigeon
let pgx = 100, pgy = 400, pgspeedX = 1.2, pgspeedY = -0.5;

let mySound;
let clickSound;
let hitSound;
let gridSound;
let dieSound;

let bearDieSoundPlayed = false;
let dogDieSoundPlayed = false;
let tigerDieSoundPlayed = false;
let rhinoDieSoundPlayed = false;
let pandaDieSoundPlayed = false;
let pigeonDieSoundPlayed = false;

function preload() {
    soundFormats('mp3');
    mySound = loadSound('assets/sounds/nocopyrightsound633-arcade-beat-323176.mp3');

    clickSound = loadSound('assets/sounds/IMG_2831-2.mp3');
    hitSound = loadSound('assets/sounds/IMG_2831_1.mp3');
    gridSound = loadSound('assets/sounds/IMG_2831_2.mp3');
    dieSound = loadSound('assets/sounds/IMG_2831_3.mp3');
}

//setup and original colors of the animals
function setup() {
    createCanvas(900, 600);
    angleMode(DEGREES);
    bearColor1 = color(94, 56, 10);
    dogColor1 = color(247, 213, 158);
    tigerColor1 = color(240, 150, 41);
    rhinoColor1 = color(150);

    bearColor2 = color(130, 80, 30); // bear details color
    rhinoColor2 = color(220); // rhino horn

    pandaColor1 = color(255);
    pandaColor2 = color(0);

    pigeonColor1 = color(150, 155, 165); // Pigeon Grey
    pigeonColor2 = color(100, 105, 115); // Darker grey for wings

    bearColor3 = color(138, 50, 21);
    bearColor4 = color(163, 57, 21);

}


function draw() {
    background(0);

    digitalBear();
    digitalDog();
    digitalTiger();
    digitalRhino();
    digitalPanda();
    digitalPigeon();

    extraLines();
    checkOverlap();
    drawMoreAnimals();

    //move the animals and check for overlaps
    moveAnimals();

    if (showBearTag && bearAlive === true) {
        bearTag();
    }

    if (showDogTag && dogAlive === true) {
        dogTag();
    }
    if (showTigerTag && tigerAlive === true) {
        tigerTag();
    }
    if (showRhinoTag && rhinoAlive === true) {
        rhinoTag();
    }

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
    if (showStart) {
        drawStart();
        drawInstructions();
        hitSound.stop();
        if (showRule === true) {
            button();
            drawRule();
            showPageOne = true;

            if (showPageTwo) {
                showPageOne = false;
            }

            if (showPageOne) {
                pageOne();
            }
            if (showPageTwo) {
                pageTwo();
            }
        }
    }
    //draw the grid (green dot)
    if (showGrid) {
        drawGrid();
        drawTimer();
    }
    endGame();
}

//draws the start button
function drawStart() {
    push();
    // check if mouse is hovering over the circle
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    let hovering = d < 160;

    noStroke();
    fill(0);
    rect(0, 0, width, height);



    fill(255);
    circle(width / 2, height / 2, 320);

    fill(112, 153, 186, 70);
    circle(width / 2, height / 2, 300);



    if (hovering) {
        fill(2, 173, 2);
    } else {
        fill(0, 255, 0);
    }
    circle(width / 2, height / 2, 290);

    if (hovering) {
        fill(200, 200, 200);
    } else {
        fill(255);
    }
    textSize(45);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("START", width / 2, height / 2);
    pop();
}

//draws the pigeon and panda
function drawMoreAnimals() {
    //calculates the time after the the game started in milliseconds
    let currentTime = millis() - startTime;

    // if the 4 original animals are alive for more than 10 seconds, pandaAlive is true
    if (bearAlive && dogAlive && tigerAlive && rhinoAlive && currentTime > 10000) {
        if (!showPanda) {
            pandaAlive = true;
            showPanda = true;
        }

        //if the panda is alive and 20 seconds has passed, pigeonAlive is true
        if (pandaAlive && currentTime > 20000 && !showPigeon) {
            pigeonAlive = true;
            showPigeon = true;
        }
    }

    //if pandaAlive is true and 15 seconds has passed since the beginning of the game, draw the panda
    if (pandaAlive && currentTime > 15000) {
        drawPanda();
        if (showPandaTag && pandaAlive === true) {
            pandaTag();
        }
    }


    //is the pigeon is alive, draw the pigeon
    if (pigeonAlive) {
        drawPigeon();
        if (showPigeonTag && pigeonAlive === true) {
            pigeonTag();
        }
    }

}

//function to draw the grid
function drawGrid() {
    push();
    //moveGrid();

    //the grid remains a poor image for 3 seconds
    let squareGrid = millis() - poorTimer < 3000;

    // if the user clicks twice on the grid, they have to wait 10 seconds before the grid can become a poor image again
    if (clickCount >= 2 && millis() - lockTimer > 10000) {
        clickCount = 0;
        isGlitched = false;
    }

    x = mouseX //random(width);
    y = mouseY //random(height);

    if (millis() - lastSizeChange > 700) {
        targetSize = targetSize === 20 ? 35 : 20; //toggles between 20 and 35
        lastSizeChange = millis();
    }

    // always lerp toward target
    gridSize = lerp(gridSize, targetSize, 0.05);

    if (squareGrid) {
        noStroke();
        fill(0, 255, 0, 50);
        square(x - 22.5, y - 22.5, 45);
    } else {
        fill(0, 255, 0);
        circle(x, y, gridSize);
    }
    gridLines();
    pop();
}

function gridLines() {
    push();
    stroke(0, 255, 0, 150);  // green with some transparency
    strokeWeight(1);

    // horizontal line
    line(0, y, width, y);

    // vertical line
    line(x, 0, x, height);
    pop();

}

function extraLines() {
    push();
    stroke(0, 255, 0, 150);
    strokeWeight(0.5);
    line(x + width / 2, 0, x + width / 2, height)

    line(x + width / 4, 0, x + width / 4, height)

    line(x + width / 2 + width / 4, 0, x + width / 2 + width / 4, height)

    line(x - width / 2, 0, x - width / 2, height)

    line(x - width / 4, 0, x - width / 4, height)

    line(x - width / 2 - width / 4, 0, x - width / 2 - width / 4, height)


    line(0, y + width / 2, width, y + width / 2);

    line(0, y + width / 4, width, y + width / 4);

    line(0, y + width / 4 + width / 2, width, y + width / 4 + width / 2);


    line(0, y - width / 2, width, y - width / 2);

    line(0, y - width / 4, width, y - width / 4);

    line(0, y - width / 4 - width / 2, width, y - width / 4 - width / 2);

    pop();
}

//move the grid in a wave motion across the screen
function moveGrid() {
    x += 1.5;
    if (x > width + 10) {
        x = 0 - 10;
        yOffset = random(100, 500);
    }
    let waveSpeed = 0.02;
    let waveHeight = 100;
    y = yOffset + sin(degrees(x * waveSpeed)) * waveHeight;
}

//check for overlaps
function checkOverlap() {
    let squareActive = (isGlitched === true || millis() - poorTimer < 3000);

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
            hitSound.setVolume(1.4);
            if (!hitSound.isPlaying()) {
                hitSound.play();
            }
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
                hitSound.setVolume(1.4);
                if (!hitSound.isPlaying()) {
                    hitSound.play();
                }
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

                hitSound.setVolume(1.4);
                if (!hitSound.isPlaying()) {
                    hitSound.play();
                }
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

                hitSound.setVolume(1.4);
                if (!hitSound.isPlaying()) {
                    hitSound.play();
                }
            }
        }
        else {
            isGlitched = false;
            rihnoHitReady = true;
            rhinoColor1 = color(150);
            rhinoColor2 = color(220);
        }
    }

    if (pandaAlive) {
        // gets hit by the grid
        if (x > px && x < px + 80 && y > py && y < py + 80 && !squareActive) {
            if (pandaHitReady) {
                pandaCount++; // hit count goes up
                pandaHitReady = false; // only counts as one hit
            }
            pandaColor1 = color(245, 62, 37);
            pandaColor2 = color(181, 44, 25);
            hitSound.setVolume(1.4);
            if (!hitSound.isPlaying()) {
                hitSound.play();
            }
        }
        else {
            pandaHitReady = true;
            isGlitched = false;
            pandaColor1 = color(255);
            pandaColor2 = color(0);
        }
    }

    if (pigeonAlive) {
        // gets hit by the grid
        if (x > pgx && x < pgx + 80 && y > pgy && y < pgy + 80 && !squareActive) {
            if (pigeonHitReady) {
                pigeonCount++; // hit count goes up
                pigeonHitReady = false; // only counts as one hit
            }
            pigeonColor1 = color(245, 62, 37);
            pigeonColor2 = color(181, 44, 25);
            hitSound.setVolume(1.4);
            if (!hitSound.isPlaying()) {
                hitSound.play();
            }
        }
        else {
            pigeonHitReady = true;
            isGlitched = false;
            pigeonColor1 = color(150, 155, 165);
            pigeonColor2 = color(100, 105, 115);
        }
    }

    //overlap counter
    // if the animal is hit 3 times, it "dies"
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
    if (pandaCount === 3) {
        pandaAlive = false;


    }
    if (pigeonCount === 3) {
        pigeonAlive = false;
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

    //panda
    px += pspeedX;
    py += pspeedY;

    if (px < 0 || px > width - 80) pspeedX *= -1;
    if (py < 0 || py > height - 80) pspeedY *= -1;

    //pigeon
    pgx += pgspeedX;
    pgy += pgspeedY;

    if (pgx < 0 || pgx > width - 80) pgspeedX *= -1;
    if (pgy < 0 || pgy > height - 80) pgspeedY *= -1;
}

// mouse press function
function mousePressed() {
    if (showEnd) {
        // These coordinates match your 900x600 canvas centered button
        if (mouseX > 325 && mouseX < 575 && mouseY > 405 && mouseY < 475) {
            resetGame();
            clickSound.setVolume(1.6);
            if (!clickSound.isPlaying()) {
                clickSound.play();
            }
            return; // Exit the function so we don't trigger other clicks
        }
    }


    if (showStart) {
        showGrid = false;
        if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 && mouseY > 490 && mouseY < 510) {
            showRule = true;
            showPageOne = true;
            showPageTwo = false;

            clickSound.setVolume(1.6);
            if (!clickSound.isPlaying()) {
                clickSound.play();
            }
        }
        else if (mouseX > 645 && mouseX < 695 && mouseY > 50 && mouseY < 100) {
            showRule = false;
            clickSound.setVolume(1.6);
            if (!clickSound.isPlaying()) {
                clickSound.play();
            }
        }

        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (d < 160) {
            showGrid = true;
            showStart = false;
            startTime = millis();

            mySound.setVolume(0.6);
            if (!mySound.isPlaying()) {
                mySound.loop();
                clickSound.setVolume(1.6);
                clickSound.play();
            }
        }
        return;
    }

    let locked = (clickCount >= 2 && millis() - lockTimer < 10000);
    if (locked) return;

    let d = dist(mouseX, mouseY, x, y);
    if (d < 20) {
        gridSound.setVolume(3.5);
        if (!gridSound.isPlaying()) {
            gridSound.play();
        }
        isGlitched = true;
        clickCount++;
        poorTimer = millis();
    }
    if (clickCount === 2) {
        lockTimer = millis();
    }
}

//draws the animals
function drawBear() {
    fill(bearColor1);
    push();
    noStroke();

    //ears
    fill(bearColor1); // Dark brown
    circle(bx + 15, by + 10, 28); // Left outer
    circle(bx + 65, by + 10, 28); // Right outer


    //body
    fill(bearColor1);
    rect(bx, by, 80, 80, 20);

    //snout
    fill(bearColor2); // Lighter brown muzzle
    ellipse(bx + 40, by + 58, 45, 35);

    // nose
    fill(20);
    ellipse(bx + 40, by + 50, 15, 10);

    // mouth
    stroke(20);
    strokeWeight(2);
    line(bx + 40, by + 55, bx + 40, by + 65); // Vertical line under nose
    noStroke();

    // eyes
    fill(255, 50); // Small white highlights behind eyes
    circle(bx + 25, by + 30, 15);
    circle(bx + 55, by + 30, 15);

    fill(0);
    circle(bx + 25, by + 32, 8); // Pupils
    circle(bx + 55, by + 32, 8);
    pop();
}

function drawBearDrawing(bx = 150, by = 100, sz = 1) {
    push();
    translate(bx, by);
    scale(sz);
    noStroke();
    fill(bearColor1);
    circle(15, 10, 28);
    circle(65, 10, 28);
    rect(0, 0, 80, 80, 20);
    fill(bearColor2);
    ellipse(40, 58, 45, 35);
    fill(20);
    ellipse(40, 50, 15, 10);
    stroke(20);
    strokeWeight(2);
    line(40, 55, 40, 65);
    noStroke();
    fill(255, 50);
    circle(25, 30, 15);
    circle(55, 30, 15);
    fill(0);
    circle(25, 32, 8);
    circle(55, 32, 8);
    pop();
}
function drawBearMini(bx, by, sz = 0.5) {
    push();
    fill(bearColor3);
    noStroke();

    translate(bx, by);
    scale(sz);

    //ears
    fill(bearColor3); // Dark brown
    circle(bx + 15, by + 10, 28); // Left outer
    circle(bx + 65, by + 10, 28); // Right outer


    //body
    fill(bearColor3);
    rect(bx, by, 80, 80, 20);

    //snout
    fill(bearColor4); // Lighter brown muzzle
    ellipse(bx + 40, by + 58, 45, 35);

    // nose
    fill(20);
    ellipse(bx + 40, by + 50, 15, 10);

    // mouth
    stroke(20);
    strokeWeight(2);
    line(bx + 40, by + 55, bx + 40, by + 65); // Vertical line under nose
    noStroke();

    // eyes
    fill(255, 50); // Small white highlights behind eyes
    circle(bx + 25, by + 30, 15);
    circle(bx + 55, by + 30, 15);

    fill(0);
    circle(bx + 25, by + 32, 8); // Pupils
    circle(bx + 55, by + 32, 8);
    pop();
}

function drawDog() {
    push();
    noStroke();
    fill(dogColor1);
    rect(dx, dy, 80, 80, 15);
    // ears
    rect(dx - 10, dy + 10, 20, 40, 10);
    rect(dx + 70, dy + 10, 20, 40, 10);
    // eyes and nose
    fill(0);
    circle(dx + 25, dy + 30, 8);
    circle(dx + 55, dy + 30, 8);
    ellipse(dx + 40, dy + 55, 15, 10);
    pop();
}

function drawTiger() {
    push();

    noStroke();
    // ears
    stroke(tigerColor1);
    strokeWeight(9);
    strokeJoin(ROUND);
    fill(tigerColor1);
    triangle(tx + 3.75, ty + 20, tx + 20, ty - 15, tx + 40, ty + 20); // Left
    triangle(tx + 40, ty + 20, tx + 60, ty - 15, tx + 76.25, ty + 20); // Right

    noStroke();
    // head
    fill(tigerColor1);
    rect(tx, ty, 80, 80, 15);

    // snout and eye details
    fill(255, 255, 255, 180);
    ellipse(tx + 40, ty + 60, 45, 30); // Snout
    circle(tx + 25, ty + 28, 20); // Left eye
    circle(tx + 55, ty + 28, 20); // Right eye

    // stripes
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

    // face details
    noStroke();
    fill(0);
    circle(tx + 25, ty + 30, 8); // Pupils
    circle(tx + 55, ty + 30, 8);

    // nose
    fill(0);
    triangle(tx + 35, ty + 52, tx + 45, ty + 52, tx + 40, ty + 58);

    // whiskers
    stroke(255, 150);
    strokeWeight(1);
    line(tx + 25, ty + 60, tx + 10, ty + 65);
    line(tx + 25, ty + 63, tx + 10, ty + 70);
    line(tx + 55, ty + 60, tx + 70, ty + 65);
    line(tx + 55, ty + 63, tx + 70, ty + 70);

    pop();
}

function drawRhino() {
    push();
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
    pop();
}

function drawPanda() {
    push();
    fill(pandaColor2);
    noStroke();

    //ears
    stroke(pandaColor1);
    fill(pandaColor2); // Dark brown
    circle(px + 15, py + 10, 28); // Left outer
    circle(px + 65, py + 10, 28); // Right outer


    //body
    fill(pandaColor1);
    rect(px, py, 80, 80, 20);

    //snout
    fill(pandaColor2); // Lighter brown muzzle
    ellipse(px + 40, py + 58, 45, 35);

    // nose
    fill(pandaColor2);
    ellipse(px + 40, py + 50, 15, 10);

    // mouth
    stroke(pandaColor1);
    strokeWeight(2);
    line(px + 40, py + 55, px + 40, py + 65); // Vertical line under nose
    noStroke();

    // eyes
    fill(pandaColor2); // Small white highlights behind eyes
    stroke(pandaColor1);
    circle(px + 25, py + 30, 15);
    circle(px + 55, py + 30, 15);

    fill(0);
    circle(px + 25, py + 32, 8); // Pupils
    circle(px + 55, py + 32, 8);
    pop();
}

function drawPigeon() {
    push();
    noStroke();

    //body
    fill(pigeonColor1);
    rect(pgx, pgy, 80, 80, 25);

    noStroke();

    // purple neck
    fill(120, 80, 150, 200);
    rect(pgx, pgy + 60, 75, 15, 5);

    //green neck
    fill(40, 160, 100, 200);
    rect(pgx + 5, pgy + 50, 70, 12, 5);

    // wings
    fill(pigeonColor2);
    arc(pgx + 10, pgy + 60, 30, 40, 90, 270);
    arc(pgx + 70, pgy + 60, 30, 40, 270, 90);

    //beak
    fill(80);
    triangle(pgx + 35, pgy + 50, pgx + 45, pgy + 50, pgx + 40, pgy + 65);


    fill(240);
    ellipse(pgx + 40, pgy + 48, 14, 10);

    //eyes
    fill(255, 100, 0); // Orange
    circle(pgx + 18, pgy + 35, 14);
    circle(pgx + 62, pgy + 35, 14);

    fill(0); // Large pupils
    circle(pgx + 18, pgy + 35, 7);
    circle(pgx + 62, pgy + 35, 7);

    // glint in eyes
    fill(255);
    circle(pgx + 20, pgy + 33, 3);
    circle(pgx + 64, pgy + 33, 3);

    pop();

}

function digitalBear() {
    if (!bearAlive) {
        digitalize = true;
    }
    else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(bx, by, 80, 80);

        if (!bearDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            bearDieSoundPlayed = true;
        }
    }
}

function digitalDog() {
    if (!dogAlive) {
        digitalize = true;
    }
    else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(dx, dy, 80, 80);

        if (!dogDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            dogDieSoundPlayed = true;
        }
    }
}

function digitalTiger() {
    if (!tigerAlive) {
        digitalize = true;
    }
    else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(tx, ty, 80, 80);

        if (!tigerDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            tigerDieSoundPlayed = true;
        }
    }
}

function digitalRhino() {
    if (!rhinoAlive) {
        digitalize = true;
    }
    else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(rx, ry, 80, 80);

        if (!rhinoDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            rhinoDieSoundPlayed = true;
        }
    }
}

function digitalPanda() {
    if (showPanda && !pandaAlive) {
        digitalize = true;
    } else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(px, py, 80, 80);

        if (!pandaDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            pandaDieSoundPlayed = true;
        }
    }
}

function digitalPigeon() {
    if (showPigeon && !pigeonAlive) {
        digitalize = true;
    } else {
        digitalize = false;
    }
    if (digitalize) {
        stroke(89, 255, 0);
        fill(89, 255, 0, 50)
        rect(pgx, pgy, 80, 80);

        if (!pigeonDieSoundPlayed) {
            dieSound.setVolume(0.6);
            dieSound.play();
            pigeonDieSoundPlayed = true;
        }
    }
}

function endGame() {
    if (!bearAlive && !dogAlive && !tigerAlive && !rhinoAlive && !pandaAlive && !pigeonAlive) {
        if (!showEnd) {
            finalTime = millis() - startTime;
        }
        end();
        showEnd = true;
    }
}

function end() {
    push();
    stroke(0, 255, 0);
    fill(0);
    rectMode(CENTER);
    rect(width / 2, height / 2, 500, 470);

    noStroke();
    fill(0, 255, 0);
    rect(width / 2, 120, 500, 120);


    fill(255);
    textAlign(CENTER, CENTER);
    textSize(45);
    text("GAME OVER!", width / 2, 120);


    stroke(0, 255, 0);
    noFill();
    textSize(24);
    text("The animals are now exploitative data", width / 2, 240);

    textSize(18);
    text("They are now numbers on a screen ready to be used by", width / 2, 310);
    text("poachers and anyone with an internet access", width / 2, 350);


    fill(0, 255, 0, 50);
    stroke(0, 255, 0);
    rect(width / 2, 440, 250, 70);


    fill(255);
    stroke(255);
    textSize(24);
    text("Press here to restart", width / 2, 440);
    pop();
}

function resetGame() {
    push();
    showStart = true;
    showEnd = false;
    showGrid = false;
    digitalize = false;

    clickCount = 0;
    finalTime = 0;
    startTime = millis();

    bearCount = 0;
    dogCount = 0;
    tigerCount = 0;
    rhinoCount = 0;
    pandaCount = 0;
    pigeonCount = 0;


    bearDieSoundPlayed = false;
    dogDieSoundPlayed = false;
    tigerDieSoundPlayed = false;
    rhinoDieSoundPlayed = false;
    pandaDieSoundPlayed = false;
    pigeonDieSoundPlayed = false;


    bearAlive = true;
    dogAlive = true;
    tigerAlive = true;
    rhinoAlive = true;
    pandaAlive = false;
    pigeonAlive = false;

    showPanda = false;
    showPigeon = false;

    showBearTag = false;
    showDogTag = false;
    showTigerTag = false;
    showRhinoTag = false;
    showPandaTag = false;
    showPigeonTag = false;

    mySound.stop();

    bx = 150; by = 100;
    dx = 600; dy = 450;
    tx = 500; ty = 100;
    rx = 300; ry = 270;
    px = 550; py = 300;
    pgx = 100; pgy = 400;
    pop();
}

function bearTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(bx - 90, by + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Bruno", bx + 37, by + 105);
    textSize(15);
    text("Age: 3 years old", bx - 25, by + 135);
    text("Sex: M", bx - 57, by + 160);
    text("Bruno likes to explore the wilderness", bx + 35, by + 185);
    text("and eat berries. He is very curious", bx + 35, by + 205);
    text("about humans and their lifestyle.", bx + 37, by + 225);
    pop();
}

function dogTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(dx - 90, dy + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Daisy", dx + 37, dy + 105);
    textSize(15);
    text("Age: 9 months old", dx - 17, dy + 135);
    text("Sex: F", dx - 57, dy + 160);
    text("Daisy enjoys long walks", dx + 35, dy + 185);
    text("and is very playful. She wants to", dx + 35, dy + 205);
    text("find a new forever home.", dx + 37, dy + 225);
    pop();
}

function tigerTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(tx - 90, ty + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Tiger Lily", tx + 37, ty + 105);
    textSize(15);
    text("Age: 4 years old", tx - 25, ty + 135);
    text("Sex: F", tx - 57, ty + 160);
    textSize(14);
    text("Abandonned by her mother as a", tx + 35, ty + 185);
    text("young cub, Tiger Lily was rescued by a", tx + 35, ty + 205);
    text("non-profit and rereleased into the wild.", tx + 37, ty + 225);
    pop();
}

function rhinoTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(rx - 90, ry + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Fatu", rx + 37, ry + 105);
    textSize(15);
    text("Age: 25 years old", rx - 21, ry + 135);
    text("Sex: F", rx - 57, ry + 160);
    textSize(14);
    text("Fatu and her mother are the only", rx + 35, ry + 185);
    text("northern white rhinos left on earth. She", rx + 35, ry + 205);
    text("enjoys eating carrots and belly rubs.", rx + 37, ry + 225);
    pop();
}


function pandaTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(px - 90, py + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Pan Pan", px + 37, py + 105);
    textSize(15);
    text("Age: 1 year old", px - 30, py + 135);
    text("Sex: M", px - 57, py + 160);
    textSize(14);
    text("Named after the granpa of pandas,", px + 35, py + 185);
    text("Pan Pan used to be bullied because", px + 35, py + 205);
    text("he was too small. He is extremly smart.", px + 37, py + 225);
    pop();
}

function pigeonTag() {
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    rect(pgx - 90, pgy + 85, 250, 150);

    noStroke();
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Bartholomew", pgx + 37, pgy + 105);
    textSize(15);
    text("Age: ~ 1 year old", pgx - 23, pgy + 135);
    text("Sex: M", pgx - 57, pgy + 160);
    textSize(13);
    text("Not much is known about Bartholomew.", pgx + 35, pgy + 185);
    text("He was rescued as a hatchling and given", pgx + 35, pgy + 205);
    text("this name to bring him abunance of food.", pgx + 37, pgy + 225);
    pop();
}

function keyPressed() {
    push();
    if (keyCode === 39) {
        showPageTwo = true;
        showPageOne = false;

        clickSound.setVolume(1.6);
        if (!clickSound.isPlaying()) {
            clickSound.play();
        }
    }
    if (keyCode === 37) {
        showPageTwo = false;
        showPageOne = true;

        clickSound.setVolume(1.6);
        if (!clickSound.isPlaying()) {
            clickSound.play();
        }
    }
    if (showBearTag === false) {
        if (key === "b") {
            showBearTag = true
        }
    }
    else if (showBearTag === true) {
        if (key === "b") {
            showBearTag = false
        }
    }

    if (showDogTag === false) {
        if (key === "d") {
            showDogTag = true
        }
    }
    else if (showDogTag === true) {
        if (key === "d") {
            showDogTag = false
        }
    }
    if (showTigerTag === false) {
        if (key === "t") {
            showTigerTag = true
        }
    }
    else if (showTigerTag === true) {
        if (key === "t") {
            showTigerTag = false
        }
    }
    if (showRhinoTag === false) {
        if (key === "r") {
            showRhinoTag = true
        }
    }
    else if (showRhinoTag === true) {
        if (key === "r") {
            showRhinoTag = false
        }
    }
    if (showPandaTag === false) {
        if (key === "p") {
            showPandaTag = true
        }
    }
    else if (showPandaTag === true) {
        if (key === "p") {
            showPandaTag = false
        }
    }
    if (showPigeonTag === false) {
        if (key === "g") {
            showPigeonTag = true
        }
    }
    else if (showPigeonTag === true) {
        if (key === "g") {
            showPigeonTag = false
        }
    }
    pop();
}

function drawInstructions() {
    push();
    stroke(0)
    noFill();
    rect(width / 2 - 80, 490, 160, 20);
    fill(0, 255, 0);
    textSize(14);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Click here for instructions", width / 2, height / 2 + height / 3);
    pop();
}
function button() {
    push();
    fill(0);
    strokeWeight(3);
    stroke(0, 255, 0);
    rect(width / 4 + 20, height / 4 - 100, 450, 500, 15);
    fill(0);
    rect(645, 50, 50, 50, 10);

    fill(0, 255, 0);
    noStroke();
    textSize(30);
    text("x", 663, 83);
    textAlign(CENTER, CENTER);

    pop();
}

function drawRule() {
    push();
    fill(0, 255, 0);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Instructions:", 475, 90);
    textSize(15);
    text("1", 460, 520);
    text("2", 490, 520);
    pop();
}

function pageOne() {
    push();
    textAlign(LEFT);
    textSize(15);
    noStroke();
    fill(0, 255, 0);
    text("- Click on the green dot to prevent the grid from detecting.", 280, 130);
    text("the animals", 290, 150);
    text("- If the dot overlaps with the animal 3 times, they die.", 280, 250);
    text("- There is a 10 second cooldown after 2 clicks.", 280, 350);
    text("- During the cooldown, the grid will be able to detect the", 280, 400);
    text("animals even if the player clicks on the green dot.", 290, 420);
    text("- If all the animals are dead, you lose.", 280, 470);

    fill(0, 255, 0, 50);
    strokeWeight(2);
    stroke(0, 255, 0);
    square(445, 505, 30, 5);

    fill(0, 255, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    text("--->", 660, 525);
    text("---->", 500, 297);
    textSize(12);
    text("x3 times", 430, 300);
    textSize(8);
    text("press right key", 615, 525);
    text("click = yay!", 380, 225);
    text("no click = ouch!", 530, 225);

    drawingOne();
    pop();
}

function pageTwo() {
    push();
    textAlign(LEFT);
    textSize(15);
    noStroke();
    fill(0, 255, 0);
    text("- If all the animals are still alive after 5 seconds, the panda", 280, 130);
    text("appears.", 290, 150);
    text("- If all the animals (including the panda) are still alive after", 280, 200);
    text("10 seconds, the pigeon appears.", 290, 220);
    text("- The player can open descriptions boxes for each animal", 280, 270);
    text("by pressing certain keys on the keyboard.", 290, 290);

    fill(0, 255, 0, 50);
    strokeWeight(2);
    stroke(0, 255, 0);
    square(475, 505, 30, 5);

    fill(0, 255, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    text("<---", 275, 525);
    textSize(8);
    text("press left key", 320, 525);

    drawingTwo();
    pop();
}

function drawingOne() {
    push();
    drawBearDrawing(360, 170, 0.5);
    drawBearMini(240, 185, 0.5);
    drawBearMini(340, 115, 0.5);

    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    square(550, 275, 40);

    noStroke();
    fill(0, 255, 0);
    circle(510, 195, 10);

    fill(0, 255, 0, 50);
    square(350, 185, 15);
    pop();
}

function drawingTwo() {
    push();
    fill(0, 255, 0);
    textSize(20);
    text("Bear:    b", 330, 350);
    text("Dog:     d", 330, 400);
    text("Tiger:    t", 470, 350);
    text("Rhino:   r", 470, 400);
    text("Panda:   p", 610, 350);
    text("Pigeon:  g", 610, 400);

    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
    square(350, 335, 30, 5);
    square(350, 385, 30, 5);
    square(493, 335, 30, 5);
    square(493, 385, 30, 5);
    square(635, 335, 30, 5);
    square(635, 385, 30, 5);
    pop();
}

function drawTimer() {
    if (!startTime) return;
    let elapsed = floor((showEnd ? finalTime : millis() - startTime) / 1000);
    let minutes = floor(elapsed / 60);
    let seconds = elapsed % 60;
    let timeStr = nf(minutes, 2) + ":" + nf(seconds, 2);

    push();
    fill(0, 255, 0);
    noStroke();
    textSize(16);
    textAlign(RIGHT, TOP);
    text(timeStr, width - 20, 20);
    pop();
}