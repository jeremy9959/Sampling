---
theme: dashboard
toc: false
---

```js
import jstat from "npm:jstat";
```

```js
var samplefn = (nsamples) =>
  Array.from({ length: nsamples }, function () {
    return { t: d3.randomNormal(mean, sd)() };
  });
```

```js
var sd = 1;
var mean = 0;
var c = d3.range(-4, 4, 0.01).map((x) => {
  return { x: x, y: jstat.normal.pdf(x, 0, 1) };
});
var tdata = d3.range(-4, 4, 0.01).map((x) => {
  return { x: x, y: jstat.studentt.pdf(x, nsamples - 1) };
});
```

# Sampling from the standard normal distribution

Illustrating the t-distribution arising from samples from a normal distribution.

```js
const resetInput = Inputs.button("Restart");
const reset = Generators.input(resetInput)
```

```js
const nsamplesInput = Inputs.range([1, 30], {
  step: 1,
  value: 5,
  label: "Sample Size",
});
const nsamples = Generators.input(nsamplesInput)
```

```js
const limitInput = Inputs.range([100, 10000], {
  step: 20,
  value: 500,
  label: "Max number of samples",
});
const limit = Generators.input(limitInput)
```

```js
const interInput = Inputs.range([1, 1000], {
  step: 100,
  value: 100,
  label: "Time interval between samples",
});
const inter = Generators.input(interInput)
```

<div class = "grid grid-cols-2">
<div class = "card grid-colspan-2">${resetInput} ${interInput} ${limitInput} ${nsamplesInput}</div>
</div>
<div class="grid grid-cols-2">
<div class="card">${normal_plot}</div>
<div class="card">${thist} </div>
</div>

```js
var normal_plot = Plot.plot({
  title: html`<h2>
    Standard Normal Distribution with Samples and Sample Mean
  </h2>`,
  y: { grid: true },
  x: { domain: [-4, 4] },
  marks: [
    Plot.dot(samples.m, {
      x: "t",
      y: 0,
      fill: "darkorange",
      fillOpacity: 0.6,
      r: 4,
    }),
    Plot.ruleX([d3.mean(samples.m, (x) => x.t)], {
      stroke: "lightgreen",
      strokeWidth: 3,
    }),
    Plot.line(c, { x: "x", y: "y", stroke: "steelblue" }),
  ],
});
```

```js
var thist = Plot.plot({
  title: html`<h2>
    T-distribution for ${nsamples - 1} degrees of freedom and ${samples.ct}
    samples out of ${limit}
  </h2>`,
  y: { grid: true, domain: [0, 0.4] },
  x: { domain: [-4, 4] },

  marks: [
    Plot.rectY(
      tstats,
      Plot.binX(
        {
          y: (a, bin) => {
            return (
              ((samples.ct / limit) * a.length) /
              bin.data.length /
              (bin.x2 - bin.x1)
            );
          },
          thresholds: d3.range(-4, 4.2, 0.2),
        },
        { fill: "#AAAAAA" }
      )
    ),
    Plot.ruleY([0]),
    Plot.line(tdata, { x: "x", y: "y" }),
  ],
});
```

```js
reset;
const samples = (async function* () {
  var allm = [];
  for (let j = 0; j <= limit; ++j) {
    const s = samplefn(nsamples);
    allm.push(s);
    yield { m: s, accum: allm, ct: j };
    await new Promise((resolve, reject) => setTimeout(resolve, inter));
  }
})();
```

```js
var tstats = samples.accum.map(
  (x) =>
    (Math.sqrt(nsamples) * d3.mean(x, (x) => x.t)) /
    d3.deviation(x, (x) => x.t)
);
```
