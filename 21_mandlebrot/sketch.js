const width = 400
const height = 400

function setup() {
  createCanvas(width, height)
  pixelDensity(1)

  loadPixels()

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pix = (x + y * width) * 4

      pixels[pix + 0] = 51 // red
      pixels[pix + 1] = 51 // green
      pixels[pix + 2] = 51 // blue
      pixels[pix + 3] = 255 // alpha
    }
  }

  updatePixels()
}

function draw() {
  // background(220)
}
