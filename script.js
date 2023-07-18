var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Wave {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;
    this.xMove = this.options.offset;
    this.xSpeed = this.options.xSpeed;
    this.amplitude = this.options.amplitude * canvas.height;
    this.resize();
    window.addEventListener('resize', () => {this.resize()}, false);
  }
  
  resize(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.amplitude = this.options.amplitude * this.canvas.height;
  }
  
  draw(){
    ctx.save();
    ctx.translate(0, this.canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(0,0);
    // ctx.strokeStyle = '#f00';
    var grad = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    grad.addColorStop(0, this.options.start);
    grad.addColorStop(1, this.options.stop);
    ctx.strokeStyle = grad;
    this.xMove += this.xSpeed;
    for(var x = 0; x < this.canvas.width; x++){
      const radians = x / this.canvas.width * Math.PI * 2;
      const scale = (Math.sin(radians - Math.PI * 2) + 1) * 0.5;
      const y = Math.sin(x * 0.02 + this.xMove) * this.amplitude * scale;
      ctx.lineTo(x, y);
    }
    // ctx.closePath();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

const gradients = [
  ['#D13A75', '#773487'],
  ['#32A4DE', '#3281DE'],
  ['#329461', '#20A182'],
  ['#EFA754', '#EF7954'],
  ['#007adf', '#00ecbc'],
  ['#B6CEE8', '#F578DC'],
 ['#D13A75', '#773487'],
];
let waves = [];
const initWaves = () => {
  for(var i = 0; i < 6; i++){
    const [start, stop] = gradients[Math.floor(Math.random() * gradients.length)]
    waves.push(new Wave(canvas, {
      start: start,
      stop: stop,
      lineWidth: 1.5,
      xSpeed: valueMapping(Math.random(), 0, 100, -0.02, -0.02),
      amplitude: valueMapping(Math.random(), 0, 1.75, 0.025, 0.5),
      offset: Math.random() * 100
    }));
  }
}
initWaves();

(function drawFrame () {
  window.requestAnimationFrame(drawFrame, canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  waves.forEach(wave => {
    wave.draw(ctx);
  })
}());

// ????
function valueMapping (x, inMin, inMax, outMin, outMax) {
  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
