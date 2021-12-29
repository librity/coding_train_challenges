function setup() {
  createCanvas(400, 400)
  pixelDensity(1)

  loadPixels()

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pixelIndex = (x + y * width) * 4

      pixels[pixelIndex + 0] = 2
      pixels[pixelIndex + 1] = 2
      pixels[pixelIndex + 2] = 2
      pixels[pixelIndex + 3] = 255
    }
  }

  updatePixels()
}

function draw() {
  background(220)
}
