const WIDTH = 1920
const HEIGHT = 1080

const HALF_WIDTH = WIDTH / 2
const HALF_HEIGHT = HEIGHT / 2

const xOffset = 0
const yOffset = 0

const ZOOM = 300

const ALPHA = 255

let juliaFactor
// juliaFactor = new ComplexNumber(3, 4)
// juliaFactor = new ComplexNumber(5, 6)
// juliaFactor = new ComplexNumber(0.3, 0.4)
// juliaFactor = new ComplexNumber(-2, 0.0)
// juliaFactor = new ComplexNumber(-1, 0.0)
// juliaFactor = new ComplexNumber(-0, 0.0)
// juliaFactor = new ComplexNumber(-1, 0.0)
// juliaFactor = new ComplexNumber(-2, 0.0)
// juliaFactor = new ComplexNumber(-3, 0.0)
// Dendrite fractal
juliaFactor = new ComplexNumber(0.0, 1.0)
// // Douady's rabbit fractal
// juliaFactor = new ComplexNumber(-0.123, 0.745)
// // San Marco fractal
// juliaFactor = new ComplexNumber(-0.75, 0.0)
// // Siegel disk fractal
// juliaFactor = new ComplexNumber(-0.391, -0.587)

function getPixelIndex(x, y) {
  return (x + y * WIDTH) * 4
}

function getCartesianX(x) {
  return (x - HALF_WIDTH + xOffset) / ZOOM
}

function getCartesianY(y) {
  return (y - HALF_HEIGHT + yOffset) / ZOOM
}

function getCartesian(x, y) {
  return [getCartesianX(x), getCartesianY(y)]
}

function calculateBrightness(iterations) {
  const normalizedIterations = map(iterations, 0, MANDLEBROT_DEPTH, 0, 1)
  const brightness = map(Math.sqrt(normalizedIterations), 0, 1, 0, 255)

  return brightness
}

function setPixel(pixelIndex, red, green, blue, alpha) {
  pixels[pixelIndex + 0] = red
  pixels[pixelIndex + 1] = green
  pixels[pixelIndex + 2] = blue
  pixels[pixelIndex + 3] = alpha
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
  noLoop()

  loadPixels()

  for (let xCanvas = 0; xCanvas < WIDTH; xCanvas++) {
    for (let yCanvas = 0; yCanvas < HEIGHT; yCanvas++) {
      const pixelIndex = getPixelIndex(xCanvas, yCanvas)
      const [xCartesian, yCartesian] = getCartesian(xCanvas, yCanvas)

      const complexAtXY = new ComplexNumber(xCartesian, yCartesian)
      const [_, iterations] = complexAtXY.checkJulia(juliaFactor)
      const brightness = calculateBrightness(iterations)

      setPixel(pixelIndex, brightness, brightness, brightness, ALPHA)
    }
  }

  updatePixels()
  console.log('Mandlebrot done')
}

// function draw() {
//   // background(220)
// }
