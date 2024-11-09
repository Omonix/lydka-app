let labelTab = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  /*"9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",*/
];
let dataMaster = [];

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
        text: "Graphic",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Test (%)",
        },
        beginAtZero: true,
      },
    },
  },
});

document.querySelector(".addPeriod").addEventListener("click", () => {
  let newData = [];
  let rgb = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
  for (let i = 0; i < labelTab.length; i++) {
    newData.push(prompt(`Data of day ${labelTab[i]}`));
  }
  dataMaster.push({
    label: prompt(`Name of new period ${dataMaster.length + 1}`),
    data: newData,
    borderColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
    backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`,
    pointRadius: 5,
    pointHoverRadius: 10,
  });
  graph.update();
});
document.querySelector(".removePeriod").addEventListener("click", () => {
  let periodToRm = prompt("Period's name to remove : ");
  dataMaster.map((e, i) => {
    if (e.label === periodToRm) {
      dataMaster.splice(i, 1);
    }
  });
  graph.update();
});
document.querySelector(".addDay").addEventListener("click", () => {
  dataMaster.map((e, i) => {
    e.data.push(prompt(`New number for ${e.label}`));
  });
  labelTab.push(`${labelTab.length + 1}`);
  graph.update();
});
document.querySelector(".removeDay").addEventListener("click", () => {
  let dayToRm = prompt("Day to remove : ") - 1;
  dataMaster.map((e, i) => {
    e.data.splice(dayToRm, 1);
  });
  labelTab.splice(dayToRm, 1);
  graph.update();
});
