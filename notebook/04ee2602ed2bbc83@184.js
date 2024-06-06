// https://observablehq.com/@sscollis/distributions@184
import define1 from "./7764a40fe6b83ca1@437.js";

function _1(md){return(
md`# Distributions`
)}

function _2(md){return(
md`Provides easy access to several probability distributions`
)}

function _3(md){return(
md`## Normal Distribution`
)}

function _plotNormal(Normal,vl)
{
  const mu = 0, sigma = 1;
  var normal = new Normal(0,1,100);
  return vl.markLine().title(`Normal Distribution, mean=${mu}, standard deviation=${sigma}`)
    .data(normal.plot(1))
    .encode(
       vl.x().fieldQ("x"),
       vl.y().fieldQ("y")
    )
    .render();
}


function _Normal(){return(
class Normal {
  constructor(mu=0,sigma=1,n=100) {
    this.mu  = mu;
    this.sigma = sigma;
    this.n = n;
    this.min = 1.0;
  }
  pdf(x) {
    const fact=1.0/(this.sigma*Math.sqrt(2.0*Math.PI));
    return fact*Math.exp(-0.5*((x-this.mu)/this.sigma)**2.0);
  }
  plot() {
    var data = [];
    let xmin = this.mu-5.0*this.sigma;
    let xmax = this.mu+5.0*this.sigma;
    const dx = (xmax-xmin)/this.n;
    for (let i=0; i<100; i++) {
      const x = xmin+i*dx;
      data.push( {"x": x, "y": this.pdf(x) });
    }
    return data;
  }
  sample() {
    const epsilon = Number.MIN_VALUE;
    const twoPI = 2.0*Math.PI;
    if (this.sigma==0) return this.mu;
    var u1, u2;
    do {
      u1 = Math.random();
      u2 = Math.random();
    } while (u1 <= epsilon);
    var z0 = Math.sqrt(-2.0*Math.log(u1))*Math.cos(twoPI*u2);
    var z1 = Math.sqrt(-2.0*Math.log(u1))*Math.sin(twoPI*u2);
    return Math.max(this.min,z0 * this.sigma + this.mu);
  }
}
)}

function _6(md){return(
md`Erlang-k Distribution`
)}

function _plotErlang(Erlang,vl)
{
  const mu=1, k=2;
  var dist = new Erlang(1,2,100);
  return vl.markLine().title(`Erlang Distribution with scale, mu=${mu} and shape, k=${k}`)
    .data(dist.plot(1))
    .encode(
       vl.x().fieldQ("x"),
       vl.y().fieldQ("y")
    )
    .render();
}


function _Erlang(mathjs){return(
class Erlang {
  constructor(mu=1, k=2, n=100) {
    this.k = k;
    this.lambda = 1.0/mu;
    this.mu = mu;
    this.mean = this.k/this.lambda;
    this.n = n;
    this.min = 1.0;
  }
  pdf(x) {
    const fact=1.0/mathjs.gamma(this.k);
    return this.lambda**this.k*x**(this.k-1)*Math.exp(-this.lambda*x)*fact;
  }
  plot() {
    var data = [];
    let xmin = 0;
    let xmax = 5.0*this.mean;
    const dx = (xmax-xmin)/this.n;
    for (let i=0; i<this.n; i++) {
      const x = xmin+i*dx;
      data.push( {"x": x, "y": this.pdf(x) } );
    }
    return data;
  }
  sample() {
    if (this.k==0) return this.mean;
    let prod = Math.random();
    for (let i=1; i<this.k; i++) {
      prod *= Math.random();
    }
    return Math.max(this.min,-1.0/this.lambda*Math.log(prod));
  }
}
)}

function _9(md){return(
md`## Log Normal Distribution`
)}

function _plotLogNormal(LogNormal,vl)
{
  const mu = 0;
  const sigma = 0.25;
  var dist = new LogNormal(mu,sigma,100);
  return vl.markLine().title(`LogNormal Distribution, mu=${mu}, sigma=${sigma}`)
    .data(dist.plot(1))
    .encode(
       vl.x().fieldQ("x"),
       vl.y().fieldQ("y")
    )
    .render();
}


function _LogNormal(){return(
class LogNormal {
  constructor(mu=1,sigma=1,n=100) {
    this.mu  = mu;
    this.sigma = sigma;
    this.mean = Math.exp(this.mu+(this.sigma**2)*0.5);
    this.n = n;
    this.min = 1.0;
  }
  pdf(x) {
    const fact=1.0/(x*this.sigma*Math.sqrt(2.0*Math.PI));
    return fact*Math.exp(-0.5*((Math.log(x)-this.mu)/this.sigma)**2.0);
  }
  plot() {
    var data = [];
    let xmin = 0;
    let xmax = this.mu + 10.0*this.sigma;
    const dx = (xmax-xmin)/this.n;
    for (let i=0; i<this.n; i++) {
      const x = xmin+i*dx;
      data.push( {"x": x, "y": this.pdf(x) } );
    }
    return data;
  }
  sample() {  // Using the Box-Muller Transform
    const epsilon = Number.MIN_VALUE;
    const twoPI = 2.0*Math.PI;
    if (this.sigma==0) return this.mu;
    var u1, u2;
    do {
      u1 = Math.random();
      u2 = Math.random();
    } while (u1 <= epsilon);
    var z0 = Math.sqrt(-2.0*Math.log(u1))*Math.cos(twoPI*u2);
    var z1 = Math.sqrt(-2.0*Math.log(u1))*Math.sin(twoPI*u2);
    return Math.max( this.min, Math.exp(this.mu+this.sigma*z0) );
  }
}
)}

function _12(md){return(
md`## Gamma Distribution`
)}

function _plotGamma(Gamma,vl)
{
  const k = 2;
  const theta = 2;
  var dist = new Gamma(theta,k,100);
  return vl.markLine().title(`Gamma Distribution, k=${k}, theta=${theta}`)
    .data(dist.plot(1))
    .encode(
       vl.x().fieldQ("x"),
       vl.y().fieldQ("y")
    )
    .render();
}


function _Gamma(jstat){return(
class Gamma {
  constructor(mu=1, k=2, n=100) {
    this.k = k;
    this.mu = mu;
    this.mean = jstat.gamma.mean(this.k,this.mu);
    this.n = n;
    this.min = 1.0;
  }
  pdf(x) {
    return jstat.gamma.pdf(x,this.k,this.mu);
  }
  plot() {
    var data = [];
    let xmin = 0;
    let xmax = 5.0*this.mean;
    const dx = (xmax-xmin)/this.n;
    for (let i=0; i<this.n; i++) {
      const x = xmin+i*dx;
      data.push( {"x": x, "y": this.pdf(x) } );
    }
    return data;
  }
  sample() {
    return Math.max(this.min,jstat.gamma.sample(this.k,this.mu));
  }
}
)}

function _15(md){return(
md`## Appendix`
)}

function _16(md){return(
md`Vega-lite is a rapid plotting package`
)}

function _18(md){return(
md`mathjs provides a range of mathematical functions and constants`
)}

function _mathjs(require){return(
require("https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.4.0/math.js")
)}

function _20(md){return(
md`jStat provides a wide range statistical capabilities`
)}

function _jstat(require){return(
require("https://cdnjs.cloudflare.com/ajax/libs/jstat/1.9.0/jstat.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof plotNormal")).define("viewof plotNormal", ["Normal","vl"], _plotNormal);
  main.variable(observer("plotNormal")).define("plotNormal", ["Generators", "viewof plotNormal"], (G, _) => G.input(_));
  main.variable(observer("Normal")).define("Normal", _Normal);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof plotErlang")).define("viewof plotErlang", ["Erlang","vl"], _plotErlang);
  main.variable(observer("plotErlang")).define("plotErlang", ["Generators", "viewof plotErlang"], (G, _) => G.input(_));
  main.variable(observer("Erlang")).define("Erlang", ["mathjs"], _Erlang);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof plotLogNormal")).define("viewof plotLogNormal", ["LogNormal","vl"], _plotLogNormal);
  main.variable(observer("plotLogNormal")).define("plotLogNormal", ["Generators", "viewof plotLogNormal"], (G, _) => G.input(_));
  main.variable(observer("LogNormal")).define("LogNormal", _LogNormal);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof plotGamma")).define("viewof plotGamma", ["Gamma","vl"], _plotGamma);
  main.variable(observer("plotGamma")).define("plotGamma", ["Generators", "viewof plotGamma"], (G, _) => G.input(_));
  main.variable(observer("Gamma")).define("Gamma", ["jstat"], _Gamma);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("mathjs")).define("mathjs", ["require"], _mathjs);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("jstat")).define("jstat", ["require"], _jstat);
  return main;
}
