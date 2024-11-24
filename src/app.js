let labelTab = ["1", "2", "3", "4", "5", "6", "7", "8"];
let dataMaster = [];
let greenPain = { value: 4, color: [0, 255, 0] };
let yellowPain = { value: 6, color: [255, 190, 0] };
let orangePain = { value: 8, color: [255, 90, 0] };
let redPain = { value: 10, color: [255, 0, 0] };

const graph = new Chart(document.querySelector(".graph"), {
  type: "line",
  data: {
    labels: labelTab,
    datasets: dataMaster,
  },
  options: {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 0.5,
        to: 0,
        loop: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Niveau de douleur pendant la période des règles",
        color: "rgb(207, 72, 160)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Jour",
          color: "rgb(207, 72, 160)",
        },
        grid: {
          color: "rgba(207, 72, 160, 0.4)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Douleur",
          color: "rgb(207, 72, 160)",
        },
        grid: {
          color: "rgba(207, 72, 160, 0.4)",
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  },
});
const lb_inputNumHandler = (newValue) => {
  document.querySelector(".inputNum").value = newValue;
};
const lb_average = (tab) => {
  sum = 0;
  sous = 0;
  for (let i = 0; i < tab.length; i++) {
    if (isNaN(tab[i]) === true) {
      sous++;
    } else {
      sum += tab[i];
    }
  }
  return sum / (tab.length - sous);
};
const lb_levelPain = (values) => {
  level = lb_average(values);
  if (level < greenPain.value) {
    color = `rgb(${greenPain.color[0]}, ${greenPain.color[1]}, ${greenPain.color[2]})`;
    bckcolor = `rgba(${greenPain.color[0]}, ${greenPain.color[1]}, ${greenPain.color[2]}, 0.4)`;
  } else if (level < yellowPain.value) {
    color = `rgb(${yellowPain.color[0]}, ${yellowPain.color[1]}, ${yellowPain.color[2]})`;
    bckcolor = `rgb(${yellowPain.color[0]}, ${yellowPain.color[1]}, ${yellowPain.color[2]}, 0.4)`;
  } else if (level < orangePain.value) {
    color = `rgb(${orangePain.color[0]}, ${orangePain.color[1]}, ${orangePain.color[2]})`;
    bckcolor = `rgb(${orangePain.color[0]}, ${orangePain.color[1]}, ${orangePain.color[2]}, 0.4)`;
  } else {
    color = `rgb(${redPain.color[0]}, ${redPain.color[1]}, ${redPain.color[2]})`;
    bckcolor = `rgb(${redPain.color[0]}, ${redPain.color[1]}, ${redPain.color[2]}, 0.4)`;
  }
  return { color: color, bckcolor: bckcolor };
};
const lb_resetGraphColor = () => {
  dataMaster.map((e) => {
    levelColor = lb_levelPain(e.data);
    e.borderColor = levelColor.color;
    e.backgroundColor = levelColor.bckcolor;
  });
  graph.update();
};
const lb_hexaToRGB = (hexa) => {
  r = parseInt(hexa.substring(1, 3), 16);
  g = parseInt(hexa.substring(3, 5), 16);
  b = parseInt(hexa.substring(5, hexa.length), 16);
  return [r, g, b];
};

document.querySelector(".addPeriod").addEventListener("click", () => {
  let newData = [];
  let i = 0;
  while (i < labelTab.length) {
    let word = prompt(`Donnée du jour ${labelTab[i]}`);
    if (word <= 10 && word >= 0) {
      newData.push(word === "" ? NaN : parseInt(word));
    } else {
      continue;
    }
    i++;
  }
  levelColor = lb_levelPain(newData, {
    green: greenPain,
    yellow: yellowPain,
    orange: orangePain,
  });
  dataMaster.push({
    label: prompt(`Nom de la nouvelle période ${dataMaster.length + 1}`),
    data: newData,
    borderColor: levelColor.color,
    backgroundColor: levelColor.bckcolor,
    pointRadius: 5,
    pointHoverRadius: 10,
  });
  graph.update();
});
document.querySelector(".removePeriod").addEventListener("click", () => {
  let periodToRm = prompt("Nom de la période a supprimer : ");
  if (periodToRm === "") {
    dataMaster.pop();
  }
  dataMaster.map((e, i) => {
    if (e.label === periodToRm) {
      dataMaster.splice(i, 1);
    }
  });
  graph.update();
});
document.querySelector(".addDay").addEventListener("click", () => {
  labelTab.push(`${labelTab.length + 1}`);
  dataMaster.map((e, i) => {
    if (labelTab.length > e.data.length) {
      newValue = prompt(`Nouvelle donnée pour ${e.label}`);
      if (newValue <= 10 && newValue >= 0) {
        e.data.push(newValue === "" ? NaN : parseInt(newValue));
      } else {
        e.data.push(NaN);
      }
      levelColor = lb_levelPain(e.data, {
        green: greenPain,
        yellow: yellowPain,
        orange: orangePain,
      });
      e.borderColor = levelColor.color;
      e.backgroundColor = levelColor.bckcolor;
    }
  });
  lb_inputNumHandler(labelTab.length);
  graph.update();
});
document.querySelector(".removeDay").addEventListener("click", () => {
  labelTab.pop();
  lb_inputNumHandler(labelTab.length);
  graph.update();
});
document.querySelector(".inputNum").addEventListener("change", () => {
  if (
    document.querySelector(".inputNum").value < 0 ||
    document.querySelector(".inputNum").value > 250
  ) {
    lb_inputNumHandler(labelTab.length);
  }
  while (labelTab.length != document.querySelector(".inputNum").value) {
    if (labelTab.length < document.querySelector(".inputNum").value) {
      labelTab.push(`${labelTab.length + 1}`);
    } else if (labelTab.length > document.querySelector(".inputNum").value) {
      labelTab.pop();
    }
  }
  graph.update();
});
document.querySelector(".magic").addEventListener("click", () => {
  let newData = [];
  let i = 0;
  while (i < labelTab.length) {
    newData.push(Math.floor(Math.random() * 11));
    i++;
  }
  levelColor = lb_levelPain(newData, {
    green: greenPain,
    yellow: yellowPain,
    orange: orangePain,
  });
  dataMaster.push({
    label: "testr",
    data: newData,
    borderColor: levelColor.color,
    backgroundColor: levelColor.bckcolor,
    pointRadius: 5,
    pointHoverRadius: 10,
  });
  graph.update();
});
document.querySelector(".inputColorGreen").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  if (isNaN(green) === false && green >= 0 && green < yellow) {
    greenPain.value = green;
  } else {
    document.querySelector(".inputColorGreen").value = 3;
  }
  lb_resetGraphColor();
});
document.querySelector(".inputColorYellow").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  if (isNaN(yellow) === false && yellow > green && yellow < orange) {
    yellowPain.value = yellow;
  } else {
    document.querySelector(".inputColorYellow").value = 6;
  }
  lb_resetGraphColor();
});
document.querySelector(".inputColorOrange").addEventListener("change", () => {
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  if (isNaN(orange) === false && orange > yellow && orange < 10) {
    orangePain.value = orange;
  } else {
    document.querySelector(".inputColorOrange").value = 8;
  }
  lb_resetGraphColor();
});
document.querySelector(".masterColor").addEventListener("change", () => {
  newrgb = document.querySelector(".masterColor").value;
  rgbConvert = lb_hexaToRGB(newrgb);
  newrgba = `rgba(${rgbConvert[0]}, ${rgbConvert[1]}, ${rgbConvert[2]}, 0.4)`;
  graph.options.scales.x.title.color = newrgb;
  graph.options.scales.y.title.color = newrgb;
  graph.options.plugins.title.color = newrgb;
  graph.options.scales.x.grid.color = newrgba;
  graph.options.scales.y.grid.color = newrgba;
  document.querySelector(":root").style.setProperty("--main-color", newrgb);
  document
    .querySelector(":root")
    .style.setProperty("--main-color-opacity", newrgba);
  graph.update();
});
document.querySelector(".choiceGreen").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceGreen").value);
  greenPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_resetGraphColor();
});
document.querySelector(".choiceYellow").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceYellow").value);
  yellowPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_resetGraphColor();
});
document.querySelector(".choiceOrange").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceOrange").value);
  orangePain.color = [newColor[0], newColor[1], newColor[2]];
  lb_resetGraphColor();
});
document.querySelector(".choiceRed").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceRed").value);
  redPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_resetGraphColor();
});
document.querySelector(".modeSwitcher").addEventListener("click", () => {
  mode = document.querySelector(".modeSwitcher").innerHTML;
  if (mode === "Dark") {
    document.querySelector(".modeSwitcher").innerHTML = "Light";
    document
      .querySelector(":root")
      .style.setProperty("--main-background", "#dee1e0");
    document.querySelector(":root").style.setProperty("--color", "#dee1e0");
    document
      .querySelector(":root")
      .style.setProperty("--reverse-color", "#000000");
  } else {
    document.querySelector(".modeSwitcher").innerHTML = "Dark";
    document
      .querySelector(":root")
      .style.setProperty("--main-background", "#0f0f0f");
    document.querySelector(":root").style.setProperty("--color", "#000000");
    document
      .querySelector(":root")
      .style.setProperty("--reverse-color", "##dee1e0");
  }
});
