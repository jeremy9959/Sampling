import define1 from "./04ee2602ed2bbc83@184.js";

function _1(md){return(
md`# Sampling from the Normal Distribution - Animation`
)}

function _start(Inputs){return(
Inputs.button("Restart")
)}

function _SampleSize(Inputs){return(
Inputs.range([0, 100], {label: "Sample Size", step: 1,value:5})
)}

function _limit(Inputs){return(
Inputs.range([100, 10000], {
  label: "Max Number of Samples",
  step: 100,
  value: 1000
})
)}

function _interval(Inputs){return(
Inputs.range([50, 250], {
  label: "Interval",
  step: 50,
  value: 50
})
)}

function _6(samples,md){return(
md`### Number of Samples = ${samples.c+1}`
)}

function _7(nsamples,md){return(
md`#### Histogram of samples, with pdf of t-distribution for ${nsamples-1} degrees of freedom`
)}

function _8(Plot,sample_means,limit,tdata){return(
Plot.plot({
  y: { grid: true, domain: [0, 0.4] },
  x: { domain: [-4, 4] },
  marks: [
    Plot.rectY(
      sample_means,
      Plot.binX(
        {
          y: (a, bin) => {
            return a.length / bin.data.length / (bin.x2 - bin.x1);
          },
          thresholds: limit > 1000 ? 50 : limit / 20
        },
        { fill: "#AAAAAA" }
      )
    ),
    Plot.ruleY([0]),
    Plot.line(tdata, { x: "x", y: "y" })
  ]
})
)}

function _9(md){return(
md`#### The standard normal distribution (with samples and sample mean)`
)}

function _10(Plot,samples,d3,c){return(
Plot.plot({
  y: { grid: true },
  x: { domain: [-4, 4] },
  marks: [
    Plot.dot(samples.s, {
      x: "t",
      y: 0,
      fill: "darkorange",
      fillOpacity: 0.6,
      r: 4
    }),
    Plot.ruleX([d3.mean(samples.s, (x) => x.t)], {
      stroke: "lightgreen",
      strokeWidth: 3
    }),
    Plot.line(c, { x: "x", y: "y", stroke: "steelblue" })
  ]
})
)}

function _c(Normal){return(
new Normal(0, 1).plot().map((a) => ({ x: a.x, y: a.y }))
)}

function _nbins(){return(
1000
)}

function _nsamples(start,SampleSize)
{
  start;
  return SampleSize;
}


function _samplefn(d3){return(
(nsamples) =>
  Array.from({ length: nsamples }, function () {
    return { t: d3.randomNormal(0, 1)() };
  })
)}

async function* _samples(start,limit,samplefn,nsamples,Promises,interval)
{
  start;
  var s_array = Array();
  var i = 0;
  //await Promises.delay(5000);
  do {
    let s = samplefn(nsamples);
    s_array.push(s);
    yield { s: s, accum: s_array, c: i };

    // await barchart.update(newValues).end();
    await Promises.delay(interval);
    i = i + 1;
  } while (i < limit);
}


function _sample_means(samples,nsamples,d3){return(
samples.accum.map(
  (x) =>
    (Math.sqrt(nsamples) * d3.mean(x, (s) => s.t)) / d3.deviation(x, (s) => s.t)
)
)}

function _jstat(require){return(
require("jstat")
)}

function _x(d3){return(
d3.range(-4, 4, 0.01)
)}

function _y(x,jstat,nsamples){return(
x.map((x) => jstat.studentt.pdf(x, nsamples - 1))
)}

function _tdata(d3,x,y){return(
d3.range(x.length).map((i) => ({ x: x[i], y: y[i] }))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof start")).define("viewof start", ["Inputs"], _start);
  main.variable(observer("start")).define("start", ["Generators", "viewof start"], (G, _) => G.input(_));
  main.variable(observer("viewof SampleSize")).define("viewof SampleSize", ["Inputs"], _SampleSize);
  main.variable(observer("SampleSize")).define("SampleSize", ["Generators", "viewof SampleSize"], (G, _) => G.input(_));
  main.variable(observer("viewof limit")).define("viewof limit", ["Inputs"], _limit);
  main.variable(observer("limit")).define("limit", ["Generators", "viewof limit"], (G, _) => G.input(_));
  main.variable(observer("viewof interval")).define("viewof interval", ["Inputs"], _interval);
  main.variable(observer("interval")).define("interval", ["Generators", "viewof interval"], (G, _) => G.input(_));
  main.variable(observer()).define(["samples","md"], _6);
  main.variable(observer()).define(["nsamples","md"], _7);
  main.variable(observer()).define(["Plot","sample_means","limit","tdata"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","samples","d3","c"], _10);
  main.variable(observer("c")).define("c", ["Normal"], _c);
  const child1 = runtime.module(define1);
  main.import("Normal", child1);
  main.variable(observer("nbins")).define("nbins", _nbins);
  main.variable(observer("nsamples")).define("nsamples", ["start","SampleSize"], _nsamples);
  main.variable(observer("samplefn")).define("samplefn", ["d3"], _samplefn);
  main.variable(observer("samples")).define("samples", ["start","limit","samplefn","nsamples","Promises","interval"], _samples);
  main.variable(observer("sample_means")).define("sample_means", ["samples","nsamples","d3"], _sample_means);
  main.variable(observer("jstat")).define("jstat", ["require"], _jstat);
  main.variable(observer("x")).define("x", ["d3"], _x);
  main.variable(observer("y")).define("y", ["x","jstat","nsamples"], _y);
  main.variable(observer("tdata")).define("tdata", ["d3","x","y"], _tdata);
  return main;
}
