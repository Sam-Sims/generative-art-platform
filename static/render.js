var inc = 0.2
var resolution = 20; // The smaller the resolution, the more vectors in the flowfield
var cols, rows;
var fps;
var particles = [];
var zoff = 0;
var particle_limit = 1;
var started = false;
var render_flowfield = false;

function setup() {
    // Setup Canvas
    var canvasW = 960;
    var canvasH = 360;
    var canvas = createCanvas(canvasW, canvasH);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    background("white")
    canvas.parent("canvasHolder");
    canvas.position(x, y);
    colorMode(HSB, 255);
    fps = createP('');

    // Convert canvas to grid defined by resolution
    cols = floor(canvasW / resolution);
    rows = floor(canvasH / resolution);

    // Variable assignment
    flowfield = new Array(cols * rows);

    noLoop();


    //UI Stuff - probably move to bootstrap
    /*
    piSlider = createSlider(1, 10);
    piSlider.position(1, 10);
    zSlider = createSlider(0, 10);
    zSlider.position(1, 30);
    checkbox = createCheckbox('Edge Checking', false);
    checkbox.position(1, 50);
    checkbox.changed(myCheckedEvent);
    */
}


function draw() {
    if (started) {
        render()
    }
    fps.html(floor(frameRate()));
}

function start() {
    started = true;
    // Create particles
    particle_limit = document.getElementById("particle_no").value;
    for (var i = 0; i < particle_limit; i++) {
        particles[i] = new Particle();
    }
    loop()
}

function pause() {
    started = false;
    loop()
}

function render() {
    var edge = false;
    var rs = document.getElementById("piMOD").value;
    var zmod = document.getElementById("zMOD").value;
    if (document.getElementById('edge').checked) {
        edge = true
    } else {
        edge = false;
    }
    if (document.getElementById('render_flow').checked) {
        render_flowfield = true;
        background("white")
    } else {
        render_flowfield = false;
    }
    console.log(rs)


    // Generate vector flowfield
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var r = noise(xoff, yoff, zoff) * PI * (rs / 1.5);
            var index = x + y * cols;
            var point_vector = p5.Vector.fromAngle(r);
            point_vector.setMag(0.1);
            flowfield[index] = point_vector;
            xoff += inc;
            if (render_flowfield) {
                stroke(0)
                strokeWeight(1)
                push()
                translate(x * resolution, y * resolution);
                rotate(point_vector.heading());
                line(0, 0, resolution, 0)
                pop()
            }

        }
        yoff += inc;
        zoff += (zmod / 10000);
    }

    // Render cycle for particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].followVector(flowfield);
        particles[i].update();
        particles[i].show();
        if (edge) {
            particles[i].detectEdges();
        }

    }
}

