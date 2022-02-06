const MANDLEBROT_DEPTH = 100
const MANDLEBROT_INFINITY = 16

class ComplexNumber {
  real
  imaginary

  constructor(real, imaginary) {
    this.real = real
    this.imaginary = imaginary
  }

  magnitude() {
    const magnitude = Math.sqrt(
      this.real * this.real + this.imaginary * this.imaginary,
    )

    return magnitude
  }
  modulus() {
    return this.magnitude()
  }
  absoluteValue() {
    return this.magnitude()
  }

  conjugate() {
    const newReal = this.real
    const newImaginary = -this.imaginary

    return new ComplexNumber(newReal, newImaginary)
  }

  squared() {
    return this.times(this)
  }

  squareRoot() {
    // z = x + yI
    // sqrt(z) = +-(gamma + I * delta)
    // gamma = sqrt((x + sqrt(x * x + y * y)) / 2)
    // delta = sqrt((-x + sqrt(x * x + y * y)) / 2)

    const rootOfSquareSum = Math.sqrt(
      this.real * this.real + this.imaginary * this.imaginary,
    )
    const newReal = Math.sqrt((this.real + rootOfSquareSum) / 2)
    const newImaginary = Math.sqrt((-this.real + rootOfSquareSum) / 2)

    return new ComplexNumber(newReal, newImaginary)
  }

  plus(addend) {
    const newReal = this.real + addend.real
    const newImaginary = this.imaginary + addend.imaginary

    return new ComplexNumber(newReal, newImaginary)
  }

  minus(subtrahend) {
    const newReal = this.real - subtrahend.real
    const newImaginary = this.imaginary - subtrahend.imaginary

    return new ComplexNumber(newReal, newImaginary)
  }

  times(multiplicand) {
    // (x + Iy) * (u + Iv) = (xu - yv) + I * (xv + yu)
    const newReal =
      this.real * multiplicand.real - this.imaginary * multiplicand.imaginary
    const newImaginary =
      this.real * multiplicand.imaginary + this.imaginary * multiplicand.real

    return new ComplexNumber(newReal, newImaginary)
  }

  by(divisor) {
    // w = u + vI
    // z = x + yI
    // w / z = ( (ux + vy) / (x*x + y*y) ) + I * (vx + uy) / (x*x + y*y)

    const denominator =
      divisor.real * divisor.real + divisor.imaginary * divisor.imaginary

    const newReal =
      (this.real * divisor.real + this.imaginary * divisor.imaginary) /
      denominator
    const newImaginary =
      (this.imaginary * divisor.real + this.real * divisor.imaginary) /
      denominator

    return new ComplexNumber(newReal, newImaginary)
  }

  checkMandlebrot() {
    // F0 = 0 * 0 + this
    // F1 = F0.squared().plus(this)
    // F2 = F1.squared().plus(this)
    // (...)
    // Fn = Fn-1.squared().plus(this)

    let current = this
    let iteration = 0

    while (iteration++ < MANDLEBROT_DEPTH) {
      if (current.magnitude() > MANDLEBROT_INFINITY) return [true, iteration]

      current = current.squared().plus(this)
    }

    return [false, iteration]
  }
}
