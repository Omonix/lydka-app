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
  oldData = lb_readData("lydka");
  if (level < oldData.greenPain.value) {
    color = `rgb(${oldData.greenPain.color[0]}, ${oldData.greenPain.color[1]}, ${oldData.greenPain.color[2]})`;
    bckcolor = `rgba(${oldData.greenPain.color[0]}, ${oldData.greenPain.color[1]}, ${oldData.greenPain.color[2]}, 0.4)`;
  } else if (level < oldData.yellowPain.value) {
    color = `rgb(${oldData.yellowPain.color[0]}, ${oldData.yellowPain.color[1]}, ${oldData.yellowPain.color[2]})`;
    bckcolor = `rgb(${oldData.yellowPain.color[0]}, ${oldData.yellowPain.color[1]}, ${oldData.yellowPain.color[2]}, 0.4)`;
  } else if (level < oldData.orangePain.value) {
    color = `rgb(${oldData.orangePain.color[0]}, ${oldData.orangePain.color[1]}, ${oldData.orangePain.color[2]})`;
    bckcolor = `rgb(${oldData.orangePain.color[0]}, ${oldData.orangePain.color[1]}, ${oldData.orangePain.color[2]}, 0.4)`;
  } else {
    color = `rgb(${oldData.redPain.color[0]}, ${oldData.redPain.color[1]}, ${oldData.redPain.color[2]})`;
    bckcolor = `rgb(${oldData.redPain.color[0]}, ${oldData.redPain.color[1]}, ${oldData.redPain.color[2]}, 0.4)`;
  }
  return { color: color, bckcolor: bckcolor };
};
const lb_setGraphColor = () => {
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
const lb_writeData = (data) => {
  localStorage.setItem("lydka", JSON.stringify(data));
  return;
};
const lb_readData = (data) => {
  return JSON.parse(localStorage.getItem(data));
};
const lb_setData = (data) => {
  if (localStorage.getItem(data) === null) {
    newData = {
      dataMaster: [],
      labelTab: ["1", "2", "3", "4", "5", "6", "7", "8"],
      greenPain: { value: 4, color: [0, 255, 0] },
      yellowPain: { value: 6, color: [255, 190, 0] },
      orangePain: { value: 8, color: [255, 90, 0] },
      redPain: { value: 10, color: [255, 0, 0] },
      mainColor: {
        text: "rgb(207, 72, 160)",
        background: "rgba(207, 72, 160, 0.4)",
      },
      mode: { normal: "rgb(15, 15, 15)", reverse: "#dee1e0", name: "Dark" },
    };
    lb_writeData(newData);
    return newData;
  } else {
    return lb_readData("lydka");
  }
};
const lb_setMainColor = (newrgb, newrgba, norm, rev) => {
  document.querySelector(":root").style.setProperty("--main-color", newrgb);
  document
    .querySelector(":root")
    .style.setProperty("--main-color-opacity", newrgba);
  document.querySelector(":root").style.setProperty("--main-background", norm);
  document.querySelector(":root").style.setProperty("--reverse-color", rev);
};

const defaulter = lb_setData("lydka");
let labelTab = defaulter.labelTab;
let dataMaster = defaulter.dataMaster;
lb_setMainColor(
  defaulter.mainColor.text,
  defaulter.mainColor.background,
  defaulter.mode.normal,
  defaulter.mode.reverse
);

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
        color: defaulter.mainColor.text,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Jour",
          color: defaulter.mainColor.text,
        },
        grid: {
          color: defaulter.mainColor.background,
        },
      },
      y: {
        title: {
          display: true,
          text: "Douleur",
          color: defaulter.mainColor.text,
        },
        grid: {
          color: defaulter.mainColor.background,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  },
});
lb_setGraphColor();

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
  levelColor = lb_levelPain(newData);
  dataMaster.push({
    label: prompt(`Nom de la nouvelle période ${dataMaster.length + 1}`),
    data: newData,
    borderColor: levelColor.color,
    backgroundColor: levelColor.bckcolor,
    pointRadius: 5,
    pointHoverRadius: 10,
  });
  let saved = lb_readData("lydka");
  saved.dataMaster = dataMaster;
  lb_writeData(saved);
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
  let saved = lb_readData("lydka");
  saved.dataMaster = dataMaster;
  lb_writeData(saved);
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
      levelColor = lb_levelPain(e.data);
      e.borderColor = levelColor.color;
      e.backgroundColor = levelColor.bckcolor;
    }
  });
  lb_inputNumHandler(labelTab.length);
  let saved = lb_readData("lydka");
  saved.dataMaster = dataMaster;
  saved.labelTab = labelTab;
  lb_writeData(saved);
  graph.update();
});
document.querySelector(".removeDay").addEventListener("click", () => {
  labelTab.pop();
  lb_inputNumHandler(labelTab.length);
  let saved = lb_readData("lydka");
  saved.labelTab = labelTab;
  lb_writeData(saved);
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
    let saved = lb_readData("lydka");
    saved.labelTab = labelTab;
    lb_writeData(saved);
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
  levelColor = lb_levelPain(newData);
  dataMaster.push({
    label: "testr",
    data: newData,
    borderColor: levelColor.color,
    backgroundColor: levelColor.bckcolor,
    pointRadius: 5,
    pointHoverRadius: 10,
  });
  let saved = lb_readData("lydka");
  saved.dataMaster = dataMaster;
  lb_writeData(saved);
  graph.update();
});
