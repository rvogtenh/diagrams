var img;
var osc = [];
var playing = [];
var points = [];
var freq = [];
var colour = [];
var display;
var env = [];
var fact = 2;
var kons = 95040*fact;
var relation, a = 2.12, b = 2.04;

function preload() {
  img = loadImage('images/1656_descartes_HexachordCircle_brockt_1978_40.jpg');
};

function setVar() {
      if (img.width/img.height > windowWidth/windowHeight)
    {relation = windowWidth/img.width}
    else {relation = windowHeight/img.height};

  console.log("Grösse des images", img.width, img.height, relation);
}
function setupPoints() {

  x = a * relation; 
  y = b * relation;
  //relation =1;

  points[0] = [343*x, 115*y, 470*x, 240*y, 420*x, 440*y, 335*x, 490*y, 152*x, 440*y, 105*x, 252*y];
  points[1] = [185*x, 405*y, 148*x, 264*y, 252*x, 160*y, 330*x, 160*y, 430*x, 268*y, 388*x, 408*y];
  points[2] = [382*x, 277*y, 358*x, 375*y, 265*x, 398*y, 218*x, 373*y, 195*x, 266*y, 263*x, 204*y];
  
  //points[0].map(function(x) {return x * relation});

  console.log("Points", points);

  freq[0] = [kons/540, kons/486, kons/432, kons/405, kons/360, kons/324];
  freq[1] = [kons/360, kons/324, kons/288, kons/540, kons/480, kons/432];
  freq[2] = [kons/480, kons/432, kons/384, kons/360, kons/320, kons/288];
  
  colour[0] = [200, 100, 100, 100];
  colour[1] = [100, 200, 100, 100];
  colour[2] = [100, 100, 200, 100];
};

function setup() {

  setVar();
  createCanvas( windowWidth, windowHeight );
  background(255);
  image(img, 0, 0, img.width*relation, img.height*relation);
  setupPoints();
  

  for (var i=0; i<3; i++) {
    osc[i] = [];
    playing[i] = [];
    setOsc(i);
    setPoints(i);
  };
  setButton();

}

function setButton () {
  fill(150);
  text("Click points to play", 30*a*relation, 50*b*relation);
  text("F = " + kons/540 + " Hz", 500*a*relation, 170*b*relation);
  button = createButton('stop sound');
  button.position(30*a*relation, 60*b*relation);
  button.mousePressed(stopSound);
  

  fill(240);
  rect(480*a*relation, 0, 100*a*relation, 150*b*relation);
};

function stopSound () {
  for (zahl= 0; zahl<3; zahl++) {
    for (i=0; i < freq[zahl].length; i++) {
      playing[zahl][i]=false;
      osc[zahl][i].amp(0);
    }
  }
  fill(240);
  rect(48, 0, 100, 150);
  
}

function setOsc(zahl) {
  
  envelope(zahl, 0);
  
  for (i=0; i < freq[zahl].length; i++) {
    playing[zahl][i]=false;
    osc[zahl][i] = new p5.Oscillator();
    osc[zahl][i].setType('sine');
    osc[zahl][i].freq(freq[zahl][i]);
    osc[zahl][i].amp(0);
    osc[zahl][i].start();
  };
};

function setPoints(zahl) {
  
  noStroke(); 
  fill(colour[zahl]);
  
  for (i=0; i < points[zahl].length; i=i+2) {
  ellipse(points[zahl][i],points[zahl][i+1],20*a*relation,20*a*relation);
  };
};

// When the user clicks the mouse
function mouseClicked() {
  
  for (zahl = 0; zahl<3; zahl ++) {
    for (i=0; i < freq[zahl].length; i++) {
    // Check if mouse is inside the circle
    var d = dist(mouseX, mouseY, points[zahl][i*2], points[zahl][(i*2)+1]);
    if (d < 10) {
    // look if the sound already plays or not
      if (!playing[zahl][i]) {
        // ramp amplitude to 0.2 over 0.2 seconds
    osc[zahl][i].amp(0.2, 0.2);
        fill(colour[zahl]);
        display = text(round(freq[zahl][i]), 490*a*relation+zahl*30, 20*b*relation+i*20);
      playing[zahl][i] = true;
        
      } else {
       // ramp amplitude to 0 over 0.2 seconds
      osc[zahl][i].amp(0, 0.2, 0.2);
        fill(240);
        rect(490*a*relation+zahl*30, 20*b*relation+(i-1)*20, 20*a*relation, 20*a*relation);
        playing[zahl][i] = false;
      }
  }
    }
  }

};

function draw() {
  
  //background(220, 220, 220);

};

function envelope (zahl, x) {
    var aT = 0.1; // attack time in seconds
    var aL = 0.7; // attack level 0.0 to 1.0
    var dT = 0.3; // decay time in seconds
    var dL = 0.1; // decay level  0.0 to 1.0
    var sT = 0.2; // sustain time in seconds
    var sL = dL; // sustain level  0.0 to 1.0
    var rT = 0.5; // release time in seconds
// release level defaults to zero
};

