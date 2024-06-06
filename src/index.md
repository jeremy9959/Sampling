```js
import jstat from "npm:jstat"
```

```js
var samplefn = (nsamples) =>
  Array.from({ length: nsamples }, function () {
    return { t: d3.randomNormal(mean, sd)() };
  })
```
## The standard normal distribution



```js
function NormalPdfPlot(mean,std) {
    var ndata = d3.range(-10,10,.01).map((x) => ({ x: x, y: jstat.normal.pdf(x,mean,std)}))
    return Plot.plot({
     x: {domain: [-10,10], grid: true},
    y: { grid: true,domain: [0,.5]},
     marks: [
        Plot.ruleY([0]),
        Plot.line(ndata, {x:"x",y:"y", stroke: "green"}),
    ]})

}
```

```js
const j = (async function* () {
  for (let j = 0; true; ++j) {
    yield samplefn(5);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
})();
```

```js
display(d3.mean(j.map((x)=>x.t)))
```






```js
const mean = view(Inputs.range([-2,2],{step: .25, label: "mean",value:0}))
const sd = view(Inputs.range([1,4],{step:.25,label:"sd",value:1}))
```

<div class="grid grid-cols-1">
    <div class="card"> ${resize((width) => NormalPdfPlot(mean,sd))}</div>
</div>


