const WIDTH = 710
const HEIGHT = 400

const ZOOM = 1 / 500

function getPixelIndex(x, y) {
  return (x + y * WIDTH) * 4
}

function calculateBrightness(diverges, iterations) {
  if (diverges) return 0

  const normalized = map(iterations, 0, MANDLEBROT_DEPTH, 0, 1)
  const brightness = map(Math.sqrt(normalized), 0, 1, 0, 255)

  return brightness
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  pixelDensity(1)
  noLoop()

  loadPixels()

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const pix = getPixelIndex(x, y)

      const complex = new ComplexNumber(x * ZOOM, y * ZOOM)
      const [diverges, iterations] = complex.checkMandlebrot()
      const brightness = calculateBrightness(diverges, iterations)

      pixels[pix + 0] = brightness // red
      pixels[pix + 1] = brightness // green
      pixels[pix + 2] = brightness // blue
      pixels[pix + 3] = 255 // alpha
    }
  }

  updatePixels()
  console.log('Done')
}

// function draw() {
//   // background(220)
// }
