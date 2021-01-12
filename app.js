const labels = ["駆け", "出し", "エンジニア", "と", "繋がり", "たい"];
const values = [];
const running = [];
const count = labels.length;
for (let i = 0; i < count; i++) {
  values.push(parseInt(Math.random() * labels.length));
  running.push(true);
}
const ractive = new Ractive({
  el: "body",
  template: "#template",
  data: {
    labels: labels,
    values: values,
    running: running,
    done: false,
  },
  on: {
    stop: (e, index) => {
      const running = ractive.get("running");
      running[index] = false;
      ractive.set("running", running);
    },
  },
});

const timer = setInterval(() => {
  const values = ractive.get("values");
  const running = ractive.get("running");
  let done = true;
  for (let i = 0; i < count; i++) {
    if (!running[i]) {
      continue;
    }
    values[i] = (values[i] + 1) % count;
    done = false;
  }
  ractive.set({
    values: values,
    running: running,
  });
  if (done) {
    clearInterval(timer);
    const labels = ractive.get("labels");
    const result = values.map((i) => labels[i]).reduce((s, v) => s + v, "");
    ractive.set({
      done: true,
      result: result,
    });
  }
}, 100);
