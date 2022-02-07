let HALF_WIDTH
let HALF_HEIGHT

const xOffset = 0
const yOffset = 0

const ZOOM = 500

const blueWeight = 0.3
const redWeight = 0.7
const greenWeight = 0.5
const ALPHA = 255

function getPixelIndex(x, y) {
  return (x + y * width) * 4
}

function getZoomedX(x) {
  return (x - HALF_WIDTH + xOffset) / ZOOM
}

function getZoomedY(y) {
  return (y - HALF_HEIGHT + yOffset) / ZOOM
}

function getCartesian(x, y) {
  return [getZoomedX(x), getZoomedY(y)]
}

function calculateColor(iterations) {
  const normalized = map(iterations, 0, MANDLEBROT_DEPTH, 0, 1)
  let brightness = map(Math.sqrt(normalized), 0, 1, 0, 255 * 3)

  if (brightness < 0) {
    brightness = 0
  }
  const blue = brightness * blueWeight
  brightness -= 255
  const red = brightness * redWeight
  brightness -= 255
  const green = brightness * greenWeight

  return [red, green, blue]
}

function setPixel(pixelIndex, red, green, blue, alpha) {
  pixels[pixelIndex + 0] = red
  pixels[pixelIndex + 1] = green
  pixels[pixelIndex + 2] = blue
  pixels[pixelIndex + 3] = alpha
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  noLoop()

  HALF_WIDTH = width / 2
  HALF_HEIGHT = height / 2
}

function draw() {
  loadPixels()

  for (let xCanvas = 0; xCanvas < width; xCanvas++) {
    for (let yCanvas = 0; yCanvas < height; yCanvas++) {
      const pixelIndex = getPixelIndex(xCanvas, yCanvas)
      const [xCartesian, yCartesian] = getCartesian(xCanvas, yCanvas)

      const complexAtXY = new ComplexNumber(xCartesian, yCartesian)
      const [_, iterations] = complexAtXY.checkMandlebrot()
      const [red, green, blue] = calculateColor(iterations)

      setPixel(pixelIndex, red, green, blue, ALPHA)
    }
  }

  updatePixels()
  console.log('Mandlebrot done')
}

function keyTyped() {
  if (key === 's') {
    saveCanvas(`mandlebrot_${Date.now()}`, 'png')
    return
  }

  if (key === 'f') {
    let fs = fullscreen()
    fullscreen(!fs)
    return
  }
}
