let labelTab = ["1", "2", "3", "4", "5", "6", "7", "8"];
let dataMaster = [];
let greenPain = 3;
let yellowPain = 6;
let orangePain = 8;

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
const inputNumHandler = (newValue) => {
  document.querySelector(".inputNum").value = newValue;
};
const average = (tab) => {
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
const levelPain = (values) => {
  level = average(values);
  if (level <= greenPain) {
    color = "rgb(0, 255, 0)";
    bckcolor = "rgba(0, 255, 0, 0.4)";
  } else if (level < yellowPain) {
    color = "rgb(255, 190, 0)";
    bckcolor = "rgba(255, 190, 0, 0.4)";
  } else if (level < orangePain) {
    color = "rgb(255, 90, 0)";
    bckcolor = "rgba(255, 90, 0, 0.4)";
  } else {
    color = "rgb(255, 0, 0)";
    bckcolor = "rgba(255, 0, 0, 0.4)";
  }
  return { color: color, bckcolor: bckcolor };
};
const resetGraph = () => {
  dataMaster.map((e) => {
    levelColor = levelPain(e.data);
    e.borderColor = levelColor.color;
    e.backgroundColor = levelColor.bckcolor;
  });
  graph.update();
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
  levelColor = levelPain(newData, {
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
      levelColor = levelPain(e.data, {
        green: greenPain,
        yellow: yellowPain,
        orange: orangePain,
      });
      e.borderColor = levelColor.color;
      e.backgroundColor = levelColor.bckcolor;
    }
  });
  inputNumHandler(labelTab.length);
  graph.update();
});
document.querySelector(".removeDay").addEventListener("click", () => {
  labelTab.pop();
  inputNumHandler(labelTab.length);
  graph.update();
});
document.querySelector(".inputNum").addEventListener("change", () => {
  if (
    document.querySelector(".inputNum").value < 0 ||
    document.querySelector(".inputNum").value > 250
  ) {
    inputNumHandler(labelTab.length);
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
  levelColor = levelPain(newData, {
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
    greenPain = green;
  } else {
    document.querySelector(".inputColorGreen").value = 3;
  }
  resetGraph();
});
document.querySelector(".inputColorYellow").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  if (isNaN(yellow) === false && yellow > green && yellow < orange) {
    yellowPain = yellow;
  } else {
    document.querySelector(".inputColorYellow").value = 6;
  }
  resetGraph();
});
document.querySelector(".inputColorOrange").addEventListener("change", () => {
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  if (isNaN(orange) === false && orange > yellow && orange < 10) {
    orangePain = orange;
  } else {
    document.querySelector(".inputColorOrange").value = 8;
  }
  resetGraph();
});
document.querySelector(".masterColor").addEventListener("change", () => {
  newrgb = document.querySelector(".masterColor").value;
  newrgba = `rgba(${parseInt(newrgb.substring(1, 3), 16)}, ${parseInt(
    newrgb.substring(3, 5),
    16
  )}, ${parseInt(newrgb.substring(5, newrgb.length + 1), 16)}, 0.4)`;
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
