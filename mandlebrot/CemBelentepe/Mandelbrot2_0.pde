// SOURCE: https://github.com/CemBelentepe/MandelbrotSetVisualized

// Created by Cemalettin Cem Belentepe
// Click any point on the screen to select it as a center.
// You can press z to toggle clicking to select center. 
// By pressing '+' or '-' you can magnify to selected center.
// By pressing 'e' max iteration to drawing screen will increase.
// By pressing 'q' max iteration to drawing screen will decrease.
// You can press '1' to change palette forward or '2' to change palette backward.
// You can press '3' to change the way palette works.
// (iterations and position is used for coloring. This button will let you switch from pixel to cartesian coordinates.)
// By pressing 'r' selected center and magnification will be resetted.
// And you can change step variable bellow to draw more points at a frame but I think 10 is fine.
// Also you can check my channel if you know some Turkish :)
// http://www.youtube.com/channel/UCQ0kj89I9Bsoop-YNwjUreg

int maxn = 50; // maximum iterations
float maxposX = 2; // half of the distance on the plane between left to right of the screen
float maxposY; // depending on the maxposX, half of the distance on the plane between top to bottom of the screen.
PVector origin; // selected center to draw
int p = 0; // current pixel for drawing
float dx; // 1 pixel increment on x-axis(width)
float dy; // 1 pixel increment on y-axis(height)
float y; // if selected c = a+bi, y = b 
int step = 10; // how many calculations will be made in a frame

int cMode = 0; // coloring mode

boolean zoomMode = true; // toggling zoom
boolean colorMode2 = true; // switch for from pixel to cartesian coordinates

void setup() {
  fullScreen();
  colorMode(HSB, 1);
  origin = new PVector(0, 0);
  maxposY = maxposX/width * height;
  dx = (2.0*maxposX)/width;
  dy = (2.0*maxposY)/height;
  y = -maxposY - origin.y;
  background(0, 0, 1);
}

int j = 0; // jth pixel on the row in the process

void mousePressed() {
  float posX = map(mouseX, 0, width, origin.x + maxposX, origin.x - maxposX);
  float posY = map(mouseY, 0, height, origin.y + maxposY, origin.y - maxposY);
  println(posX, posY);
  if (zoomMode) {
    origin = new PVector(posX, posY);
    reset();
  }
}

// Redraws the screen
void reset() {
  if (maxn <= 1) maxn = 10;
  j = 0;
  p = 0;
  maxposY = maxposX/width * height;
  dx = (2.0*maxposX)/width;
  dy = (2.0*maxposY)/height;
  y = -maxposY - origin.y;
  redraw();
}

void keyPressed() {
  if (key == 'z') {
    zoomMode = !zoomMode;
    println("zoom " + zoomMode);
  }
  if (key == '+') {
    maxposX /= 2;
    reset();
  }
  if (key == '-') {
    maxposX *= 2;
    reset();
  }
  if (key == 'r') {
    maxposX = 2;
    origin = new PVector(0, 0);
    reset();
  }
  if (key == 'q') {
    maxn /= 5;
    reset();
  }
  if (key == 'e') {
    maxn *= 5;
    reset();
  }
  if (key == '1') {
    cMode--;
    reset();
  }
  if (key == '2') {
    cMode++;
    reset();
  }
  if (key == '3') {
    colorMode2 = !colorMode2;
    reset();
  }
}

void draw() {
  loadPixels();
  for (int l = 0; l < step; l++) {
    if (j < height) {
      float x = -maxposX - origin.x;
      for (int i = 0; i < width; i++) {
        float a = x;
        float b = y;
        int n = 0;
        while (n < maxn) {
          float aa = a * a;
          float bb = b * b;
          float twoab = 2.0 * a * b;
          a = aa - bb + x;
          b = twoab + y;
          if (a*a + b*b > 4) {
            break;
          }
          n++;
        }
        color c;
        if (colorMode2) {
          c = getColor(n, a, b);
        } else {
          c = getColor(n, i, j);
        }
        pixels[p] = c;

        p++;
        x+=dx;
      }
      y+=dy;
      j++;
    }
  }
  updatePixels();
  textSize(18);
  text("posX: " + origin.x, 10, 20);
  text("posY: " + origin.y, 10, 40);
  text("magnification: " + 1/maxposX, 10, 60);
}

// Returns the color for coloring the pixel
color getColor(float n, float a, float b) {
  color c = color(0);
  if (n != maxn) {
    switch(cMode) {
    case 0:
      c = color((n/maxn)); 
      break;
    case 1: 
      c = color(sqrt(n/maxn), 255, 255); 
      break;
    case 2:
      c = color(cos(2*n), sin(n), log(10*n));
      break;
    case 3:
      c = color((1-cos(n))/2, (1-cos(2*n))/2, (1-cos(3*n))/2 );
      break;
    case 4:
      float k = log(log(a*a - b*b))/log(2);
      c = color(0.95 + 10*k, 0.6, 1.0); 
      break;
    case 5: 
      c = color(sqrt(a/width), sqrt(b/height), (n/maxn));
      break;
    case 6: 
      c = color(sqrt(n/maxn), sqrt(a/maxposX), sqrt(b/maxposY));
      break;
    case 7: 
      c = color(sqrt(n/maxn), sqrt(abs(a)/maxposX), sqrt(abs(b)/maxposY));
      break;
    case 8: 
      c = color(sqrt((a*a+b*b)/(16.0))%1, 1, 1);
      break;
    case 9: 
      c = color((n/maxn), ((a+maxposX)/maxposX/2), ((b+maxposY)/maxposY/2));
      break;
    default: 
      cMode = 1;
    }
  }
  return c;
}
