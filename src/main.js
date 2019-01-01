import color from './color';
let src = require('./images/11.png')
require('./index.css')
require('./myless.less')
require('./mysass.scss')

let img = new Image();
img.src=src;
document.body.appendChild(img);

console.log(color);

let getColor = ()=>{
  return color
}