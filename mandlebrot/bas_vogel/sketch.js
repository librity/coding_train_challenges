// SOURCE: https://editor.p5js.org/Basz/sketches/RNzUk1pLn

// My firtst Mandelbot set
// following Coding Train Challenge #21
// by Bas Vogel
// june 22, 2021
// URI: https://basvogel.nl

let WID = 400 // width
let HIG = 400 // height
let rb, rt, ib, it // real-bottom/top imaginary b/t
let x, y, pix // Pixel X, Pixel Y, Pixel nr.
let a, b // a = real component, b = immaginary comp.
let as, bs // a and b saved in Loop;
let real, imag // The real- and imaginatry products
let nitr = 100 // number of iterations
let i // just a counter
let R, G, B // some brightness values for RGB
let centerX // starting X
let centerY // starting Y
let Scale // scaling variables (total range)
let ScalingSlider // scaling slider
let ResetButton // a reset button
let MessageButton // just some message

function setup() {
  createCanvas(WID, HIG)
  pixelDensity(1)
  DoReset()
  ScalingSlider = createSlider(1, 10, 2, 1)
  ResetButton = createButton('reset')
  ResetButton.mousePressed(DoReset)
  MessageButton = createButton('Scale: ' + Scale + ' units')
}

function draw() {
  loadPixels()

  rb = centerX - Scale / 2
  rt = centerX + Scale / 2
  ib = centerY - Scale / 2
  it = centerY + Scale / 2

  for (x = 0; x < WID; x++) {
    for (y = 0; y < WID; y++) {
      a = map(x, 0, WID, rb, rt)
      b = map(y, 0, HIG, it, ib)
      as = a
      bs = b

      i = 0
      z = 0
      for (i = 0; i < nitr; i++) {
        real = a * a - b * b
        imag = 2 * a * b
        a = real + as
        b = imag + bs
        if (abs(a + b) > 14) {
          break
        }
      }

      R = map(a, 0, 40, 0, 255)
      G = map(b, 0, 40, 0, 255)
      B = map(i, 0, sqrt(nitr), 0, 255)

      if (i == nitr) {
        R = 0
        G = 0
        B = 0
      }

      pix = (x + y * WID) * 4
      pixels[pix + 0] = R
      pixels[pix + 1] = G
      pixels[pix + 2] = B
      pixels[pix + 3] = 255
    }
  }
  updatePixels()
  //  print("image width in units:" + Scale);
  MessageButton.html('Scale: ' + Scale + ' units')
}

function mousePressed() {
  if (mouseX > 0 && mouseX < WID && mouseY > 0 && mouseY < HIG) {
    centerX = map(mouseX, 0, WID, rb, rt)
    centerY = map(mouseY, 0, HIG, it, ib)
    if (mouseButton === RIGHT) {
      Scale = Scale * ScalingSlider.value()
    } else {
      Scale = Scale / ScalingSlider.value()
    }
  }
}

function DoReset() {
  centerX = -0.5
  centerY = 0
  Scale = 4
}
