// SOURCE: https://github.com/mylak005/Contributions/blob/MatrixRain/BurningShip/Burning_Ship_Fractal.pde

void setup() {
  size(3600,2400);
  colorMode(RGB, 1);
}
void draw() {
  background(255);
  noLoop();
  float xmin = -1.8;
  float ymin = -0.055; 
  loadPixels();
  int maxiterations = 100;
  float xmax = -1.7;
  float ymax = 0.02;
  float dx = (xmax - xmin) / (width);
  float dy = (ymax - ymin) / (height);
  float y = ymin;
  for (int j = 0; j < height; j++)  {
     float x = xmin;
     for (int i = 0; i < width; i++) {
       float a = x;
       float b = y;
       int n = 0;
       while (n < maxiterations) {
         float aa = a * a;
         float bb = b * b;
         float twoab = 2.0 * a * b;
         float atemp = aa - bb + x;
         a = abs(atemp);
         b = abs(twoab + y);
         if (a * a + b * b > 16.0) {
           break; 
         }
         n++;
       }
       if (n == maxiterations) {
         pixels[i + j * width] = color(0);
       } else {
         float hue = sqrt(float(n) / maxiterations);
         pixels[i + j * width] = color(hue);
       }
       x += dx;
     }
     y += dy;
  }
  updatePixels();
  save("burning_ship.jpg");
}