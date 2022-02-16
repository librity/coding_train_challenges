const z = new ComplexNumber(3, 4)
const w = new ComplexNumber(5, 6)

console.log('magnitude:', z.magnitude())
console.log('conjugate:', z.conjugate())
console.log('squared:', z.squared())
console.log('squareRoot:', z.squareRoot())

console.log('plus:', z.plus(w))
console.log('minus:', z.minus(w))
console.log('times:', z.times(w))
console.log('by:', z.by(w))

console.log('checkMandlebrot:', z.checkMandlebrot())
console.log('checkJulia:', z.checkJulia(w))
